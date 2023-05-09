from rest_framework import serializers
from animes.models import Genero, Anime


class GeneroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genero
        fields = '__all__'


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
            'dublagem',
            'generos',
            'imagem'
        )

    def create(self, validated_data):
        """
        Cria uma instância do modelo Anime a partir dos dados válidados fornecidos.  # noqa E501

        Argumentos:
            validated_data (dict): Um dicionário contendo dados validados para criar uma instância do modelo Anime.  # noqa E501

        Retorna:
            Anime: A instância do modelo Anime criada.

        Exemplo:
            validated_data = {
                'nome': 'Cowboy Bebop',
                'nome_alternativo': '',
                'sinopse': 'A história se passa em 2071...',
                'data_lancamento': date(1998, 4, 3),
                'nota': 8.9,
                'estudio': 'Sunrise',
                'diretor': 'Shinichirō Watanabe',
                'dublagem': False by default
                'generos': [
                        {
                            "id": 1,
                            "nome": "Ação"
                        },
                        {
                            "id": 5,
                            "nome": "Comédia"
                        }
                    ],
                'imagem': <imagem> or null
            }
            anime = AnimeSerializer().create(validated_data)
        """
        generos_data = validated_data.pop('generos')
        anime = Anime.objects.create(**validated_data)
        for genero_data in generos_data:
            genero, created = Genero.objects.get_or_create(**genero_data)
            anime.generos.add(genero)
        return anime
