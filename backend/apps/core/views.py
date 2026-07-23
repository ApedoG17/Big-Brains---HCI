from django.shortcuts import render
from django.http import JsonResponse
from django.utils import timezone

# Create your views here.
def health_check(request):
    return JsonResponse(
        {
            "status": "healthy",
            "service": "ArchiVerse API",
            "timestamp": timezone.now().isoformat(),
        }
    )