from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ProjectViewSet

router = DefaultRouter()
router.register("", ProjectViewSet, basename="project")

urlpatterns = [
    path("", include(router.urls)),
]

# In backend/config/urls.py, include this with:
#   path("api/projects/", include("apps.projects.urls")),