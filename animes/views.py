from animes.models import Genero, Anime
from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import BasicAuthentication
from animes.serializer import (
    GeneroSerializer,
    AnimeSerializer,
    ListaAnimesPorGenerosSerializer,
    )


class AnimesViewSet(viewsets.ModelViewSet):
    """Listando todos os animes."""

    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer


class GenerosViewSet(viewsets.ModelViewSet):
    """Listando todos os gêneros."""

    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    queryset = Genero.objects.all()
    serializer_class = GeneroSerializer


class ListaAnimesPorGenero(generics.ListAPIView):
    """Listando animes por gêneros."""

    authentication_classes = [BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Anime.objects.filter(id=self.kwargs['pk'])
        return queryset
    serializer_class = ListaAnimesPorGenerosSerializer
