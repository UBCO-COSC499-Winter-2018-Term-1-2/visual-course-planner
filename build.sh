#!/bin/sh
cd $TRAVIS_BUILD_DIR/learning/shopping-list/

nvm use v10.12.0
npm install
npm test