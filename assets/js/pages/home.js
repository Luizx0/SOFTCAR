import { onReady } from '../core/dom.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderSponsorStrip } from '../components/sponsorBanner.js';

onReady(()=>{
  renderNavbar(); renderFooter(); renderSponsorStrip();
});
