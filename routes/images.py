from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
import torch
import os
from pydantic import BaseModel
from typing import List
from models_registry import models

app = FastAPI()

router = APIRouter()

# Ścieżka do folderu, w którym będą zapisywane obrazy (pozostaje public)
ASSETS_FOLDER = "public"

# Upewnijmy się, że folder istnieje
if not os.path.exists(ASSETS_FOLDER):
    os.makedirs(ASSETS_FOLDER)

# Udostępnienie folderu public jako folderu statycznego
app.mount("/ANS-AI-DEMO", StaticFiles(directory=ASSETS_FOLDER), name="assets")

class ImageInputData(BaseModel):
    prompt: str

class ImageOutputData(BaseModel):
    images: List[str]

@router.post("/images", response_model=ImageOutputData)
def generate_image(input_data: ImageInputData) -> ImageOutputData:
    try:
        model = models.get("stable_diffusion")
        if not model:
            raise HTTPException(status_code=503, detail="Stable Diffusion model not available")
        
        # Generowanie obrazu
        with torch.no_grad():  # Oszczędzaj pamięć GPU
            results = model(input_data.prompt, num_inference_steps=8)  # Możesz dostosować parametry

        # Przekształcanie obrazów do formatu, który można zwrócić
        images = []
        for i, image in enumerate(results.images):
            # Generowanie ścieżki do zapisu obrazu w folderze public
            image_path = os.path.join(ASSETS_FOLDER, f"image_{i}.png")
            
            # Zapisz obraz do pliku w folderze public
            image.save(image_path)  
            # Zwróć URL do obrazu w formacie http://localhost:5173/ANS-AI-DEMO/image_0.png
            images.append(f"/ANS-AI-DEMO/image_{i}.png")  # Ścieżka URL do pliku

        return ImageOutputData(images=images)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

app.include_router(router)
