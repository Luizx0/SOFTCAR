import { el, qs } from '../core/dom.js';
import { EXTERNAL_LINKS } from '../data/externalLinksData.js';

const STORAGE_KEY = 'softcar:visited-links';

function getVisited(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY))||[] }catch{ return [] }}
function markVisited(url){ const v=new Set(getVisited()); v.add(url); localStorage.setItem(STORAGE_KEY, JSON.stringify([...v])); }

export function renderExternalLinks(mountSelector = '#links-mount'){
  const mount = qs(mountSelector); if(!mount) return;
  const visited = new Set(getVisited());

  const grid = el('div', { class: 'links-grid' }, EXTERNAL_LINKS.map(link => el('a', {
    class: `link-card${visited.has(link.url)?' was-visited':''}`,
    href: link.url, target: '_blank', rel: 'noopener noreferrer', onclick: (e)=>{ markVisited(link.url); e.currentTarget.classList.add('was-visited') }
  }, [ el('div', {}, [ el('div', { class: 'l-name' }, link.name), el('div', { class: 'l-desc' }, link.desc), el('span', { class: 'l-visited' }, '✓ visitado') ]), el('span',{ class: 'l-go' }, '↗') ])));

  mount.replaceWith(grid); grid.id = 'links-mount';
}
