from rest_framework.generics import (RetrieveAPIView, ListAPIView
)
from .models import *
from .serializers import *

class HomePageAPIView(RetrieveAPIView):
    serializer_class = HomePageSerializer
    def get_object(self):
        return HomePage.objects.first()

class BiographyPageAPIView(RetrieveAPIView):
    serializer_class = BiographyPageSerializer
    def get_object(self):
        return BiographyPage.objects.first()

class CreativityPageAPIView(RetrieveAPIView):
    serializer_class = CreativityPageSerializer
    def get_object(self):
        return CreativityPage.objects.first()

class ContactsPageAPIView(RetrieveAPIView):
    serializer_class = ContactsPageSerializer
    def get_object(self):
        return ContactsPage.objects.first()

class SiteSettingsAPIView(RetrieveAPIView):
    serializer_class = SiteSettingsSerializer
    def get_object(self):
        return SiteSettings.objects.first()

class NewsListAPIView(ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

class NewsDetailAPIView(RetrieveAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    lookup_field = "slug"