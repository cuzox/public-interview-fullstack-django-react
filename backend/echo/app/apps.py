import logging

from django.apps import AppConfig


logger = logging.getLogger(__name__)


class AppConfig(AppConfig):
   default_auto_field = "django.db.models.BigAutoField"
   name = "app"

   def ready(self):
      from . import models

      # init db records
      exists = models.EchoUser.objects.exists()
      if not exists:
         user = models.EchoUser.objects.create(first_name='foo', email='foo@anomalo.com')
         user.set_password('password')
         user.save()

         user = models.EchoUser.objects.create(first_name='bar', email='bar@anomalo.com')
         user.set_password('password')
         user.save()
