from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PageSerializer
from .models import Page    

# Create your views here.

class PageView(viewsets.ModelViewSet):
  serializer_class = PageSerializer
  queryset = Page.objects.all()
