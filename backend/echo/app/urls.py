
from django.urls import path

from app import api

urlpatterns = [
    path('bootstrap', api.bootstrap),
    path('login', api.login),
    path('logout', api.logout),
]
