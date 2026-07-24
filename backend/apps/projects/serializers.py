from rest_framework import serializers

from .models import Project, ProjectUpdate


class ProjectUpdateSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.get_full_name", read_only=True)

    class Meta:
        model = ProjectUpdate
        fields = ["id", "project", "author", "author_name", "title", "description", "uploaded_at"]
        read_only_fields = ["id", "uploaded_at", "author_name"]


class ProjectSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(source="client.get_full_name", read_only=True)
    architect_name = serializers.CharField(source="architect.get_full_name", read_only=True)
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
            "client_name",
            "architect",
            "architect_name",
            "created_at",
            "updated_at",
            "updates",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_title(self, value):
        # UC-06 alt flow: required project details are missing.
        if not value.strip():
            raise serializers.ValidationError("Project title is required.")
        return value


class ProjectListSerializer(serializers.ModelSerializer):
    """A lighter-weight serializer for the 'My Projects' grid view."""

    class Meta:
        model = Project
        fields = ["id", "title", "status", "location", "updated_at"]