from rest_framework import status
from rest_framework.response import Response


def create_with_response(serializer, request):
    """
    Cria um objeto com base no serializer fornecido e
    retorna uma resposta adequada.

    Args:
        serializer: O serializer utilizado para validar e criar o objeto.
        request: A requisição HTTP recebida.

    Returns:
        Response: A resposta HTTP contendo os dados do objeto criado e o
        status 201 (Created).

    Exemplo:
        response = create_with_response(serializer, request)
    """
    serializer.is_valid(raise_exception=True)
    instance = serializer.save()
    response = Response(serializer.data, status=status.HTTP_201_CREATED)
    response['Location'] = request.build_absolute_uri() + str(instance.id)
    return response
