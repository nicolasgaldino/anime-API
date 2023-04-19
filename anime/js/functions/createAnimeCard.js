export function createAnimeCard(anime) {
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
