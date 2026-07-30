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


class IsAccountOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False

        return obj.id == request.user.id


class IsAccountOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if not request.user or not request.user.is_authenticated:
            return False

        if request.user.role == User.Role.ADMIN or request.user.is_superuser:
            return True

        return obj.id == request.user.id


class CanManageUserAccount(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user or not user.is_authenticated:
            return False

        if user.role == User.Role.ADMIN or user.is_superuser:
            return True

        if request.method in permissions.SAFE_METHODS:
            return obj.id == user.id

        return obj.id == user.id