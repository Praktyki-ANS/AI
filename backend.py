from fastapi import FastAPI, Form
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from starlette.requests import Request
from transformers import AutoTokenizer, AutoModelForCausalLM,GPT2LMHeadModel, GPT2Tokenizer
from huggingface_hub import login
import torch

# TOKEN 
hf_token = "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"
login(token=hf_token)

app = FastAPI()

device = "cuda" if torch.cuda.is_available() else "cpu"

# MODEL
model_name = "gpt2"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)



# GET
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# foldery css/html
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


# POST
@app.post("/send_message")
async def send_message(message: str = Form(...)):
    try:
        prompt = f"Answer concisely: {message}"
        
        inputs = tokenizer(prompt, return_tensors="pt").to(device)
        
        outputs = model.generate(
            **inputs,
            max_length=50,  # Short responses
            num_return_sequences=1,
            temperature=0.5,  # Very deterministic
            top_k=35,  # Focus on very probable tokens
            top_p=0.3,  # Slight diversity
            num_beams=1,  # Beam search for optimal answer
            eos_token_id=tokenizer.eos_token_id,
        )
    
        reply = tokenizer.decode(outputs[0], skip_special_tokens=True).strip()
       
        if "Answer concisely:" in reply:
            reply = reply.replace("Answer concisely:", "").strip()
        reply = reply.split(".")[0] + "." 

        return {"reply": reply}

    except Exception as e:
        return {"error": str(e)}
from fastapi import FastAPI, HTTPException
from typing import List
from pydantic import BaseModel
from contextlib import asynccontextmanager
from transformers import pipeline

models = {}

@asynccontextmanager
async def lifespan(app):
    print("Loading models from Hugging Face")
    models["summarization"] = pipeline("summarization", model="facebook/bart-large-cnn")
    models["translation"] = pipeline("translation", model="Helsinki-NLP/opus-mt-pl-en")
    models["emotion_classifier"] = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base")
    yield
    print("Unloading models")
    for key in models.keys():
        if hasattr(models[key], "model"):
            models[key].model.cpu()
        models[key] = None

app = FastAPI(lifespan=lifespan)

class RequestModel(BaseModel):
    input: str

class InputData(BaseModel):
    texts: List[str]

class OutputData(BaseModel):
    emotions: List[dict]

@app.post("/summarization")
def summarization(request: RequestModel):
    text_to_summarize = request.input

    if len(text_to_summarize.split()) < 25:
        return {"error": "Input text is too short for summarization. Please provide a longer text."}

    max_length = int(len(text_to_summarize.split()) * 0.25)

    try:
        model = models.get("summarization")
        if not model:
            raise HTTPException(status_code=503, detail="Summarization model not available")

        summary = model(text_to_summarize, max_length=max_length, min_length=25, do_sample=False)
        if not summary or "summary_text" not in summary[0]:
            raise ValueError("Model failed to generate a summary.")

        summary_text = summary[0]['summary_text']
        return {"input": text_to_summarize, "summarization": summary_text}
    except Exception as e:
        return {"error": str(e)}

@app.post("/translate")
def translate_text(request: RequestModel):
    input_text = request.input

    try:
        model = models.get("translation")
        if not model:
            raise HTTPException(status_code=503, detail="Translation model not available")

        translation = model(input_text, max_length=40, return_tensors=False)
        if not translation or "translation_text" not in translation[0]:
            raise ValueError("Model failed to generate a translation.")

        translated_text = translation[0]["translation_text"]
        return {"input": input_text, "translation": translated_text}
    except Exception as e:
        return {"error": str(e)}

@app.post("/predict", response_model=OutputData)
def predict(input_data: InputData) -> OutputData:
    try:
        model = models.get("emotion_classifier")
        if not model:
            raise HTTPException(status_code=503, detail="Emotion classifier model not available")

        predictions = model(input_data.texts)
        return OutputData(emotions=predictions)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/healthcheck")
def healthcheck():
    return {"status": "ok"}