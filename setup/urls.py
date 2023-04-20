from drf_yasg import openapi
from django.conf import settings
from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from rest_framework import permissions
from django.conf.urls.static import static
from drf_yasg.views import get_schema_view
from rest_framework.pagination import PageNumberPagination
from animes.views import GenerosViewSet, AnimesViewSet, ListaAnimeDetalhado


router = routers.DefaultRouter()
router.register('animes', AnimesViewSet, basename='Animes')
router.register(r'animes', AnimesViewSet, basename='Animes')
router.register('generos', GenerosViewSet, basename='Gêneros')

pagination_class = PageNumberPagination
pagination_class.page_size = 8

schema_view = get_schema_view(
    openapi.Info(
        title="My[P]AnimeList",
        default_version='v1',
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="nicolasesmael1998@gmail.com"),
        license=openapi.License(name="MIT License"),
        description='''
            My[P]AnimeList é uma API que disponibiliza informações sobre animes
            para serem consumidas e exibidas em um front-end. Desenvolvido em
            Python com Django REST Framework, utiliza banco de dados SQLite e
            autenticação básica.''',
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


descript_var = '''
Este repositório contém o código-fonte do My[P]AnimeList, um projeto que
consiste em uma API que disponibiliza informações sobre animes para serem
consumidas e exibidas em um front-end. Desenvolvido em Python com Django,
utiliza banco de dados SQLite e autenticação básica. O front-end é construído
com HTML, CSS e JavaScript.
'''


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('animes/<int:pk>/detalhes/', ListaAnimeDetalhado.as_view()),
    path('animes/?page=<int:pk>', ListaAnimeDetalhado.as_view(pagination_class=pagination_class)),  # noqa E501
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),  # noqa E501
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),  # noqa E501
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
