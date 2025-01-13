from fastapi import FastAPI, HTTPException, Depends
from refactoring_gpt_neo import generate_text2  


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
