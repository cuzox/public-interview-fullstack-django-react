import logging
import sys

from django.apps import AppConfig

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)

logger = logging.getLogger(__name__)


class AppConfig(AppConfig):
   default_auto_field = "django.db.models.BigAutoField"
   name = "app"

   # def ready(self):
   #    from . import models

   #    # init db records
   #    logger.info('READY')
   #    exists = models.EchoUser.objects.exists()
   #    if not exists:
   #       user = models.EchoUser.objects.create(first_name='Gia', last_name='Shoemaker', email='gia@site.com')
   #       user.set_password('password')
   #       user.save()

   #       user = models.EchoUser.objects.create(first_name='Myo', last_name='Khin', email='myo@site.com')
   #       user.set_password('password')
   #       user.save()
