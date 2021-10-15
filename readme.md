## build & run backend docker image

1. `cd /backend/echo`
2. `docker-compose up --build`

## connecting to the database

To avoid conflicting port issues, with an already running postgres, the port of this app's postgres is exposed at `:5555`

You can connect, via CLI, by:

```sh
PGPASSWORD=echo_password psql -h localhost -p 5555 -U echo_user echo
```

## force re-init of mock db data

If you alter the db init script (`mock_data.sql`) then you will need to drop the `backend/database` directory before restarting `docker-compose up`. The postgres image will skip init scripts if the data directory is non-empty.

You can then re-build the image, forcing the volume to re-create:

```sh
docker-compose up --build --force-recreate -V
```