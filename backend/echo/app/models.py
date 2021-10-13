import django.db.models

from django.contrib.auth.models import AbstractUser
from django_extensions.db.models import TimeStampedModel

class EchoUser(TimeStampedModel, AbstractUser):
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    username = None
    email = django.db.models.EmailField(unique=True, max_length=255)
    role = django.db.models.CharField(default="guest", max_length=10)

    def __str__(self):
        return self.email

class SavedQueries(TimeStampedModel):
    user = django.db.models.ForeignKey(
        EchoUser, on_delete=django.db.models.CASCADE, null=False
    )
    content = django.db.models.TextField(null=False)
    name = django.db.models.CharField(null=False, max_length=100)
