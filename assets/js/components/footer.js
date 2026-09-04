import { el, qs } from '../core/dom.js';

export function renderFooter(mountSelector = '#site-footer'){
  const mount = qs(mountSelector);
  if(!mount) return;

  const footer = el('footer', { class: 'site-footer' }, [
    el('div', { class: 'wrap foot-grid' }, [
      el('div', {}, [
        el('h4', {}, 'SOFTCAR'),
        el('p', {}, 'Loja de carros, peças e acessórios — projeto acadêmico.')
      ]),
      el('div', {}, [
        el('h4', {}, 'Menu'),
        el('ul', {}, [
          el('li', {}, [el('a', { href: 'index.html' }, 'Home')]),
          el('li', {}, [el('a', { href: 'empresa.html' }, 'Empresa')]),
          el('li', {}, [el('a', { href: 'fotos.html' }, 'Galeria')])
        ])
      ])
    ]),
    el('div', { class: 'wrap foot-meta' }, [el('div', {}, ['© ', new Date().getFullYear(), ' SOFTCAR'])])
  ]);

  mount.replaceWith(footer);
}
