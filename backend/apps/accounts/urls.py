from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    ProfileView,
    UserListView,
    UserRoleUpdateView,
    DeactivateUserView,
)

urlpatterns = [
    # Authentication (UC-01, UC-02, UC-03)
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    # Profile (view/update own account)
    path('profile/', ProfileView.as_view(), name='profile'),

    # Admin: User Management (UC-05, US-005, US-008, US-009)
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:pk>/role/', UserRoleUpdateView.as_view(), name='user-role-update'),
    path('users/<int:pk>/deactivate/', DeactivateUserView.as_view(), name='user-deactivate'),
]