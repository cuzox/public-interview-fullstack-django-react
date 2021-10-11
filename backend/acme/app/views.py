import django.http

from django.template import Context

from . import utils

def react_passthrough(request, **kwargs):
    template = utils.react_index_template()
    context = Context({"acme": "test"})
    result = template.render(context)
    return django.http.HttpResponse(result)
