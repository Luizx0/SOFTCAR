import { el, qs } from '../core/dom.js';

export function renderSponsorStrip(mountSelector = '#sponsor-strip'){
  const mount = qs(mountSelector);
  if(!mount) return;

  const strip = el('div', { class: 'sponsor-strip' }, [
    el('div', { class: 'wrap' }, [
      el('div', { class: 'strip-head' }, [el('span', {}, 'Patrocinadores'), el('div', {}, '')]),
      el('div', { class: 'sponsor-track' }, [
        sponsorCard('AutoParts'),
        sponsorCard('Pneus+'),
        sponsorCard('OficinaX'),
        sponsorCard('SomPro')
      ])
    ])
  ]);

  mount.replaceWith(strip);

  function sponsorCard(name){
    return el('figure', { class: 'sponsor-card' }, [
      el('div', { class: 'tag' }, name),
      el('svg', { viewBox: '0 0 100 100', xmlns: 'http://www.w3.org/2000/svg' }, [
        el('rect', { x: '0', y: '0', width: '100', height: '100', fill: '#fff' })
      ])
    ]);
  }
}
