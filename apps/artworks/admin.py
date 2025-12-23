from django.contrib import admin
from .models import Artwork, Genre, Technique, ArtworkType


@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'year',
        'artwork_type',
        'genre',
        'technique',
        'is_published',
        'created_at',
    )

    list_filter = (
        'is_published',
        'artwork_type',
        'genre',
        'technique',
        'year',
    )

    search_fields = (
        'title',
        'description',
    )

    list_editable = (
        'is_published',
    )

    ordering = ('-year', 'title')


@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    search_fields = ('name',)


@admin.register(Technique)
class TechniqueAdmin(admin.ModelAdmin):
    search_fields = ('name',)


@admin.register(ArtworkType)
class ArtworkTypeAdmin(admin.ModelAdmin):
    search_fields = ('name',)