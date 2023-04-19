import { addAnimeCardsToDOM } from './addanimeCardToDOM.js';

function fetchNextPage(baseUrl, currentPage, authHeader, pageSize, nextPageButton) {
  fetch(`${baseUrl}?page=${currentPage + 1}`, {
    headers: {
      'Authorization': authHeader
    }
  })
    .then(response => response.json())
    .then(data => {
      addAnimeCardsToDOM(data.results);
      if (data.results.length < pageSize) {
        nextPageButton.style.display = 'none';
      }
      currentPage++;
      localStorage.setItem('currentPage', currentPage);
    })
    .catch(error => console.error('Erro ao carregar animes:', error));
}

export { fetchNextPage }
