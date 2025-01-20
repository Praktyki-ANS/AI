import requests
from dotenv import load_dotenv
import os
import io
from PIL import Image

# Wczytanie zmiennych środowiskowych z pliku .env
load_dotenv()

API_URL = "https://api-inference.huggingface.co/models/strangerzonehf/Flux-Super-Realism-LoRA"
headers = {"Authorization": f"Bearer {os.getenv('key')}"}


def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content


prompt = input("Podaj prompt: ")
image_bytes = query({
    "inputs": prompt,
})

image = Image.open(io.BytesIO(image_bytes))
image.show()
