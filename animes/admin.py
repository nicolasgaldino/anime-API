from django.conf import settings
from django.contrib import admin
from animes.models import Genero, Anime


class Animes(admin.ModelAdmin):
    list_display = settings.LIST_DISPLAY
    list_display_links = ('id', 'nome', 'nome_alternativo')
    search_fields = ('nome', 'nome_alternativo',)
    list_per_page = 20

    def get_generos(self, obj):
        return ', '.join([g.nome for g in obj.generos.all()])


admin.site.register(Anime, Animes)


class Generos(admin.ModelAdmin):
    list_display = ('id', 'nome')
    list_display_links = ('id', 'nome')
    search_fields = ('nome',)
    list_per_page = 20


admin.site.register(Genero, Generos)
