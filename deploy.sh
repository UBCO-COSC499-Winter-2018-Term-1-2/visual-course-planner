#!/bin/bash

set -x

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
  
