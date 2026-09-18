/**
 * components/photoGallery.js
 * -----------------------------------------------------------------------
 * Responsabilidade única: renderizar a grade de fotos (3 colunas, mesmo
 * tamanho) e o comportamento do lightbox (abrir, fechar, navegar).
 * -----------------------------------------------------------------------
 */
import { el, qs } from '../core/dom.js';
import { PHOTOS } from '../data/photosData.js';
import { fetchCarPhotos } from '../Api/pexelsservice.js';

export async function renderGallery(mountSelector = '#gallery-mount') {
  const mount = qs(mountSelector);
  if (!mount) return;

  let openIndex = 0;
  let galleryPhotos = [...PHOTOS];

  try {
    const photosFromApi = await fetchCarPhotos();
    if (Array.isArray(photosFromApi) && photosFromApi.length > 0) {
      galleryPhotos = photosFromApi;
    }
  } catch (error) {
    console.warn('Não foi possível carregar fotos do Pexels, mantendo fallback local:', error.message);
  }

  const lightbox = el('div', { class: 'lightbox', id: 'lightbox' }, [
    el('button', { class: 'lb-close', 'aria-label': 'Fechar', onclick: closeLightbox }, '✕'),
    el('img', { id: 'lb-img', src: '', alt: '' }),
    el('p', { class: 'lb-cap', id: 'lb-cap' }, ''),
  ]);
  const lbControls = el('div', { class: 'lb-controls', id: 'lb-controls', style: 'display:none;' }, [
    el('button', { class: 'lb-nav', 'aria-label': 'Foto anterior', onclick: () => step(-1) }, '‹'),
    el('button', { class: 'lb-nav', 'aria-label': 'Próxima foto', onclick: () => step(1) }, '›'),
  ]);

  const grid = el('div', { class: 'gallery-grid' },
    galleryPhotos.map((p, i) => el('figure', {
      class: 'gallery-item',
      tabindex: '0',
      onclick: () => openLightbox(i),
      onkeydown: (e) => { if (e.key === 'Enter') openLightbox(i); },
    }, [
      el('img', { src: p.src, alt: `${p.caption} — ${p.category || 'Carro'} SOFTCAR`, loading: 'lazy' }),
      el('figcaption', { class: 'cap' }, p.caption),
    ]))
  );

  function openLightbox(i) {
    openIndex = i;
    updateLightbox();
    lightbox.classList.add('is-open');
    lbControls.style.display = 'flex';
    document.addEventListener('keydown', onKey);
  }
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lbControls.style.display = 'none';
    document.removeEventListener('keydown', onKey);
  }
  function step(dir) {
    openIndex = (openIndex + dir + galleryPhotos.length) % galleryPhotos.length;
    updateLightbox();
  }
  function updateLightbox() {
    const p = galleryPhotos[openIndex];
    qs('#lb-img', lightbox).src = p.src;
    qs('#lb-img', lightbox).alt = p.caption;
    qs('#lb-cap', lightbox).textContent = `${p.caption} — foto ${openIndex + 1} de ${galleryPhotos.length}`;
  }
  function onKey(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  }
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  mount.replaceWith(grid);
  document.body.appendChild(lightbox);
  document.body.appendChild(lbControls);
}
