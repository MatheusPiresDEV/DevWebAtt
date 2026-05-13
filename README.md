# DevWebAtt

## O que é
Este repositório contém exercícios de desenvolvimento web, organizados em pastas como `EX01`, `EX02`, `EX03`, etc.

A **página central** do projeto fica na **raiz** do repositório:
- `index.html`
- `style.css`

Ela concatena/mostra uma lista de links para cada exercício em formato de **cards responsivos**, com:
- grid adaptável (celular/tablet/desktop)
- busca para filtrar rapidamente os cards
- alternância simples de tema (modo claro/escuro)

## Como usar
1. Abra o arquivo `index.html` na raiz do projeto no navegador.
2. Clique em um card para abrir o exercício correspondente.

## Como adicionar novos exercícios
1. Crie uma nova pasta com o padrão `EX04/`, `EX05/`, etc.
2. Garanta que dentro da pasta exista um `index.html`.
3. Atualize a lista de cards em `index.html` (na raiz) adicionando um novo `<article class="card">` com:
   - `href="./EXxx/"`
   - atributos `data-title="EXxx"` e `data-tags="..."` (para a busca funcionar bem)

## Estrutura do projeto (exemplo)
- `index.html` (página central)
- `style.css` (estilo da página central)
- `EX01/`, `EX02/`, `EX03/`...
- `assets/` (imagens compartilhadas)

