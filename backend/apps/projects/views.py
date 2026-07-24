from django.db.models import Q
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Project, ProjectUpdate
from .permissions import CanManageProject, IsProjectParticipantOrAdmin
from .serializers import ProjectListSerializer, ProjectSerializer, ProjectUpdateSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    """
    Implements UC-06 Manage Projects and UC-07 View Project Progress.

    - Administrators: see and manage every project.
    - Architects: see and manage the projects they are assigned to.
    - Clients: read-only access to their own projects.
    """

    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, CanManageProject, IsProjectParticipantOrAdmin]

    def get_queryset(self):
        user = self.request.user
        qs = Project.objects.select_related("client", "architect").prefetch_related("updates")

        if user.role == "administrator":
            return qs
        return qs.filter(Q(client=user) | Q(architect=user))

    def get_serializer_class(self):
        if self.action == "list":
            return ProjectListSerializer
        return ProjectSerializer

    def perform_create(self, serializer):
        project = serializer.save()
        ProjectUpdate.objects.create(
            project=project,
            author=self.request.user,
            title="Project created",
            description=(
                f"Project initialized by "
                f"{self.request.user.get_full_name() or self.request.user.email}."
            ),
        )

    def perform_update(self, serializer):
        project = serializer.save()
        ProjectUpdate.objects.create(
            project=project,
            author=self.request.user,
            title="Project updated",
            description="Project details were changed.",
        )

    @action(detail=True, methods=["get", "post"], url_path="updates")
    def updates(self, request, pk=None):
        """GET returns the activity feed; POST adds a manual update entry."""
        project = self.get_object()

        if request.method == "POST":
            serializer = ProjectUpdateSerializer(data={**request.data, "project": project.id})
            serializer.is_valid(raise_exception=True)
            serializer.save(author=request.user)
            return Response(serializer.data, status=201)

        serializer = ProjectUpdateSerializer(project.updates.all(), many=True)
        return Response(serializer.data)