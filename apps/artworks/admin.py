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

        # загрузка S3 файлов
        self.fields["s3_image"].choices = [("", "----")] + get_s3_images()

        # 🔥 если редактирование — показываем текущий
        if self.instance and self.instance.image:
            self.fields["s3_image"].initial = self.instance.image

    def save(self, commit=True):
        instance = super().save(commit=False)

        s3_image = self.cleaned_data.get("s3_image")

        if s3_image:
            instance.image = s3_image  # 🔥 ключевая строка

        # 🔥 защита от пустого изображения
        if not instance.image and not instance.image_upload:
            raise forms.ValidationError(
                "Выберите изображение из S3 или загрузите файл"
            )

        if commit:
            instance.save()

        return instance


# --- ADMIN ---
@admin.register(Artwork)
class ArtworkAdmin(admin.ModelAdmin):

    form = ArtworkAdminForm
    exclude = ("image", "preview")
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