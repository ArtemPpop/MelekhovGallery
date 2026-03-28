from django.contrib import admin
from django import forms

from .models import Artwork, Genre, Technique, ArtworkType
from .services.s3_service import get_s3_images


# --- ФОРМА ---
class ArtworkAdminForm(forms.ModelForm):

    s3_image = forms.ChoiceField(
        choices=[],
        required=False,
        label="Выбрать из S3"
    )

    class Meta:
        model = Artwork
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields["s3_image"].choices = [("", "----")] + get_s3_images()

    def clean(self):
        cleaned_data = super().clean()

        s3_image = cleaned_data.get("s3_image")

        if s3_image:
            cleaned_data["image"] = s3_image

        return cleaned_data


# --- ADMIN ---
@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):

    form = ArtworkAdminForm  # ← ВОТ ЭТО ВАЖНО

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


# --- СПРАВОЧНИКИ ---
@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    search_fields = ('name',)


@admin.register(Technique)
class TechniqueAdmin(admin.ModelAdmin):
    search_fields = ('name',)


@admin.register(ArtworkType)
class ArtworkTypeAdmin(admin.ModelAdmin):
    search_fields = ('name',)