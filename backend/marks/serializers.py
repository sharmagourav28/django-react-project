# marks/serializers.py
from rest_framework import serializers  # type: ignore
from .models import SubjectMarks


class SubjectMarksSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubjectMarks
        fields = "__all__"
