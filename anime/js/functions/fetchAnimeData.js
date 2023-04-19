import { fetchJson } from './fetchJson.js'

export async function fetchAnimeData(carouselIndicatior, carouselInner, urlApi, authHeader) {
  try {
    const data = await fetchJson(urlApi, {
      headers: {
        Authorization: authHeader,
      },
    });
    const carouselData = data.results.slice(0, 5); // atualizado para usar a nova estrutura de dados paginados
    carouselIndicatior.innerHTML = carouselData
      .map((_, index) => {
        const active = index === 0 ? 'active' : '';
        return `<button type="button" data-bs-target="#animeCarousel" data-bs-slide-to="${index}" class="${active}" aria-current="${active}"></button>`;
      })
      .join('');
    carouselInner.innerHTML = carouselData
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
