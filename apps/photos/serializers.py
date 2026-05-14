from rest_framework import serializers
from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        return obj.get_image_url()

    class Meta:
        model = Photo

        fields = (
            'id',
            'title',
            'year',
            'description',
            'image_url',
            'is_published',
            'created_at',
        )