#!/bin/bash

PORT=$1

if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null ; then
    echo -n "running +" $port;
else
    echo -n "not-running";
fi