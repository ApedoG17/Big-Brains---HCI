from django.test import TestCase

from django.db.utils import IntegrityError
from django.contrib.auth import get_user_model

User = get_user_model()


class UserModelTests(TestCase):
    """
    Tests for the custom User model, covering registration,
    role assignment, and account status — based on Epic 1 (User
    Authentication & Account Management) from the Product Backlog.
    """

    def setUp(self):
        self.user_data = {
            'email': 'client@example.com',
            'first_name': 'John',
            'last_name': 'Doe',
            'password': 'StrongPass123!',
            'phone_number': '0551234567',
        }

    def test_create_user_successfully(self):
        """US-001: A visitor can register and an account is created."""
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(user.email, 'client@example.com')
        self.assertTrue(user.check_password('StrongPass123!'))
        self.assertEqual(user.role, 'client')  # default role
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)

    def test_email_is_normalized(self):
        """Email domain should be lowercased on creation."""
        user = User.objects.create_user(
            email='Client@EXAMPLE.com',
            first_name='Jane',
            last_name='Smith',
            password='StrongPass123!',
        )
        self.assertEqual(user.email, 'Client@example.com')

    def test_duplicate_email_raises_error(self):
        """
        Sprint 1 Test Plan: duplicate email addresses must be rejected.
        """
        User.objects.create_user(**self.user_data)
        with self.assertRaises(IntegrityError):
            User.objects.create_user(**self.user_data)

    def test_password_is_hashed(self):
        """Passwords must never be stored as plain text."""
        user = User.objects.create_user(**self.user_data)
        self.assertNotEqual(user.password, 'StrongPass123!')

    def test_user_without_email_raises_error(self):
        """Email is required for every user."""
        with self.assertRaises(ValueError):
            User.objects.create_user(
                email='',
                first_name='No',
                last_name='Email',
                password='StrongPass123!',
            )

    def test_create_superuser_successfully(self):
        """Administrators must be created with correct permissions."""
        admin = User.objects.create_superuser(
            email='admin@example.com',
            first_name='Admin',
            last_name='User',
            password='AdminPass123!',
        )
        self.assertTrue(admin.is_staff)
        self.assertTrue(admin.is_superuser)
        self.assertEqual(admin.role, 'admin')

    def test_superuser_requires_is_staff_true(self):
        """Superuser creation must fail if is_staff is forced False."""
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email='admin2@example.com',
                first_name='Admin',
                last_name='Two',
                password='AdminPass123!',
                is_staff=False,
            )

    def test_superuser_requires_is_superuser_true(self):
        """Superuser creation must fail if is_superuser is forced False."""
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email='admin3@example.com',
                first_name='Admin',
                last_name='Three',
                password='AdminPass123!',
                is_superuser=False,
            )

    def test_role_assignment(self):
        """
        US-005: An administrator can assign a specific role
        (client, architect, admin) to a user.
        """
        architect = User.objects.create_user(
            email='architect@example.com',
            first_name='Ada',
            last_name='Lovelace',
            password='StrongPass123!',
            role='architect',
        )
        self.assertEqual(architect.role, 'architect')

    def test_user_string_representation(self):
        """__str__ should show name and role for readability in admin."""
        user = User.objects.create_user(**self.user_data)
        self.assertEqual(str(user), 'John Doe (client)')

    def test_deactivate_user(self):
        """US-008: Administrators can deactivate a user account."""
        user = User.objects.create_user(**self.user_data)
        user.is_active = False
        user.save()
        user.refresh_from_db()
        self.assertFalse(user.is_active)
