import { el, qs } from '../core/dom.js';

const SAMPLE = Array.from({length:17}).map((_,i)=>({
  q: `Pergunta ${i+1}`,
  a: `Resposta exemplo para a pergunta ${i+1}.`,
}));

export function renderBriefing(mountSelector = '#briefing-mount'){
  const mount = qs(mountSelector);
  if(!mount) return;

  const list = el('div', { class: 'briefing-list' }, SAMPLE.map((item, idx) => el('div', { class: 'briefing-item' }, [
    el('button', { class: 'q', onclick: (e)=> e.currentTarget.parentElement.classList.toggle('is-open') }, [
      el('span', { class: 'n' }, String(idx+1).padStart(2,'0')),
      el('h3', {}, item.q),
      el('span', { class: 'arrow' }, '›')
    ]),
    el('div', { class: 'a' }, item.a)
  ])));

  mount.replaceWith(list);
}
