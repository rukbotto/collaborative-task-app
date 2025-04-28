# Collaborative Task App

A simple mobile app to manage shared tasks for planning with a Django backend and a React Native frontend.

## Tech Stack

### Backend

* Python
* Django
* Django Rest Framework
* DRF Simple JWT
* PostgreSQL

### Frontend

* Typescript
* React Native
* Expo

## Implemented Features

* Sign-in flow using JWT authentication.
* Sign-out flow with refresh token blacklisting.
* Tasks can be created.
* Tasks can be marked as completed.
* Custom iOS date picker for selecting dates.
* Complete form and server validation.
* Clean look & feel.

## Pending Features

* Sign-up flow.
* Task search by start and end dates.
* Task filtering by completion mark.
* Task modification (title, description, dates).
* Android support.

## Development Setup

### General

1. Clone this repository

### Backend

1. Install Docker.
2. Install Visual Studio Code.
3. Install DevContainer extension for VSCode.
4. In VSCode, reopen the project folder in devcontainer.
5. In VSCode, select the Python runtime installed in the local virtualenv, located at `.venv/`.
6. In the VSCode terminal, with the virtualenv already activated:
    * Within the `backend/` directory, run `python manage.py migrate` to run any pending database migrations.
    * Run `python manage.py createsuperuser` inside the `backend/` directory, in order to create a test user. Make sure to provide an email address.

### Frontend

1. Install Node.js.
2. Install dependencies using `cd frontend && npm install`.
3. Within `frontend/` directory, run `npm run ios` to run the app. Only iOS is supported at the moment.
    * When adding or updating assets or dependencies run `npm run preload` before reloading the app.
4. The app should appear in the iOS simulator.
5. Use the credentials (email address, password) you gave when creating the test user, in order to login and use the app.
