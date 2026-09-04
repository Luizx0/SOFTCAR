import { el, qs } from '../core/dom.js';

const NAV_STRUCTURE = [
  { label: 'Home', href: 'index.html' },
  { label: 'Empresa', items: [ { label: 'Sobre', href: 'empresa.html' }, { label: 'Documentos', href: 'documentos.html' } ] },
  { label: 'Produtos', items: [ { label: 'Galeria', href: 'fotos.html' }, { label: 'Tabela', href: 'tabela.html' }, { label: 'Listas', href: 'listas.html' } ] },
  { label: 'Conteúdo', items: [ { label: 'Textos', href: 'textos.html' }, { label: 'Formatos', href: 'formatos.html' }, { label: 'Links', href: 'links.html' } ] },
];

export function renderNavbar(mountSelector = '#site-header'){
  const mount = qs(mountSelector);
  if(!mount) return;

  const nav = el('nav', { class: 'navbar' }, [
    el('div', { class: 'wrap' }, [
      el('a', { href: 'index.html', class: 'brand' }, [ el('strong', {}, 'SOFTCAR'), ' — loja' ]),
      el('div', {}, [
        el('button', { class: 'nav-toggle', 'aria-expanded': 'false', onclick: toggleMenu }, '☰'),
        el('ul', { class: 'nav-links', id: 'nav-links' }, NAV_STRUCTURE.map(node => renderNode(node)))
      ])
    ])
  ]);

  mount.replaceWith(nav);

  function renderNode(node){
    if (node.items && node.items.length){
      const sub = el('ul', { class: 'sub-links' }, node.items.map(i => el('li', {}, [ linkEl(i.href, i.label) ])));
      const btn = el('button', { class: 'group-toggle', onclick: (e)=> { e.currentTarget.parentElement.classList.toggle('open'); } }, node.label + ' ▾');
      return el('li', { class: 'nav-group' }, [ btn, sub ]);
    }
    return el('li', {}, [ linkEl(node.href, node.label) ]);
  }

  function linkEl(href, label){
    const a = el('a', { href }, label);
    if (location.pathname.endsWith(href)) a.setAttribute('aria-current', 'page');
    return a;
  }

  function toggleMenu(e){
    const btn = e.currentTarget; const links = qs('#nav-links'); links.classList.toggle('is-open'); btn.setAttribute('aria-expanded', String(links.classList.contains('is-open')));
  }
}
