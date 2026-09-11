import { onReady, qs, el } from '../core/dom.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';

const STYLES = ['disc', 'circle', 'square', 'decimal', 'lower-roman', 'upper-alpha'];

function setupListSwitcher() {
  const switchBar = qs('#list-switch');
  const list = qs('#switchable-list');
  if (!switchBar || !list) return;

  STYLES.forEach((style, i) => {
    const btn = el('button', {
      class: i === 0 ? 'is-active' : '',
      onclick: (e) => {
        list.style.listStyleType = style;
        Array.from(switchBar.children).forEach(b => b.classList.remove('is-active'));
        e.currentTarget.classList.add('is-active');
      },
    }, style);
    switchBar.appendChild(btn);
  });
}

onReady(() => {
  renderNavbar();
  renderFooter();
  setupListSwitcher();
});
