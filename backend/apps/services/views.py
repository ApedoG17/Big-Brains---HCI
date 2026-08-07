from rest_framework import permissions, viewsets

from .models import Service
from .serializers import ServiceSerializer


class IsAdministratorOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(
            request.user and request.user.is_authenticated and request.user.role == "administrator"
        )


class ServiceViewSet(viewsets.ModelViewSet):
    """
    UC-14 View Services. Public read access for visitors browsing the site
    (US-013); only administrators may create, edit, or remove listings.
    """

    serializer_class = ServiceSerializer
    permission_classes = [IsAdministratorOrReadOnly]

    def get_queryset(self):
        qs = Service.objects.all()
        user = self.request.user
        if not (user and user.is_authenticated and user.role == "administrator"):
            qs = qs.filter(is_active=True)
        return qs