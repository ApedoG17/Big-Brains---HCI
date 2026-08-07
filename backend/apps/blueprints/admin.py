from django.contrib import admin
from .models import Blueprint

# Register your models here.
@admin.register(Blueprint)
class BlueprintAdmin(admin.ModelAdmin):
    list_display = ('title', 'architect', 'category', 'version', 'created_at')
    list_filter = ('category', 'created_at')
    search_fields = ('title', 'description', 'architect__username', 'architect__email')
    readonly_fields = ('created_at', 'updated_at')