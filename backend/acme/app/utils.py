import os
import re

from django.template import Template

from . import settings

_react_index_template = None


def react_index_template_injection(matchobj):
    react_script_template = None
    with open(
        os.path.join(settings.PROJECT_ROOT, "templates", "react-scripts.jinja")
    ) as file:
        react_script_template = file.read()
    return react_script_template + matchobj.group("tail")


def react_index_template():
    global _react_index_template
    if not _react_index_template:
        with open(
            os.path.join(settings.PROJECT_ROOT, "templates", "spa.html")
        ) as file:
            _react_index_template = file.read()
        _react_index_template = re.sub(
            r"(?P<tail></body>.*)$",
            react_index_template_injection,
            _react_index_template,
        )
        _react_index_template = Template(_react_index_template)
    return _react_index_template