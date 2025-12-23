from django.db import models


class Artist(models.Model):
    full_name = models.CharField(max_length=255)
    birth_date = models.DateField(null=True, blank=True)
    death_date = models.DateField(null=True, blank=True)

    biography = models.TextField()
    photo_url = models.URLField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Художник"
        verbose_name_plural = "Художники"

    def __str__(self):
        return self.full_name


class Award(models.Model):
    artist = models.ForeignKey(
        Artist,
        on_delete=models.CASCADE,
        related_name='awards'
    )

    title = models.CharField(max_length=255)
    year = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        verbose_name = "Награда"
        verbose_name_plural = "Награды"

    def __str__(self):
        return self.title