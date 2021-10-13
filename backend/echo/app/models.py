import django.db.models

from django.contrib.auth.models import AbstractUser
from django_extensions.db.models import TimeStampedModel

class EchoUser(TimeStampedModel, AbstractUser):
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    username = None
    email = django.db.models.EmailField(unique=True, max_length=255)

    def __str__(self):
        return self.email
