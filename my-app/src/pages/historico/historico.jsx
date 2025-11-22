import React, { useMemo } from "react";
import BookCards from "../../components/books/cards/BookCards";
import { books } from "../../data/books";
import "./historico.css";

export default function Historico() {
  const historyBooks = useMemo(() => {
    if (typeof window === "undefined") return [];

    let overlay;
    try {
      overlay = JSON.parse(localStorage.getItem("userOverlayV2")) || {};
    } catch {
      overlay = {};
    }

    const entries = Object.entries(overlay.byBookId || {});

    const withTime = entries
      .map(([id, data]) => {
        const lastOpenedAt = data?.leitura?.lastOpenedAt;
        if (!lastOpenedAt) return null;

        const book = books.find((b) => String(b.id) === String(id));
        if (!book) return null;

        const time = Date.parse(lastOpenedAt);
        if (!Number.isFinite(time)) return null;

        return { book, time };
      })
      .filter(Boolean)
      .sort((a, b) => b.time - a.time)
      .slice(0, 12)
      .map((item) => item.book);

    return withTime;
  }, []);

  return (
    <section className="historico">
      <header className="page__header">
        <h1 className="title title--xl text-center">
          Histórico de leitura
        </h1>
        <p className="subtitle subtitle--md text-center">
          Veja os últimos livros que você abriu recentemente.
        </p>
      </header>

      {historyBooks.length === 0 ? (
        <p className="historico__empty">
          Você ainda não abriu nenhum livro recentemente.
        </p>
      ) : (
        <div className="historico__grid">
          {historyBooks.map((book) => (
            <BookCards
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              image={book.image}
            />
          ))}
        </div>
      )}
    </section>
  );
}

