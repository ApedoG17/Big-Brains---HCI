from django.contrib import admin
from .models import Conversation, Message

# Register your models here.
class MessageInline(admin.TabularInline):
    model = Message
    extra = 0
    readonly_fields = ["sender", "content", "attachment", "created_at"]
    can_delete = False


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ["id", "project", "created_at", "updated_at"]
    filter_horizontal = ["participants"]
    inlines = [MessageInline]


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ["id", "conversation", "sender", "created_at"]
    list_filter = ["created_at"]
    search_fields = ["content", "sender__username"]
