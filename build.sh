#!/bin/bash

NODE_VERSION="v10.12.0"

source $NVM_DIR/nvm.sh

nvm install $NODE_VERSION

nvm use $NODE_VERSION

npm install

npm run lint

CI="true" cd client && npm test