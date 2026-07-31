from rest_framework import mixins, permissions, throttling, viewsets

from .models import ContactMessage
from .serializers import ContactMessageSerializer


class ContactSubmissionThrottle(throttling.AnonRateThrottle):
    """Guards US-026's noted risk of spam submissions on the public form."""

    rate = "5/hour"


class ContactMessageViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    UC-15 Contact Company. Anyone (including visitors with no account) may
    submit an enquiry; only administrators may list submitted enquiries.
    """

    serializer_class = ContactMessageSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]

    def get_throttles(self):
        if self.action == "create":
            return [ContactSubmissionThrottle()]
        return []

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.role == "administrator":
            return ContactMessage.objects.all()
        return ContactMessage.objects.none()
