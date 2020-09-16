from django.contrib.auth.models import User

from rest_framework import serializers
from pages.models import Page 

class PagesSerializer(serializers.ModelSerializer):
  class Meta:
    model = Page 
    fields = ('id', 'title_text', 'creation_date', 'modification_date')

class PageSerializer(serializers.ModelSerializer):
  class Meta:
    model = Page 
    fields = ('id', 'title_text', 'creation_date', 'modification_date', 'page_text')

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username']
