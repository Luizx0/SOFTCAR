/**
 * core/dom.js
 * -----------------------------------------------------------------------
 * Camada de infraestrutura: pequenas funções utilitárias de acesso ao DOM.
 * Nenhuma regra de negócio vive aqui — só helpers reaproveitáveis.
 * (Princípio SRP: este módulo tem uma única razão para mudar — a forma
 * como manipulamos o DOM.)
 * -----------------------------------------------------------------------
 */
export const qs  = (sel, ctx = document) => ctx.querySelector(sel);
export const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/** Cria um elemento com atributos e filhos de forma declarativa. */
export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'class') node.className = value;
    else if (key === 'html') node.innerHTML = value;
    else if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
    } else if (value !== undefined && value !== null) {
      node.setAttribute(key, value);
    }
  }
  const kids = Array.isArray(children) ? children : [children];
  kids.forEach(child => {
    if (child === null || child === undefined) return;
    node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  });
  return node;
}

/** Dispara `fn` quando o DOM estiver pronto (evita depender de posição do <script>). */
export function onReady(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}
