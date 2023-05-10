import { fetchAnimeData } from './functions/fetchAnimeData.js';
import { addAnimeCardsToDOM } from './functions/addanimeCardToDOM.js';

const ANIME_LIST = document.querySelector('.container');
const CAROUSEL_INDICATORS = document.querySelector('.carousel-indicators');
const CAROUSEL_INNER = document.querySelector('.carousel-inner');

const BASE_URL = 'http://127.0.0.1:8000/animes/';
const USERNAME = 'nicolasEsmael';
const PASSWORD = '22565721aA!';
const AUTH_HEADER = 'Basic ' + btoa(`${USERNAME}:${PASSWORD}`);
let currentPage = localStorage.getItem('currentPage') || 1;
let filter = null;

fetchAnimeData(CAROUSEL_INDICATORS, CAROUSEL_INNER, BASE_URL, AUTH_HEADER);

function updateCurrentPage(page) {
  currentPage = page;
  localStorage.setItem('currentPage', currentPage);
}

function buildAPIUrl() {
  let url = `${BASE_URL}?page=${currentPage}`;

  if (filter !== null) {
    url += `&dublagem=${filter}`;
  }

  return url;
}

function fetchAnimeDataAndAddToDOM(url) {
  fetch(url, {
    headers: {
      'Authorization': AUTH_HEADER
    }
  })
    .then(response => response.json())
    .then(data => {
      if (data.results.length === 0) {
        console.log('Não existem mais animes.');
      } else {
        addAnimeCardsToDOM(data, ANIME_LIST);
      }
    })
    .catch(error => console.error('Erro ao carregar animes:', error));
}

function loadCurrentPage() {
  const url = buildAPIUrl();
  fetchAnimeDataAndAddToDOM(url);
}

function toggleDublagem() {
  const dublagemButton = document.getElementById('dublagem-button');
  const isDublado = dublagemButton.classList.contains('active');

  if (isDublado) {
    dublagemButton.classList.remove('active');
    dublagemButton.innerText = 'Legendado';
    filter = false; // Legendado
  } else {
    dublagemButton.classList.add('active');
    dublagemButton.innerText = 'Dublado';
    filter = true; // Dublado
  }

  loadCurrentPage();
}

function limparFiltro() {
  filter = null;
  loadCurrentPage();
}

function nextPage() {
  currentPage++;
  loadCurrentPage();
  updateCurrentPage(currentPage);
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    loadCurrentPage();
    updateCurrentPage(currentPage);
  }
}

document.querySelector('#previous-page').addEventListener('click', previousPage);
document.querySelector('#next-page').addEventListener('click', nextPage);
document.getElementById('dublagem-button').addEventListener('click', toggleDublagem);
document.getElementById('limpar-filtro').addEventListener('click', limparFiltro);

loadCurrentPage();
