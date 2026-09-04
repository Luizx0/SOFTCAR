/**
 * components/wireframeViewer.js
 * -----------------------------------------------------------------------
 * Responsabilidade única: exibir a grade de wireframes do site e permitir
 * ampliar cada um em um modal simples ao clicar.
 * -----------------------------------------------------------------------
 */
import { el, qs } from '../core/dom.js';
import { WIREFRAMES } from '../data/wireframesData.js';

export function renderWireframes(mountSelector = '#wireframe-mount') {
  const mount = qs(mountSelector);
  if (!mount) return;

  const modal = el('div', { class: 'lightbox', id: 'wf-modal' }, [
    el('button', { class: 'lb-close', 'aria-label': 'Fechar', onclick: () => modal.classList.remove('is-open') }, '✕'),
    el('img', { id: 'wf-modal-img', src: '', alt: '', style: 'background:#fff;padding:1rem;border-radius:6px;' }),
    el('p', { class: 'lb-cap', id: 'wf-modal-cap' }, ''),
  ]);
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('is-open'); });

  const grid = el('div', { class: 'wire-grid' },
    WIREFRAMES.map(w => el('figure', {
      class: 'wire-card',
      onclick: () => {
        qs('#wf-modal-img', modal).src = `assets/img/wireframes/${w.file}`;
        qs('#wf-modal-cap', modal).textContent = `Wireframe — ${w.label}`;
        modal.classList.add('is-open');
      },
    }, [
      el('img', { src: `assets/img/wireframes/${w.file}`, alt: `Wireframe da página ${w.label}` }),
      el('figcaption', { class: 'cap' }, w.label),
    ]))
  );

  mount.replaceWith(grid);
  document.body.appendChild(modal);
}