from django.urls import path

from . import views

urlpatterns = [
    path('login/', views.aauth_login),
    path('logout/', views.aauth_logout),
]