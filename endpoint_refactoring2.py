from fastapi import FastAPI, HTTPException
from rafactoring_gemini import generate_text2 

app = FastAPI()

@app.post("/generate-text2")
def generate_text_endpoint(request: RequestModel):
    try:
        result = generate_text(request.input, models)
        return result
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return {"error": str(e)}