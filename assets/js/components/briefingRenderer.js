/**
 * components/briefingRenderer.js
 * -----------------------------------------------------------------------
 * Responsabilidade única: transformar os dados de BRIEFING em um
 * acordeão interativo (expandir/recolher cada pergunta).
 * -----------------------------------------------------------------------
 */
import { el, qs, qsa } from '../core/dom.js';
import { BRIEFING } from '../data/briefingData.js';

export function renderBriefing(mountSelector = '#briefing-mount') {
  const mount = qs(mountSelector);
  if (!mount) return;

  const list = el('div', { class: 'briefing-list', id: 'briefing-list' },
    BRIEFING.map((item, i) => {
      const answer = el('div', { class: 'a' }, el('p', {}, item.a));
      const row = el('div', { class: 'briefing-item' }, [
        el('button', {
          class: 'q',
          'aria-expanded': 'false',
          onclick: (e) => {
            const parent = e.currentTarget.closest('.briefing-item');
            parent.classList.toggle('is-open');
            e.currentTarget.setAttribute('aria-expanded', String(parent.classList.contains('is-open')));
          },
        }, [
          el('span', { class: 'n' }, String(i + 1).padStart(2, '0')),
          el('h3', {}, item.q),
          el('span', { class: 'arrow' }, '›'),
        ]),
        answer,
      ]);
      return row;
    })
  );

  const toolbar = el('div', { class: 'briefing-toolbar' }, [
    el('button', { onclick: () => toggleAll(true) }, 'Expandir tudo'),
    el('button', { onclick: () => toggleAll(false) }, 'Recolher tudo'),
  ]);

  function toggleAll(open) {
    qsa('.briefing-item', list).forEach(item => {
      item.classList.toggle('is-open', open);
      qs('.q', item).setAttribute('aria-expanded', String(open));
    });
  }

  const wrapper = el('div', {}, [toolbar, list]);
  mount.replaceWith(wrapper);
  wrapper.id = 'briefing-mount';
}
