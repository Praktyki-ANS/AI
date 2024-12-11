from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from models_registry import models

router = APIRouter()

class InputData(BaseModel):
    texts: List[str]

class OutputData(BaseModel):
    emotions: List[dict]

@router.post("/predict", response_model=OutputData)
def predict(input_data: InputData) -> OutputData:
    try:
        model = models.get("emotion_classifier")
        if not model:
            raise HTTPException(status_code=503, detail="Emotion classifier model not available")

        predictions = model(input_data.texts)
        return OutputData(emotions=predictions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
