#!/bin/bash
set -e
export PATH=./node_modules/.bin:$PATH

source $NVM_DIR/nvm.sh

nvm install

# Need to globally install npm so client can use it
npm i -g npm@6

# Enforce linting
npm run lint

# Run server tests
npm run server-test

cd client

# Switch to current node version
nvm use

# Install deps
npm ci

# Runs tests
npm run test

# Build project
npm run build