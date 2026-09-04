import { qsa, qs, el } from '../core/dom.js';

export function enableTableInteractions(tableSelector = '#specs-table'){
  const table = qs(tableSelector);
  if(!table) return;
  const rows = qsa('tbody tr', table);
  rows.forEach(row => row.addEventListener('click', ()=>{
    const was = row.classList.contains('is-selected'); rows.forEach(r=>r.classList.remove('is-selected')); if(!was) row.classList.add('is-selected');
  }));

  const categories = [...new Set(rows.map(r=> r.dataset.category))];
  const filterBar = qs('#table-filter');
  if(filterBar){
    filterBar.appendChild(el('button', { class: 'is-active', onclick: (e)=> setFilter('all', e.currentTarget) }, 'Todas'));
    categories.forEach(cat => filterBar.appendChild(el('button', { onclick: (e)=> setFilter(cat, e.currentTarget) }, cat)));
  }

  function setFilter(cat, btn){ qsa('button', filterBar).forEach(b=>b.classList.remove('is-active')); btn.classList.add('is-active'); rows.forEach(r=> r.style.display = (cat==='all' || r.dataset.category===cat)? '' : 'none'); }
}
