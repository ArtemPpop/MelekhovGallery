from django.db import models


class Page(models.Model):
    slug = models.SlugField(
        unique=True,
        help_text="Используется в URL, например: creativity"
    )
    title = models.CharField(max_length=255)
    content = models.TextField()

    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Страница"
        verbose_name_plural = "Страницы"
        ordering = ['title']

    def __str__(self):
        return self.title