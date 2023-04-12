from rest_framework import viewsets
from animes.models import Genero, Anime
from animes.serializer import GeneroSerializer, AnimeSerializer


class AnimesViewSet(viewsets.ModelViewSet):
    """Listando todos os animes."""
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer


class GenerosViewSet(viewsets.ModelViewSet):
    """Listando todos os gêneros."""
    queryset = Genero.objects.all()
    serializer_class = GeneroSerializer
