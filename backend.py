# main.py
from fastapi import FastAPI
from contextlib import asynccontextmanager
from models_registry import load_models, unload_models

@asynccontextmanager
async def lifespan(app):
    load_models()
    yield
    unload_models()

app = FastAPI(lifespan=lifespan)

from routes import summarization, translate, predict, question_answering, generate_text, healthcheck

app.include_router(summarization.router)
app.include_router(translate.router)
app.include_router(predict.router)
app.include_router(question_answering.router)
app.include_router(generate_text.router)
app.include_router(healthcheck.router)
