
from django.urls import path

from app import api

urlpatterns = [
    path('bootstrap', api.bootstrap),
    path('login', api.login),
    path('logout', api.logout),
    path('query', api.query),
    path('query/<int:pk>', api.query)
]
