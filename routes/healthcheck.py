from fastapi import APIRouter

router = APIRouter()

@router.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}
