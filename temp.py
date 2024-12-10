import os
import torch
import random
import numpy as np
from omegaconf import OmegaConf
from PIL import Image
from pytorch_lightning import seed_everything
from torch import autocast
from einops import rearrange

from ldm.util import instantiate_from_config
from ldm.models.diffusion.ddim import DDIMSampler
from diffusers.pipelines.stable_diffusion.safety_checker import StableDiffusionSafetyChecker
from transformers import AutoFeatureExtractor

# Ustalamy bazowy katalog na folder, w którym znajduje się skrypt
base_path = os.path.dirname(os.path.abspath(__file__))

# Ładowanie modelu 
safety_model_id = "CompVis/stable-diffusion-safety-checker"
safety_feature_extractor = AutoFeatureExtractor.from_pretrained(safety_model_id)
safety_checker = StableDiffusionSafetyChecker.from_pretrained(safety_model_id)

def numpy_to_pil(images):
    if images.ndim == 3:
        images = images[None, ...]
    images = (images * 255).round().astype("uint8")
    return [Image.fromarray(image) for image in images]

def load_model_from_config(config, ckpt):
    print(f"Loading model from {ckpt}")
    pl_sd = torch.load(ckpt, map_location="cpu")
    sd = pl_sd["state_dict"]
    model = instantiate_from_config(config.model)
    model.load_state_dict(sd, strict=False)
    model.cuda()
    model.eval()
    return model

def check_safety(x_image):
    safety_checker_input = safety_feature_extractor(numpy_to_pil(x_image), return_tensors="pt")
    x_checked_image, has_nsfw_concept = safety_checker(images=x_image, clip_input=safety_checker_input.pixel_values)
    for i in range(len(has_nsfw_concept)):
        if has_nsfw_concept[i]:
            print("NSFW content detected.")
            hwc = x_image[i].shape
            x_image[i] = np.zeros(hwc, dtype=np.float32)
    return x_image

def main():
    #prompt
    prompt = input("Podaj prompt (po Angielsku): ")

    # ścieżki
    config_path = r"C:\stable\configs\stable-diffusion\v1-inference.yaml"
    checkpoint_path = r"C:\stable\models\ldm\stable-diffusion-v1\model.ckpt"

    
    if not os.path.exists(config_path):
        print(f"Błąd: Plik konfiguracyjny nie istnieje: {config_path}")
        return
    if not os.path.exists(checkpoint_path):
        print(f"Błąd: Plik checkpointu nie istnieje: {checkpoint_path}")
        return

    # Parametry
    seed = random.randint(0,2**32-1) #Ustawia losowy seed(za kazdym razem obraz bedzie inny mimo takiego samego promptu)
    ddim_steps = 500 #Tu mozna zmniejszyc. Im mniejsza ilosc, tym szybciej sie obraz robi ale jest wtedy mniej dokladyn
    height = 512
    width = 512
    latent_channels = 4
    downsampling_factor = 8
    guidance_scale = 7.5


    seed_everything(seed)


    config = OmegaConf.load(config_path)
    model = load_model_from_config(config, checkpoint_path)
    device = torch.device("cuda") if torch.cuda.is_available() else torch.device("cpu")
    model = model.to(device)

   
    sampler = DDIMSampler(model)


    batch_size = 1
    start_code = torch.randn([batch_size, latent_channels, height // downsampling_factor, width // downsampling_factor],
                             device=device)


    with torch.no_grad():
        with autocast("cuda"):
            with model.ema_scope():
                uc = model.get_learned_conditioning(batch_size * [""])
                c = model.get_learned_conditioning([prompt])
                shape = [latent_channels, height // downsampling_factor, width // downsampling_factor]

                # Próbkowanie
                samples_ddim, _ = sampler.sample(
                    S=ddim_steps,
                    conditioning=c,
                    batch_size=batch_size,
                    shape=shape,
                    verbose=False,
                    unconditional_guidance_scale=guidance_scale,
                    unconditional_conditioning=uc,
                    eta=0.0,
                    x_T=start_code
                )


                x_samples_ddim = model.decode_first_stage(samples_ddim)
                x_samples_ddim = torch.clamp((x_samples_ddim + 1.0) / 2.0, min=0.0, max=1.0)
                x_samples_ddim = x_samples_ddim.cpu().permute(0, 2, 3, 1).numpy()


                x_checked_image = check_safety(x_samples_ddim)
                final_image = (255.0 * x_checked_image[0]).astype(np.uint8)


                img = Image.fromarray(final_image)
                img.show()

if __name__ == "__main__":
    main()