from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models_registry import models

router = APIRouter()

class RequestModel(BaseModel):
    input: str

@router.post("/generate-text")
def generate_text(request: RequestModel):
    try:
        model = models.get("text_generation")
        if not model:
            raise HTTPException(status_code=503, detail="Text generation model not available")

        generated = model(request.input, max_length=50, num_return_sequences=1)
        return {"input": request.input, "generated_text": generated[0]["generated_text"]}
    except Exception as e:
        return {"error": str(e)}
