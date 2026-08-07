from django.shortcuts import render
from rest_framework import viewsets, permissions, filters
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Blueprint
from .serializers import BlueprintSerializer

# Create your views here.

class IsArchitectOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.architect == request.user

class BlueprintViewSet(viewsets.ModelViewSet):
    queryset = Blueprint.objects.all()
    serializer_class = BlueprintSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsArchitectOrReadOnly]
    parser_classes = [MultiPartParser, FormParser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'category', 'description']
    ordering_fields = ['created_at', 'title']

    def get_queryset(self):
        queryset = super().get_queryset()
        architect_id = self.request.query_params.get('architect')
        if architect_id:
            queryset = queryset.filter(architect_id=architect_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(architect=self.request.user)