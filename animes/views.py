from django.conf import settings
from rest_framework import filters
from rest_framework import viewsets
from animes.models import Genero, Anime
from utils.apply_search_filter import apply_search_filter
from rest_framework.pagination import PageNumberPagination
from utils.create_with_response import create_with_response
from django_filters.rest_framework import DjangoFilterBackend
from animes.serializer import (
    GeneroSerializer,
    AnimeSerializer,
    )


class AnimesViewSet(viewsets.ModelViewSet):
    """
    ViewSet para listar e criar animes.

    Atributos:
        filter_backends: Lista de backends de filtro utilizados.
        ordering_fields: Lista de campos utilizados para ordenação.
        search_fields: Lista de campos utilizados para busca.
        filterset_fields: Lista de campos utilizados para filtragem.
        http_method_names: Lista de métodos HTTP permitidos.

    Propriedades:
        queryset: Conjunto de objetos Anime a serem listados.
        serializer_class: Classe do serializer utilizada.
        pagination_class: Classe de paginação utilizada.
        page_size: Tamanho da página de resultados.

    Métodos:
        get_queryset: Retorna o queryset de objetos Anime, com suporte para busca.   # noqa E501
        create: Cria um novo anime com base nos dados fornecidos.

    Exemplo:
        viewset = AnimesViewSet()
    """

    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
        filters.SearchFilter,
    ]
    ordering_fields = [
        'nome',
        'estudio',
    ]
    search_fields = settings.SEARCH_FIELDS
    filterset_fields = ['dublagem']
    http_method_names = ['get', 'post', 'put', 'patch']

    queryset = Anime.objects.all().order_by('-id')
    serializer_class = AnimeSerializer
    pagination_class = PageNumberPagination
    page_size = 8

    def get_queryset(self):
        """
        Retorna o queryset de objetos Anime, com suporte para busca.

        Returns:
            QuerySet: O queryset de objetos Anime.

        Exemplo:
            queryset = self.get_queryset()
        """
        queryset = super().get_queryset()
        search_query = self.request.query_params.get('search', None)
        if search_query:
            search_fields = settings.SEARCH_FIELDS
            queryset = apply_search_filter(
                queryset,
                search_query,
                search_fields
            )
        return queryset

    def create(self, request):
        """
        Cria um novo anime com base nos dados fornecidos.

        Args:
            request: A requisição HTTP recebida.

        Returns:
            Response: A resposta HTTP contendo os dados do anime criado e o status 201 (Created).  # noqa E501

        Exemplo:
            response = self.create(request)
        """
        serializer = self.serializer_class(data=request.data)
        return create_with_response(serializer, request)


class GenerosViewSet(viewsets.ModelViewSet):
    """
    ViewSet para listar e criar gêneros.

    Atributos:
        queryset: O queryset dos objetos de gênero.
        serializer_class: A classe de serialização para os objetos de gênero.
        http_method_names: Os métodos HTTP permitidos nesta view.

    Exemplo de uso:
        GET /generos/ - Lista todos os gêneros
    """

    queryset = Genero.objects.all()
    serializer_class = GeneroSerializer
    http_method_names = ['get']

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        return create_with_response(serializer, request)
