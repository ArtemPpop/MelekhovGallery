from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet
from .models import Artwork,Favorite
from .serializers import ArtworkSerializer
from .serializers import FavoriteSerializer
from rest_framework import viewsets, permissions


class ArtworkListAPIView(ListAPIView):
    serializer_class = ArtworkSerializer
    def get_queryset(self):
        return Artwork.objects.filter(is_published=True)


class ArtworkViewSet(ModelViewSet):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    @action(detail=False, methods=["get"])
    def search(self, request):
        query = request.GET.get("q")
        artworks = Artwork.objects.filter(
            Q(title__icontains=query) |
            Q(genre__icontains=query) |
            Q(technique__icontains=query)
        )
        serializer = ArtworkSerializer(artworks, many=True)
        return Response(serializer.data)

class FavoriteViewSet(viewsets.ModelViewSet):
     serializer_class = FavoriteSerializer
     permission_classes = [permissions.IsAuthenticated]

     def get_queryset(self):
         return Favorite.objects.filter(user=self.request.user)

     def perform_create(self, serializer):
          serializer.save(user=self.request.user)