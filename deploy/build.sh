#!/usr/bin/env bash

date=$(date '+%Y%m%d')

podman build --pull=newer -t peptipedia_backend:"$date" -t peptipedia_backend:latest ../backend/
podman build --pull-newer -t peptipedia_frontend:"$date" -t peptipedia_frontend:latest ../frontend/
