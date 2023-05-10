import { fetchAnimeData } from './functions/fetchAnimeData.js';
import { addAnimeCardsToDOM } from './functions/addanimeCardToDOM.js';

const ANIME_LIST = document.querySelector('.container');
const CAROUSEL_INDICATORS = document.querySelector('.carousel-indicators');
const CAROUSEL_INNER = document.querySelector('.carousel-inner');
const BASE_URL = 'http://127.0.0.1:8000/animes/';
const USERNAME = 'nicolasEsmael';
const PASSWORD = '22565721aA!';
const AUTH_HEADER = 'Basic ' + btoa(`${USERNAME}:${PASSWORD}`);
const PAGE_SIZE = 8;
let currentPage = localStorage.getItem('currentPage') || 1;
let filter = null;

fetchAnimeData(CAROUSEL_INDICATORS, CAROUSEL_INNER, `${BASE_URL}`, AUTH_HEADER);

// Função para atualizar a página atual e salvar no localStorage
function updateCurrentPage(page) {
  currentPage = page;
  localStorage.setItem('currentPage', currentPage);
}

// Por serem funções pequenas decidi mantê-las no JS principal

// ...

// Função para carregar a página atual com o filtro de dublagem
function loadCurrentPage() {
  let url = `${BASE_URL}?page=${currentPage}`;

  if (filter !== null) {
    url += `&dublagem=${filter}`;
  }

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

// Função para alternar entre dublados e legendados
function toggleDublagem() {
  const dublagemButton = document.getElementById('dublagem-button');
  const isDublado = dublagemButton.classList.contains('active');

  // Atualize a variável "filter" com o valor adequado
  if (isDublado) {
    dublagemButton.classList.remove('active');
    dublagemButton.innerText = 'Legendado';
    filter = false; // Legendado
  } else {
    dublagemButton.classList.add('active');
    dublagemButton.innerText = 'Dublado';
    filter = true; // Dublado
  }

  // Chame a função para carregar a página atual
  loadCurrentPage();
}

// Função para limpar o filtro e exibir todos os animes
function limparFiltro() {
  filter = null
  loadCurrentPage(); // Carrega a página atual sem filtro
}

// Adiciona o listener de clique ao botão de limpar filtro
document.querySelector('#limpar-filtro').addEventListener('click', limparFiltro);

// Função para avançar para a próxima página
function nextPage() {
  currentPage++;
  loadCurrentPage();
  updateCurrentPage(currentPage);
}

// Função para voltar para a página anterior
function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    loadCurrentPage();
    updateCurrentPage(currentPage);
  }
}

// Adiciona os listeners de clique nos botões de paginação
document.querySelector('#previous-page').addEventListener('click', previousPage);
document.querySelector('#next-page').addEventListener('click', nextPage);

// Adicione o listener de clique no botão de filtro
document.getElementById('dublagem-button').addEventListener('click', toggleDublagem);

// Carrega a página atual ao carregar a página
loadCurrentPage();
