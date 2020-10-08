from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import ArticlesSerializer, ArticleSerializer
from .models import Article    

from datetime import datetime

class ArticleView(viewsets.ModelViewSet):
  queryset = Article.objects.all() # is_draft=false
  serializer_class = ArticlesSerializer

  action_serializers = {
    'retrieve': ArticleSerializer,
    'list': ArticlesSerializer,
    'create': ArticleSerializer,
    'update': ArticleSerializer,
    'partial_update': ArticleSerializer
  }

  def get_serializer_class(self):
    if hasattr(self, 'action_serializers'):
      return self.action_serializers.get(self.action, self.serializer_class)

    return super(viewsets.ModelViewSet, self).get_serializer_class()

  def get(self, request):
    if request.user.is_authenticated:
      articles = Article.objects.all()
    else:
      articles = Article.objects.filter(is_draft=False)
    serializer = self.get_serializer_class()(articles)
    return Response(serializer.data)
