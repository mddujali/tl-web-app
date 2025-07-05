# IP Management Web App
UI that consumes API endpoints from Gateway Service API.

## Requirements
- Node.js 20.x.x or higher

## Setup
- Run `npm install` to install project dependencies
- Copy `docker-compose.yml.example` to `docker-compose.yml`
- Run `docker-compose --profile dev up` to start development server
- Run `docker-compose --profile dev up -d` to start development server in detached mode
- Run `docker-compose --profile {dev|prod} down` to stop and remove containers
- Run `docker-compose --profile {dev|prod} down -v` to stop and remove containers and volumes

## Development Commands
- Run `npm run lint` for codebase checks and fixes
- Run `npm run type-check` to check types in the codebase
