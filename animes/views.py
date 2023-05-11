from rest_framework import filters
from rest_framework import viewsets
from animes.models import Genero, Anime
from rest_framework.pagination import PageNumberPagination
from utils.create_with_response import create_with_response
from django_filters.rest_framework import DjangoFilterBackend
from animes.serializer import (
    GeneroSerializer,
    AnimeSerializer,
    )


class AnimesViewSet(viewsets.ModelViewSet):
    """Listando todos os animes."""
    filter_backends = [
        DjangoFilterBackend,
        filters.OrderingFilter,
        filters.SearchFilter,
        ]
    ordering_fields = [
        'nome',
        'estudio',
        ]
    search_fields = [
        'nome',
        'estudio',
        'nome_alternativo',
        'generos__nome',
        ]
    filterset_fields = ['dublagem']
    http_method_names = ['get', 'post', 'put', 'patch']

    queryset = Anime.objects.all().order_by('-id')
    serializer_class = AnimeSerializer
    pagination_class = PageNumberPagination
    page_size = 8

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        return create_with_response(serializer, request)


class GenerosViewSet(viewsets.ModelViewSet):
    """Listando todos os gêneros."""
    queryset = Genero.objects.all()
    serializer_class = GeneroSerializer
    http_method_names = ['get', 'post']

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        return create_with_response(serializer, request)
