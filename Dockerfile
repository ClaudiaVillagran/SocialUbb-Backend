# Utalizar imagen ubuntu
# https://hub.docker.com/_/debian/
FROM ubuntu:20.04

# nvm variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 18.16.0

# añadir node y npm al path
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# usar bash
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# actualizar y añadir dependencias
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y autoclean

# instalar nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# instalar node y npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# instalar yarn y pm2
RUN npm i -g yarn
RUN npm i -g pm2

# confirmar que se hayan instalado
RUN yarn -v
RUN node -v
RUN npm -v

EXPOSE 3000