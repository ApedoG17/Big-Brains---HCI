from rest_framework import permissions
from django.contrib.auth import get_user_model

User = get_user_model()


class IsAdministrator(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.role == User.Role.ADMIN or request.user.is_superuser)
        )


class IsArchitect(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.role == User.Role.ARCHITECT or request.user.is_superuser)
        )


class IsClient(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.role == User.Role.CLIENT or request.user.is_superuser)
        )


class IsProjectParticipantOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        if user.role == User.Role.ADMIN or user.is_superuser:
            return True

        project = getattr(obj, "project", obj)

        return project.client_id == user.id or project.architect_id == user.id


class CanManageProject(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.role in (User.Role.ARCHITECT, User.Role.ADMIN) or request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        if user.role == User.Role.ADMIN or user.is_superuser:
            return True

        if request.method in permissions.SAFE_METHODS:
            return obj.client_id == user.id or obj.architect_id == user.id

        return obj.architect_id == user.id