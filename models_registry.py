from transformers import pipeline
import os

os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

models = {}

def load_models():
    print("Loading models from Hugging Face")
    models["summarization.bart"] = pipeline("summarization/bart", model="facebook/bart-large-cnn", clean_up_tokenization_spaces=True)
    models["summarization.pegasus"] = pipeline("summarization/pegasus", model="google/pegasus-xsum")
    models["pl-en"] = pipeline("translation/pl-en", model="Helsinki-NLP/opus-mt-pl-en", clean_up_tokenization_spaces=True)
    models["en-pl"] = pipeline("translation/en-pl", model="sdadas/mt5-base-translator-en-pl")
    models["emotion_classifier"] = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")
    models["question_answering"] = pipeline("question-answering", model="deepset/roberta-base-squad2")
    models["text_generation"] = pipeline("text-generation", model="gpt2")

def unload_models():
    print("Unloading models")
    for key in models.keys():
        if hasattr(models[key], "model"):
            models[key].model.cpu()
        models[key] = None
