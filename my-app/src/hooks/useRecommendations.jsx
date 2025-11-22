import { useMemo } from "react";

/**
 * Hook de recomendações locais baseado no histórico do usuário.
 * @param {Object} overlay - UserOverlayV2 salvo no localStorage 
 * @param {Array} books - Catálogo completo de livros 
 * @param {Object} [currentBook] - Livro atual 
 * @returns {Array} Lista de livros recomendados.
 */
export default function useRecommendations(overlay, books, currentBook = null) {
  return useMemo(() => {
    if (!overlay?.byBookId || !Array.isArray(books)) return [];

    // Coleta favoritos e leituras recentes
    const prefs = { favoriteAuthors: [], favoriteGenres: [] };

    Object.entries(overlay.byBookId).forEach(([bookId, data]) => {
      const book = books.find((b) => b.id === Number(bookId));
      if (!book) return;

      if (data.favorito) {
        prefs.favoriteAuthors.push(book.author);
        prefs.favoriteGenres.push(book.genre);
      }

      if (data.leitura?.ativo || data.leitura?.progress > 0.1) {
        prefs.favoriteAuthors.push(book.author);
        prefs.favoriteGenres.push(book.genre);
      }
    });

    // Remove duplicados
    prefs.favoriteAuthors = [...new Set(prefs.favoriteAuthors)];
    prefs.favoriteGenres = [...new Set(prefs.favoriteGenres)];

    // Gera pontuação para cada livro
    const scored = books
      .map((book) => {
        let score = 0;
        if (prefs.favoriteAuthors.includes(book.author)) score += 2;
        if (prefs.favoriteGenres.includes(book.genre)) score += 1;
        if (currentBook && book.genre === currentBook.genre) score += 1;
        if (currentBook && book.author === currentBook.author) score += 2;
        return { ...book, score };
      })
      .filter((b) => !currentBook || b.id !== currentBook.id) // evita recomendar o mesmo
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, 6); // top 6 recomendações
  }, [overlay, books, currentBook]);
}
