from animes.models import Anime, Genero


def create_anime_with_generos(validated_data):
    """
    Cria um objeto Anime com os gêneros associados
    fornecidos em `validated_data`.

    Args:
        validated_data (dict): Dados validados para criar o objeto Anime.

    Returns:
        Anime: O objeto Anime criado com os gêneros associados.

    """
    generos_data = validated_data.pop('generos')
    anime = Anime.objects.create(**validated_data)
    generos = []
    for genero_data in generos_data:
        genero_nome = genero_data['nome']
        genero, created = Genero.objects.get_or_create(nome=genero_nome)
        anime.generos.add(genero)
        generos.append(genero)
    anime.generos.set(generos)
    return anime
