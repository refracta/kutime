#!/bin/sh
export PATH=/usr/local/bin:$PATH
cd /usr/src/tools
node index.js ID PW
node converter.js
cp /usr/src/tools/exported.json /usr/src/api/exported.json
cd /usr/src
yarn run build
sh /usr/src/scripts/run-server.sh
