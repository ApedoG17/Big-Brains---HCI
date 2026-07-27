from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Project

User = get_user_model()


class ProjectAPITests(APITestCase):
    def setUp(self):
        self.client_user = User.objects.create_user(
            email="client@example.com", password="pass1234", role="client"
        )
        self.architect_user = User.objects.create_user(
            email="architect@example.com", password="pass1234", role="architect"
        )
        self.other_client = User.objects.create_user(
            email="other@example.com", password="pass1234", role="client"
        )
        self.project = Project.objects.create(
            title="Modern Lakehouse Villa",
            client=self.client_user,
            architect=self.architect_user,
        )

    def test_architect_can_create_project(self):
        self.client.force_authenticate(self.architect_user)
        response = self.client.post(
            "/api/projects/",
            {"title": "Modern Business Flat", "client": self.client_user.id},
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_client_cannot_create_project(self):
        self.client.force_authenticate(self.client_user)
        response = self.client.post(
            "/api/projects/",
            {"title": "Unauthorized Project", "client": self.client_user.id},
        )
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_client_only_sees_their_own_projects(self):
        self.client.force_authenticate(self.other_client)
        response = self.client.get("/api/projects/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

    def test_project_creation_logs_an_activity_update(self):
        self.client.force_authenticate(self.architect_user)
        self.client.post(
            "/api/projects/",
            {"title": "New Office Block", "client": self.client_user.id},
        )
        project = Project.objects.get(title="New Office Block")
        self.assertTrue(project.updates.filter(title="Project created").exists())