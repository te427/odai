import os
from django.contrib.auth.models import User

USERNAME = os.getenv('DJANGP_DB_ADMIN_USERNAME')
EMAIL = os.getenv('DJANGP_DB_ADMIN_EMAIL')
PASSWORD = os.getenv('DJANGO_DB_ADMIN_PASSWORD')

if USERNAME != None and PASSWORD != None:
  su = User.create_superuser(username=USERNAME, email=EMAIL, password=PASSWORD)
  print('created user', su)
  #su.save()
