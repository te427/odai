FROM python:3.8

COPY . /app
WORKDIR  /app

RUN pip install pipenv

COPY Pipfile Pipfile.lock ${PROJECT_DIR}/

RUN pipenv install --system --deploy
