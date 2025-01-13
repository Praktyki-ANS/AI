FROM python:3.11.0a1-slim

WORKDIR /code/dir

COPY ./requirements.txt /code/app/requirements.txt

RUN pip install --no-cache-dir -r /code/app/requirements.txt

COPY . /code/app

CMD ["fastapi", "run", "backend.py"]