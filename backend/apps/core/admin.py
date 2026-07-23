from django.contrib import admin
from .models import SiteConfiguration

# Register your models here.
@admin.register(SiteConfiguration)
class SiteConfigurationAdmin(admin.ModelAdmin):
    list_display = (
        "platform_name",
        "version",
        "maintenance_mode",
        "updated_at",
    )

    list_filter = (
        "maintenance_mode",
    )

    search_fields = (
        "platform_name",
        "contact_email",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )