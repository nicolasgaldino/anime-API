from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from animes.views import GenerosViewSet, AnimesViewSet


router = routers.DefaultRouter()
router.register('animes', AnimesViewSet, basename='Animes')
router.register('generos', GenerosViewSet, basename='Gêneros')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls))
]
