import json

import django.contrib.auth
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import models

def _body_json(request, default=None):
    try:
        return json.loads(request.body)
    except:
        return default

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
@api_view(['PATCH'])
def login(request):
    data = _body_json(request, default={})
    email = data.get('email')
    password = data.get('password')
    
    user = django.contrib.auth.authenticate(email=email, password=password)
    if user is None:
        return Response({
            'authed': False,
            'email': email,
        })

    django.contrib.auth.login(request, user)
    return Response({
        'authed': True,
        'user': {
            'email': user.email,
            'name': "{} {}".format(user.first_name, user.last_name),
        }
    })
