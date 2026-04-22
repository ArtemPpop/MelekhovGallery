from rest_framework import serializers
from .models import Artwork, Favorite

class ArtworkSerializer(serializers.ModelSerializer):
    artwork_type = serializers.CharField(source='artwork_type.name')
    genre = serializers.CharField(source='genre.name')
    technique = serializers.CharField(source='technique.name')

    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        return obj.get_image_url()

    class Meta:
        model = Artwork
        fields = (
            'id',
            'title',
            'year',
            'artwork_type',
            'genre',
            'technique',
            'image_url',
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