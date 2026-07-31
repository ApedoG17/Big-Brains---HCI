from django.contrib import admin

from django.contrib import admin
from .models import Consultation


@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):
    list_display = (
        'id',
        'client',
        'architect',
        'project_title',
        'preferred_date',
        'preferred_time',
        'meeting_type',
        'status',
        'created_at',
    )
    list_filter = ('status', 'meeting_type', 'preferred_date')
    search_fields = (
        'client__first_name',
        'client__last_name',
        'client__email',
        'architect__first_name',
        'architect__last_name',
        'project_title',
        'project_type',
    )
    ordering = ('-preferred_date', '-preferred_time')
    date_hierarchy = 'preferred_date'
    list_per_page = 25

    fieldsets = (
        ('Participants', {
            'fields': ('client', 'architect')
        }),
        ('Project Details', {
            'fields': ('project_title', 'project_type', 'description')
        }),
        ('Scheduling', {
            'fields': ('preferred_date', 'preferred_time', 'meeting_type', 'status')
        }),
        ('Additional Info', {
            'fields': ('notes', 'created_at')
        }),
    )
    readonly_fields = ('created_at',)
