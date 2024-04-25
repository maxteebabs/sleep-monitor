#!/usr/bin/env bash

# Removes any existing sleepmonitor database
echo "Droping any local dbs..."
docker container exec -i sleepmonitor.db bash -c "dropdb sleepmonitor -U postgres && dropdb sleepmonitor_test -U postgres"

# Creates a new sleepmonitor database
echo "Creating new dbs..."
docker container exec -i sleepmonitor.db bash -c "createdb sleepmonitor -U postgres && createdb sleepmonitor_test -U postgres"

# syncs sleepmonitor local test db
echo "Syncing test db..."
docker container exec -i sleepmonitor.api bash -c "NODE_ENV=docker_dev node ./sync.js"


# Run migrations
# echo "Running migrations..."
# docker container exec -it sleepmonitor.api bash -c "sequelize db:migrate"
