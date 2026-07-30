from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import Conversation, Message

User = get_user_model()


class ParticipantSerializer(serializers.ModelSerializer):
    """Minimal, public-safe representation of a user in a conversation."""

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name"]
        # If your User model uses different display fields (e.g. a
        # `full_name` property or `role`), add them here.


class MessageSerializer(serializers.ModelSerializer):
    sender = ParticipantSerializer(read_only=True)
    is_read = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = [
            "id",
            "conversation",
            "sender",
            "content",
            "attachment",
            "created_at",
            "is_read",
        ]
        read_only_fields = ["id", "sender", "created_at", "is_read"]

    def get_is_read(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return False
        return obj.read_by.filter(pk=request.user.pk).exists()

    def validate(self, attrs):
        content = attrs.get("content", "")
        attachment = attrs.get("attachment")
        if not content and not attachment:
            raise serializers.ValidationError(
                "A message needs text, an attachment, or both."
            )
        return attrs


class MessageCreateSerializer(serializers.ModelSerializer):
    """Slim serializer used only for creating a message via POST."""

    class Meta:
        model = Message
        fields = ["conversation", "content", "attachment"]

    def validate(self, attrs):
        if not attrs.get("content") and not attrs.get("attachment"):
            raise serializers.ValidationError(
                "A message needs text, an attachment, or both."
            )
        return attrs

    def validate_conversation(self, conversation):
        request = self.context["request"]
        if not conversation.participants.filter(pk=request.user.pk).exists():
            raise serializers.ValidationError(
                "You're not a participant in this conversation."
            )
        return conversation


class ConversationListSerializer(serializers.ModelSerializer):
    """Used for the conversation list view — lightweight, one query-friendly."""

    participants = ParticipantSerializer(many=True, read_only=True)
    last_message = serializers.SerializerMethodField()
    unread_count = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = [
            "id",
            "project",
            "participants",
            "last_message",
            "unread_count",
            "updated_at",
        ]

    def get_last_message(self, obj):
        msg = obj.last_message
        if not msg:
            return None
        return {
            "content": msg.content,
            "sender_id": msg.sender_id,
            "created_at": msg.created_at,
        }

    def get_unread_count(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return 0
        return obj.unread_count_for(request.user)


class ConversationDetailSerializer(ConversationListSerializer):
    """Full thread — includes every message, oldest first."""

    messages = MessageSerializer(many=True, read_only=True)

    class Meta(ConversationListSerializer.Meta):
        fields = ConversationListSerializer.Meta.fields + ["messages"]


class ConversationCreateSerializer(serializers.ModelSerializer):
    """Start a new conversation. The requesting user is added automatically."""

    participant_ids = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), many=True, source="participants", write_only=True
    )

    class Meta:
        model = Conversation
        fields = ["id", "project", "participant_ids"]

    def create(self, validated_data):
        participants = validated_data.pop("participants")
        request = self.context["request"]
        conversation = Conversation.objects.create(**validated_data)
        conversation.participants.set(set(participants) | {request.user})
        return conversation
