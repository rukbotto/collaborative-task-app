from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'start_date', 'end_date', 'created_by', 'assigned_to']
        read_only_fields = ['id', 'created_by', 'assigned_to']