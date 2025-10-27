import React, { useMemo } from "react";
import { useUser } from "../../context/UserContext";
import { books } from "../../data/books";
import BookCarousel from "../../components/books/carousel/BookCarousel";
import BookCards from "../../components/books/cards/BookCards";
import HeroBanner from "../../components/banner/herobanner";

export default function Home() {
  const { readingProgress } = useUser();

  const inProgress = useMemo(() => {
    // fallback via localstorage
    const idsFromContext = Object.entries(readingProgress || {})
      .filter(([, v]) => v && typeof v === "object")
      .filter(([, v]) => {
        const p = Number(v.percent || 0);
        return p > 0 && p < 100;
      })
      .map(([k]) => Number(k))
      .filter((n) => !Number.isNaN(n));

    const idsFromLocal = books
      .map((b) => b.id)
      .filter((id) => {
        try {
          return !!localStorage.getItem(`reader:${id}:location`);
        } catch (_) {
          return false;
        }
      });

    const idSet = new Set([...idsFromContext, ...idsFromLocal]);
    return books.filter((b) => idSet.has(b.id));
  }, [readingProgress]);

  const mostRead = useMemo(() => {
    // ordena por rating como proxy de "mais lidos".
    return [...books].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 5);
  }, []);

  const recommended = useMemo(() => {
    // Placeholder: estrutura pronta para implementar lógica de recomendações. 
    const inProgressSet = new Set(inProgress.map((b) => b.id));
    return books.filter((b) => !inProgressSet.has(b.id)).slice(0, 10);
  }, [inProgress]);

  return (
    <div className="home" style={{ display: "grid", gap: "2rem" }}>
      <HeroBanner />

      <section>
        <BookCarousel title="Leituras em andamento">
          {inProgress.length > 0 ? (
            inProgress.map((book) => (
              <BookCards key={book.id} id={book.id} title={book.title} author={book.author} image={book.image} />
            ))
          ) : (
            <div style={{ padding: "1rem", color: "#64748b" }}>Nenhuma leitura em andamento.</div>
          )}
        </BookCarousel>
      </section>

      <section>
        <BookCarousel title="Recomendações para você">
          {recommended.map((book) => (
            <BookCards key={book.id} id={book.id} title={book.title} author={book.author} image={book.image} />
          ))}
        </BookCarousel>
      </section>

      <section>
        <BookCarousel title="Mais lidos">
          {mostRead.map((book) => (
            <BookCards key={book.id} id={book.id} title={book.title} author={book.author} image={book.image} />
          ))}
        </BookCarousel>
      </section>
    </div>
  );
}
