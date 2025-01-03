import time
from fastapi import FastAPI, Request
from contextlib import asynccontextmanager
from models_registry import load_models, unload_models
from fastapi.middleware.cors import CORSMiddleware
from log_config import logger
from starlette.responses import Response
from prometheus_client import Counter, Histogram, generate_latest

# Prometheus metrics
REQUEST_COUNT = Counter("app_request_count", "Total number of requests", ["method", "endpoint", "http_status"])
REQUEST_LATENCY = Histogram("app_request_latency_seconds", "Request latency", ["endpoint"])

@asynccontextmanager
async def lifespan(app):
    load_models()
    yield
    unload_models()

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Prometheus Middleware
@app.middleware("http")
async def prometheus_metrics(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    
    REQUEST_COUNT.labels(method=request.method, endpoint=str(request.url.path), http_status=response.status_code).inc()
    REQUEST_LATENCY.labels(endpoint=str(request.url.path)).observe(process_time)
    
    logger.info(f"Request to {request.url} took {process_time:.2f} seconds.")
    return response

@app.get("/metrics")
def metrics():
    return Response(content=generate_latest(), media_type="text/plain")

# Import routes
from routes import summarization, translate, predict, question_answering, generate_text, healthcheck, images

app.include_router(summarization.router)
app.include_router(translate.router)
app.include_router(predict.router)
app.include_router(question_answering.router)
app.include_router(generate_text.router)
app.include_router(healthcheck.router)
app.include_router(images.router)

from exception_handlers import http_exception_handler, validation_exception_handler, global_exception_handler
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, global_exception_handler)

from middlewares.logging_middleware import LoggingMiddleware

app.add_middleware(LoggingMiddleware)
