from rest_framework.routers import DefaultRouter

from .views import ConversationViewSet, MessageViewSet

router = DefaultRouter()
router.register("conversations", ConversationViewSet, basename="conversation")
router.register("messages", MessageViewSet, basename="message")

urlpatterns = router.urls

# In your project's root urls.py:
#
#   from django.urls import path, include
#
#   urlpatterns = [
#       ...
#       path("api/", include("messaging.urls")),
#   ]
