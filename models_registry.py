from transformers import pipeline
import os
from diffusers import StableDiffusionPipeline

os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

models = {}

def load_models():
    print("Loading models from Hugging Face")
    models["summarization"] = pipeline("summarization", model="facebook/bart-large-cnn", clean_up_tokenization_spaces=True)
    models["translation"] = pipeline("translation", model="Helsinki-NLP/opus-mt-pl-en", clean_up_tokenization_spaces=True)
    models["emotion_classifier"] = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")
    models["question_answering"] = pipeline("question-answering", model="deepset/roberta-base-squad2")
    models["text_generation"] = pipeline("text-generation", model="gpt2")
    models["stable_diffusion"] = StableDiffusionPipeline.from_pretrained("runwayml/stable-diffusion-v1-5")

def unload_models():
    print("Unloading models")
    for key in models.keys():
        if hasattr(models[key], "model"):
            models[key].model.cpu()
        models[key] = None
