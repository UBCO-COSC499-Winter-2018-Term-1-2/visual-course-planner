#!/bin/bash
set -e
export PATH=./node_modules/.bin:$PATH

source $NVM_DIR/nvm.sh

nvm install

# Need to globally install npm so client can use it
npm i -g npm@6

# Enforce linting
npm run lint

# Switch to current node version
nvm use

# Install deps
( npm ci && cd client && npm ci )

# Run server tests
npm run test

# Build project
npm run build
