from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from models_registry import models

router = APIRouter()

class ImageInputData(BaseModel):
    prompt: str

class ImageOutputData(BaseModel):
    images: List[str]

@router.post("/generate_image", response_model=ImageOutputData)
def generate_image(input_data: ImageInputData) -> ImageOutputData:
    try:
        model = models.get("stable_diffusion")
        if not model:
            raise HTTPException(status_code=503, detail="Stable Diffusion model not available")
        
        results = model(input_data.prompt)
        
        images = [result["generated_image"] for result in results]
        for image in images:
            image.save("image.png")
            if not image:
                raise HTTPException(status_code=500, detail="Failed to generate image")
        return ImageOutputData(images=images)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
