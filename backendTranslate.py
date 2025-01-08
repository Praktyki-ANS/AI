from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from contextlib import asynccontextmanager
from transformers import pipeline

def load_translation_pipelines():
    return {
        "pl-en": pipeline("translation", model="Helsinki-NLP/opus-mt-pl-en"),
        "en-pl": pipeline("translation", model="sdadas/mt5-base-translator-en-pl"),
    }

model_pipelines = load_translation_pipelines()

@asynccontextmanager
async def lifespan(app):
    print("Loading models")
    yield
    print("Unloading models")
    for pipe in model_pipelines.values():
        pipe.model.cpu()
        pipe.tokenizer = None
        pipe.model = None

app = FastAPI(lifespan=lifespan)

class RequestModel(BaseModel):
    input: str
    model: str  # "pl-en" lub "en-pl"

@app.post("/translate")
async def translate_text(request: RequestModel):
    input_text = request.input
    model_key = request.model

    if model_key not in model_pipelines:
        raise HTTPException(status_code=400, detail=f"Model '{model_key}' is not available.")

    try:
        pipe = model_pipelines[model_key]
        translation = pipe(input_text, max_length=40, return_tensors=False)
        translated_text = translation[0]["translation_text"]
        return {"input": input_text, "translation": translated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/healthcheck")
async def healthcheck():
    return {"status": "ok", "models": list(model_pipelines.keys())}
