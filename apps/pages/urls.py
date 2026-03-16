from django.urls import path
from .views import PageDetailAPIView

urlpatterns = [
    path("pages/<slug:slug>/", PageDetailAPIView.as_view()),
]