/**
 * data/photosData.js
 * -----------------------------------------------------------------------
 * Fotos ilustrativas (placeholders) organizadas por categoria. Em um
 * projeto real, `src` apontaria para /assets/img/fotos/*.jpg locais.
 * -----------------------------------------------------------------------
 */
const seedsCarros = [
  'softcar-01','softcar-02','softcar-03','softcar-04','softcar-05',
  'softcar-06','softcar-07','softcar-08','softcar-09','softcar-10',
];
const seedsPecas = [
  'softcar-peca-01','softcar-peca-02','softcar-peca-03','softcar-peca-04',
  'softcar-peca-05','softcar-peca-06','softcar-peca-07','softcar-peca-08',
];
const seedsAcessorios = [
  'softcar-acc-01','softcar-acc-02','softcar-acc-03','softcar-acc-04',
  'softcar-acc-05','softcar-acc-06','softcar-acc-07','softcar-acc-08','softcar-acc-09',
];

function buildEntries(seeds, category) {
  return seeds.map((seed, i) => ({
    seed,
    category,
    caption: `${category} ${String(i + 1).padStart(2, '0')}`,
    src: `https://picsum.photos/seed/${seed}/480/360`,
  }));
}

export const PHOTOS = [
  ...buildEntries(seedsCarros, 'Carro'),
  ...buildEntries(seedsPecas, 'Peça'),
  ...buildEntries(seedsAcessorios, 'Acessório'),
];
