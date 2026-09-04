import { el, qs } from '../core/dom.js';

export function renderNavbar(mountSelector = '#site-header'){
  const mount = qs(mountSelector);
  if(!mount) return;

  const nav = el('nav', { class: 'navbar' }, [
    el('div', { class: 'wrap' }, [
      el('a', { href: 'index.html', class: 'brand' }, [
        el('strong', {}, 'SOFTCAR'),
        ' — loja'
      ]),
      el('div', {}, [
        el('button', { class: 'nav-toggle', 'aria-expanded': 'false', onclick: toggleMenu }, '☰'),
        el('ul', { class: 'nav-links', id: 'nav-links' }, [
          navLink('index.html', 'Home'),
          navLink('empresa.html', 'Empresa'),
          navLink('fotos.html', 'Galeria'),
          navLink('tabela.html', 'Tabela'),
          navLink('links.html', 'Links'),
        ])
      ])
    ])
  ]);

  mount.replaceWith(nav);

  function navLink(href, label){
    const a = el('a', { href }, label);
    if(location.pathname.endsWith(href)) a.setAttribute('aria-current','page');
    return el('li', {}, [a]);
  }

  function toggleMenu(e){
    const btn = e.currentTarget;
    const links = qs('#nav-links');
    links.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', String(links.classList.contains('is-open')));
  }
}
