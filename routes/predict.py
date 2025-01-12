from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from models_registry import models

router = APIRouter()

class InputData(BaseModel):
    texts: List[str]

class OutputData(BaseModel):
    predictions: List[dict]

@router.post("/predict/emotions", response_model=OutputData)
def predict_emotions(input_data: InputData) -> OutputData:
    try:
        model = models.get("emotion_classifier")
        if not model:
            raise HTTPException(status_code=503, detail="Emotion classifier model not available")
        
        predictions = model(input_data.texts)
        return OutputData(predictions=predictions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@router.post("/predict/toxicity", response_model=OutputData)
def predict_toxicity(input_data: InputData) -> OutputData:
    try:
        model = models.get("toxicity_classifier")  # New model
        if not model:
            raise HTTPException(status_code=503, detail="Toxicity classifier model not available")
        
        predictions = model(input_data.texts)
        return OutputData(predictions=predictions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@router.post("/predict/paraphrase", response_model=OutputData)
def paraphrase_text(input_data: InputData) -> OutputData:
    try:
        model = models.get("paraphrasing_model")  # New model
        if not model:
            raise HTTPException(status_code=503, detail="Paraphrasing model not available")
        
        predictions = [
            {"paraphrase": model(text, max_length=60, num_return_sequences=1)[0]["generated_text"]}
            for text in input_data.texts
        ]
        return OutputData(predictions=predictions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@router.post("/predict/sentiment", response_model=OutputData)
def predict_sentiment(input_data: InputData) -> OutputData:
    try:
        model = models.get("sentiment_analysis")
        if not model:
            raise HTTPException(status_code=503, detail="Sentiment analysis model not available")
        
        predictions = model(input_data.texts)
        return OutputData(predictions=predictions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
    
@router.post("/predict/topic", response_model=OutputData)
def predict_topic(input_data: InputData) -> OutputData:
    try:
        model = models.get("topic_classifier")
        if not model:
            raise HTTPException(status_code=503, detail="Topic classifier model not available")
        
        predictions = model(input_data.texts)
        return OutputData(predictions=predictions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@router.post("/predict/zero-shot", response_model=OutputData)
def predict_zero_shot(input_data: InputData) -> OutputData:
    try:
        model = models.get("zero_shot_classifier")
        if not model:
            raise HTTPException(status_code=503, detail="Zero-shot classifier model not available")
        
        predictions = [
            model(text, candidate_labels=["finance", "sports", "technology", "politics", "health"])
            for text in input_data.texts
        ]
        return OutputData(predictions=predictions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@router.post("/predict/ner", response_model=OutputData)
def predict_ner(input_data: InputData) -> OutputData:
    try:
        model = models.get("ner_model")
        if not model:
            raise HTTPException(status_code=503, detail="NER model not available")
        
        predictions = model(input_data.texts)
        return OutputData(predictions=predictions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")