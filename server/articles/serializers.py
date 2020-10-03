from django.contrib.auth.models import User

from rest_framework import serializers
from articles.models import Article

class ArticlesSerializer(serializers.ModelSerializer):
  class Meta:
    model = Article
    fields = ('id', 'title_text', 'creation_date', 'modification_date', 'is_draft')

class ArticleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Article 
    fields = ('id', 'title_text', 'creation_date', 'modification_date', 'article_text', 'is_draft')

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'username']
