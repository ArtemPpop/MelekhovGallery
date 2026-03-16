from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView
from .models import Page
from .serializers import PageSerializer

class PageDetailAPIView(RetrieveAPIView):
    queryset = Page.objects.filter(is_published=True)
    serializer_class = PageSerializer
    lookup_field = "slug"