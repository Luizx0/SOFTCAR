import { el, qs } from '../core/dom.js';

export function renderTextPages(mountSelector = '#text-pages'){
  const mount = qs(mountSelector);
  if(!mount) return;

  const pages = Array.from({length:6}).map((_,i)=>({id:`p${i+1}`, title:`Seção ${i+1}`, body:`Conteúdo de exemplo da seção ${i+1}.` }));

  const nav = el('nav', { class: 'anchor-nav' }, [
    el('p', { class: 'label' }, 'Índice'),
    el('ol', {}, pages.map(p=> el('li', {}, [ el('a', { href: `#${p.id}` }, p.title) ])))
  ]);

  const content = el('div', {}, pages.map(p=> el('article', { id: p.id, class: 'text-page' }, [ el('h2', {}, p.title), el('p', {}, p.body), el('a', { class: 'back-to-top', href: '#top' }, 'Voltar ao topo') ])));

  const layout = el('div', { class: 'anchor-layout' }, [nav, content]);
  mount.replaceWith(layout);
}
