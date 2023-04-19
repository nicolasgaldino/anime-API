from django.conf import settings
from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from django.conf.urls.static import static
from rest_framework.pagination import PageNumberPagination
from animes.views import GenerosViewSet, AnimesViewSet, ListaAnimeDetalhado


router = routers.DefaultRouter()
router.register('animes', AnimesViewSet, basename='Animes')
router.register(r'animes', AnimesViewSet, basename='Animes')
router.register('generos', GenerosViewSet, basename='Gêneros')

pagination_class = PageNumberPagination
pagination_class.page_size = 8


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('animes/<int:pk>/detalhes/', ListaAnimeDetalhado.as_view()),
    path('animes/?page=<int:pk>', ListaAnimeDetalhado.as_view(pagination_class=pagination_class)),  # noqa E501
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
