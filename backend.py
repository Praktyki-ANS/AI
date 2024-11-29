from fastapi import FastAPI, HTTPException
from typing import List
from pydantic import BaseModel
from contextlib import asynccontextmanager
from transformers import pipeline

models = {}

@asynccontextmanager
async def lifespan(app):
    print("Loading models from Hugging Face")
    models["emotion_classifier"] = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")
    yield
    print("Unloading models")
    models.clear()

app = FastAPI(lifespan=lifespan)

class InputData(BaseModel):
    texts: List[str]

class OutputData(BaseModel):
    emotions: List[dict]

@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}

@app.post("/predict", response_model=OutputData)
def predict(input_data: InputData) -> OutputData:
    if "emotion_classifier" not in models:
        raise HTTPException(status_code=503, detail="Emotion classifier model not available")

    model = models["emotion_classifier"]
    predictions = model(input_data.texts)

    return OutputData(emotions=predictions)