from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Service

User = get_user_model()


class ServiceAPITests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            email="admin@example.com", password="pass1234", role="administrator"
        )
        self.client_user = User.objects.create_user(
            email="client@example.com", password="pass1234", role="client"
        )
        self.active_service = Service.objects.create(name="Architectural Design", is_active=True)
        self.inactive_service = Service.objects.create(name="Legacy Service", is_active=False)

    def test_visitor_can_view_active_services_only(self):
        response = self.client.get("/api/services/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        names = [s["name"] for s in response.data]
        self.assertIn("Architectural Design", names)
        self.assertNotIn("Legacy Service", names)

    def test_non_admin_cannot_create_service(self):
        self.client.force_authenticate(self.client_user)
        response = self.client.post("/api/services/", {"name": "Renovation Consulting"})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_admin_can_create_service(self):
        self.client.force_authenticate(self.admin)
        response = self.client.post("/api/services/", {"name": "Renovation Consulting"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_admin_sees_inactive_services_too(self):
        self.client.force_authenticate(self.admin)
        response = self.client.get("/api/services/")
        names = [s["name"] for s in response.data]
        self.assertIn("Legacy Service", names)

    def test_blank_name_rejected(self):
        self.client.force_authenticate(self.admin)
        response = self.client.post("/api/services/", {"name": "   "})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)