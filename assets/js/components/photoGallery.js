import { el, qs } from '../core/dom.js';

export function renderGallery(mountSelector = '#gallery-mount'){
  const mount = qs(mountSelector);
  if(!mount) return;

  const items = Array.from({length:12}).map((_,i)=>({
    id: i+1, title: `Foto ${String(i+1).padStart(2,'0')}`
  }));

  const grid = el('div', { class: 'gallery-grid' }, items.map(it => el('figure', { class: 'gallery-item' }, [
    el('div', { class: 'svg-placeholder' }, it.title)
  ])));

  mount.replaceWith(grid);
}
