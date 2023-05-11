from rest_framework import filters
from rest_framework import viewsets
from animes.models import Genero, Anime
from rest_framework.pagination import PageNumberPagination
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


class GenerosViewSet(viewsets.ModelViewSet):
    """Listando todos os gêneros."""
    queryset = Genero.objects.all()
    serializer_class = GeneroSerializer
    http_method_names = ['get', 'post']
