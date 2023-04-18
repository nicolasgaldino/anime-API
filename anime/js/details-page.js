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
        <img class="anime-img" src="${anime.imagem}" alt="${anime.nome}">
        <h1 class="anime-title">${anime.nome}</h1>
        <h2 class="anime-title">${anime.nome_alternativo}</h2>
        <p class="anime-data-lancamento">Data de lançamento: ${anime.data_lancamento}</p>
        <p class="anime-generos">${anime.generos.map(genero => genero.nome).join(', ')}</p>
        <p class="anime-nota">Nota: ${anime.nota}</p>
        <p class="anime-title">Estúdio: ${anime.estudio}</p>
        <p class="anime-title">Diretor: ${anime.diretor}</p>
        <p class="anime-title">Sinpose: <br> ${anime.sinopse}</p>

      `;
      animeList.appendChild(animeCard);
    });
  })
  .catch(error => console.error('Erro ao carregar animes:', error));
