export function onReady(fn){
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
  else fn();
}

export const qs = (sel, root = document) => root.querySelector(sel);
export const qsa = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function el(tag, attrs = {}, children = []){
  const node = document.createElement(tag);
  for(const k of Object.keys(attrs||{})){
    if (k === 'class') node.className = attrs[k];
    else if (k === 'onclick') node.addEventListener('click', attrs[k]);
    else node.setAttribute(k, attrs[k]);
  }
  if (typeof children === 'string') node.textContent = children;
  else if (Array.isArray(children)) children.forEach(c => node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return node;
}
