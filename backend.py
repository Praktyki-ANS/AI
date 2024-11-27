from fastapi import FastAPI
from typing import List
import pickle
from functools import lru_cache
from pydantic import BaseModel
from contextlib import asynccontextmanager

models = {}

@asynccontextmanager
async def lifespan(app):
    print("Loading model")
    yield
    print("Unloading model")
    models.clear()

app = FastAPI(lifespan=lifespan)

class InputDataText(BaseModel):
    texts: List[str]

class OutputDataText(BaseModel):
    is_offensive: List[bool]

@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}