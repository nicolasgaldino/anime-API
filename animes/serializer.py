from django.conf import settings
from rest_framework import serializers
from utils.create_anime_with_generos import create_anime_with_generos
from animes.models import Genero, Anime


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = '__all__'


class AnimeSerializer(serializers.ModelSerializer):
    generos = GeneroSerializer(many=True)

    class Meta:
        model = Anime
        fields = settings.FIELDS

    def create(self, validated_data):
        anime = create_anime_with_generos(validated_data)
        return anime
