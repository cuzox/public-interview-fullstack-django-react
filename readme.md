## build & run backend docker image

1. `cd /backend/echo`
2. `docker-compose up --build`

## make migration
1. build the image (instructions above)
2. `npm install -g dotenv-cli`
3. `cd /backend/echo`
4. `dotenv -e ../../.env.dev docker-compose run backend python ./echo/manage.py makemigrations app`
