from django.urls import path
from .views import (
    HomePageAPIView,
    BiographyPageAPIView,
    CreativityPageAPIView,
    ContactsPageAPIView,
    SiteSettingsAPIView,
    NewsListAPIView,
    NewsDetailAPIView,
)

urlpatterns = [
    path("home/", HomePageAPIView.as_view()),
    path("biography/", BiographyPageAPIView.as_view()),
    path("creativity/",CreativityPageAPIView.as_view() ),
    path("contacts/",ContactsPageAPIView.as_view()),
    path("settings/",SiteSettingsAPIView.as_view()),
    path("news/", NewsListAPIView.as_view()),
    path("news/<slug:slug>/", NewsDetailAPIView.as_view()),
]