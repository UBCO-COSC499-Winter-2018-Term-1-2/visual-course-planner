#!/bin/bash

export PATH=./node_modules/.bin:$PATH

NODE_VERSION="v10.12.0"

source $NVM_DIR/nvm.sh

nvm install $NODE_VERSION

nvm use $NODE_VERSION

npm run lint

cd client

npm test