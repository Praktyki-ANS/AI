from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from refactoring_gemini import generate_text2  



GEMINI_API_KEY = "AIzaSyDyzX6WJ6LDsDisJWAgF4xA2dRENwqMH8o"


def get_api_key():
    if not GEMINI_API_KEY:
        raise HTTPException(status_code=500, detail="Gemini API key is not configured.")
    return GEMINI_API_KEY

app = FastAPI()

@app.post("/generate-text2")
def generate_text_endpoint(request: RequestModel, api_key: str = Depends(get_api_key)):
    try:
        # Wywołanie funkcji generującej tekst z wykorzystaniem klucza API
        result = generate_text2(request.input, api_key)
        return {"result": result}
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return {"error": str(e)}
