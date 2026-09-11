# SOFTCAR — Mini Projeto Front-End (Aula 05)

Site institucional fictício de uma loja de venda de carros, peças e acessórios,
desenvolvido em **HTML + CSS + JavaScript puro** (sem frameworks), organizado
com uma separação de responsabilidades inspirada em **SOLID** e **Clean
Architecture**.

---

## 1. Como rodar o projeto

Como as páginas usam **JavaScript com módulos ES (`import`/`export`)**, os
navegadores bloqueiam esse recurso quando o arquivo é aberto direto em
`file://`. É preciso servir a pasta por um servidor local:

**Opção A — VS Code (mais simples):**
1. Instale a extensão **Live Server**.
2. Clique com o botão direito em `index.html` → **Open with Live Server**.

**Opção B — Terminal com Python (já vem instalado na maioria dos PCs):**
```bash
cd softcar
python -m http.server 8000
```
Depois acesse `http://localhost:8000` no navegador.

> Sem servidor local, as páginas abrem mas o conteúdo dinâmico (menu, rodapé,
> galeria, tabela interativa etc.) não é renderizado, pois os módulos JS não
> carregam.

---

## 2. Estrutura de pastas

```
softcar/
├── index.html            → Home (hero, patrocinadores, destaques)
├── empresa.html           → Briefing institucional (17 perguntas e respostas)
├── fotos.html              → Galeria de fotos (27 fotos, 3 colunas)
├── textos.html              → 14 seções de texto navegáveis por âncora
├── listas.html               → Todos os tipos de lista HTML
├── documentos.html             → Wireframes de todas as páginas
├── formatos.html                 → Formatações de texto (negrito, itálico, etc.)
├── links.html                      → 10 links para sites externos
├── tabela.html                      → Tabela técnica (5 colunas x 15 linhas)
│
└── assets/
    ├── css/
    │   ├── variables.css   → Tokens de design (cores, tipografia, espaçamento)
    │   └── style.css       → Estilos globais e de cada componente
    │
    ├── img/
    │   └── wireframes/     → SVGs dos wireframes (um por página)
    │
    └── js/
        ├── core/           → Infraestrutura genérica, sem regra de negócio
        │   ├── dom.js          (helpers de manipulação do DOM: qs, qsa, el)
        │   └── constants.js    (menu do site, dados do rodapé)
        │
        ├── data/           → "Camada de dados": só informação, sem lógica de tela
        │   ├── briefingData.js
        │   ├── photosData.js
        │   ├── sponsorsData.js
        │   ├── textPagesData.js
        │   ├── wireframesData.js
        │   └── externalLinksData.js
        │
        ├── components/     → "Camada de apresentação": um módulo por peça de UI
        │   ├── navbar.js
        │   ├── footer.js
        │   ├── sponsorBanner.js
        │   ├── photoGallery.js
        │   ├── briefingRenderer.js
        │   ├── anchorNav.js
        │   ├── wireframeViewer.js
        │   ├── externalLinksRenderer.js
        │   └── tableInteractions.js
        │
        └── pages/          → "Composition root": um bootstrap por página HTML,
                               que só decide QUAIS componentes montar ali
            ├── home.js, empresa.js, fotos.js, textos.js, listas.js,
            └── documentos.js, formatos.js, links.js, tabela.js
```

---

## 3. Por que essa organização? (SOLID / Clean Architecture aplicados a front-end simples)

Como o site não usa framework, "Clean Architecture" aqui significa **separar
claramente quem faz o quê**, em vez de colocar tudo dentro de um único
`<script>` por página:

- **`core/`** — não conhece nenhuma regra da SOFTCAR. Só sabe manipular o DOM
  de forma genérica. Poderia ser reaproveitado em qualquer outro site.
- **`data/`** — guarda as informações (perguntas do briefing, fotos,
  patrocinadores, links). Se amanhã os dados vierem de uma API em vez de um
  arquivo fixo, só esses arquivos mudam.
- **`components/`** — cada arquivo tem **uma única responsabilidade** (SRP —
  *Single Responsibility Principle*): `navbar.js` só monta e controla o menu;
  `photoGallery.js` só cuida da galeria e do lightbox; e assim por diante.
  Isso facilita cada integrante do grupo explicar "a sua parte" do código na
  apresentação.
- **`pages/`** — cada página HTML importa só os componentes que usa (princípio
  da inversão de dependência: a página depende de uma função pública como
  `renderNavbar()`, e não sabe como o menu é montado por dentro).

Essa divisão também facilita a manutenção: para mudar o texto do rodapé,
por exemplo, basta editar `core/constants.js` — o valor se atualiza em
**todas** as páginas automaticamente, porque todas chamam a mesma função
`renderFooter()`.

---

## 4. Onde cada requisito do enunciado foi atendido

| Item do enunciado | Onde está |
|---|---|
| 2. Briefing (17 perguntas) | `empresa.html` + `data/briefingData.js` |
| 3. Mínimo 5 itens no menu | `core/constants.js` (9 itens) |
| 4. Galeria com 25+ fotos, 3 colunas | `fotos.html` + `data/photosData.js` (27 fotos) |
| 5. Fundo/imagens de fundo sem repetição | `css/style.css` (fundos alternados claro/escuro por seção) |
| 6. Texto com âncoras, 14 páginas | `textos.html` + `data/textPagesData.js` |
| 7. Todos os tipos de lista | `listas.html` |
| 8. Wireframes de todas as páginas | `documentos.html` + `img/wireframes/*.svg` |
| 9. Formatações de texto | `formatos.html` |
| 10. 10 links para sites externos | `links.html` + `data/externalLinksData.js` |
| 11. 4+ propagandas de patrocinadores | `index.html` (faixa de patrocinadores) |
| 12. Tabela 5x15 com mesclagens e cores | `tabela.html` |
| 16. CSS em todas as páginas | `assets/css/style.css` |
| 17. JS automatizando funções/eventos | menu mobile, lightbox de fotos, acordeão do briefing, scrollspy dos textos, carrossel de patrocinadores, troca de fonte, troca de marcador de lista, filtro/realce da tabela |

---

## 5. Observação sobre o uso de IA

Este projeto foi montado com apoio de IA para estruturação e geração de
código-base. Conforme orientado em aula, cada integrante do grupo deve revisar
e ser capaz de **explicar a parte do código sob sua responsabilidade** antes
da apresentação — recomenda-se dividir o site por página (uma ou duas páginas
por integrante) e estudar o componente e o script correspondente antes do dia
da entrega.
