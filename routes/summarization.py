from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models_registry import models

router = APIRouter()

class RequestModel(BaseModel):
    input: str

@router.post("/summarization")
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
        return {"input": text_to_summarize, "summarization": summary[0]['summary_text']}
    except Exception as e:
        return {"error": str(e)}

@router.post("/summarization/pegasus")
def summarization_pegasus(request: RequestModel):
    text_to_summarize = request.input.strip()

    if len(text_to_summarize.split()) < 25:
        return {"error": "Input text is too short for summarization. Please provide a longer text."}

    max_length = int(len(text_to_summarize.split()) * 0.25)

    try:
        model = models.get("summarization.pegasus")
        if not model:
            raise HTTPException(status_code=503, detail="Pegasus model not available")

        summary = model(
            text_to_summarize,
            max_length=max_length,
            min_length=25,
            do_sample=False
        )
        return {"input": text_to_summarize, "summarization": summary[0]['summary_text']}
    except Exception as e:
        return {"error": str(e)}
    
    
@router.post("/summarization/distilbart")
def summarization_pegasus(request: RequestModel):
    text_to_summarize = request.input.strip()

    if len(text_to_summarize.split()) < 25:
        return {"error": "Input text is too short for summarization. Please provide a longer text."}

    max_length = int(len(text_to_summarize.split()) * 0.25)

    try:
        model = models.get("summarization.distilbart")
        if not model:
            raise HTTPException(status_code=503, detail="=Distilbart model not available")

        summary = model(
            text_to_summarize,
            max_length=max_length,
            min_length=25,
            do_sample=False
        )
        return {"input": text_to_summarize, "summarization": summary[0]['summary_text']}
    except Exception as e:
        return {"error": str(e)}
    
@router.post("/summarization/cnicu")
def summarization_pegasus(request: RequestModel):
    text_to_summarize = request.input.strip()

    if len(text_to_summarize.split()) < 25:
        return {"error": "Input text is too short for summarization. Please provide a longer text."}

    max_length = int(len(text_to_summarize.split()) * 0.25)

    try:
        model = models.get("summarization.cnicu")
        if not model:
            raise HTTPException(status_code=503, detail="=Cnicu model not available")

        summary = model(
            text_to_summarize,
            max_length=max_length,
            min_length=25,
            do_sample=False
        )
        return {"input": text_to_summarize, "summarization": summary[0]['summary_text']}
    except Exception as e:
        return {"error": str(e)}
    
    
    
