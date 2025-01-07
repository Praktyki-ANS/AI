from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models_registry import models

router = APIRouter()

class RequestModel(BaseModel):
    input: str

@router.post("/translate/pl-en")
def translate_text_pl_en(request: RequestModel):
    input_text = request.input
    try:
        translation = models["pl-en"](input_text, max_length=40, return_tensors=False)
        translated_text = translation[0]["translation_text"]
        return {"input": input_text, "translation": translated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")

@router.post("/translate/en-pl")
def translate_text_en_pl(request: RequestModel):
    input_text = request.input
    try:
        translation = models["en-pl"](input_text, max_length=40, return_tensors=False)
        translated_text = translation[0]["translation_text"]
        return {"input": input_text, "translation": translated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")

@router.post("/translate/en-esp")
def translate_text_en_esp(request: RequestModel):
    input_text = request.input
    try:
        translation = models["en-esp"](input_text, max_length=40, return_tensors=False)
        translated_text = translation[0]["translation_text"]
        return {"input": input_text, "translation": translated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")

@router.post("/translate/en-ger")
def translate_text_en_ger(request: RequestModel):
    input_text = request.input
    try:
        translation = models["en-ger"](input_text, max_length=40, return_tensors=False)
        translated_text = translation[0]["translation_text"]
        return {"input": input_text, "translation": translated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")
