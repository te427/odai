from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import PagesSerializer, PageSerializer
from .models import Page    

# Create your views here.

class PageView(viewsets.ModelViewSet):
  queryset = Page.objects.all()
  serializer_class = PagesSerializer
  detail_serializer_class = PageSerializer

  def get_serializer_class(self):
    if self.action == 'retrieve':
        if hasattr(self, 'detail_serializer_class'):
            return self.detail_serializer_class

    return super(viewsets.ModelViewSet, self).get_serializer_class()
   

