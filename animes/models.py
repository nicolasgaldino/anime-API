from django.db import models


class Genero(models.Model):
    nome = models.CharField(max_length=50)

    def __str__(self):
        return self.nome


class AnimeS(models.Model):
    nome = models.CharField(max_length=100)
    sinopse = models.TextField()
    data_lancamento = models.DateField()
    nota = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        null=True,
        blank=True,
    )
    estudio = models.CharField(max_length=50)
    diretor = models.CharField(max_length=50)
    generos = models.ManyToManyField('Genero')
    imagem = models.ImageField(
        upload_to='animes/covers/%Y/%m/%d',
        blank=True,
        default='',
    )

    def __str__(self):
        return self.nome
