# Roteiro de Apresentação — SOFTCAR (Mini Projeto Front-End)

Tempo total: **20 minutos**. Todos os integrantes do grupo devem falar —
quem não apresentar não pontua, então divida as falas com folga (é melhor
sobrar 1 minuto do que faltar). Os tempos abaixo são um guia; ajustem para o
número real de integrantes do grupo.

Antes de começar: **abram o site com o Live Server rodando** (ou
`python -m http.server`) — sem isso, o menu, o rodapé e as partes
interativas não aparecem, porque dependem de módulos JavaScript.

---

## 0. Antes de entrar na sala (checklist rápida)

- [ ] Servidor local rodando e `index.html` abrindo sem erros no console (F12)
- [ ] Todas as abas/páginas testadas pelo menos uma vez antes da apresentação
- [ ] Cada integrante sabe qual página/arquivo vai explicar
- [ ] Projetor/tela testado com o navegador em tela cheia (F11)

---

## 1. Abertura — 1 min 

> "Boa tarde/noite, professor e colegas. Somos o grupo responsável pelo
> mini-projeto SOFTCAR, uma loja fictícia de venda de carros, peças e
> acessórios. Vamos apresentar o site, mostrar como ele atende a todos os
> requisitos do enunciado, e explicar como o código foi organizado."

Falar rapidamente: nome do grupo, nome de cada integrante e qual parte cada
um vai apresentar (isso já ajuda o professor a acompanhar quem fala o quê).

---

## 2. Contexto do projeto e briefing — 2 min 

Abrir **`empresa.html`**.

Pontos a cobrir:
- "Antes de desenhar qualquer página, respondemos ao briefing fornecido em
  aula, pensando em como seria uma empresa real de venda de carros."
- Clicar em 2 ou 3 perguntas do acordeão para mostrar a resposta abrindo.
- Destacar 2 respostas-chave que guiaram decisões de design, por exemplo:
  - **Imagem a ser transmitida** → justifica a paleta escura + âmbar e a
    tipografia condensada usada no site inteiro.
  - **Público-alvo** → justifica a linguagem direta e o foco em fotos e
    tabela técnica.
- "Essas 17 respostas estão no arquivo `briefingData.js` e são renderizadas
  automaticamente nessa página — não é HTML fixo, é gerado por JavaScript."

---

## 3. Tour pelas páginas — 12 min 

Sugestão de divisão para **4 integrantes** (ajuste se o grupo tiver mais ou
menos pessoas). Cada bloco: mostrar a página funcionando + citar rapidamente
qual arquivo de código é responsável por ela.

### 3.1 Home e Fotos — 3 min 
Abrir **`index.html`**.
- Mostrar o hero, a navegação (falar que tem 9 itens no menu, acima do
  mínimo de 5 exigido).
- Mostrar a faixa de patrocinadores e comentar que ela troca de destaque
  sozinha a cada poucos segundos — "isso é feito com `setInterval` no
  arquivo `sponsorBanner.js`".
- Ir para **`fotos.html`**: mostrar a galeria em 3 colunas, clicar em uma
  foto para abrir o lightbox, navegar com as setas do teclado e fechar com
  `Esc`. Citar: "são 27 fotos, acima do mínimo de 25 pedido."

### 3.2 Textos e Listas — 3 min 
Abrir **`textos.html`**.
- Mostrar o índice fixo à esquerda com as 14 seções.
- Rolar a página e mostrar que o item ativo no índice muda sozinho conforme
  o usuário lê — "isso é um scrollspy, feito com `IntersectionObserver` no
  `anchorNav.js`".
- Clicar em "Voltar ao início" no fim da página.
- Ir para **`listas.html`**: mostrar rapidamente os 4 tipos de lista
  ordenada (números, letras, algarismos romanos), as listas não ordenadas
  (inclusive uma aninhada) e a lista de definição. Terminar clicando nos
  botões da lista interativa para trocar o marcador ao vivo.

### 3.3 Documentos e Formatos — 3 min
Abrir **`documentos.html`**.
- Mostrar a grade de wireframes e ampliar um clicando nele.
- Explicar: "fizemos um wireframe simples de cada página antes de programar,
  para planejar onde ficaria o menu, o conteúdo e o rodapé."
- Ir para **`formatos.html`**: mostrar negrito, itálico, sublinhado,
  sobrescrito/subscrito, texto riscado, títulos, linha horizontal e citação.
- Trocar a fonte e o tamanho do texto nos seletores para mostrar a
  interatividade.

### 3.4 Links externos e Tabela — 3 min 
Abrir **`links.html`**.
- Mostrar os 10 links (FIPE, Detran, Inmetro etc.), clicar em um para abrir
  em nova guia e mostrar que o card marca "✓ visitado" depois do clique.
- Ir para **`tabela.html`**: apontar as células mescladas na vertical
  (categoria "Motor" ocupando 3 linhas) e na horizontal (observações
  ocupando 2 colunas). Clicar nos botões de filtro por categoria e clicar em
  uma linha para destacá-la.

---

## 4. Como o código foi organizado — 3 min 

Abrir o editor de código (não precisa ler linha por linha, só mostrar as
pastas).

Falar, mostrando a árvore de pastas:

> "Em vez de colocar todo o HTML, CSS e JavaScript misturados em cada
> página, organizamos o projeto em camadas, seguindo os princípios de
> Clean Architecture e SOLID adaptados para um site sem framework:
>
> - **`assets/js/core`** tem só funções genéricas de manipulação do DOM,
>   sem nenhuma regra da SOFTCAR — poderiam ser reaproveitadas em qualquer
>   projeto.
> - **`assets/js/data`** guarda só os dados: as perguntas do briefing, a
>   lista de fotos, os patrocinadores, os links. Se um dia quisermos trocar
>   esses dados por uma API, só esses arquivos mudam.
> - **`assets/js/components`** tem um arquivo para cada parte visual do
>   site — o menu, o rodapé, a galeria, o acordeão do briefing — e cada
>   arquivo faz só uma coisa (isso é o Princípio da Responsabilidade Única,
>   o 'S' do SOLID).
> - **`assets/js/pages`** tem um arquivo pequeno para cada página HTML, que
>   só decide quais componentes daquela página vão ser montados."

Se o professor perguntar "o que é automatizado com JavaScript" (item 17 do
enunciado), citar de cabeça 3 ou 4 exemplos: menu mobile, lightbox de fotos,
scrollspy dos textos, carrossel de patrocinadores, troca de fonte, filtro da
tabela.

---

## 5. Encerramento e perguntas — 1 min 

> "Esse foi o mini-projeto SOFTCAR. Estamos à disposição para dúvidas sobre
> qualquer página ou trecho de código."

Ficar de pé/visível todo o grupo para responder perguntas — o professor pode
pedir para qualquer integrante explicar qualquer parte, então revisem juntos
antes o arquivo `ARQUITETURA_EXPLICADA.md`, que detalha o que cada arquivo
faz.

---

## Perguntas que o professor pode fazer (e como responder rápido)

| Pergunta provável | Resposta curta |
|---|---|
| "Por que vocês separaram em `core`, `data`, `components`, `pages`?" | "Para cada arquivo ter uma única responsabilidade e ficar fácil de manter e de explicar individualmente." |
| "Onde está o JavaScript automatizando algo?" | Citar 3 exemplos concretos (lightbox, scrollspy, carrossel de patrocinadores). |
| "Por que o menu não aparece se eu abrir o `index.html` direto?" | "Porque usamos módulos ES (`import`/`export`), que o navegador só carrega via `http://`, não via `file://`. Por isso rodamos com Live Server." |
| "Qual foi a parte mais difícil?" | Escolher algo verdadeiro do grupo — ex: alinhar as mesclagens da tabela, ou o scrollspy dos textos. |
| "Vocês usaram IA?" | Ser honesto: "Usamos apoio de IA para estruturar o código, mas cada um estudou e é responsável por explicar a sua parte", conforme orientado em aula. |
