from django.db import models
from django.conf import settings
from urllib.parse import quote


class Photo(models.Model):
    title = models.CharField(
        max_length=255
    )

    year = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    description = models.TextField(
        blank=True
    )

    image = models.CharField(
        max_length=500,
        blank=True,
        null=True
    )

    image_upload = models.ImageField(
        upload_to="photos/",
        blank=True,
        null=True
    )

    is_published = models.BooleanField(
        default=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def get_image_url(self):
        if not self.image:
            return None

        if self.image.startswith("http"):
            return self.image

        return (
            f"{settings.AWS_S3_ENDPOINT_URL}/"
            f"{settings.AWS_STORAGE_BUCKET_NAME}/"
            f"{quote(self.image)}"
        )

    class Meta:
        verbose_name = "Фотография"
        verbose_name_plural = "Фотографии"
        ordering = ['-year', 'title']

    def __str__(self):
        return self.title