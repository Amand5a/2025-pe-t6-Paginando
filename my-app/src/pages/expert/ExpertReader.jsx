import React, { useMemo } from "react";
import { books } from "../../data/books";
import BookCards from "../../components/books/cards/BookCards";
import { useUser } from "../../context/UserContext";
import "./ExpertReader.css";

export default function ExpertReader() {
  const { readingProgress, favorites } = useUser();

  const preferenceTags = useMemo(() => {
    const tagSet = new Set();

    // 1) Última leitura salva via BookCards.handleStartReading
    try {
      const raw = localStorage.getItem("lastReadingTags");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          parsed
            .map((t) => String(t || "").toLowerCase())
            .filter((t) => t)
            .forEach((t) => tagSet.add(t));
        }
      }
    } catch {
      // ignora erro de parse
    }

    // 2) Livros com progresso de leitura
    const progressIds = Object.keys(readingProgress || {});
    books
      .filter((b) => progressIds.includes(String(b.id)))
      .forEach((b) => {
        [b.genre, b.author, ...(b.tags || [])]
          .filter(Boolean)
          .map((t) => String(t).toLowerCase())
          .forEach((t) => tagSet.add(t));
      });

    // 3) Livros favoritados
    books
      .filter((b) => (favorites || []).includes(b.id))
      .forEach((b) => {
        [b.genre, b.author, ...(b.tags || [])]
          .filter(Boolean)
          .map((t) => String(t).toLowerCase())
          .forEach((t) => tagSet.add(t));
      });

    return Array.from(tagSet);
  }, [readingProgress, favorites]);

  const recommendedBooks = useMemo(() => {
    if (!Array.isArray(preferenceTags) || preferenceTags.length === 0) {
      return [];
    }

    const normalizedTags = preferenceTags.map((t) => t.toLowerCase());
    const progressIds = new Set(Object.keys(readingProgress || {}));

    return books
      .map((b) => {
        const bookTags = [b.genre, b.author, ...(b.tags || [])]
          .filter(Boolean)
          .map((t) => String(t).toLowerCase());

        const matchCount = bookTags.filter((t) =>
          normalizedTags.includes(t)
        ).length;

        if (matchCount === 0) {
          return null;
        }

        const isInProgress = progressIds.has(String(b.id));

        const baseScore = matchCount * 10 + (b.rating || 0);
        const score = isInProgress ? baseScore - 5 : baseScore;

        return { ...b, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [preferenceTags, readingProgress]);

  return (
    <div className="page expert-reader">
      <h1 className="expert-reader__title title title--xl">Expert Reader</h1>

      {recommendedBooks.length > 0 ? (
        <>
          <p className="expert-reader__subtitle subtitle subtitle--sm">
            Baseado no seu perfil de leitura
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
          Nenhuma recomendação disponível no momento.
          Leia ou favorite alguns livros para receber sugestões personalizadas!
        </p>
      )}
    </div>
  );
}
