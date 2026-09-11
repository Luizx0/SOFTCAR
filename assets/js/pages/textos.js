import { onReady } from '../core/dom.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderTextPages } from '../components/anchorNav.js';

onReady(() => {
  renderNavbar();
  renderFooter();
  renderTextPages();
});
