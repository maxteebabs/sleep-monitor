FROM debian:bullseye

SHELL ["/bin/bash", "--login", "-c"]

RUN apt-get update && apt-get install -y \
    build-essential \
    curl \
    gettext \
    python2 \
    && rm -rf /var/lib/apt/lists/*

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash

# Load nvm and install node
ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 14.17.5
RUN . "$NVM_DIR/nvm.sh" \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# Set up the environment variables
ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

WORKDIR /src/app
COPY .nvmrc .
RUN nvm install

# Copy in the package.json file
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install && npm i sequelize-cli@^6.2.0 -g && npm i nodemon@^2.0.12 -g

# Copy in remaining development files
COPY . /src/app

# Expose the api port
EXPOSE 3333

# Start server
CMD exec nodemon --inspect ./server.js --use-strict
