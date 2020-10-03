from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import ArticlesSerializer, ArticleSerializer
from .models import Article    

from datetime import datetime

# Create your views here.

class ArticleView(viewsets.ModelViewSet):
  queryset = Article.objects.all() # is_draft=false
  serializer_class = ArticlesSerializer
  detail_serializer_class = ArticleSerializer

  def get_serializer_class(self):
    if self.action == 'retrieve':
      if hasattr(self, 'detail_serializer_class'):
        return self.detail_serializer_class

    return super(viewsets.ModelViewSet, self).get_serializer_class()

  def post(self, request):
    self.serializer_class = ArticleSerializer 
    data = request.data
    # does not exist
    if not data.id:
      article = Article(
        title_text=data.titleText,
        article_text=data.articleText, 
        is_draft=data.isDraft)
      return Response(status=status.HTTP_201_CREATED)
    else:
      article = Article.objects.get(id=data.id)
      if not article:
        return Response(status=status.HTTP_400_BAD_REQUEST)
      else:
        article.title_text = data.titleText
        article.article_text = data.articleText
        article.is_draft = data.isDraft
        article.modification_date = datetime.now()
        article.save()
        return Response(status=status.HTTP_202_ACCEPTED)
