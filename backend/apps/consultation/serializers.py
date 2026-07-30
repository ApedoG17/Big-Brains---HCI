from rest_framework import serializers
from .models import Consultation


class ConsultationSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source='client.get_full_name', read_only=True)
    architect_name = serializers.CharField(source='architect.get_full_name', read_only=True)

    class Meta:
        model = Consultation
        fields = [
            'id',
            'client',
            'client_name',
            'architect',
            'architect_name',
            'project_title',
            'project_type',
            'description',
            'preferred_date',
            'preferred_time',
            'meeting_type',
            'status',
            'notes',
            'created_at',
        ]
        read_only_fields = ['id', 'status', 'created_at']