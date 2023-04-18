const animeList = document.querySelector('.container');
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
    const carouselData = data.slice(0, 5); // Use os primeiros 5 animes para o carrossel

    // Adicione as informações de cada anime ao carrossel
    const carouselIndicators = document.querySelector('.carousel-indicators');
    const carouselInner = document.querySelector('.carousel-inner');
    carouselData.forEach((anime, index) => {
      const active = index === 0 ? 'active' : '';
      carouselIndicators.innerHTML += `<button type="button" data-bs-target="#animeCarousel" data-bs-slide-to="${index}" class="${active}" aria-current="${active}"></button>`;
      carouselInner.innerHTML += `
      <div class="carousel-item ${active}">
        <div class="row">
          <div class="col-md-6">
            <div class="image-container">
              <img src="${anime.imagem}" class="d-block img-fluid" alt="${anime.nome}">
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex flex-column justify-content-start align-items-start h-100">
              <div class="fade-container rounded"></div>
              <div class="text-container rounded">
                <h5>${anime.nome}</h5>
                <p>${anime.generos.map(genero => genero.nome).join(', ')}</p>
                <p>Nota: ${anime.nota}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    });
  })
  .catch(error => console.error('Erro ao carregar animes:', error));

fetch(url, {
  headers: {
    'Authorization': authHeader
  }
})
  .then(response => response.json())
  .then(data => {
    const row = document.createElement('div');
    row.classList.add('row');
    animeList.appendChild(row);

    data.forEach(anime => {
      const col = document.createElement('div');
      col.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'g-5');
      row.appendChild(col);

    const animeCard = document.createElement('div');
    animeCard.classList.add('card', 'anime-card__hover');
    animeCard.innerHTML = `
    <img src="${anime.imagem}" class="card-img-top custom-object-fit" alt="${anime.nome}">
    <div class="card-body">
      <h5 class="card-title text-truncate">${anime.nome}</h5>
      <p class="card-text">Nota: ${anime.nota}</p>
      <p class="badge bg-dark">Lançamento: ${moment(anime.data_lancamento).format('DD - MM - YYYY')}</p>
      <button class="anime-card__button btn btn-success anime-card__button" data-anime-id="${anime.id}">Detalhes</button>
    </div>
    `;
      col.appendChild(animeCard);
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