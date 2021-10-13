import json
import os

import django.contrib.auth
import django.http
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import models

def _body_json(request, default=None):
    try:
        return json.loads(request.body)
    except:
        return default

_monaco_workers = {}


def monaco_worker(request, language):
    global _monaco_workers

    if language not in _monaco_workers:
        worker_path = os.path.join(
            "echo", "app", "assets", "monaco", "{}.worker.js".format(language)
        )
        if not os.path.isfile(worker_path):
            return django.http.HttpResponseBadRequest()
        with open(worker_path) as file:
            _monaco_workers[language] = file.read()

    return django.http.HttpResponse(
        _monaco_workers[language], content_type="application/javascript"
    )

@csrf_exempt
@api_view(['GET'])
def bootstrap(request):
    """
    Fetched by the frontend as the SPA spins up
    Used to determine frontend state
    """
    if request.user and request.user.is_authenticated:
        user = request.user
        return Response({
            'authed': True,
            'user': {
                'email': user.email,
                'name': "{} {}".format(user.first_name, user.last_name),
            }
        })

    return Response({
        'authed': False,
    })

@csrf_exempt
@api_view(['POST'])
def login(request):
    data = _body_json(request, default={})
    email = data.get('email')
    password = data.get('password')
    
    user = django.contrib.auth.authenticate(email=email, password=password)
    if user is None:
        return Response({
            'authed': False,
        })

    django.contrib.auth.login(request, user)
    return Response({
        'authed': True,
        'user': {
            'email': user.email,
            'name': "{} {}".format(user.first_name, user.last_name),
        }
    })

@csrf_exempt
@api_view(['POST'])
def logout(request):
    django.contrib.auth.logout(request)
    return Response({
        'authed': False,
    })
