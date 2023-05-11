from django.db.models import Q


def apply_search_filter(queryset, search_query, search_fields):
    """
    Aplica um filtro de busca ao queryset com base na consulta
    de busca e nos campos fornecidos.

    Args:
        queryset (QuerySet): O queryset ao qual o filtro
        de busca será aplicado.
        search_query (str): A consulta de busca.
        search_fields (list): A lista de campos do modelo
        para realizar a busca.

    Returns:
        QuerySet: O queryset filtrado.

    Exemplo:
        queryset = apply_search_filter(queryset, 'Romance', ['titulo', 'genero'])  # noqa E501
    """
    if search_query:
        filter_conditions = Q()
        for field in search_fields:
            filter_conditions |= Q(**{f"{field}__icontains": search_query})
        queryset = queryset.filter(filter_conditions)
    return queryset
