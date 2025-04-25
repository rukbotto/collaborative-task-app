from django.urls import path
from .views import hello_world, login

urlpatterns = [
    path("hello/", hello_world),
    path("login/", login, name="login"),
]