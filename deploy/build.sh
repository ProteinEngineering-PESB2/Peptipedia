#!/usr/bin/env bash

date=$(date '+%Y%m%d')

podman build -t peptipedia_backend:"$date" -t peptipedia_backend:latest ../backend/
podman build -t peptipedia_frontend:"$date" -t peptipedia_frontend:latest ../frontend/
