#!/bin/sh

echo "Waiting for postgres to start"
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 0.1
done
echo "PostgreSQL started"

echo "Applying database migrations"
python ./echo/manage.py makemigrations
python ./echo/manage.py migrate

# python ./echo/manage.py dumpdata app.EchoUser --indent 4 > users.json

echo "Running application"
python ./echo/manage.py runserver 0.0.0.0:8000
