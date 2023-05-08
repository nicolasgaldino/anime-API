# Instalação e configuração do ambiente

## Pré-requisitos

- Python 3.8 ou superior

## Instalação

1. Clone o repositório:

```
git clone https://github.com/nicolasgaldino/anime-API.git
```

2. Crie um ambiente virtual:

```
python -m venv nome-do-ambiente
```

3. Ative o ambiente virtual:

```
source nome-do-ambiente/bin/activate  # Linux/MacOS
nome-do-ambiente\Scripts\activate  # Windows
```

4. Instale as dependências:

```
pip install -r requirements.txt
```

## Dependências

As seguintes dependências foram utilizadas na versão atual do projeto:

| Dependência                | Versão    |
|----------------------------|-----------|
| asgiref                    | 3.6.0     |
| certifi                    | 2022.12.7 |
| charset-normalizer         | 3.1.0     |
| coreapi                    | 2.3.3     |
| coreschema                 | 0.0.4     |
| Django                     | 4.2       |
| django-cors-headers        | 3.14.0    |
| django-filter              | 23.2      |
| djangorestframework        | 3.14.0    |
| drf-yasg                   | 1.21.5    |
| idna                       | 3.4       |
| inflection                 | 0.5.1     |
| itypes                     | 1.2.0     |
| Jinja2                     | 3.1.2     |
| Markdown                   | 3.4.3     |
| MarkupSafe                 | 2.1.2     |
| mypy                       | 1.2.0     |
| mypy-extensions            | 1.0.0     |
| packaging                  | 23.1      |
| Pillow                     | 9.5.0     |
| python-decouple            | 3.8       |
| pytz                       | 2023.3    |
| requests                   | 2.28.2    |
| ruamel.yaml                | 0.17.21   |
| ruamel.yaml.clib           | 0.2.7     |
| sqlparse                   | 0.4.3     |
| tomli                      | 2.0.1     |
| typing_extensions          | 4.5.0     |
| uritemplate                | 4.1.1     |
| urllib3                    | 1.26.15   |

## Inicializando o Projeto

Depois de instalar as dependências, você deve executar os seguintes comandos no terminal para ativar o servidor local:

1. Acesse a pasta raiz do seu projeto Django:

```
cd /caminho/para/o/projeto
```

2. Execute o seguinte comando para rodar as migrações do banco de dados:

```
python manage.py migrate
```

3. Por fim, execute o comando para iniciar o servidor local:

```
python manage.py runserver
```

Pronto! O servidor local estará rodando na porta 8000 por padrão.
Acesse o seu navegador e digite "http://localhost:8000" para visualizar a sua aplicação.


