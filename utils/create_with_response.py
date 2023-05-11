from rest_framework import status
from rest_framework.response import Response


def create_with_response(serializer, request):
    """Passa o ID na Location do Response Header"""
    serializer.is_valid(raise_exception=True)
    instance = serializer.save()
    response = Response(serializer.data, status=status.HTTP_201_CREATED)
    response['Location'] = request.build_absolute_uri() + str(instance.id)
    return response
