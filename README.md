# Paginando

O Paginando é uma plataforma digital inspirada em serviços de streaming, mas voltada para leitura. Em vez de filmes ou séries, o usuário tem acesso a um acervo de livros, mangás, quadrinhos e crônicas.
A proposta é oferecer uma experiência fluida e envolvente de leitura online, incentivando jovens e adultos ao hábito de leitura.

## Visão Geral

- Catálogo com busca e filtros por gênero.
- Favoritar livros, criar listas personalizadas e gerenciá‑las.
- Leitor EPUB com temas (claro/escuro/sépia), tamanho de fonte e posição salvos por livro.
- Recomendações de livros baseadas no hábito do usuário.
- Permanência de configurações definidas.

## Stack

- React + React Router
- `react-reader` (leitor EPUB)
- `lucide-react` (ícones)

## Requisitos

- Node.js e npm instalados.

## Instalação e Execução

### **1. Clonar o repositório**
```bash
git clone https://github.com/Amand5a/2025-pe-t6-Paginando.git

### **2. Entrar na pasta do projeto**
```bash
cd my-app
```

### **3. Instalar dependências**
```bash
npm install
```

### **4. Executar em modo desenvolvimento**
```bash
npm start
```
Acesse o app em **[http://localhost:3000](http://localhost:3000)**.

### **4. Gerar build de produção**
```bash
npm run build
```
Cria a pasta `build/` pronta para deploy.

---

## Rotas

| Rota | Função |
|------|---------|
| `/` | Layout base com Header e Sidebar |
| `/acervo` | Catálogo com busca e filtro por gênero |
| `/favoritos` | Gerenciamento de favoritos e listas personalizadas |
| `/livro/:id/page` | Leitor de EPUB, aberto pelo botão **“Iniciar Leitura”** |

---

## Pagina de Leitura

- Implementado com [`react-reader`](https://github.com/gerhardsletten/react-reader) (lazy loaded).  
- Configurações salvas individualmente no `localStorage`:

| Chave | Descrição |
|-------|------------|
| `reader:<id>:theme` | Tema do leitor (`light`, `dark`, `sepia`) |
| `reader:<id>:fontSize` | Tamanho da fonte (%) |
| `reader:<id>:location` | Posição de leitura (EPUBCFI) |

📁 Arquivos `.epub` devem ficar em:
```
public/epub/<id>.epub
```
**Exemplo:** `public/epub/1.epub` → abre com id `1`.

---

##  Contexto Global (UserContext)

Arquivo: `src/context/UserContext.jsx`  
Expõe os seguintes estados e funções:

| Estado/Função | Descrição |
|----------------|------------|
| `favorites` / `toggleFavorite(bookId)` | Gerencia favoritos |
| `lists` | Contém as listas criadas pelo usuário |
| `createList`, `createListAndAdd`, `deleteList`, `renameList`, `addBookToList`, `removeBookFromList` | CRUD de listas |
| `readingProgress`, `updateReadingProgress` | Progresso de leitura |
| `preferences`, `toggleTheme`, `changeFontSize` | Preferências globais de tema e fonte |

**Persistência via hook `useLocalStorage`:**  
`favorites`, `lists`, `readingProgress`, `preferences`

---

##  Dados e Assets

- `src/data/books.js` → lista de livros (campos: `id`, `title`, `author`, `genre`, `image`, `synopsis`, etc.)  
- Imagens em `src/assets/images/<id>.png` (carregadas via `require.context`)

---

## 🏗️ Estrutura de Pastas (resumo)

```
src/
├── components/
│   ├── books/
│   │   ├── cards/BookCards.jsx       # Card do livro + ações
│   │   ├── carousel/BookCarousel.jsx # Carrossel horizontal
│   │   └── reader/BookReader.jsx     # Leitor EPUB
│   └── catalog/CatalogSelector.jsx   # Busca e filtros
├── pages/
│   ├── acervo/Acervo.jsx             # Página do catálogo
│   └── favoritos/                    # Favoritos e listas
├── core/layout/Layout.jsx            # Layout principal
└── context/UserContext.jsx           # Contexto global
```

---

##  Dicas de Uso

- No leitor, use **A- / A+** para ajustar a fonte e **“Tema”** para alternar estilos.  
- As preferências são salvas **por livro** no `localStorage`.  
- Para ler, clique em **“Iniciar Leitura”** no card e garanta que o arquivo `.epub` correspondente exista em `public/epub/`.
