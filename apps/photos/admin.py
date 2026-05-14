from django.contrib import admin
from django.utils.html import format_html
from django import forms
from .models import Photo
from .services.s3_service import get_s3_images


class PhotoAdminForm(forms.ModelForm):
    s3_image = forms.ChoiceField(
        choices=[],
        required=False,
        label="Выбрать фото из S3"
    )

    class Meta:
        model = Photo
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        self.fields["s3_image"].choices = [
            ("", "----")
        ] + get_s3_images(prefix="photos/")

        if self.instance and self.instance.image:
            self.fields["s3_image"].initial = self.instance.image

    def save(self, commit=True):
        instance = super().save(commit=False)

        s3_image = self.cleaned_data.get("s3_image")
        image_upload = self.cleaned_data.get("image_upload")

        if s3_image:
            instance.image = s3_image

        elif image_upload:
            instance.image = None

        if commit:
            instance.save()

        return instance

    def clean(self):
        cleaned_data = super().clean()

        s3_image = cleaned_data.get("s3_image")
        image_upload = cleaned_data.get("image_upload")

        if not s3_image and not image_upload:
            raise forms.ValidationError(
                "Выберите изображение"
            )

        return cleaned_data


@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    form = PhotoAdminForm

    exclude = ("image",)

    list_display = (
        'title',
        'preview_image',
        'year',
        'is_published',
    )

    readonly_fields = (
        "preview_image",
    )

    search_fields = (
        'title',
        'description',
    )

    list_filter = (
        'year',
        'is_published',
    )

    ordering = (
        '-year',
        'title',
    )

    list_editable = (
        'is_published',
    )

    def preview_image(self, obj):
        if obj.image:
            url = obj.get_image_url()

            return format_html(
                '<img src="{}" '
                'style="height:120px; border-radius:8px; object-fit:cover;" />',
                url
            )

        return "Нет изображения"

    preview_image.short_description = "Превью"

    class Media:
        js = ("admin/js/image_preview.js",)