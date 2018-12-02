#!/bin/bash

export PATH=./node_modules/.bin:$PATH

source $NVM_DIR/nvm.sh

nvm install

npm i -g npm@6

npm run lint

cd client

nvm use

npm ci

npm test

set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    # Initialize a new git repo in _site, and push it to our server.
    cd client/build
    git init
        
    git remote add deploy "deploy@visualcourseplanner.gq:/var/www/html"
    git config user.name "Travis CI"
    git config user.email "mackenziesalloum+travisCI@gmail.com"
    
    git add .
    git commit -m "Deploy"
    git push --force deploy master
else
    echo "Not deploying, since this branch isn't master."
fi