#!/bin/bash

set -x

ssh deploy@visualcourseplanner.gq <<EOF
  cd /var/www/html
  sudo git fetch --all
  sudo git pull
  cd client
  sudo npm install
  cd ..
  sudo npm install
  pm2 restart vcp
EOF
  
