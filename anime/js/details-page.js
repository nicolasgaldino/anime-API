const animeList = document.querySelector('.anime-detail');
const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get('id');

const url = `http://127.0.0.1:8000/animes/${animeId}/detalhes/`;

const username = 'nicolasEsmael';
const password = '22565721aA!';
const authHeader = 'Basic ' + btoa(username + ':' + password);

fetch(url, {
  headers: {
    'Authorization': authHeader
  }
})
  .then(response => response.json())
  .then(data => {
    data.forEach(anime => {
      const animeCard = document.createElement('div');
      animeCard.id = anime.id; // Adiciona o ID do anime como o ID do elemento
      animeCard.classList.add('anime-card');
      animeCard.innerHTML = `
      <div class="container container-detail bg-light p-4 rounded">
        <div class="row">
          <div class="col-md-6">
            <div class="image-container">
              <img src="${anime.imagem}" class="d-block img-fluid rounded" alt="${anime.nome}">
            </div>
          </div>
          <div class="col-md-6">
            <h1 class="anime-text">${anime.nome}</h1>
            <h2 class="anime-text text-truncate">${anime.nome_alternativo}</h2>
            <p class="anime-text">Gênero: ${anime.generos.map(genero => genero.nome).join(', ')}</p>
            <p class="anime-text">Estúdio: ${anime.estudio}</p>
            <p class="anime-text">Diretor: ${anime.diretor}</p>
            <p class="anime-text">Lançamento: ${moment(anime.data_lancamento).format('DD - MM - YYYY')}</p>
            <p class="anime-text">Nota: ${anime.nota}</p>
          </div>
        </div>
        <p class="sinopse">Sinopse: <br> ${anime.sinopse}</p>
      </div>
      `;
      animeList.appendChild(animeCard);
    });
  })
  .catch(error => console.error('Erro ao carregar animes:', error));