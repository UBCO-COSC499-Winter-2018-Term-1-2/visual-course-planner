#!/bin/bash

export PATH=./node_modules/.bin:$PATH

source $NVM_DIR/nvm.sh

nvm install $NODE_VERSION

npm i -g npm@6

npm run lint

cd client

nvm use $NODE_VERSION

npm test