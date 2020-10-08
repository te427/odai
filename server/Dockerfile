FROM python:3.8

ENV PYTHONBUFFERED 1
ENV PYTHONWRITEBYTECODE 1

COPY . /app
WORKDIR  /app

RUN pip install pipenv

COPY Pipfile Pipfile.lock ${PROJECT_DIR}/

RUN pipenv install --system --deploy
