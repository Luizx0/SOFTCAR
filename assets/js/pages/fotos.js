import { onReady } from '../core/dom.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderGallery } from '../components/photoGallery.js';

onReady(() => {
  renderNavbar();
  renderFooter();
  renderGallery();
});
