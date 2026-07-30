from django.test import TestCase

from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Consultation

User = get_user_model()


class ConsultationModelTest(APITestCase):
    def setUp(self):
        self.client_user = User.objects.create_user(
            email='client@example.com',
            first_name='Ama',
            last_name='Boateng',
            password='testpass123',
            role='client'
        )
        self.architect_user = User.objects.create_user(
            email='architect@example.com',
            first_name='Kofi',
            last_name='Mensah',
            password='testpass123',
            role='architect'
        )

    def test_create_consultation(self):
        consultation = Consultation.objects.create(
            client=self.client_user,
            architect=self.architect_user,
            project_title='Family House Design',
            project_type='Residential',
            preferred_date='2026-08-15',
            preferred_time='10:00:00',
            meeting_type='virtual',
        )
        self.assertEqual(consultation.status, 'pending')  # default value
        self.assertEqual(str(consultation), f"Consultation: {self.client_user} with {self.architect_user} on 2026-08-15")

    def test_default_meeting_type_is_virtual(self):
        consultation = Consultation.objects.create(
            client=self.client_user,
            architect=self.architect_user,
            preferred_date='2026-08-20',
            preferred_time='14:00:00',
        )
        self.assertEqual(consultation.meeting_type, 'virtual')


class ConsultationAPITest(APITestCase):
    def setUp(self):
        self.client_user = User.objects.create_user(
            email='client2@example.com',
            first_name='Esi',
            last_name='Owusu',
            password='testpass123',
            role='client'
        )
        self.architect_user = User.objects.create_user(
            email='architect2@example.com',
            first_name='Yaw',
            last_name='Addo',
            password='testpass123',
            role='architect'
        )
        self.consultation = Consultation.objects.create(
            client=self.client_user,
            architect=self.architect_user,
            project_title='Office Complex',
            preferred_date='2026-09-01',
            preferred_time='09:00:00',
        )

    def test_client_can_create_consultation(self):
        self.client.force_authenticate(user=self.client_user)
        url = reverse('consultation-list')  # adjust if your router uses a different basename
        data = {
            'architect': self.architect_user.id,
            'project_title': 'New Studio',
            'preferred_date': '2026-09-10',
            'preferred_time': '11:00:00',
            'meeting_type': 'in_person',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['client'], self.client_user.id)

    def test_client_only_sees_own_consultations(self):
        other_client = User.objects.create_user(
            email='other@example.com',
            first_name='Kwame',
            last_name='Asare',
            password='testpass123',
            role='client'
        )
        Consultation.objects.create(
            client=other_client,
            architect=self.architect_user,
            preferred_date='2026-09-05',
            preferred_time='13:00:00',
        )

        self.client.force_authenticate(user=self.client_user)
        url = reverse('consultation-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_architect_can_approve_consultation(self):
        self.client.force_authenticate(user=self.architect_user)
        url = reverse('consultation-approve', kwargs={'pk': self.consultation.pk})
        response = self.client.patch(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.consultation.refresh_from_db()
        self.assertEqual(self.consultation.status, 'approved')