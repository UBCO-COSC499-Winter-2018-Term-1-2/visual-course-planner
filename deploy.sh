#!/bin/bash

set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    # Initialize a new git repo in client/build, and push it to the server.
    cd client/build
    git init
        
    git remote add deploy "deploy@visualcourseplanner.gq:/var/www/html/client/build"
    git config user.name "Travis CI"
    git config user.email "mackenziesalloum+travisCI@gmail.com"
    
    git add .
    git commit -m "Deploy"
    git push --force deploy master
else
    echo "Not deploying, since this branch isn't master."
fi