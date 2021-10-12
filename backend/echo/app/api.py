from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def bootstrap(request):
    """
    Fetched by the frontend as the SPA spins up
    Used to determine frontend state
    """
    return Response({
        'authed': False,
    })
