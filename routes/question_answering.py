from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from models_registry import models

router = APIRouter()

class QARequestModel(BaseModel):
    context: str
    question: str

@router.post("/question-answering")
def question_answering(request: QARequestModel):
    try:
        model = models.get("question_answering")
        if not model:
            raise HTTPException(status_code=503, detail="Question answering model not available")

        answer = model({"context": request.context, "question": request.question})
        return {"context": request.context, "question": request.question, "answer": answer["answer"]}
    except Exception as e:
        return {"error": str(e)}
