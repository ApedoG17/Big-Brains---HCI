from rest_framework import serializers
from .models import Blueprint

class BlueprintSerializer(serializers.ModelSerializer):
    architect_name = serializers.ReadOnlyField(source='architect.get_full_name')

    class Meta:
        model = Blueprint
        fields = [
            'id',
            'architect',
            'architect_name',
            'title',
            'description',
            'file',
            'preview_image',
            'category',
            'scale',
            'version',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'architect', 'created_at', 'updated_at']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['architect'] = request.user
        return super().create(validated_data)