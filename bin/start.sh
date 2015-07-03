#!/bin/bash
# This is a very simple example
killall node
cd /home/ng-nice
NODE_ENV=production node app.js >> /home/web-log/node-js/ngnice`date +%y%m%d`.log &
echo "`date +%T`" >> /home/web-log/node-js/ngnice.log

