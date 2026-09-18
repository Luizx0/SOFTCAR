/**
 * config/apiConfig.js
 * -----------------------------------------------------------------------
 * Configuração da integração com a API de fotos (Pexels).
 *
 * ?? IMPORTANTE — leia antes de apresentar o projeto:
 * 1. Crie uma conta gratuita em https://www.pexels.com/api/ e gere sua
 *    própria chave (API Key).
 * 2. Cole a chave na constante PEXELS_API_KEY abaixo, no lugar do texto
 *    "COLE_SUA_CHAVE_AQUI".
 * 3. Como este é um site 100% front-end (sem servidor próprio), a chave
 *    fica visível no código-fonte para quem inspecionar a página — isso é
 *    aceitável para um projeto acadêmico, mas NÃO é uma prática recomendada
 *    para um site em produção (o ideal, nesse caso, seria esconder a chave
 *    atrás de um backend). Vale comentar esse ponto na apresentação.
 * 4. Se a chave não for configurada (ou a API estiver fora do ar), o site
 *    continua funcionando: a galeria cai automaticamente para as fotos de
 *    exemplo locais (ver `data/photosData.js` e o try/catch em
 *    `services/pexelsService.js`).
 * -----------------------------------------------------------------------
 */
export const PEXELS_API_KEY = 'COLE_SUA_CHAVE_AQUI';

/** Termos de busca combinados para trazer variedade de carros. */
export const PEXELS_QUERIES = ['sports car', 'luxury car', 'classic car', 'suv car'];

/** Total aproximado de fotos buscadas (dividido entre as buscas acima). */
export const PEXELS_PER_PAGE = 28;
