/**
 * services/pexelsService.js
 * -----------------------------------------------------------------------
 * Camada de infraestrutura (integração externa): a ÚNICA responsabilidade
 * deste módulo é conversar com a API do Pexels e devolver os dados já no
 * formato que o resto do site espera. Nenhum componente de UI faz `fetch`
 * diretamente — eles só chamam `fetchCarPhotos()`.
 *
 * Isso segue o mesmo princípio de `data/`: se um dia trocarmos o Pexels
 * pela Unsplash, por exemplo, só este arquivo muda — o `photoGallery.js`
 * nem precisa saber que a fonte da foto mudou.
 * -----------------------------------------------------------------------
 */
import { PEXELS_API_KEY, PEXELS_QUERIES, PEXELS_PER_PAGE } from '../config/apiConfig.js';

const BASE_URL = 'https://api.pexels.com/v1/search';

/** Converte o formato de foto do Pexels para o formato usado no site. */
function normalizePhoto(photo, query) {
  return {
    id: `pexels-${photo.id}`,
    src: photo.src.large,
    alt: photo.alt && photo.alt.trim() ? photo.alt : `Carro — ${query}`,
    caption: photo.alt && photo.alt.trim() ? photo.alt : query,
    photographer: photo.photographer,
    sourceUrl: photo.url,
  };
}

/** Busca fotos para UM termo de pesquisa. */
async function searchQuery(query, perPage) {
  const url = `${BASE_URL}?query=${encodeURIComponent(query)}&per_page=${perPage}`;
  const response = await fetch(url, {
    headers: { Authorization: PEXELS_API_KEY },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error(`Chave da API do Pexels inválida ou expirada para a busca "${query}"`);
    }

    throw new Error(`Pexels respondeu ${response.status} para a busca "${query}"`);
  }

  const data = await response.json();
  return data.photos.map(photo => normalizePhoto(photo, query));
}

/**
 * Busca fotos de carros combinando várias palavras-chave (PEXELS_QUERIES),
 * para a galeria não ficar repetitiva. Lança um erro se a chave não
 * estiver configurada — quem chama esta função decide o que fazer nesse
 * caso (ver o try/catch em `components/photoGallery.js`).
 */
export async function fetchCarPhotos() {
  if (!PEXELS_API_KEY || PEXELS_API_KEY.includes('COLE_SUA_CHAVE')) {
    throw new Error('Chave da API do Pexels não configurada em assets/js/config/apiConfig.js');
  }

  const perQuery = Math.ceil(PEXELS_PER_PAGE / PEXELS_QUERIES.length);

  // Promise.all dispara as buscas em paralelo (mais rápido do que uma
  // busca esperar a outra terminar) e só continua quando TODAS terminarem.
  const resultsPerQuery = await Promise.all(
    PEXELS_QUERIES.map(query => searchQuery(query, perQuery))
  );

  // .flat() junta os vários arrays (um por busca) em um único array.
  return resultsPerQuery.flat();
}