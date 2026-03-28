from django.db import models

class Feedback(models.Model):

    name = models.CharField(max_length=255)
    email = models.EmailField()

    subject = models.CharField(max_length=255, blank=True)
    message = models.TextField()

    is_processed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"