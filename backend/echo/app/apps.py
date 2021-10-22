import logging
import sys

from django.apps import AppConfig

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG)

logger = logging.getLogger(__name__)


class AppConfig(AppConfig):
   default_auto_field = "django.db.models.BigAutoField"
   name = "app"
