#!/usr/bin/env bash

set -e

echo ">>> Building docker image"
sudo docker build -t discord-gateway .
