import logging
import json

import django.contrib.auth
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import models


logger = logging.getLogger(__name__)


def _body_json(request, default=None):
    if type(request.data) is dict:
        return request.data
    try:
        return json.loads(request.data)
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


@login_required
@api_view(['POST', 'PUT', 'GET'])
def query(request, pk=None):
    if request.method == 'POST':
        data = _body_json(request, default={})
        content = data.get('content')
        user = request.user

        record = models.SavedQueries.objects.create(content=content, user=user)
        return Response({
            'id': record.id,
        })
    
    if request.method == 'PUT':
        data = _body_json(request, default={})
        content = data.get('content')
        user = request.user

        try:
            record = models.SavedQueries.objects.get(pk=pk)
            record.content = content
            record.save()
        except:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            'id': record.id,
        })
    
    if request.method == 'GET':
        try:
            record = models.SavedQueries.objects.get(pk=pk)
        except:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        return Response({
            'id': record.id,
            'content': record.content,
        })
