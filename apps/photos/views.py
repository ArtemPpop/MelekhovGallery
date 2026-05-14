from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Photo
from .serializers import PhotoSerializer


class PhotoViewSet(ReadOnlyModelViewSet):
    serializer_class = PhotoSerializer

    def get_queryset(self):
        return Photo.objects.filter(is_published=True)