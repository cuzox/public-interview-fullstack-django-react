# Interview — Fullstack Django & React

## Background

Echo is a web-based app which allows users to execute, analyze and save SQL queries. Currently the app treats all users the same. But the database has some users marked as 'guest,' while others are 'editor.'

## Feature Request

We want to hide certain functionality from guest users, and upsell them on others. You will need to support user types on the frontend, and modify specific interactions for guest users.

## Development Setup

### Dependencies

- [Docker](https://docs.docker.com/get-docker/)
- [Postgres](https://www.postgresql.org/download/)
- [Node](https://nodejs.org/en/download/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) (can use `npm install` and `npm start` instead)

### Django Backend

The Django backend runs within a docker image.

```sh
cd ./backend/echo
docker-compose up --build
```

### React Frontend

```sh
cd ./frontend
yarn install
yarn start
```

### User Logins

Email | Password | User Type
--- | --- | ---
myo@site.com | password | guest
gia@site.com | password | editor
