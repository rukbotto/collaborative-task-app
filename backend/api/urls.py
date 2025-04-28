from django.urls import path
from .views import TasksView, hello_world, login, logout

urlpatterns = [
    path("hello/", hello_world),
    path("login/", login, name="login"),
    path("logout/", logout, name="logout"),
    path("tasks/", TasksView.as_view(), name="tasks"),
]