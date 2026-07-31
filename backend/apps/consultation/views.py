from django.shortcuts import render

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Consultation
from .serializers import ConsultationSerializer


class ConsultationViewSet(viewsets.ModelViewSet):
    """
    Handles CRUD operations for consultation bookings.
    - Clients can create and view their own consultations.
    - Architects can view and update consultations assigned to them.
    """
    serializer_class = ConsultationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'architect':
            return Consultation.objects.filter(architect=user)
        elif user.role == 'client':
            return Consultation.objects.filter(client=user)
        return Consultation.objects.all()  # admin sees everything

    def perform_create(self, serializer):
        serializer.save(client=self.request.user)

    @action(detail=True, methods=['patch'])
    def approve(self, request, pk=None):
        consultation = self.get_object()
        consultation.status = 'approved'
        consultation.save()
        return Response(ConsultationSerializer(consultation).data)

    @action(detail=True, methods=['patch'])
    def reject(self, request, pk=None):
        consultation = self.get_object()
        consultation.status = 'rejected'
        consultation.save()
        return Response(ConsultationSerializer(consultation).data)
