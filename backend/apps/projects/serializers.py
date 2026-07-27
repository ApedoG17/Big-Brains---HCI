from rest_framework import serializers
from django.contrib.auth import get_user_model
from accounts.serializers import UserSerializer
from .models import Project, ProjectUpdate

User = get_user_model()


class ProjectUpdateSerializer(serializers.ModelSerializer):
    author_detail = UserSerializer(source='author', read_only=True)

    class Meta:
        model = ProjectUpdate
        fields = [
            "id",
            "project",
            "author",
            "author_detail",
            "title",
            "description",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "author", "created_at", "updated_at"]

    def create(self, validated_data):
        request = self.context.get("request")
        if request and hasattr(request, "user"):
            validated_data["author"] = request.user
        return super().create(validated_data)


class ProjectSerializer(serializers.ModelSerializer):
    client_detail = UserSerializer(source="client", read_only=True)
    architect_detail = UserSerializer(source="architect", read_only=True)
    updates = ProjectUpdateSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "location",
            "budget",
            "status",
            "start_date",
            "expected_completion_date",
            "client",
            "client_detail",
            "architect",
            "architect_detail",
            "is_archived",
            "created_at",
            "updated_at",
            "updates",
        ]
        read_only_fields = ["id", "is_archived", "created_at", "updated_at", "updates"]

    def validate_title(self, value):
        cleaned_title = value.strip()
        if not cleaned_title:
            raise serializers.ValidationError("Project title cannot be blank.")
        return cleaned_title

    def validate_client(self, value):
        if value and hasattr(value, "role") and value.role != User.Role.CLIENT and not value.is_superuser:
            raise serializers.ValidationError("Assigned client must possess the 'client' role.")
        return value

    def validate_architect(self, value):
        if value and hasattr(value, "role") and value.role != User.Role.ARCHITECT and not value.is_superuser:
            raise serializers.ValidationError("Assigned architect must possess the 'architect' role.")
        return value

    def validate(self, attrs):
        start_date = attrs.get("start_date", getattr(self.instance, "start_date", None))
        completion_date = attrs.get("expected_completion_date", getattr(self.instance, "expected_completion_date", None))

        if start_date and completion_date and completion_date < start_date:
            raise serializers.ValidationError(
                {"expected_completion_date": "Expected completion date cannot be earlier than start date."}
            )

        return attrs


class ProjectListSerializer(serializers.ModelSerializer):
    client_name = serializers.SerializerMethodField()
    architect_name = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "status",
            "location",
            "budget",
            "client_name",
            "architect_name",
            "is_archived",
            "updated_at",
        ]
        read_only_fields = fields

    def get_client_name(self, obj):
        if obj.client:
            return f"{obj.client.first_name} {obj.client.last_name}".strip()
        return None

    def get_architect_name(self, obj):
        if obj.architect:
            return f"{obj.architect.first_name} {obj.architect.last_name}".strip()
        return None