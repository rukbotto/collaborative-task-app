from django.urls import path
from .views import TaskListView, TaskDetailView, hello_world, login, logout

urlpatterns = [
    path("hello/", hello_world),
    path("login/", login, name="login"),
    path("logout/", logout, name="logout"),
    path("tasks/", TaskListView.as_view(), name="tasks"),
    path('tasks/<int:pk>/', TaskDetailView.as_view(), name='task-detail'),
]