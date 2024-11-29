from fastapi import FastAPI, HTTPException
from typing import List
from pydantic import BaseModel
from contextlib import asynccontextmanager
from transformers import pipeline

models = {}

@asynccontextmanager
async def lifespan(app):
    print("Loading models from Hugging Face")
    models["summarization"] = pipeline("summarization", model="facebook/bart-large-cnn")
    models["translation"] = pipeline("translation", model="Helsinki-NLP/opus-mt-pl-en")
    models["emotion_classifier"] = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")
    yield
    print("Unloading models")
    for key in models.keys():
        if hasattr(models[key], "model"):
            models[key].model.cpu()
        models[key] = None

app = FastAPI(lifespan=lifespan)

class RequestModel(BaseModel):
    input: str

class InputData(BaseModel):
    texts: List[str]

class OutputData(BaseModel):
    emotions: List[dict]

@app.post("/summarization")
def summarization(request: RequestModel):
    text_to_summarize = request.input

    if len(text_to_summarize.split()) < 25:
        return {"error": "Input text is too short for summarization. Please provide a longer text."}

    max_length = int(len(text_to_summarize.split()) * 0.25)

    try:
        model = models.get("summarization")
        if not model:
            raise HTTPException(status_code=503, detail="Summarization model not available")

        summary = model(text_to_summarize, max_length=max_length, min_length=25, do_sample=False)
        if not summary or "summary_text" not in summary[0]:
            raise ValueError("Model failed to generate a summary.")

        summary_text = summary[0]['summary_text']
        return {"input": text_to_summarize, "summarization": summary_text}
    except Exception as e:
        return {"error": str(e)}

@app.post("/translate")
def translate_text(request: RequestModel):
    input_text = request.input

    try:
        model = models.get("translation")
        if not model:
            raise HTTPException(status_code=503, detail="Translation model not available")

        translation = model(input_text, max_length=40, return_tensors=False)
        if not translation or "translation_text" not in translation[0]:
            raise ValueError("Model failed to generate a translation.")

        translated_text = translation[0]["translation_text"]
        return {"input": input_text, "translation": translated_text}
    except Exception as e:
        return {"error": str(e)}

@app.post("/predict", response_model=OutputData)
def predict(input_data: InputData) -> OutputData:
    try:
        model = models.get("emotion_classifier")
        if not model:
            raise HTTPException(status_code=503, detail="Emotion classifier model not available")

        predictions = model(input_data.texts)
        return OutputData(emotions=predictions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}