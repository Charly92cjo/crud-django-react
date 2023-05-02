from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'#o utlizar 1 x 1('id', 'title', 'description', 'completed')
