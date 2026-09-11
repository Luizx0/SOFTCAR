# SOFTCAR — Explicação Arquivo a Arquivo

Este documento explica o que **cada arquivo do projeto** faz e, nos trechos
mais complexos, explica linha a linha (ou bloco a bloco) o que o código está
executando. Use-o para estudar antes da apresentação — a ideia é que
qualquer integrante consiga explicar qualquer arquivo, se o professor
perguntar.

> Convenção usada no texto: quando eu mostro um trecho de código, as linhas
> vêm numeradas como aparecem no arquivo real, para você conseguir achar
> rápido.

---

## Sumário

1. [Páginas HTML](#1-páginas-html)
2. [CSS](#2-css)
3. [JavaScript — `core/`](#3-javascript--core)
4. [JavaScript — `data/`](#4-javascript--data)
5. [JavaScript — `components/`](#5-javascript--components)
6. [JavaScript — `pages/`](#6-javascript--pages)
7. [Imagens — `img/wireframes/`](#7-imagens--imgwireframes)
8. [Perguntas frequentes sobre o código](#8-perguntas-frequentes-sobre-o-código)

---

## 1. Páginas HTML

Todas as 9 páginas (`index.html`, `empresa.html`, `fotos.html`, `textos.html`,
`listas.html`, `documentos.html`, `formatos.html`, `links.html`,
`tabela.html`) seguem o **mesmo esqueleto**:

```html
<header id="site-header"></header>   <!-- vazio: o navbar.js preenche -->
<main> ... conteúdo específico da página ... </main>
<footer id="site-footer"></footer>   <!-- vazio: o footer.js preenche -->
<script type="module" src="assets/js/pages/NOME-DA-PAGINA.js"></script>
```

Ou seja: **o `<header>` e o `<footer>` começam vazios no HTML** — eles não
têm o menu nem os links escritos ali. Quem preenche esses elementos é o
JavaScript (por isso o site "não funciona" se abrir sem servidor local: sem
os módulos JS carregando, o `<header>` e o `<footer>` ficam vazios para
sempre).

Isso evita repetir o mesmo HTML de menu/rodapé nove vezes — se o menu mudar,
você edita **um único lugar** (`core/constants.js`), não nove arquivos.

Abaixo, o que cada página tem de específico:

- **`index.html`** — hero (título de destaque), `<div id="sponsor-strip">`
  vazia (o `sponsorBanner.js` preenche com as propagandas) e uma seção de
  cards de destaque com links para as outras páginas.
- **`empresa.html`** — só um `<div id="briefing-mount">` vazio; todo o
  acordeão de perguntas e respostas é montado pelo `briefingRenderer.js`.
- **`fotos.html`** — um `<div id="gallery-mount">` vazio; a grade de 27
  fotos e o lightbox são montados pelo `photoGallery.js`.
- **`textos.html`** — um `<div id="text-mount">` vazio; o índice de âncoras
  e as 14 seções de texto são montados pelo `anchorNav.js`.
- **`listas.html`** — é a página com **mais HTML escrito à mão**, porque os
  diferentes tipos de lista (`<ol type="a">`, `<ul style="list-style-type:
  circle">`, `<dl>`) são mais fáceis de ler direto no HTML do que gerados
  por JS. Só o último card (lista com botões de troca de marcador) depende
  de JavaScript (`pages/listas.js`).
- **`documentos.html`** — um `<div id="wireframe-mount">` vazio; a grade de
  wireframes e o modal de ampliação vêm do `wireframeViewer.js`.
- **`formatos.html`** — o texto formatado (negrito, itálico etc.) está
  escrito direto no HTML, dentro de `<div id="format-preview">`, porque é
  conteúdo estático. Só os `<select>` de fonte/tamanho no topo da página têm
  comportamento em JS (`pages/formatos.js`).
- **`links.html`** — um `<div id="links-mount">` vazio; os 10 cartões de
  link vêm do `externalLinksRenderer.js`.
- **`tabela.html`** — é a **segunda página com mais HTML manual**: a tabela
  inteira (`<table id="specs-table">`), com todos os `rowspan`/`colspan`,
  está escrita diretamente no HTML (explicado em detalhe na seção 1.1
  abaixo). O JavaScript só adiciona a interatividade por cima dela.

### 1.1 `tabela.html` — como funcionam os `rowspan` e `colspan`

Este é o trecho mais "matemático" do projeto. A tabela tem **5 colunas e 15
linhas** (1 de cabeçalho + 14 de dados). Veja este pedaço:

```html
<tr data-category="Motor">
  <td class="cat-motor" rowspan="3"><strong>Motor</strong></td>
  <td class="cat-motor">Óleo 5W30 sintético</td>
  <td class="cat-motor">Troca a cada 10.000&nbsp;km</td>
  <td class="cat-motor">Disponível</td>
  <td class="cat-motor">R$ 89,90</td>
</tr>
<tr data-category="Motor">
  <td class="cat-motor alt">Filtro de óleo</td>
  <td class="cat-motor alt">Compatível com linha leve</td>
  <td class="cat-motor alt">Disponível</td>
  <td class="cat-motor alt">R$ 34,50</td>
</tr>
```

- `rowspan="3"` na primeira `<td>` da categoria **"Motor"** diz ao navegador:
  "esta célula ocupa o espaço de 3 linhas para baixo". Por isso, **a
  segunda `<tr>` do grupo Motor não tem uma célula de categoria** — ela
  começa direto em "Filtro de óleo". Se você colocasse uma célula de
  categoria nas 3 linhas, o navegador entenderia que a tabela tem 6 colunas
  ali, e o layout quebraria.
- Sempre que uma célula usa `rowspan`, **as linhas seguintes do mesmo grupo
  têm uma célula a menos** (a categoria "some" visualmente porque já foi
  desenhada, mas ocupa espaço reservado).
- O `colspan="2"` aparece em linhas como esta:

```html
<tr data-category="Motor">
  <td class="cat-motor" colspan="2">Correia dentada — revisar a cada 60.000&nbsp;km</td>
  <td class="cat-motor">Sob encomenda</td>
  <td class="cat-motor">R$ 210,00</td>
</tr>
```
  Aqui a categoria "Motor" já foi coberta pelo `rowspan="3"` da primeira
  linha (então essa linha não tem célula de categoria), e a célula "Correia
  dentada..." usa `colspan="2"` para **juntar visualmente as colunas "Item"
  e "Especificação"** em uma célula só. Por isso a linha tem só 3 `<td>`,
  mas soma 4 colunas de largura (2 + 1 + 1) — que é exatamente o espaço que
  sobrou depois da coluna "Categoria" já estar ocupada pelo `rowspan`.
- No total, a tabela tem **5 grupos com `rowspan`** (Motor=3, Suspensão=2,
  Freios=3, Elétrica=2, Acessórios=4 linhas) e **4 células com `colspan="2"`**
  — acima do mínimo de 4 mesclagens de cada tipo pedido no enunciado.
- As classes `cat-motor`, `cat-susp`, `cat-freios`, `cat-eletrica`,
  `cat-acessorios` (e a variante `.alt`) dão cores de fundo diferentes por
  categoria e por linha (ver seção 2 sobre o CSS). O atributo
  `data-category="Motor"` em cada `<tr>` não afeta a aparência — ele existe
  só para o JavaScript de filtro (`tableInteractions.js`) saber a qual
  categoria aquela linha pertence.

---

## 2. CSS

### 2.1 `assets/css/variables.css`

Define **tokens de design**: valores reaproveitados no site inteiro, para
não escrever a mesma cor ou fonte várias vezes.

```css
:root {
  --c-asphalt-900: #15161A;
  --c-amber-500:   #FFB020;
  --f-display: "Oswald", "Arial Narrow", sans-serif;
  --f-body:    "Work Sans", "Segoe UI", sans-serif;
  ...
}
```

- `:root` é um seletor especial que representa a tag `<html>`. Variáveis
  declaradas ali (`--nome-da-variavel: valor;`) ficam disponíveis em
  **qualquer outro arquivo CSS do site**, usadas como `var(--nome-da-
  variavel)`.
- Vantagem prática: se o grupo decidir trocar a cor âmbar por outra, muda
  **uma linha aqui** e o site inteiro atualiza (botões, links ativos do
  menu, bordas da tabela etc.), porque todos usam `var(--c-amber-500)` em
  vez do código de cor escrito direto.

### 2.2 `assets/css/style.css`

É o CSS principal, dividido em blocos com comentários (`/* ---------- Nome
do bloco ---------- */`) — reset, layout, navbar, rodapé, botões, hero,
galeria, briefing, textos com âncora, listas, documentos, formatos, links,
tabela e utilidades.

Trechos que merecem explicação extra:

**a) Importação de fontes e do arquivo de variáveis:**
```css
@import url('variables.css');
@import url('https://fonts.googleapis.com/css2?family=Oswald:...');
```
`@import` precisa ficar **sempre nas primeiras linhas do arquivo**, antes de
qualquer outra regra — por isso essas duas linhas são as duas primeiras do
`style.css`.

**b) Menu mobile escondido com `max-height`:**
```css
.nav-links {
  max-height: 0;
  overflow: hidden;
  transition: max-height .25s ease;
}
.nav-links.is-open { max-height: 480px; }
```
Não dá para animar `display: none` → `display: block` suavemente em CSS
puro. Por isso o truque é: o menu começa com `max-height: 0` (altura zero,
conteúdo cortado) e, quando o JavaScript (`navbar.js`) adiciona a classe
`is-open`, o `max-height` some para `480px` — como tem `transition`, o
navegador anima esse crescimento, dando a sensação de "menu abrindo".

**c) Índice de textos com numeração automática (`counter`):**
```css
.anchor-nav ol { counter-reset: pg; }
.anchor-nav li { counter-increment: pg; }
.anchor-nav a::before { content: counter(pg) ". "; }
```
Isso cria uma numeração "1. 2. 3. ..." **sem precisar digitar os números no
HTML**. `counter-reset: pg` zera um contador chamado `pg` no início da
lista; cada `<li>` soma 1 a esse contador (`counter-increment`); e o
pseudo-elemento `::before` de cada link escreve o valor atual do contador
antes do texto do link.

**d) Cores por categoria da tabela:**
```css
.cat-motor    { background: #FDECC8; }
.cat-motor.alt{ background: #FBE0A8; }
```
Cada categoria tem uma cor "base" e uma variante `.alt` um pouco mais
escura, aplicada nas linhas alternadas dentro do mesmo grupo — é assim que
cada célula acaba com uma cor um pouco diferente das vizinhas, mesmo dentro
da mesma categoria.

**e) `scroll-margin-top` nas seções de texto:**
```css
.text-page { scroll-margin-top: 88px; }
```
Sem isso, ao clicar num link do índice (`#pg05`, por exemplo), a seção
apareceria **colada atrás do menu fixo** (que é `sticky`). O
`scroll-margin-top: 88px` diz ao navegador "pare 88px antes do topo real da
seção", deixando espaço para o menu não cobrir o título.

**f) Acessibilidade — `prefers-reduced-motion`:**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.001ms !important; }
}
```
Para usuários que configuraram o sistema para reduzir animações (uma
preferência de acessibilidade), o site praticamente desliga todas as
transições e animações.

---

## 3. JavaScript — `core/`

Esses dois arquivos **não sabem nada sobre carros, peças ou SOFTCAR** — só
sabem manipular o DOM de forma genérica. É a camada mais "reutilizável" do
projeto.

### 3.1 `core/dom.js`

```js
export const qs  = (sel, ctx = document) => ctx.querySelector(sel);
export const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
```
- `qs` é um apelido curto para `document.querySelector`, que busca **o
  primeiro elemento** que combina com o seletor CSS passado.
- `qsa` faz o mesmo, mas para **todos os elementos** (`querySelectorAll`), e
  já converte o resultado em um Array de verdade com `Array.from(...)` —
  isso importa porque o resultado "cru" do `querySelectorAll` não tem
  métodos como `.map()` ou `.forEach()` tão completos quanto um Array.
- O segundo parâmetro `ctx = document` é um **valor padrão**: se você
  chamar só `qs('.foo')`, ele busca em toda a página; se chamar
  `qs('.foo', algumElemento)`, busca só dentro daquele elemento.

```js
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
```
Esta é a função **mais usada em todo o projeto** — quase todo componente
chama `el(...)` para criar elementos HTML "na mão", sem usar `innerHTML`
diretamente (o que seria mais arriscado e mais difícil de organizar).

Explicando por partes:

1. `document.createElement(tag)` cria o elemento (por exemplo, `el('div',
   ...)` cria uma `<div>` de verdade, ainda vazia e fora da página).
2. `Object.entries(attrs)` transforma o objeto de atributos, por exemplo
   `{ class: 'btn', href: '#' }`, em uma lista de pares `[chave, valor]`
   para conseguirmos percorrer com `for...of`.
3. Dentro do loop, a função decide o que fazer com cada atributo:
   - Se a chave for `'class'`, usa `node.className = value` (porque em
     JavaScript o atributo `class` do HTML se chama `className` no DOM).
   - Se a chave for `'html'`, usa `innerHTML` — usado quando queremos
     inserir HTML pronto (como os SVGs dos patrocinadores).
   - Se a chave **começar com `'on'`** (como `onclick`, `onkeydown`) **e o
     valor for uma função**, ele registra um "escutador de evento" de
     verdade com `addEventListener`. `key.slice(2)` corta as duas primeiras
     letras ("on") e `.toLowerCase()` garante que fique `click`, `keydown`
     etc. — exatamente o nome que `addEventListener` espera.
   - Em qualquer outro caso (como `href`, `id`, `aria-label`), usa
     `setAttribute(key, value)`, que é a forma padrão de definir um
     atributo HTML comum.
4. A segunda parte da função cuida dos **filhos** do elemento:
   `Array.isArray(children) ? children : [children]` permite chamar `el(
   'p', {}, 'um texto só')` **ou** `el('ul', {}, [item1, item2, item3])` —
   ou seja, aceita tanto um filho único quanto uma lista.
5. Para cada filho, se ele for uma string (texto puro), cria um nó de texto
   com `document.createTextNode`; se já for um elemento (criado por outra
   chamada de `el(...)`), simplesmente o anexa com `appendChild`.
6. No final, `return node` devolve o elemento pronto, mas **ainda não
   inserido na página** — quem chamou `el(...)` decide onde colocá-lo (por
   exemplo, com `mount.replaceWith(node)`).

```js
export function onReady(fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
}
```
- `document.readyState` informa em que fase o navegador está ao carregar a
  página. Se **não** for `'loading'` (ou seja, o HTML já terminou de
  carregar), a função `fn` passada é executada **na hora**.
- Se ainda estiver `'loading'`, ele espera o evento `DOMContentLoaded`
  (disparado quando o navegador termina de montar o HTML) antes de rodar
  `fn`. Isso evita o erro clássico de tentar buscar um elemento
  (`document.querySelector`) antes dele existir na página.
- Todo arquivo em `pages/*.js` começa com `onReady(() => { ...monta os
  componentes... })` por causa disso.

### 3.2 `core/constants.js`

```js
export const NAV_ITEMS = [
  { href: 'index.html', label: 'Home' },
  { href: 'empresa.html', label: 'Empresa' },
  ...
];

export const COURSE_INFO = {
  curso: '...',
  disciplina: '...',
  turma: '...',
  integrantes: ['Integrante 1', 'Integrante 2', ...],
};
```
Guarda os dados que aparecem em **todas as páginas**: os itens do menu (o
`navbar.js` percorre esse array com `.map()` para criar cada link) e as
informações do rodapé (curso, disciplina, turma, integrantes — exigidas no
enunciado). **Importante:** antes de entregar o projeto, edite o array
`integrantes` com os nomes reais do grupo.

---

## 4. JavaScript — `data/`

Todos os arquivos desta pasta seguem o mesmo padrão: **um array (ou objeto)
exportado, sem nenhuma lógica de tela dentro**. Isso separa "o que mostrar"
de "como mostrar" — os componentes (seção 5) é que decidem como transformar
esses dados em HTML.

- **`briefingData.js`** — array de 17 objetos `{ q, a }` (pergunta e
  resposta), na mesma ordem do `Briefing_Modelo.doc` do professor.
- **`photosData.js`** — gera 27 objetos de foto (`{ seed, category, caption,
  src }`) a partir de listas de "seeds" (palavras usadas para gerar uma
  imagem diferente em cada URL do serviço `picsum.photos`). A função
  `buildEntries(seeds, category)` evita repetir manualmente a mesma lógica
  para carros, peças e acessórios.
- **`sponsorsData.js`** — array com os 4 patrocinadores fictícios (nome,
  cor de fundo, cor de destaque, frase).
- **`textPagesData.js`** — array com as 14 seções de texto (`id`, `title`,
  `body`) usadas na página de âncoras.
- **`wireframesData.js`** — array que liga cada arquivo `.svg` da pasta
  `img/wireframes/` a um rótulo (nome da página correspondente).
- **`externalLinksData.js`** — array com os 10 links externos (nome,
  descrição, URL).

---

## 5. JavaScript — `components/`

Cada arquivo desta pasta é responsável por **uma única parte visual** do
site — a ideia (SRP, o "S" do SOLID) é que, se algo der errado no menu, por
exemplo, você sabe que o problema só pode estar em `navbar.js`.

### 5.1 `components/navbar.js`

```js
function currentFile() {
  const path = window.location.pathname.split('/').pop();
  return path === '' ? 'index.html' : path;
}
```
Descobre em qual página o usuário está. `window.location.pathname` dá o
caminho da URL atual (por exemplo `/softcar/fotos.html`);
`.split('/').pop()` quebra esse caminho pelas barras e pega o **último
pedaço** (`fotos.html`). Se o resultado vier vazio (quando a URL termina só
em `/`, sem nome de arquivo), assume que é a Home.

```js
const links = el('ul', { class: 'nav-links', id: 'nav-links' },
  NAV_ITEMS.map(item => el('li', {}, [
    el('a', {
      href: item.href,
      'aria-current': item.href === active ? 'page' : undefined,
    }, item.label),
  ]))
);
```
Aqui o array `NAV_ITEMS` (de `constants.js`) é percorrido com `.map()` para
virar uma lista de `<li><a>...</a></li>`. O atributo `aria-current="page"`
só é definido **se o link for da página atual** — é isso que faz o item do
menu ficar destacado em âmbar (o CSS usa o seletor
`.nav-links a[aria-current="page"]` para colorir).

```js
const toggle = el('button', {
  ...
  onclick: (e) => {
    const isOpen = links.classList.toggle('is-open');
    e.currentTarget.setAttribute('aria-expanded', String(isOpen));
    e.currentTarget.textContent = isOpen ? '✕' : '☰';
  },
}, '☰');
```
Isso é o botão "hambúrguer" do menu mobile. `classList.toggle('is-open')`
**liga a classe se ela estiver desligada, e desliga se estiver ligada** —
e devolve `true`/`false` conforme o novo estado, que é guardado em
`isOpen`. Com isso, o botão também troca o próprio ícone (☰ vira ✕) e
atualiza `aria-expanded` (importante para leitores de tela).

```js
mount.replaceWith(nav);
nav.id = 'site-header';
```
No final, a `<nav>` recém-criada **substitui** o `<header id="site-header">`
vazio que estava no HTML (`replaceWith`), e recebe de volta o mesmo `id`
— assim, se algum outro script tentar `qs('#site-header')` depois, ainda vai
encontrar o elemento certo.

### 5.2 `components/footer.js`

Segue o mesmo padrão do navbar: monta o rodapé a partir de `COURSE_INFO` e
`NAV_ITEMS`, e substitui o `<footer id="site-footer">` vazio. O trecho mais
importante para a nota do projeto é este:

```js
el('p', {}, [el('strong', {}, 'Integrantes: '), COURSE_INFO.integrantes.join(', ')]),
```
`.join(', ')` transforma o array de nomes em uma única string separada por
vírgulas, exibida no rodapé — que é exatamente o requisito "nome do curso,
disciplina, turma e nomes completos dos integrantes" do enunciado.

### 5.3 `components/sponsorBanner.js`

```js
const cards = Array.from(track.children);
let current = 0;
const highlight = (idx) => {
  cards.forEach(c => c.style.outline = 'none');
  cards[idx].style.outline = '3px solid #FFB020';
};
highlight(current);
setInterval(() => {
  current = (current + 1) % cards.length;
  highlight(current);
}, 2600);
```
Esse é o "carrossel" de destaque dos patrocinadores.
- `track.children` são os 4 cartões de patrocinador já montados;
  `Array.from(...)` os transforma em array para poder usar `.forEach`.
- `highlight(idx)` primeiro tira o contorno de **todos** os cartões e
  depois coloca o contorno âmbar só no cartão de índice `idx`.
- `setInterval(fn, 2600)` chama a função `fn` **a cada 2600 milissegundos
  (2,6 segundos), para sempre**, até a página ser fechada.
- `current = (current + 1) % cards.length` é o truque clássico para "andar
  em círculo" por um array: soma 1 a cada chamada, e o resto da divisão por
  `cards.length` (4, no caso) faz o número voltar a 0 depois de chegar a 3
  (`0 → 1 → 2 → 3 → 0 → 1 → ...`).

### 5.4 `components/photoGallery.js`

É o componente mais longo do projeto porque cuida de duas coisas: a grade
de fotos **e** o lightbox (janela de ampliação).

```js
let openIndex = 0;
```
Guarda **qual foto está aberta agora** no lightbox — é o único "estado"
(variável que muda com o tempo) desse componente.

```js
function step(dir) {
  openIndex = (openIndex + dir + PHOTOS.length) % PHOTOS.length;
  updateLightbox();
}
```
Move para a próxima (`dir = 1`) ou anterior (`dir = -1`) foto. Somar
`PHOTOS.length` antes do `%` é necessário porque, em JavaScript, o resto de
uma divisão com número negativo pode dar negativo (por exemplo, `-1 % 27`
dá `-1`, não `26`). Somando o tamanho do array antes, garantimos que o
resultado final sempre fique entre `0` e `26`, "dando a volta" tanto para
frente quanto para trás.

```js
function onKey(e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'ArrowLeft') step(-1);
}
```
Permite navegar pelo teclado. Note que esse "escutador" só é ligado
(`document.addEventListener('keydown', onKey)`) **quando o lightbox abre**,
e é desligado (`removeEventListener`) quando ele fecha — isso evita que as
setas do teclado continuem controlando o lightbox mesmo depois de fechado.

```js
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
```
Fecha o lightbox se o usuário clicar **fora da imagem**, no fundo escuro.
`e.target` é o elemento exato que recebeu o clique; se for o próprio
`lightbox` (o fundo) e não a imagem ou os botões dentro dele, o clique
"vazou" para o fundo, então fechamos.

### 5.5 `components/briefingRenderer.js`

```js
onclick: (e) => {
  const parent = e.currentTarget.closest('.briefing-item');
  parent.classList.toggle('is-open');
  e.currentTarget.setAttribute('aria-expanded', String(parent.classList.contains('is-open')));
},
```
`e.currentTarget` é o botão que foi clicado (a pergunta). `.closest('.
briefing-item')` sobe pela árvore de elementos até achar o **ancestral**
mais próximo com a classe `briefing-item` (o "cartão" inteiro daquela
pergunta). Isso é necessário porque quem escuta o clique é o botão, mas
quem precisa ganhar a classe `is-open` (que expande a resposta) é o
elemento pai.

```js
function toggleAll(open) {
  qsa('.briefing-item', list).forEach(item => {
    item.classList.toggle('is-open', open);
    qs('.q', item).setAttribute('aria-expanded', String(open));
  });
}
```
Aqui `classList.toggle('is-open', open)` usa a **segunda forma** do
`toggle`: quando o segundo argumento é `true` ou `false`, ele **força**
aquele estado (não alterna) — ou seja, `toggleAll(true)` garante que a
classe seja adicionada em todo mundo, e `toggleAll(false)` garante que seja
removida de todo mundo. É o que os botões "Expandir tudo" / "Recolher tudo"
usam.

### 5.6 `components/anchorNav.js`

Esta é a parte tecnicamente mais avançada do projeto: o **scrollspy**
(destacar no índice a seção que está sendo lida).

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const link = links.find(l => l.dataset.target === entry.target.id);
    if (!link) return;
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });

qsa('.text-page', sections).forEach(section => observer.observe(section));
```
- `IntersectionObserver` é uma API do navegador que **avisa automaticamente**
  quando um elemento entra ou sai de uma área visível da tela — sem
  precisar ficar checando a posição de rolagem manualmente a cada pixel
  (o que seria lento).
- `observer.observe(section)` diz "me avise sempre que esta seção de texto
  entrar ou sair da área observada". Isso é feito para **todas as 14**
  seções, em um `forEach`.
- `rootMargin: '-40% 0px -50% 0px'` encolhe a "área observada": em vez de
  considerar a tela inteira, o navegador considera só uma faixa horizontal
  fina no meio da tela (40% de folga em cima, 50% embaixo). Isso faz o
  link ativar quando a seção passa **perto do meio da tela**, não assim que
  encosta na borda de cima ou de baixo — dá uma sensação mais natural de
  "isto é o que estou lendo agora".
- Dentro do callback, para cada seção que mudou (`entries`), o código
  procura (`.find`) o link do índice cujo `data-target` bate com o `id` da
  seção. Se essa seção **está entrando na área observada**
  (`entry.isIntersecting`), ele tira a classe `is-active` de todos os links
  e coloca só no link correspondente.

### 5.7 `components/wireframeViewer.js`

É parecido com o lightbox de fotos, mas mais simples (não precisa de
setas/teclado, porque cada wireframe é visto isoladamente). O ponto
principal:

```js
onclick: () => {
  qs('#wf-modal-img', modal).src = `assets/img/wireframes/${w.file}`;
  qs('#wf-modal-cap', modal).textContent = `Wireframe — ${w.label}`;
  modal.classList.add('is-open');
},
```
Ao clicar em uma miniatura, o código **troca o `src` de uma única imagem
dentro do modal** (em vez de criar uma janela nova a cada clique) e mostra
o modal. É mais eficiente reaproveitar sempre o mesmo `<img>` do modal do
que recriar elementos toda vez.

### 5.8 `components/externalLinksRenderer.js`

```js
const STORAGE_KEY = 'softcar:visited-links';

function getVisited() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function markVisited(url) {
  const visited = new Set(getVisited());
  visited.add(url);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...visited]));
}
```
- `localStorage` é uma "gaveta" de dados que o navegador mantém **mesmo
  depois de fechar a aba ou o navegador** (diferente de uma variável
  comum, que se perde ao recarregar a página).
- Como o `localStorage` só guarda texto, salvamos a lista de links
  visitados como uma string JSON (`JSON.stringify`) e a lemos de volta com
  `JSON.parse`. O `try/catch` protege o código caso o valor salvo esteja
  corrompido ou não exista ainda.
- Um `Set` é usado dentro de `markVisited` porque ele **não permite valores
  repetidos** — mesmo que o usuário clique no mesmo link várias vezes, o
  `Set` garante que a URL só apareça uma vez na lista salva.
- `[...visited]` transforma o `Set` de volta em array (`JSON.stringify`
  não funciona diretamente em `Set`) antes de salvar.

### 5.9 `components/tableInteractions.js`

```js
const categories = [...new Set(rows.map(r => r.dataset.category))];
```
Pega a categoria (`data-category`) de cada linha da tabela
(`rows.map(...)`), depois usa `new Set(...)` para eliminar categorias
repetidas (`"Motor"` aparece 3 vezes nas linhas, mas só precisamos dele uma
vez na lista de filtros), e `[...]` transforma de volta em array para poder
usar `.forEach` ao criar os botões.

```js
function setFilter(cat, btn) {
  qsa('button', filterBar).forEach(b => b.classList.remove('is-active'));
  btn.classList.add('is-active');
  rows.forEach(r => {
    r.style.display = (cat === 'all' || r.dataset.category === cat) ? '' : 'none';
  });
}
```
Ao clicar em um botão de filtro (ex: "Freios"), a função esconde
(`display: none`) todas as linhas cuja categoria **não** bate com a
escolhida, e volta a mostrar (`display: ''`, ou seja, o valor padrão) as
que batem. O filtro `"Todas"` usa a condição especial `cat === 'all'` para
nunca esconder nada.

---

## 6. JavaScript — `pages/`

Todos os arquivos desta pasta seguem o mesmo formato curto:

```js
import { onReady } from '../core/dom.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';
import { renderXxx } from '../components/xxxComponent.js';

onReady(() => {
  renderNavbar();
  renderFooter();
  renderXxx();
});
```
Cada um desses arquivos é o que se chama de **"composition root"** daquela
página: ele não sabe **como** o menu, o rodapé ou o componente principal
funcionam por dentro — só sabe **que eles existem** e em que ordem chamar.
Isso é o princípio da inversão de dependência (o "D" do SOLID): a página
depende de uma função pública (`renderNavbar()`), não dos detalhes internos
de `navbar.js`.

Arquivo por arquivo:
- **`home.js`** → `renderNavbar`, `renderFooter`, `renderSponsorStrip`.
- **`empresa.js`** → `renderNavbar`, `renderFooter`, `renderBriefing`.
- **`fotos.js`** → `renderNavbar`, `renderFooter`, `renderGallery`.
- **`textos.js`** → `renderNavbar`, `renderFooter`, `renderTextPages`.
- **`documentos.js`** → `renderNavbar`, `renderFooter`, `renderWireframes`.
- **`links.js`** → `renderNavbar`, `renderFooter`, `renderExternalLinks`.
- **`tabela.js`** → `renderNavbar`, `renderFooter`, `enableTableInteractions`
  (aqui não existe "renderização" de tabela, porque ela já está pronta no
  HTML — só liga o comportamento de clique/filtro por cima).
- **`listas.js`** → além do menu e rodapé, tem a função própria
  `setupListSwitcher()`, escrita direto nesse arquivo (e não em
  `components/`) porque é um comportamento pequeno, usado só nesta página.
- **`formatos.js`** → mesma ideia: tem a função `setupFontSwitcher()`
  própria, que liga os `<select>` de fonte/tamanho ao texto de exemplo.

---

## 7. Imagens — `img/wireframes/`

Os 9 arquivos `wf-*.svg` (um por página) são desenhos vetoriais simples
(retângulos com legendas) representando o layout planejado de cada página
**antes** de ela ser programada. Foram gerados por um pequeno script
Python, mas o resultado final é apenas um arquivo `.svg` comum — pode ser
aberto e editado em qualquer editor de vetor (Inkscape, Figma etc.) se o
grupo quiser refinar visualmente.

---

## 8. Perguntas frequentes sobre o código

**"Por que usar `el(...)` em vez de escrever HTML direto com `innerHTML`?"**
Porque `innerHTML` recria o HTML inteiro toda vez a partir de uma string
(mais fácil de errar uma aspas ou tag), enquanto `el(...)` cria os
elementos de verdade, um por um, e permite anexar funções de evento
(`onclick`) diretamente, sem precisar de `addEventListener` separado depois.

**"Por que `mount.replaceWith(...)` em vez de `mount.innerHTML = ...`?"**
Porque o `<header id="site-header">` do HTML original é só um "marcador de
lugar" (placeholder). `replaceWith` troca esse marcador pelo elemento
`<nav>` de verdade, mantendo o mesmo `id` depois — o resultado visual é o
mesmo de usar `innerHTML`, mas fica mais claro no código que aquele
elemento vazio existe só para ser substituído.

**"O que significa `export` e `import`?"**
São palavras-chave dos **módulos ES** do JavaScript. `export` marca uma
função ou variável como "disponível para outros arquivos usarem"; `import`
traz essa função/variável para dentro de outro arquivo. É assim que
`navbar.js` consegue usar a função `el` que foi escrita em `dom.js`, por
exemplo — sem isso, cada arquivo `.js` ficaria isolado dos outros.

**"Por que algumas funções usam `=>` (arrow function) e outras usam
`function nome() {}`?"**
Não muda o funcionamento na maioria dos casos usados aqui — é uma escolha de
estilo. Em geral, usamos `function nome() {}` para as funções "principais"
exportadas de um arquivo (mais fácil de identificar ao ler o código de
cima a baixo) e `() => {}` para funções pequenas, passadas como argumento
(como o `onclick: () => { ... }`).
