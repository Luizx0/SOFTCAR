import { onReady, qs } from '../core/dom.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';

function setupFontSwitcher(){
  const preview = qs('#format-preview');
  const familySelect = qs('#font-family-select');
  const sizeSelect = qs('#font-size-select');
  if(!preview || !familySelect || !sizeSelect) return;
  function apply(){ preview.style.fontFamily = familySelect.value; preview.style.fontSize = sizeSelect.value }
  familySelect.addEventListener('change', apply); sizeSelect.addEventListener('change', apply);
}

onReady(()=>{ renderNavbar(); renderFooter(); setupFontSwitcher(); });
