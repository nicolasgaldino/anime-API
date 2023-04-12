from rest_framework import serializers
from animes.models import Genero, Anime


class AnimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anime
        fields = [
            'id',
            'nome',
            'nome_alternativo',
            'sinopse',
            'data_lancamento',
            'nota',
            'estudio',
            'diretor',
            'generos',
            'imagem',
        ]


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = ['id', 'nome']
