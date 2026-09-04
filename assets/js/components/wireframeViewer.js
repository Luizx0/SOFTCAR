import { el, qs } from '../core/dom.js';
import { WIREFRAMES } from '../data/wireframesData.js';

export function renderWireframes(mountSelector = '#wireframe-mount'){
  const mount = qs(mountSelector); if(!mount) return;

  const grid = el('div', { class: 'wire-grid' }, WIREFRAMES.map(w => el('figure', { class: 'wire-card' }, [ el('img', { src: `assets/img/wireframes/${w.file}`, alt: w.label }), el('figcaption', { class: 'cap' }, w.label) ])));

  mount.replaceWith(grid);
}
