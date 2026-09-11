/**
 * components/navbar.js
 * -----------------------------------------------------------------------
 * Responsabilidade única: montar a barra de navegação a partir dos dados
 * em core/constants.js e reagir aos eventos do usuário (abrir/fechar menu
 * mobile, destacar a página atual). Nenhuma outra parte do site depende
 * deste módulo — ele só é "chamado" pelas páginas (Dependency Inversion:
 * as páginas dependem da função pública `renderNavbar`, não de detalhes).
 * -----------------------------------------------------------------------
 */
import { el, qs } from '../core/dom.js';
import { SITE_NAME, NAV_ITEMS } from '../core/constants.js';

function currentFile() {
  const path = window.location.pathname.split('/').pop();
  return path === '' ? 'index.html' : path;
}

function buildLogo() {
  return el('span', { html: `
    <svg viewBox="0 0 40 30" aria-hidden="true">
      <polygon points="2,22 8,9 32,9 38,22 38,26 2,26" fill="none" stroke="#FFB020" stroke-width="2.2"/>
      <circle cx="11" cy="26" r="3" fill="#FFB020"/>
      <circle cx="29" cy="26" r="3" fill="#FFB020"/>
    </svg>` });
}

export function renderNavbar(mountSelector = '#site-header') {
  const mount = qs(mountSelector);
  if (!mount) return;

  const active = currentFile();

  const links = el('ul', { class: 'nav-links', id: 'nav-links' },
    NAV_ITEMS.map(item => el('li', {}, [
      el('a', {
        href: item.href,
        'aria-current': item.href === active ? 'page' : undefined,
      }, item.label),
    ]))
  );

  const brand = el('a', { class: 'brand', href: 'index.html' }, [
    buildLogo(),
    el('span', {}, [SITE_NAME.slice(0, 4), el('strong', {}, SITE_NAME.slice(4))]),
  ]);

  const toggle = el('button', {
    class: 'nav-toggle',
    'aria-expanded': 'false',
    'aria-controls': 'nav-links',
    'aria-label': 'Abrir menu de navegação',
    onclick: (e) => {
      const isOpen = links.classList.toggle('is-open');
      e.currentTarget.setAttribute('aria-expanded', String(isOpen));
      e.currentTarget.textContent = isOpen ? '✕' : '☰';
    },
  }, '☰');

  const nav = el('nav', { class: 'navbar' }, [
    el('div', { class: 'wrap' }, [brand, links, toggle]),
  ]);

  mount.replaceWith(nav);
  nav.id = 'site-header';
}
