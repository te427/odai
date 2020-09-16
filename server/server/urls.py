from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from pages import views

router = routers.DefaultRouter()

router.register(r'pages', views.PageView, 'pages')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]
