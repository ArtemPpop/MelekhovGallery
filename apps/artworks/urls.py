from django.urls import path
from .views import ArtworkListAPIView
from rest_framework.routers import DefaultRouter
from .views import FavoriteViewSet,ArtworkViewSet

urlpatterns = [
    path('', ArtworkListAPIView.as_view(), name='artwork-list'),
]
router = DefaultRouter()
router.register("artworks", ArtworkViewSet)
router.register("favorites", FavoriteViewSet, basename="favorites")

urlpatterns = router.urls