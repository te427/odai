#!/bin/sh

python manage.py collectstatic --no-input

python manage.py migrate --run-syncdb

python scripts/su.py