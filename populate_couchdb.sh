#!/bin/bash

HOST=management3.docker.abstractalchemist.com
PORT=5984
WORDS_DB=test
VIVID_DB=vivid
NANOHA_DB=nanoha

curl -X PUT http://$HOST:$PORT/$WORDS_DB
curl -X PUT http://$HOST:$PORT/$VIVID_DB
curl -X PUT http://$HOST:$PORT/$NANOHA_DB


