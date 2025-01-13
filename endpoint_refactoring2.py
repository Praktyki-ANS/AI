from fastapi import FastAPI, HTTPException, Depends
from refactoring_gpt_neo import generate_text2  


app = FastAPI()


@app.post("/generate-text")
def generate_text_endpoint(request: RequestModel):
    try:
        result = generate_text(request.input, models)
        return result
    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        return {"error": str(e)}
