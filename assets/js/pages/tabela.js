import { onReady } from '../core/dom.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { enableTableInteractions } from '../components/tableInteractions.js';

onReady(()=>{ renderNavbar(); renderFooter(); enableTableInteractions(); });
