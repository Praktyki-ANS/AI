from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models_registry import models

router = APIRouter()

class RequestModel(BaseModel):
    input: str

@router.post("/translate")
def translate_text(request: RequestModel):
    input_text = request.input

    try:
        model = models.get("translation")
        if not model:
            raise HTTPException(status_code=503, detail="Translation model not available")

        translation = model(input_text, max_length=40, return_tensors=False)
        return {"input": input_text, "translation": translation[0]["translation_text"]}
    except Exception as e:
        return {"error": str(e)}
