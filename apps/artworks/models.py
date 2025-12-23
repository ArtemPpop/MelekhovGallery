from django.db import models


class ArtworkType(models.Model):
    name = models.CharField(max_length=50, unique=True)

    class Meta:
        verbose_name = "Тип произведения"
        verbose_name_plural = "Типы произведений"

    def __str__(self):
        return self.name


class Technique(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Техника"
        verbose_name_plural = "Техники"

    def __str__(self):
        return self.name


class Genre(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name = "Жанр"
        verbose_name_plural = "Жанры"

    def __str__(self):
        return self.name


class Artwork(models.Model):
    title = models.CharField(max_length=255)
    year = models.PositiveIntegerField(null=True, blank=True)

    genre = models.ForeignKey(
        Genre,
        on_delete=models.SET_NULL,
        null=True,
        related_name='artworks'
    )

    technique = models.ForeignKey(
        Technique,
        on_delete=models.SET_NULL,
        null=True
    )

    artwork_type = models.ForeignKey(
        ArtworkType,
        on_delete=models.SET_NULL,
        null=True
    )

    description = models.TextField(blank=True)

    width_cm = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True
    )
    height_cm = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True
    )

    image = models.ImageField(
        upload_to='artworks/images/'
    )

    preview = models.ImageField(
        upload_to='artworks/previews/',
        blank=True,
        null=True
    )
    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-year', 'title']

    def __str__(self):
        return self.title
