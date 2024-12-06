import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from contextlib import asynccontextmanager
from transformers import pipeline

os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

models = {
    "pl-en": pipeline("translation", model="Helsinki-NLP/opus-mt-pl-en"),
    "en-pl": pipeline("translation", model="sdadas/mt5-base-translator-en-pl"),
}

@asynccontextmanager
async def lifespan(app):
    print("Loading models")
    yield
    print("Unloading models")
    for model in models.values():
        model.model.cpu()  
        model.tokenizer = None
        model.model = None

app = FastAPI(lifespan=lifespan)

class RequestModel(BaseModel):
    input: str

@app.post("/translate/pl-en")
def translate_text_pl_en(request: RequestModel):
    input_text = request.input
    try:
        translation = models["pl-en"](input_text, max_length=40, return_tensors=False)
        translated_text = translation[0]["translation_text"]
        return {"input": input_text, "translation": translated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")

@app.post("/translate/en-pl")
def translate_text_en_pl(request: RequestModel):
    input_text = request.input
    try:
        translation = models["en-pl"](input_text, max_length=40, return_tensors=False)
        translated_text = translation[0]["translation_text"]
        return {"input": input_text, "translation": translated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")

@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok", "models": list(models.keys())}
