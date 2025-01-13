from transformers import pipeline
from diffusers import StableDiffusionPipeline
import os

os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

models = {}

def load_models():
    print("Loading models from Hugging Face")
    models["summarization.bart"] = pipeline("summarization", model="facebook/bart-large-cnn", clean_up_tokenization_spaces=True)
    models["summarization.pegasus"] = pipeline("summarization", model="google/pegasus-xsum")
    models["summarization.distilbart"] = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")
    models["summarization.cnicu"] = pipeline("summarization", model="cnicu/t5-small-booksum")
    models["pl-en"] = pipeline("translation", model="Helsinki-NLP/opus-mt-pl-en", clean_up_tokenization_spaces=True)
    models["en-pl"] = pipeline("translation", model="sdadas/mt5-base-translator-en-pl")
    models["en-ger"] = pipeline("translation", model="Helsinki-NLP/opus-mt-en-de")
    models["en-esp"] = pipeline("translation", model="Helsinki-NLP/opus-mt-en-es")
    models["emotion_classifier"] = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")
    models["question_answering"] = pipeline("question-answering", model="deepset/roberta-base-squad2")
    models["text_generation"] = pipeline("text-generation", model="gpt2")
    models["toxicity_classifier"] = pipeline("text-classification", model="unitary/toxic-bert")
    models["paraphrasing_model"] = pipeline("text2text-generation", model="Vamsi/T5_Paraphrase_Paws")
    models["sentiment_analysis"] = pipeline("text-classification", model="nlptown/bert-base-multilingual-uncased-sentiment")
    models["topic_classifier"] = pipeline("text-classification", model="facebook/bart-large-mnli")
    models["zero_shot_classifier"] = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")
    models["ner_model"] = pipeline("ner", model="dbmdz/bert-large-cased-finetuned-conll03-english")
    models["en-ger"] = pipeline("translation", model="Helsinki-NLP/opus-mt-en-de")
    models["en-esp"] = pipeline("translation", model="Helsinki-NLP/opus-mt-en-es")

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