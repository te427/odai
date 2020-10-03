from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from articles import views

router = routers.DefaultRouter()

router.register(r'articles', views.ArticleView, 'articles')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]
