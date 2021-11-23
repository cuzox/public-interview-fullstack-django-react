
from django.urls import path

from app import api

urlpatterns = [
    path('bootstrap', api.bootstrap),
    path('login', api.login),
    path('logout', api.logout),
    path('query', api.query),
    path('query/<int:pk>', api.query),
    path('query/<int:pk>/execute', api.execute_query),
    path('query/<int:pk>/execute/<str:filetype>', api.execute_query),
    path('query/<int:pk>/explain', api.explain_query),
    path('query/ad_hoc/execute', api.execute_query),
    path('query/ad_hoc/execute/<str:filetype>', api.execute_query),
    path('query/ad_hoc/explain', api.explain_query),
    path('queries', api.queries),
    path('upgrade/request', api.upgrade_request),
]
