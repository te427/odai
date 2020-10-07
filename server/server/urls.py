from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from articles import views as article_views
from aauth import urls as login_urls

router = routers.DefaultRouter()

router.register(r'articles', article_views.ArticleView, 'articles')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('auth/', include(login_urls))
]
