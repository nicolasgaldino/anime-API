from animes.models import Genero, Anime
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.authentication import BasicAuthentication
from animes.serializer import (
    GeneroSerializer,
    AnimeSerializer,
    ListaAnimeDetalhadoSerializer,
    )


class AnimesViewSet(viewsets.ModelViewSet):
    """Listando todos os animes."""

    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Anime.objects.all().order_by('-id')
    serializer_class = AnimeSerializer
    pagination_class = PageNumberPagination
    page_size = 8


class GenerosViewSet(viewsets.ModelViewSet):
    """Listando todos os gêneros."""

    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Genero.objects.all()
    serializer_class = GeneroSerializer


class ListaAnimeDetalhado(generics.ListAPIView):
    """Listando detalhes do anime."""

    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Anime.objects.filter(id=self.kwargs['pk'])
        return queryset
    serializer_class = ListaAnimeDetalhadoSerializer
