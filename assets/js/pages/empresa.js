import { onReady } from '../core/dom.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderBriefing } from '../components/briefingRenderer.js';

onReady(()=>{
  renderNavbar(); renderFooter(); renderBriefing();
});
