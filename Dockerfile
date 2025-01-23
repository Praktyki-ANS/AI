FROM python:3.11-slim

WORKDIR /code/dir

COPY ./requirements.txt /code/app/requirements.txt

RUN pip install --no-cache-dir -r /code/app/requirements.txt

COPY . /code/app

CMD ["uvicorn", "backend:app", "--host", "0.0.0.0", "--port", "8000"]
