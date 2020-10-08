#!/bin/sh

python manage.py collectstatic --no-input

python manage.py migrate --run-syncdb

SU_CMD="import os; from django.contrib.auth.models import User; USERNAME = os.getenv('DJANGO_DB_ADMIN_USERNAME'); EMAIL = os.getenv('DJANGO_DB_ADMIN_EMAIL'); PASSWORD = os.getenv('DJANGO_DB_ADMIN_PASSWORD'); User.objects.create_superuser(username=USERNAME, email=EMAIL, password=PASSWORD).save()"
echo $SU_CMD | python manage.py shell