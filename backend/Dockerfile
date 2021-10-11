# syntax=docker/dockerfile:1

# base build
FROM python:3.9.6-alpine

# set docker working dir
WORKDIR /usr/src/acme

# env vars
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
COPY ./requirements.txt ./
RUN pip install -r requirements.txt

# copy backend src
COPY . ./

# copy entrypoint
COPY ./entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

# trigger entrypoint script
ENTRYPOINT ./entrypoint.sh
