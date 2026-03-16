from rest_framework import serializers
from .models import Artwork, Favorite

class ArtworkSerializer(serializers.ModelSerializer):
    artwork_type = serializers.CharField(source='artwork_type.name')
    genre = serializers.CharField(source='genre.name')
    technique = serializers.CharField(source='technique.name')

    class Meta:
        model = Artwork
        fields = (
            'id',
            'title',
            'year',
            'artwork_type',
            'genre',
            'technique',
            'image',
            'is_published',
            'created_at',
        )

class FavoriteSerializer(serializers.ModelSerializer):
    artwork = serializers.PrimaryKeyRelatedField(
          queryset=Artwork.objects.all()
     )

    class Meta:
        model = Favorite
        fields = ["id", "artwork", "created_at"]