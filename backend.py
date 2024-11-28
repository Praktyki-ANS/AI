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
