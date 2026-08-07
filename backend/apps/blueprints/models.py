from django.db import models
from django.conf import settings

# Create your models here.
class Blueprint(models.Model):
    architect = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="blueprints"
    )
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to="blueprints/files/")
    preview_image = models.ImageField(upload_to="blueprints/previews/", blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)
    scale = models.CharField(max_length=50, blank=True, null=True)
    version = models.CharField(max_length=20, default="v1.0")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.version}) - {self.architect.get_full_name() or self.architect.username}"