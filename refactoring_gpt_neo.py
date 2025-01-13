from fastapi import HTTPException


models = GPT-neo-125M



def generate_text2(input_text: str, models: dict) -> dict:
    try:
        model = models.get("text_generation")
        if not model:
            raise HTTPException(status_code=503, detail="Text generation model not available")

        generated = model(input_text, max_length=50, num_return_sequences=1)
        generated_text = generated[0]["generated_text"]
        return {"input": input_text, "generated_text": generated_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
