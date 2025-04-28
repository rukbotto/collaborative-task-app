from django.urls import path
from .views import hello_world, login, logout, add_task

urlpatterns = [
    path("hello/", hello_world),
    path("login/", login, name="login"),
    path("logout/", logout, name="logout"),
    path('task/add/', add_task, name='add_task'),
]