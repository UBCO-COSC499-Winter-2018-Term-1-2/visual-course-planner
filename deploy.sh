#!/bin/bash

set -x

ssh deploy@visualcourseplanner.gq <<EOF
  cd /var/www/html
  sudo git fetch --all
  sudo git pull
  cd client
  sudo npm ci
  sudo npm run build
  cd ..
  sudo npm ci
  pm2 restart server
EOF
  
