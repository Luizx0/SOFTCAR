/**
 * pages/home.js — ponto de composição da Home.
 * Cada página tem um bootstrap próprio e enxuto: ele só decide QUAIS
 * componentes montar, sem conhecer os detalhes de implementação deles.
 */
import { onReady } from '../core/dom.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderSponsorStrip } from '../components/sponsorBanner.js';

onReady(() => {
  renderNavbar();
  renderFooter();
  renderSponsorStrip();
});
