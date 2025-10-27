import { createContext, useContext, useCallback, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Livros favoritos
  const [favorites, setFavorites] = useLocalStorage("favorites", []);

  // Listas criadas pelo usuário
  const [lists, setLists] = useLocalStorage("lists", []);

  // Progresso de leitura por livro
  const [readingProgress, setReadingProgress] = useLocalStorage("readingProgress", {});

  // Preferências visuais
  const [preferences, setPreferences] = useLocalStorage("preferences", {
    theme: "light",
    fontSize: "medium",
  });

  // ========= Funções =========

  // Favoritar / desfavoritar livro
  const toggleFavorite = useCallback((bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  }, [setFavorites]);

  // Criar nova lista
  const createList = useCallback((title) => {
    const newList = { id: crypto.randomUUID(), title, books: [] };
    setLists((prev) => [...prev, newList]);
  }, [setLists]);

  // Criar lista e já adicionar um livro (retorna o id criado)
  const createListAndAdd = useCallback((title, bookId) => {
    const id = crypto.randomUUID();
    const newList = { id, title, books: bookId != null ? [bookId] : [] };
    setLists((prev) => [...prev, newList]);
    return id;
  }, [setLists]);

  // Deletar lista
  const deleteList = useCallback((id) => {
    setLists((prev) => prev.filter((l) => l.id !== id));
  }, [setLists]);

  // Renomear lista
  const renameList = useCallback((id, newTitle) => {
    const title = String(newTitle || "").trim();
    if (!title) return;
    setLists((prev) => prev.map((l) => (l.id === id ? { ...l, title } : l)));
  }, [setLists]);

  // Adicionar livro a uma lista
  const addBookToList = useCallback((listId, bookId) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId && !l.books.includes(bookId)
          ? { ...l, books: [...l.books, bookId] }
          : l
      )
    );
  }, [setLists]);

  // Remover livro de uma lista
  const removeBookFromList = useCallback((listId, bookId) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId
          ? { ...l, books: l.books.filter((id) => id !== bookId) }
          : l
      )
    );
  }, [setLists]);

  // Atualizar progresso de leitura
  const updateReadingProgress = useCallback((bookId, page, totalPages) => {
    setReadingProgress((prev) => ({
      ...prev,
      [bookId]: { page, totalPages, percent: Math.round((page / totalPages) * 100) },
    }));
  }, [setReadingProgress]);

  // Alternar tema
  const toggleTheme = useCallback(() => {
    setPreferences((p) => ({
      ...p,
      theme: p.theme === "light" ? "dark" : "light",
    }));
  }, [setPreferences]);

  // Alterar fonte
  const changeFontSize = useCallback((size) => {
    setPreferences((p) => ({ ...p, fontSize: size }));
  }, [setPreferences]);

  // ========= Contexto final =========
  const value = useMemo(() => ({
    favorites,
    toggleFavorite,
    lists,
    createList,
    createListAndAdd,
    deleteList,
    renameList,
    addBookToList,
    removeBookFromList,
    readingProgress,
    updateReadingProgress,
    preferences,
    toggleTheme,
    changeFontSize,
  }), [
    favorites,
    lists,
    readingProgress,
    preferences,
    toggleFavorite,
    createList,
    createListAndAdd,
    deleteList,
    renameList,
    addBookToList,
    removeBookFromList,
    updateReadingProgress,
    toggleTheme,
    changeFontSize,
  ]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
