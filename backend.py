from fastapi import FastAPI
from pydantic import BaseModel
from contextlib import asynccontextmanager
from transformers import pipeline


pipe = pipeline("summarization", model="facebook/bart-large-cnn")

@asynccontextmanager
async def lifespan(app):
    print("Loading model")
    yield
    print("Unloading model")
    pipe.model.cpu()  
    pipe.tokenizer = None
    pipe.model = None

app = FastAPI(lifespan=lifespan)


class RequestModel(BaseModel):
    input: str


@app.post("/summarization")
def summarization(request: RequestModel):
    text_to_summarize = request.input

    max_lenght = len(text_to_summarize.split())*0.25
    if len(text_to_summarize.split()) < 25: 
        return {"error": "Input text is too short for summarization. Please provide a longer text."}

    try:
        summary = pipe(text_to_summarize, max_length=max_lenght, min_length=25, do_sample=False)
        if not summary or "summary_text" not in summary[0]:
            raise ValueError("Model failed to generate a summary.")
        
        summary_text = summary[0]['summary_text']
        return {"input": text_to_summarize, "summarization": summary_text}
    except Exception as e:
        return {"error": str(e)}

@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}from fastapi import FastAPI
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
