## DevWebAtt

[Link do site (GitHub Pages)](https://matheuspiresdev.github.io/DevWebAtt/)

[Link do GitHub](https://github.com/MatheusPiresDEV/DevWebAtt.git)

---

### O que é

Este repositório contém exercícios e atividades de **desenvolvimento web**, organizados por pastas (ex.: `EX01`, `EX02`, `EX03`, `EX04`, `Proposta`, `Table`, `DesignResponsivo`, `JavaScript Aula 1`).

A **página central** do projeto fica na **raiz** do repositório e serve como um índice:
- `index.html`
- `style.css`

Na página central você encontra:
- Cards com links para cada atividade
- Carrossel responsivo
- Busca para filtrar atividades rapidamente
- Alternância de tema (claro/escuro)

---

### Estrutura do repositório

- `index.html` — índice principal (página central)
- `style.css` — estilos do índice
- `assets/` — imagens e mídias compartilhadas
- `EX01/`, `EX02/`, `EX03/`, `EX04/` — exercícios HTML
- `Proposta/` — formulário (projeto/recriação)
- `Table/` — tabela com `thead/tbody/tfoot` e mesclagem
- `DesignResponsivo/` — atividades de responsividade/cascata/especificidade/herança
- `JavaScript Aula 1/` — atividade de JavaScript (tabela/pacientes)

---

### Como abrir e usar

1. Faça clone do repositório ou abra a pasta no navegador.
2. Abra `index.html` na raiz.
3. Use a busca e selecione um card para navegar até o exercício desejado.

---

### Como adicionar uma nova atividade

1. Crie uma nova pasta com o padrão `EXxx/` (ex.: `EX05/`).
2. Adicione um `index.html` dentro da pasta.
3. Atualize a lista no `index.html` principal adicionando um novo card com:
   - `data-title="NOME"`
   - `data-tags="palavras-chave"`
   - `href` apontando para o `index.html` da pasta

Exemplo (card):

```html
<article class="card card--slide" data-title="EX05" data-tags="html css responsivo" tabindex="0">
  <div class="card__top">
    <span class="pill">EX05</span>
    <span class="status">Concluído</span>
  </div>
  <h3 class="card__title">Título do exercício</h3>
  <p class="card__desc">Descrição curta do que foi feito.</p>
  <div class="card__actions">
    <a class="btn" href="./EX05/">Abrir exercício</a>
  </div>
</article>
```

---

### Responsividade e acessibilidade (no índice)

- Layout com CSS adaptativo para celular, tablet e desktop
- Carrossel com navegação por teclado (`←` e `→`)
- Filtro por busca para encontrar rapidamente
- Respeita `prefers-reduced-motion` para reduzir animações
- Link “pular para o conteúdo” (`skip-link`)

---

### Links

- Site: https://matheuspiresdev.github.io/DevWebAtt/
- GitHub do repositório: https://github.com/MatheusPiresDEV/DevWebAtt.git

