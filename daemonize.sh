#!/bin/bash

export PORT=80
touch .id
touch event.list
sudo -E ./bin/www > ./app.log  2>&1
