import React, { useMemo } from "react";
import { books } from "../../data/books";
import BookCards from "../../components/books/cards/BookCards";
import "./ExpertReader.css";

export default function ExpertReader() {
  // Recupera tags da última leitura
  const tags = JSON.parse(localStorage.getItem("lastReadingTags")) || [];

  // Gera recomendações com base nessas tags
  const recommendedBooks = useMemo(() => {
    if (!Array.isArray(tags) || tags.length === 0) return [];

    const normalizedTags = tags.map((t) => t.toLowerCase());

    return books
      .map((b) => {
        const bookTags = [b.genre, b.author, ...(b.tags || [])]
          .filter(Boolean)
          .map((t) => t.toLowerCase());

        // Conta quantas tags coincidem
        const matchCount = bookTags.filter((t) =>
          normalizedTags.includes(t)
        ).length;

        return { ...b, score: matchCount };
      })
      .filter((b) => b.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8); // top 8 livros
  }, [tags]);

  return (
    <div className="page expert-reader">
      <h1 className="expert-reader__title title title--xl">Expert Reader</h1>

      {recommendedBooks.length > 0 ? (
        <>
          <p className="expert-reader__subtitle subtitle subtitle--sm">
            Baseado na sua leitura recente
          </p>

          <div className="expert-reader__grid">
            {recommendedBooks.map((book) => (
              <BookCards
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                image={book.image}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="expert-reader__empty">
          Nenhuma recomendação disponível.  
          Inicie uma leitura para receber sugestões!
        </p>
      )}
    </div>
  );
}
