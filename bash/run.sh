#!/bin/bash
port=$1
servername=$2
cd client
export REACT_APP_BACKEND_URL=$servername
export PORT=$((port))
npm start
