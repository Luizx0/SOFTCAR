/**
 * components/anchorNav.js
 * -----------------------------------------------------------------------
 * Responsabilidade única: montar a página de texto com 14 seções e um
 * índice de âncoras, e automatizar o destaque do item ativo enquanto o
 * usuário rola a página (IntersectionObserver) — item 6 do enunciado.
 * -----------------------------------------------------------------------
 */
import { el, qs, qsa } from '../core/dom.js';
import { TEXT_PAGES } from '../data/textPagesData.js';

export function renderTextPages(mountSelector = '#text-mount') {
  const mount = qs(mountSelector);
  if (!mount) return;

  const nav = el('nav', { class: 'anchor-nav', id: 'top', 'aria-label': 'Índice das 14 seções' }, [
    el('p', { class: 'label' }, 'ÍNDICE'),
    el('ol', {}, TEXT_PAGES.map(p => el('li', {}, [
      el('a', { href: `#${p.id}`, 'data-target': p.id }, p.title),
    ]))),
  ]);

  const sections = el('div', {}, TEXT_PAGES.map(p => el('article', { class: 'text-page', id: p.id }, [
    el('span', { class: 'meta' }, `SOFTCAR — leitura`),
    el('h2', {}, p.title),
    el('p', {}, p.body),
  ])));

  const backTop = el('a', { class: 'back-to-top', href: '#top' }, '↑ Voltar ao início');
  const content = el('div', {}, [sections, backTop]);

  const layout = el('div', { class: 'anchor-layout' }, [nav, content]);
  mount.replaceWith(layout);
  layout.id = 'text-mount';

  // Automação: destaca no índice a seção visível na tela (scrollspy).
  const links = qsa('a[data-target]', nav);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = links.find(l => l.dataset.target === entry.target.id);
      if (!link) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  qsa('.text-page', sections).forEach(section => observer.observe(section));
}
