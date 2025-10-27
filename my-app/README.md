# Paginando

Aplicação web de leitura e organização de livros (front‑end em React) com acervo, favoritos/listas e leitor EPUB com preferências persistidas.

## Visão Geral

- Catálogo com busca e filtros por gênero.
- Favoritar livros, criar listas personalizadas e gerenciá‑las.
- Leitor EPUB com temas (claro/escuro/sépia), tamanho de fonte e posição salvos por livro.
- Navegação com layout fixo (Header, Sidebar e Footer).

## Stack

- React + React Router
- `react-reader` (leitor EPUB)
- `lucide-react` (ícones)
- Create React App (react-scripts)

## Requisitos

- Node.js e npm instalados.
- Opcional: Git para versionamento.

## Início Rápido

1. Entre na pasta do app: `cd my-app`
2. Instale dependências: `npm install`
3. Rode em desenvolvimento: `npm start`
4. Acesse em `http://localhost:3000`

Build de produção: `npm run build` (gera pasta `build/`).

## Scripts

- `npm start` – executa em desenvolvimento
- `npm test` – executor de testes
- `npm run build` – build de produção
- `npm run eject` – expõe configurações do CRA (irreversível)

## Rotas Principais

- `/` – Layout base; navegação pelo Header/Sidebar.
- `/acervo` – Catálogo com busca e filtro de gêneros.
- `/favoritos` – Favoritos e listas personalizadas (criar, renomear, excluir).
- `/livro/:id/page` – Leitor do livro (EPUB); aberto via botão “Iniciar Leitura”.

## Leitor EPUB

- Usa `react-reader` via lazy loading.
- Preferências por livro (salvas em `localStorage`):
  - `reader:<id>:theme` – `light` | `dark` | `sepia`
  - `reader:<id>:fontSize` – percentual (ex.: `110`)
  - `reader:<id>:location` – posição EPUBCFI
- Arquivos `.epub` devem ficar em `public/epub/<id>.epub`.
  - Exemplo incluso: `public/epub/1.epub` (abre com id `1`).

## Estado do Usuário (Context)

`src/context/UserContext.jsx` expõe:
- `favorites` e `toggleFavorite(bookId)`
- `lists` com operações: `createList`, `createListAndAdd`, `deleteList`, `renameList`, `addBookToList`, `removeBookFromList`
- `readingProgress` e `updateReadingProgress`
- `preferences` (tema geral e fonte globais), `toggleTheme`, `changeFontSize`

Chaves persistidas via `useLocalStorage`:
- `favorites`, `lists`, `readingProgress`, `preferences`

## Dados de Exemplo

- `src/data/books.js` – lista de livros com campos `id`, `title`, `author`, `genre`, `image`, `synopsis`, etc.
- Imagens em `src/assets/images/<id>.png` (carregadas com `require.context`).

## Estrutura (resumo)

- `src/components/books/cards/BookCards.jsx` – Card do livro + ações.
- `src/components/books/carousel/BookCarousel.jsx` – Carrossel horizontal.
- `src/components/books/reader/BookReader.jsx` – Leitor EPUB.
- `src/components/catalog/catalogSelector.jsx` – Busca e filtros.
- `src/pages/acervo/acervo.jsx` – Página do catálogo.
- `src/pages/favoritos/*` – Página de favoritos e listas.
- `src/core/layout/layout.jsx` – Layout com Header/Sidebar/Footer.

## Dicas de Uso

- No leitor, use A-/A+ para fonte e “Tema” para alternar estilos. Preferências ficam salvas por livro.
- Para abrir um livro, clique em “Iniciar Leitura” no card. Certifique‑se de ter o `.epub` correspondente em `public/epub/`.

## Problemas Comuns

- Avisos de CRLF/LF no Windows: são apenas avisos do Git e não impedem o funcionamento.
- Se o push para o GitHub falhar por senha: use o Git Credential Manager (login pelo navegador) ou um Personal Access Token (PAT).

---

Projeto acadêmico “Paginando”. Sinta‑se à vontade para adaptar.
