#!/bin/bash

set -x
if [ $TRAVIS_BRANCH == 'master' ] ; then
    # Initialize a new git repo in client/build, and push it to the server.
    ssh deploy@visualcourseplanner.gq <<EOF

      cd /var/www/html
      sudo git fetch --all
      sudo git reset origin/master
      cd client
      npm install
      cd ..
      npm install
      pm2 restart vcp
EOF
   
else
    echo "Not deploying, since this branch isn't master."
fi