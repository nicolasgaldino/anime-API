const animeList = document.querySelector('.anime-list');
const url = 'http://127.0.0.1:8000/animes/';

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
        <h2 class="anime-title">${anime.nome}</h2>
        <p class="anime-generos">${anime.generos.map(genero => genero.nome).join(', ')}</p>
        <p class="anime-nota">Nota: ${anime.nota}</p>
        <button class="anime-card__button" data-anime-id="${anime.id}">Detalhes</button>
      `;
      animeList.appendChild(animeCard);
    });

    // Adiciona um manipulador de eventos de clique para o botão de detalhes
    const animeDetailButtons = document.querySelectorAll('.anime-card__button');
    animeDetailButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        const animeId = button.dataset.animeId;
        window.location.href = `../../anime/details-page.html?id=${animeId}`;
      });
    });
  })
  .catch(error => console.error('Erro ao carregar animes:', error));
