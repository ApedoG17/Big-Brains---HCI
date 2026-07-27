from django.contrib import admin

from .models import Project, ProjectUpdate


class ProjectUpdateInline(admin.TabularInline):
    model = ProjectUpdate
    extra = 0
    readonly_fields = ["uploaded_at"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "client", "architect", "status", "created_at"]
    list_filter = ["status"]
    search_fields = ["title", "client__email", "architect__email"]
    inlines = [ProjectUpdateInline]


@admin.register(ProjectUpdate)
class ProjectUpdateAdmin(admin.ModelAdmin):
    list_display = ["project", "title", "author", "uploaded_at"]
    list_filter = ["project"]