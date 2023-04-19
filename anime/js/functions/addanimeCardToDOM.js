import { createAnimeCard } from './createAnimeCard.js';

export function addAnimeCardsToDOM(data, animeList = null) {
  if (!data || !animeList) {
    return;
  }

  animeList.innerHTML = '';

  const row = document.createElement('div');
  row.classList.add('row');
  animeList.appendChild(row);

  const animeData = Array.isArray(data) ? data : data.results;
  animeData.forEach(anime => {
    const col = document.createElement('div');
    col.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'g-5');
    row.appendChild(col);

    const animeCard = createAnimeCard(anime);
    col.appendChild(animeCard);
  });
}
