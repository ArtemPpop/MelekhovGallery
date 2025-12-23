from django.db import models

class Event(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    image_url = models.URLField(blank=True)

    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Событие"
        verbose_name_plural = "События"
        ordering = ['-start_date']

    def __str__(self):
        return self.title