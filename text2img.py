import requests

API_URL = "https://api-inference.huggingface.co/models/strangerzonehf/Flux-Super-Realism-LoRA"
headers = {"Authorization": "Bearer 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"}


def query(payload):
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.content


prompt = input("Podaj prompt: ")
image_bytes = query({
    "inputs": prompt,
})


import io
from PIL import Image

image = Image.open(io.BytesIO(image_bytes))
image.show()
