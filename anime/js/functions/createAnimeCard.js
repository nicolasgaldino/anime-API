export function createAnimeCard(anime) {
  const animeCard = document.createElement('div');
  animeCard.classList.add('card', 'anime-card__hover');
  animeCard.innerHTML = `
    <img src="${anime.imagem}" class="card-img-top custom-object-fit" alt="${anime.nome}">
    <div class="card-body">
      <h5 class="card-title text-truncate">
        ${anime.nome}
      </h5>
      <p class="card-text text-truncate">
        Gênero: ${anime.generos.map(genero => genero.nome).join(', ')}
      </p>
      <p class="badge bg-dark">
        Lançamento: ${moment(anime.data_lancamento).format('DD - MM - YYYY')}
      </p>
      <button
        class="anime-card__button btn btn-success anime-card__button"
        data-anime-id="${anime.id}">
          Detalhes
      </button>
    </div>
  `;

  const modal = document.createElement('div');
  modal.classList.add('modal');
  modal.classList.add('modal-oppened');
  modal.innerHTML = `
      <div class="container container-detail bg-light p-4 rounded modal-wrap">
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
            <p class="anime-text icon-paragraph bg-black">
              <i class="icon-mal"></i>
              ${anime.nota}
            </p>
          </div>
        </div>
        <p class="sinopse">Sinopse: <br> ${anime.sinopse}</p>
        <div class="d-flex justify-content-end mt-4">
          <button class="close-button btn btn-secondary">Fechar</button>
        </div>
      </div>
  `;

  document.body.appendChild(modal);

  if (animeCard.querySelector('.anime-card__button')) {
    animeCard.querySelector('.anime-card__button').addEventListener('click', () => {
      modal.style.display = 'block';
      document.body.classList.add('modal-open');
    });
  }

  if (modal.querySelector('.close-button')) {
    modal.querySelector('.close-button').addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    });
  }

  return animeCard;
}
