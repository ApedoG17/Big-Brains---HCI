from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from .models import ContactMessage

User = get_user_model()


class ContactAPITests(APITestCase):
    def setUp(self):
        self.admin = User.objects.create_user(
            email="admin@example.com", password="pass1234", role="administrator"
        )
        self.client_user = User.objects.create_user(
            email="client@example.com", password="pass1234", role="client"
        )

    def test_visitor_can_submit_enquiry(self):
        response = self.client.post("/api/contact/", {
            "name": "Kojo Mensah",
            "email": "kojo@example.com",
            "message": "I'd like a quote for a residential renovation.",
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_empty_message_rejected(self):
        response = self.client.post("/api/contact/", {
            "name": "Kojo Mensah",
            "email": "kojo@example.com",
            "message": "   ",
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_missing_name_rejected(self):
        response = self.client.post("/api/contact/", {
            "name": "   ",
            "email": "kojo@example.com",
            "message": "Hello there.",
        })
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_non_admin_cannot_list_enquiries(self):
        ContactMessage.objects.create(name="A", email="a@example.com", message="Hi")
        self.client.force_authenticate(self.client_user)
        response = self.client.get("/api/contact/")
        self.assertEqual(len(response.data), 0)

    def test_admin_can_list_enquiries(self):
        ContactMessage.objects.create(name="A", email="a@example.com", message="Hi")
        self.client.force_authenticate(self.admin)
        response = self.client.get("/api/contact/")
        self.assertEqual(len(response.data), 1)

    def test_submission_throttling(self):
        for _ in range(5):
            response = self.client.post("/api/contact/", {
                "name": "Kojo Mensah",
                "email": "kojo@example.com",
                "message": "Repeated enquiry.",
            })
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        sixth = self.client.post("/api/contact/", {
            "name": "Kojo Mensah",
            "email": "kojo@example.com",
            "message": "One too many.",
        })
        self.assertEqual(sixth.status_code, status.HTTP_429_TOO_MANY_REQUESTS)