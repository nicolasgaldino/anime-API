import { fetchAnimeData } from './functions/fetchAnimeData.js';
import { fetchNextPage } from './functions/fetchNextPage.js';
import { fetchPreviousPage } from './functions/fetchPreviousPage.js';
import { addAnimeCardsToDOM } from './functions/addanimeCardToDOM.js';

const ANIME_LIST = document.querySelector('.container');
const CAROUSEL_INDICATORS = document.querySelector('.carousel-indicators');
const CAROUSEL_INNER = document.querySelector('.carousel-inner');
const URL = 'http://127.0.0.1:8000/animes/?page=1';
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

fetchAnimeData(CAROUSEL_INDICATORS, CAROUSEL_INNER, URL, AUTH_HEADER)

fetchNextPage(BASE_URL, currentPage, AUTH_HEADER, PAGE_SIZE, NEXT_PAGE_BUTTON)

fetchPreviousPage(BASE_URL, currentPage, AUTH_HEADER, PAGE_SIZE, NEXT_PAGE_BUTTON)

fetch(URL, {
  headers: {
    'Authorization': AUTH_HEADER
  }
})
  .then(response => response.json())
  .then(data => addAnimeCardsToDOM(data, ANIME_LIST))
  .catch(error => console.error('Erro ao carregar animes:', error));