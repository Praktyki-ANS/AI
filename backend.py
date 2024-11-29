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
    return {"status": "ok"}