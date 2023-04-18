from django.conf import settings
from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from django.conf.urls.static import static
from animes.views import GenerosViewSet, AnimesViewSet, ListaAnimeDetalhado


router = routers.DefaultRouter()
router.register('animes', AnimesViewSet, basename='Animes')
router.register('generos', GenerosViewSet, basename='Gêneros')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('animes/<int:pk>/detalhes/', ListaAnimeDetalhado.as_view()),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
