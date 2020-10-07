from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import HttpResponse

def aauth_login(request):
  if request.method == 'POST':
    if request.user.is_authenticated:
      return HttpResponse(status=204)
    username = request.POST['username']
    password = request.POST['password']

    user = authenticate(username=username, password=password)

    if user is not None:
      login(request, user)
      return HttpResponse(status=204)
  return HttpResponse(status=403)

def aauth_logout(request):
  if request.method == 'POST':
    if request.user.is_authenticated:
      logout(request)
      return HttpResponse(status=302)
  return HttpResponse(status=403)