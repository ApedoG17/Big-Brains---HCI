from django.db import models

from django.db import models
from django.conf import settings


class Consultation(models.Model):
    MEETING_TYPE_CHOICES = (
        ('in_person', 'In Person'),
        ('virtual', 'Virtual'),
    )
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
        ('completed', 'Completed'),
    )

    client = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='client_consultations'
    )
    architect = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='architect_consultations'
    )
    project_title = models.CharField(max_length=200, blank=True)
    project_type = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    preferred_date = models.DateField()
    preferred_time = models.TimeField()
    meeting_type = models.CharField(max_length=20, choices=MEETING_TYPE_CHOICES, default='virtual')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Consultation: {self.client} with {self.architect} on {self.preferred_date}"
