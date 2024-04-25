#!/usr/bin/env bash

BUILD_CONTAINER="--build"
LOCAL_ENV="local"

# pass environment variables
while test $# -gt 0; do
    case "$1" in
        -h|--help)
            echo "options:"
            echo "-h | --help           show brief help"
            echo "--env={ENVIRONMENT}   specify the environment running"
            echo "                      ENVIRONMENT should be local for the test database configurations to be added"
            echo "--build               build docker images"
            echo -e "\n"
            exit 0
            ;;
        --env*)
            export ENV=`echo $1 | sed -e 's/^[^=]*=//g'`
            if [ "${ENV}" == "--env" ] || [ -z "${ENV}" ]
            then
                echo "No environment specified"
                exit 1
            fi
            shift
            ;;
        --build)
            export BUILD="--build"
            shift
            ;;
        *)
            break
            ;;
    esac
done

# Source env var
source env_overrides/.env.docker

# Generate db config
if [ "${LOCAL_ENV}" == "${ENV}" ]
then
    envsubst < config/database-local.template.json > config/database.json
else
    envsubst < config/database.template.json > config/database.json
fi

# Check if build is required
if [ "${BUILD}" == "${BUILD_CONTAINER}" ]; then
    echo "Building docker images..."
    docker-compose build
fi

echo "Starting backend containers..."
docker-compose up -d

# Install api package dependencies
echo "Installing dependency packages..."
docker container exec sleepmonitor.api bash -c "npm install"
