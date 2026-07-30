from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    model = User

    list_display = (
        'email',
        'first_name',
        'last_name',
        'role',
        'phone_number',
        'avatar_preview',
        'is_active',
        'is_staff',
        'date_joined',
    )

    list_filter = ('role', 'is_active', 'is_staff', 'is_superuser', 'date_joined')
    search_fields = ('email', 'first_name', 'last_name', 'phone_number', 'id')
    ordering = ('-date_joined',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {
            'fields': ('first_name', 'last_name', 'phone_number', 'profile_picture', 'avatar_display')
        }),
        ('Role & Status', {
            'fields': ('role', 'is_active', 'is_staff', 'is_superuser')
        }),
        ('Permissions & Groups', {
            'fields': ('groups', 'user_permissions'),
            'classes': ('collapse',),
        }),
        ('Important Dates', {
            'fields': ('date_joined', 'updated_at')
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'first_name',
                'last_name',
                'phone_number',
                'role',
                'password1',
                'password2',
                'is_staff',
                'is_active',
            ),
        }),
    )

    readonly_fields = ('date_joined', 'updated_at', 'avatar_display')

    def avatar_preview(self, obj):
        if obj.profile_picture:
            return format_html('<img src="{}" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" />', obj.profile_picture.url)
        return "-"
    avatar_preview.short_description = "Avatar"

    def avatar_display(self, obj):
        if obj.profile_picture:
            return format_html('<img src="{}" style="max-width: 150px; max-height: 150px; border-radius: 8px;" />', obj.profile_picture.url)
        return "No image uploaded"
    avatar_display.short_description = "Profile Picture Preview"