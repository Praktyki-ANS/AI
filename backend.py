from fastapi import FastAPI
from pydantic import BaseModel
from contextlib import asynccontextmanager
from transformers import pipeline

# Ładowanie modelu tłumaczeniowego
pipe = pipeline("translation", model="Helsinki-NLP/opus-mt-pl-en")

@asynccontextmanager
async def lifespan(app):
    print("Loading model")
    yield
    print("Unloading model")
    pipe.model.cpu()  # Zwolnienie zasobów GPU, jeśli używane
    pipe.tokenizer = None
    pipe.model = None

app = FastAPI(lifespan=lifespan)

# Model danych wejściowych
class RequestModel(BaseModel):
    input: str

# Endpoint do tłumaczenia tekstu
@app.post("/translate")
def translate_text(request: RequestModel):
    input_text = request.input
    translation = pipe(input_text, max_length=40, return_tensors=False)
    translated_text = translation[0]["translation_text"]
    return {"input": input_text, "translation": translated_text}

# Endpoint do sprawdzenia stanu aplikacji
@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}
