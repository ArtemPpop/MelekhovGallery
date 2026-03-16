from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ROLE_CHOICES = (
        ("admin", "Admin"),
        ("curator", "Curator"),
        ("user", "User"),
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="user"
    )

    avatar = models.ImageField(
        upload_to="avatars/",
        null=True,
        blank=True
    )