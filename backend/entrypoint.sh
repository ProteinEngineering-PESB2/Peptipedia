#!/usr/bin/env bash

gunicorn \
	peptipedia.wsgi:app \
	--bind 0.0.0.0:8000 \
	--workers 4
