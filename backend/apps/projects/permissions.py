from rest_framework import permissions


class IsAdministrator(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "administrator"
        )


class IsArchitect(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role == "architect"
        )


class IsProjectParticipantOrAdmin(permissions.BasePermission):
    """
    Clients and architects may only access projects they are attached to.
    Administrators may access everything.
    """

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not user.is_authenticated:
            return False
        if user.role == "administrator":
            return True
        return obj.client_id == user.id or obj.architect_id == user.id


class CanManageProject(permissions.BasePermission):
    """
    UC-06 Manage Projects: only architects and administrators may create,
    update, or delete a project. Clients get read-only access, handled here
    at the request-method level (UC-07 View Project Progress).
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.role in ("architect", "administrator")
        )