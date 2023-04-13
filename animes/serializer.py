from rest_framework import serializers
from animes.models import Genero, Anime


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = ['nome']


class AnimeSerializer(serializers.ModelSerializer):
    generos = GeneroSerializer(many=True)

    class Meta:
        model = Anime
        fields = (
            'id',
            'nome',
            'nome_alternativo',
            'sinopse',
            'data_lancamento',
            'nota',
            'estudio',
            'diretor',
            'generos',
            'imagem'
        )
