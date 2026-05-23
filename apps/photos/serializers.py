from rest_framework import serializers
from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

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
            'category',
        )

    def get_image_url(self, obj):
        return obj.get_image_url()

    def get_category(self, obj):
        if obj.category:
            return obj.category.name
        return None