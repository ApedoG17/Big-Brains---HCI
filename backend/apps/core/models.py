from django.db import models

# Create your models here.
class SiteConfiguration(models.Model):
    platform_name = models.CharField(
        max_length=100,
        default="ArchiVerse"
    )

    platform_description = models.TextField(
        blank=True,
        default=(
            "A digital platform connecting clients with architects "
            "for architecture and construction projects."
        )
    )

    contact_email = models.EmailField(
        blank=True
    )

    maintenance_mode = models.BooleanField(
        default=False
    )

    version = models.CharField(
        max_length=20,
        default="0.1.0"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        verbose_name = "Site Configuration"
        verbose_name_plural = "Site Configuration"

    def __str__(self):
        return self.platform_name