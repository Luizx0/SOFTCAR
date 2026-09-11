import { onReady } from '../core/dom.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderExternalLinks } from '../components/externalLinksRenderer.js';

onReady(() => {
  renderNavbar();
  renderFooter();
  renderExternalLinks();
});
