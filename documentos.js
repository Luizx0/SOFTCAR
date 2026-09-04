import { onReady } from '../core/dom.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderWireframes } from '../components/wireframeViewer.js';

onReady(() => {
  renderNavbar();
  renderFooter();
  renderWireframes();
});