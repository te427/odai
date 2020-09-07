from rest_framework import serializers
from pages.models import Page 

class PageSerializer(serializers.ModelSerializer):
  class Meta:
    model = Page 
    fields = ('id', 'title_text', 'creation_date', 'modification_date', 'page_text')