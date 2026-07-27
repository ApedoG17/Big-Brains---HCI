from django.contrib import admin

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
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
        'is_active',
        'date_joined',
    )

    list_filter = ('role', 'is_active')

    search_fields = ('email', 'first_name', 'last_name', 'phone_number')

    ordering = ('-date_joined',)

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {
            'fields': ('first_name', 'last_name', 'phone_number', 'profile_picture')
        }),
        ('Role & Status', {
            'fields': ('role', 'is_active')
        }),
        ('Important Dates', {
            'fields': ('date_joined',)
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
            ),
        }),
    )

    readonly_fields = ('date_joined',)