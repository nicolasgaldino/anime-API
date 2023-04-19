const ANIME_LIST = document.querySelector('.container');
const CAROUSEL_INDICATORS = document.querySelector('.carousel-indicators');
const CAROUSEL_INNER = document.querySelector('.carousel-inner');
const URL = 'http://127.0.0.1:8000/animes/?page=1'; // alterado para o novo endpoint
const BASE_URL = 'http://127.0.0.1:8000/animes/';
const USERNAME = 'nicolasEsmael';
const PASSWORD = '22565721aA!';
const AUTH_HEADER = 'Basic ' + btoa(`${USERNAME}:${PASSWORD}`);
const PREVIOUS_PAGE_BUTTON = document.getElementById('previous-page');
const NEXT_PAGE_BUTTON = document.getElementById('next-page');
const PAGE_SIZE = 8;
let currentPage = 1;

PREVIOUS_PAGE_BUTTON.addEventListener('click', fetchPreviousPage);
NEXT_PAGE_BUTTON.addEventListener('click', fetchNextPage);

const fetchJson = async (url, options) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

const fetchAnimeData = async () => {
  try {
    const data = await fetchJson(URL, {
      headers: {
        Authorization: AUTH_HEADER,
      },
    });
    const carouselData = data.results.slice(0, 5); // atualizado para usar a nova estrutura de dados paginados
    CAROUSEL_INDICATORS.innerHTML = carouselData
      .map((_, index) => {
        const active = index === 0 ? 'active' : '';
        return `<button type="button" data-bs-target="#animeCarousel" data-bs-slide-to="${index}" class="${active}" aria-current="${active}"></button>`;
      })
      .join('');
    CAROUSEL_INNER.innerHTML = carouselData
      .map((anime, index) => {
        const active = index === 0 ? 'active' : '';
        return `
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
                    <p>${anime.generos.map((genero) => genero.nome).join(', ')}</p>
                    <p>Nota: ${anime.nota}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  } catch (error) {
    console.error('Erro ao carregar animes:', error);
  }
};


function createAnimeCard(anime) {
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
  animeCard.querySelector('.anime-card__button').addEventListener('click', (event) => {
    event.preventDefault();
    const animeId = anime.id;
    window.location.href = `../../anime/details-page.html?id=${animeId}`;
  });
  return animeCard;
}

function addAnimeCardsToDOM(data) {
  // Limpa a lista de animes antes de adicionar os novos cards
  ANIME_LIST.innerHTML = '';

  const row = document.createElement('div');
  row.classList.add('row');
  ANIME_LIST.appendChild(row);

  const animeData = Array.isArray(data) ? data : data.results;
  animeData.forEach(anime => {
    const col = document.createElement('div');
    col.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'g-5');
    row.appendChild(col);

    const animeCard = createAnimeCard(anime);
    col.appendChild(animeCard);
  });
}

function fetchNextPage() {
  fetch(`${BASE_URL}?page=${currentPage + 1}`, {
    headers: {
      'Authorization': AUTH_HEADER
    }
  })
    .then(response => response.json())
    .then(data => {
      addAnimeCardsToDOM(data.results);
      if (data.results.length < PAGE_SIZE) {
        NEXT_PAGE_BUTTON.style.display = 'none';
      }
      currentPage++;
      localStorage.setItem('currentPage', currentPage);
    })
    .catch(error => console.error('Erro ao carregar animes:', error));
}

function fetchPreviousPage() {
  if (currentPage > 1) {
    fetch(`${BASE_URL}?page=${currentPage - 1}`, {
      headers: {
        'Authorization': AUTH_HEADER
      }
    })
      .then(response => response.json())
      .then(data => {
        addAnimeCardsToDOM(data.results);
        if (data.results.length < PAGE_SIZE) {
          NEXT_PAGE_BUTTON.style.display = 'none';
        }
        currentPage--;
        localStorage.setItem('currentPage', currentPage);
      })
      .catch(error => console.error('Erro ao carregar animes:', error));
  }
}

fetchAnimeData();

fetch(URL, {
  headers: {
    'Authorization': AUTH_HEADER
  }
})
  .then(response => response.json())
  .then(data => addAnimeCardsToDOM(data))
  .catch(error => console.error('Erro ao carregar animes:', error));