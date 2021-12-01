import json
import logging
import re

import django.contrib.auth
from django.contrib.auth.decorators import login_required
from django.db import connections
from django.db.models import F, Value, CharField
from django.db.models.functions import Concat
from django.http import HttpResponse
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


def _treated_csv_cell(cell):
    """
    Adds treatment to row cells,
    in preparation for csv concatenation
    1. double quotes are converted to double-double quotes
    2. cells with commas are wrapped in double quotes
    e.g. `thing` becomes `thing`
         `th,ing` becomes `"th,ing"`
         `"thing"` becomes `""thing""`
         `t"h,i"ng` becomes `"t""h,i""ng"`
    """
    result = str(cell)
    result = result.replace('"', '""')
    if ',' in result:
        result = '"' + result + '"'
    return result


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
                'id': user.id,
                'email': user.email,
                'name': "{} {}".format(user.first_name, user.last_name),
                'role': user.role,
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
            'id': user.id,
            'email': user.email,
            'name': "{} {}".format(user.first_name, user.last_name),
            'role': user.role,
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
        name = data.get('name').strip()
        content = data.get('content').strip()
        user = request.user

        if not content or not name:
            return Response({ "error": "missing fields" }, status=status.HTTP_400_BAD_REQUEST)

        record = models.SavedQueries.objects.create(user=user, name=name, content=content)
        return Response({
            'id': record.id,
        })

    if request.method == 'PUT':
        data = _body_json(request, default={})
        name = data.get('name').strip()
        content = data.get('content').strip()
        user = request.user

        if not content or not name:
            return Response({ "error": "missing fields" }, status=status.HTTP_400_BAD_REQUEST)

        try:
            record = models.SavedQueries.objects.get(pk=pk)

            if record.user_id != request.user.id:
                raise Exception("Not permitted")

            record.name = name
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
            'name': record.name,
            'content': record.content,
            'author_id': record.user_id,
        })


@login_required
@api_view(['GET'])
def queries(request):
    results = models.SavedQueries.objects.annotate(
        user_name=Concat(
            F('user__first_name'),
            Value(' '),
            F('user__last_name'),
            output_field=CharField()
        )
    ).values('id', 'name', 'user_id', 'user_name').all()
    return Response({
        'queries': list(results),
    })


@login_required
@api_view(['GET'])
def execute_query(request, pk=None, filetype=None):
    if pk is not None:
        try:
            record = models.SavedQueries.objects.get(pk=pk)
        except:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        content = record.content
    else:
        # without PK then we assume this is an ad hoc run
        # so if the content of the query is missing, return a 404
        content = request.GET.get('content')
        if not content:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

    data = None
    error = None
    columns = None

    with connections['dvdrental'].cursor() as cursor:
        try:
            cursor.execute(content)
        except Exception as db_err:
            error = str(db_err)

        if not error:
            try:
                data = cursor.fetchall()
                data = list(data)
                columns = [col[0] for col in cursor.description]
            except Exception as db_err:
                if str(db_err) == "no results to fetch":
                    data = []
                    columns = []
                else:
                    raise db_err

    if filetype is not None:
        if error:
            raise error

        if filetype != "csv":
            return Response({}, status=status.HTTP_404_NOT_FOUND)

        treated_columns = [
            _treated_csv_cell(cell) for cell in columns
        ]
        content = ','.join(treated_columns) + '\n'
        for row in data:
            treated_row = [
                _treated_csv_cell(cell) for cell in row
            ]
            content = content + ','.join(treated_row) + '\n'
        response = HttpResponse(content, content_type='text/csv')
        if pk is not None:
            filename = record.name.strip()
            filename = re.sub('\s+', '_', filename)
            filename = re.sub('[^0-9a-zA-Z_]+', '_', filename)
            filename = re.sub('_+', '_', filename)
            filename = re.sub('(?:^_)|(?:_$)', '', filename)
            if filename == "":
                filename = "export"
        else:
            filename = "export"
        response['Content-Disposition'] = "attachment; filename=\"{}.csv\"".format(filename)
        return response

    return Response({
        "columns": columns,
        "data": data,
        "error": error,
    })


@login_required
@api_view(['GET'])
def explain_query(request, pk=None):
    if pk is not None:
        try:
            record = models.SavedQueries.objects.get(pk=pk)
        except:
            return Response({}, status=status.HTTP_404_NOT_FOUND)
        content = record.content
    else:
        # without PK then we assume this is an ad hoc run
        # so if the content of the query is missing, return a 404
        content = request.GET.get('content')
        if not content:
            return Response({}, status=status.HTTP_404_NOT_FOUND)

    content = "explain analyze {}".format(content)
    explanation = None
    error = None

    with connections['dvdrental'].cursor() as cursor:
        try:
            cursor.execute(content)
        except Exception as db_err:
            error = str(db_err)

        if not error:
            try:
                explanation = cursor.fetchall()
                explanation = [lines[0] for lines in explanation]
                explanation = "\n".join(explanation)
            except Exception as db_err:
                if str(db_err) == "no results to fetch":
                    explanation = []

                else:
                    raise db_err

    return Response({
        "explanation": explanation,
        "error": error,
    })


@login_required
@api_view(['POST'])
def upgrade_request(request):
    # this is a simple placehoder, for the sake of the feature request
    # you do not need to update this
    user = request.user
    if user.role != 'guest':
        return Response({}, status=status.HTTP_404_NOT_FOUND)
    return Response({})
