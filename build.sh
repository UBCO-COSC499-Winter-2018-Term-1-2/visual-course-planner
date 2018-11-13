#!/bin/bash
cd $TRAVIS_BUILD_DIR/learning/shopping-list/

source $NVM_DIR/nvm.sh

nvm use v10.12.0

npm install
npm test