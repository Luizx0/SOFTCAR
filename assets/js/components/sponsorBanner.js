/**
 * components/sponsorBanner.js
 * -----------------------------------------------------------------------
 * Responsabilidade única: renderizar a faixa de patrocinadores da home
 * e automatizar um destaque rotativo entre eles (setInterval), cumprindo
 * o requisito de "propagandas de patrocinadores" com um evento automatizado.
 * -----------------------------------------------------------------------
 */
import { el, qs } from '../core/dom.js';
import { SPONSORS } from '../data/sponsorsData.js';

function bannerSvg(sponsor) {
  return `
    <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="120" fill="${sponsor.bg}"/>
      <circle cx="270" cy="20" r="60" fill="${sponsor.accent}" opacity="0.18"/>
      <text x="20" y="58" font-family="Oswald, sans-serif" font-size="26" fill="#fff" font-weight="600">${sponsor.name}</text>
      <text x="20" y="80" font-family="Work Sans, sans-serif" font-size="13" fill="${sponsor.accent}">${sponsor.tagline}</text>
      <rect x="20" y="94" width="34" height="4" fill="${sponsor.accent}"/>
    </svg>`;
}

export function renderSponsorStrip(mountSelector = '#sponsor-strip') {
  const mount = qs(mountSelector);
  if (!mount) return;

  const track = el('div', { class: 'sponsor-track', id: 'sponsor-track' },
    SPONSORS.map((s, i) => el('a', {
      class: 'sponsor-card',
      href: '#',
      'data-index': i,
      'aria-label': `Anúncio de ${s.name}`,
      html: bannerSvg(s),
      onclick: (e) => e.preventDefault(),
    }, [el('span', { class: 'tag' }, 'PATROCINADO')]))
  );

  const wrapper = el('section', { class: 'sponsor-strip' }, [
    el('div', { class: 'wrap' }, [
      el('div', { class: 'strip-head' }, [
        el('h3', { style: 'margin:0;font-size:1.1rem;' }, 'Patrocinadores'),
        el('span', {}, `${SPONSORS.length} parceiros`),
      ]),
      track,
    ]),
  ]);

  mount.replaceWith(wrapper);
  wrapper.id = 'sponsor-strip';

  // Automação: destaca um patrocinador por vez, ciclicamente.
  const cards = Array.from(track.children);
  let current = 0;
  const highlight = (idx) => {
    cards.forEach(c => c.style.outline = 'none');
    cards[idx].style.outline = '3px solid #FFB020';
  };
  highlight(current);
  setInterval(() => {
    current = (current + 1) % cards.length;
    highlight(current);
  }, 2600);
}
