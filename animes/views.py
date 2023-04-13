from rest_framework import viewsets, generics
from animes.models import Genero, Anime
from animes.serializer import (
    GeneroSerializer,
    AnimeSerializer,
    ListaAnimesPorGenerosSerializer,
    )


class AnimesViewSet(viewsets.ModelViewSet):
    """Listando todos os animes."""
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer


class GenerosViewSet(viewsets.ModelViewSet):
    """Listando todos os gêneros."""
    queryset = Genero.objects.all()
    serializer_class = GeneroSerializer


class ListaAnimesPorGenero(generics.ListAPIView):
    def get_queryset(self):
        queryset = Anime.objects.filter(id=self.kwargs['pk'])
        return queryset
    serializer_class = ListaAnimesPorGenerosSerializer
