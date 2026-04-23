from django.contrib import admin
from django import forms
from django.utils.html import format_html

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

        #  загружаем S3
        self.fields["s3_image"].choices = [("", "----")] + get_s3_images()

        #  если редактирование — подставляем текущее
        if self.instance and self.instance.image:
            self.fields["s3_image"].initial = self.instance.image


    def save(self, commit=True):
        instance = super().save(commit=False)

        s3_image = self.cleaned_data.get("s3_image")

        if s3_image:
            instance.image = s3_image  # сохраняем key

        if not instance.image:
            raise forms.ValidationError("Выберите изображение")

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
        'preview_image',  #  превью в списке
        'year',
        'artwork_type',
        'genre',
        'technique',
        'is_published',
    )

    readonly_fields = ("preview_image",)

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

    #  ПРЕВЬЮ
    def preview_image(self, obj):
        if obj.image:
            url = obj.get_image_url()
            return format_html(
                '<img id="preview-img" src="{}" style="height:120px; border-radius:8px;" />',
                url
            )
        return "Нет изображения"

    preview_image.short_description = "Превью"

    #  JS подключение
    class Media:
        js = ("admin/js/image_preview.js",)


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