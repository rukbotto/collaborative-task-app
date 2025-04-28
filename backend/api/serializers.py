from datetime import datetime
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ["id", "created_by", "assigned_to"]

    def to_internal_value(self, data):
        # Parse date fields in MM/DD/YYYY format
        if "start_date" in data:
            try:
                data["start_date"] = datetime.strptime(data["start_date"], "%m/%d/%Y").date()
            except ValueError:
                raise serializers.ValidationError({"start_date": "Date must be in MM/DD/YYYY format."})

        if "end_date" in data:
            try:
                data["end_date"] = datetime.strptime(data["end_date"], "%m/%d/%Y").date()
            except ValueError:
                raise serializers.ValidationError({"end_date": "Date must be in MM/DD/YYYY format."})

        return super().to_internal_value(data)