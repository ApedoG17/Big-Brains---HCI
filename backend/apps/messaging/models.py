from django.db import models
from django.conf import settings

# Create your models here.
PROJECT_MODEL = "projects.Project"  


class Conversation(models.Model):
    """A message thread between two or more users."""

    participants = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="conversations",
        help_text="Everyone who can see and post in this conversation.",
    )
    project = models.ForeignKey(
        PROJECT_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="conversations",
        help_text="Optional — links this thread to a specific project.",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-updated_at"]

    def __str__(self):
        names = ", ".join(u.get_username() for u in self.participants.all()[:3])
        return f"Conversation({names})" if names else f"Conversation #{self.pk}"

    @property
    def last_message(self):
        return self.messages.order_by("-created_at").first()

    def unread_count_for(self, user):
        """How many messages in this thread `user` hasn't read yet."""
        return self.messages.exclude(read_by=user).exclude(sender=user).count()

    def mark_all_read_for(self, user):
        """Mark every message in this thread as read by `user`."""
        for message in self.messages.exclude(read_by=user):
            message.read_by.add(user)


class Message(models.Model):
    """A single message inside a Conversation."""

    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="sent_messages",
    )
    content = models.TextField(blank=True)
    attachment = models.FileField(
        upload_to="message_attachments/%Y/%m/",
        null=True,
        blank=True,
        help_text="Optional file — render, PDF spec sheet, site photo, etc.",
    )
    read_by = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="read_messages",
        blank=True,
        help_text="Participants who have seen this message.",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        preview = (self.content[:40] + "…") if len(self.content) > 40 else self.content
        return f"{self.sender}: {preview or '[attachment]'}"

    def clean(self):
        from django.core.exceptions import ValidationError

        if not self.content and not self.attachment:
            raise ValidationError("A message needs text, an attachment, or both.")
