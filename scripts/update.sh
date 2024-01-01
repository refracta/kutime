#!/bin/sh
cd /usr/src/tools
node index.js ID PW
node converter.js
cp /usr/src/tools/exported.json /usr/src/api/exported.json
cd /usr/src
yarn run build
sh /usr/src/run-server.sh
