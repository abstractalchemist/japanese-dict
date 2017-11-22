#!/bin/bash

HOST=localhost
PORT=5984
WORDS_DB=test
VIVID_DB=vivid
NANOHA_DB=nanoha

curl -u admin:1qaz@WSX -X PUT http://$HOST:$PORT/$WORDS_DB
curl -u admin:1qaz@WSX -X PUT http://$HOST:$PORT/$VIVID_DB
curl -u admin:1qaz@WSX -X PUT http://$HOST:$PORT/$NANOHA_DB


