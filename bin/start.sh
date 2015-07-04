#!/bin/bash
# This is a very simple example
killall node
cd /home/ng-nice
NODE_ENV=production pm2 start app.js
