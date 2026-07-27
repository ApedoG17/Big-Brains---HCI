from django.contrib import admin
from django.utils.html import format_html
from .models import Project, ProjectUpdate


class ProjectUpdateInline(admin.TabularInline):
    model = ProjectUpdate
    extra = 0
    readonly_fields = ["created_at", "updated_at"]
    fields = ["title", "author", "description", "created_at"]
    autocomplete_fields = ["author"]
    ordering = ["-created_at"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "client_link",
        "architect_link",
        "status_badge",
        "budget",
        "is_archived",
        "created_at",
    ]
    list_filter = ["status", "is_archived", "created_at"]
    search_fields = ["id", "title", "description", "location", "client__email", "architect__email"]
    autocomplete_fields = ["client", "architect"]
    readonly_fields = ["id", "created_at", "updated_at"]
    inlines = [ProjectUpdateInline]

    fieldsets = (
        (None, {
            "fields": ("id", "title", "description", "status", "is_archived")
        }),
        ("Financials & Location", {
            "fields": ("budget", "location")
        }),
        ("Schedule", {
            "fields": ("start_date", "expected_completion_date")
        }),
        ("Stakeholders", {
            "fields": ("client", "architect")
        }),
        ("Audit Logs", {
            "fields": ("created_at", "updated_at"),
            "classes": ("collapse",),
        }),
    )

    def client_link(self, obj):
        if obj.client:
            return format_html('<a href="/admin/accounts/user/{}/change/">{}</a>', obj.client.id, obj.client.email)
        return "-"
    client_link.short_description = "Client"

    def architect_link(self, obj):
        if obj.architect:
            return format_html('<a href="/admin/accounts/user/{}/change/">{}</a>', obj.architect.id, obj.architect.email)
        return "Unassigned"
    architect_link.short_description = "Architect"

    def status_badge(self, obj):
        colors = {
            "draft": "#6c757d",
            "in_progress": "#0d6efd",
            "completed": "#198754",
            "on_hold": "#ffc107",
            "cancelled": "#dc3545",
        }
        color = colors.get(obj.status, "#6c757d")
        return format_html(
            '<span style="background-color: {}; color: #fff; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px;">{}</span>',
            color,
            obj.get_status_display(),
        )
    status_badge.short_description = "Status"


@admin.register(ProjectUpdate)
class ProjectUpdateAdmin(admin.ModelAdmin):
    list_display = ["project", "title", "author", "created_at"]
    list_filter = ["created_at", "project"]
    search_fields = ["title", "description", "project__title", "author__email"]
    autocomplete_fields = ["project", "author"]
    readonly_fields = ["id", "created_at", "updated_at"]