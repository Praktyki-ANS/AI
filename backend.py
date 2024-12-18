# main.py
from fastapi import FastAPI
from contextlib import asynccontextmanager
from models_registry import load_models, unload_models
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app):
    load_models()
    yield
    unload_models()

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",  # Frontend address
    "http://127.0.0.1:5173",  # In case you're testing from 127.0.0.1 instead of localhost
]

# Add CORS middleware to allow frontend to make requests to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow only these origins to access the backend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

from routes import summarization, translate, predict, question_answering, generate_text, healthcheck, images

app.include_router(summarization.router)
app.include_router(translate.router)
app.include_router(predict.router)
app.include_router(question_answering.router)
app.include_router(generate_text.router)
app.include_router(healthcheck.router)
app.include_router(images.router)