from django.db import transaction
from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework import permissions, status, viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend

from .models import Project, ProjectUpdate
from .permissions import CanManageProject, IsProjectParticipantOrAdmin
from .serializers import (
    ProjectListSerializer,
    ProjectSerializer,
    ProjectUpdateSerializer,
)

User = get_user_model()


class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, CanManageProject, IsProjectParticipantOrAdmin]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'is_archived', 'client', 'architect']
    search_fields = ['title', 'description', 'location']
    ordering_fields = ['created_at', 'updated_at', 'budget', 'start_date']
    ordering = ['-created_at']

    def get_queryset(self):
        user = self.request.user
        queryset = Project.objects.select_related("client", "architect").prefetch_related("updates__author")

        if not user.is_authenticated:
            return queryset.none()

        if user.role == User.Role.ADMIN or user.is_superuser:
            return queryset

        return queryset.filter(Q(client=user) | Q(architect=user))

    def get_serializer_class(self):
        if self.action == "list":
            return ProjectListSerializer
        return ProjectSerializer

    @transaction.atomic
    def perform_create(self, serializer):
        project = serializer.save()
        user = self.request.user
        author_name = f"{user.first_name} {user.last_name}".strip() or user.email
        
        ProjectUpdate.objects.create(
            project=project,
            author=user,
            title="Project Initialized",
            description=f"Project record created by {author_name}.",
        )

    @transaction.atomic
    def perform_update(self, serializer):
        project = serializer.save()
        user = self.request.user
        
        ProjectUpdate.objects.create(
            project=project,
            author=user,
            title="Project Modified",
            description="Project details were updated.",
        )

    @action(detail=True, methods=["get", "post"], url_path="updates")
    def updates(self, request, pk=None):
        project = self.get_object()

        if request.method == "POST":
            serializer = ProjectUpdateSerializer(data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            serializer.save(project=project, author=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        updates_qs = project.updates.select_related("author").all()
        serializer = ProjectUpdateSerializer(updates_qs, many=True, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)