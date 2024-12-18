from transformers import pipeline
from diffusers import StableDiffusionPipeline
import os

os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

models = {}

def load_models():
    print("Loading models from Hugging Face")
    models["summarization.bart"] = pipeline("summarization", model="facebook/bart-large-cnn", clean_up_tokenization_spaces=True)
    models["summarization.pegasus"] = pipeline("summarization", model="google/pegasus-xsum")
    models["pl-en"] = pipeline("translation", model="Helsinki-NLP/opus-mt-pl-en", clean_up_tokenization_spaces=True)
    models["en-pl"] = pipeline("translation", model="sdadas/mt5-base-translator-en-pl")
    models["emotion_classifier"] = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")
    models["question_answering"] = pipeline("question-answering", model="deepset/roberta-base-squad2")
    models["text_generation"] = pipeline("text-generation", model="gpt2")
    
    # Load Stable Diffusion model
    models["stable_diffusion"] = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4")
    models["stable_diffusion"].to("cpu")  # Move the model to CPU

def unload_models():
    print("Unloading models")
    for key in models.keys():
        if hasattr(models[key], "model"):
            models[key].model.cpu()
        models[key] = None

# Example usage
if __name__ == "__main__":
    load_models()
    # You can now use the models, for example:
    # image = models["stable_diffusion"]("A fantasy landscape")
    unload_models()