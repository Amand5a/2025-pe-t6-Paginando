import React, { useMemo, useState } from "react";
import CatalogSection from "../../components/catalog/catalogSelector";
import { books } from "../../data/books";
import BookCards from "../../components/books/cards/BookCards";
import BookCarousel from "../../components/books/carousel/BookCarousel";

export default function Acervo() {
  const [query, setQuery] = useState("");
  const [genres, setGenres] = useState([]);

  const allGenres = useMemo(() => {
    const set = new Set();
    books.forEach((b) => { if (b.genre) set.add(String(b.genre)); });
    return Array.from(set).sort((a,b)=> a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      const byQuery = !q || [b.title, b.author, b.genre].some((v) => String(v || "").toLowerCase().includes(q));
      const byGenre = genres.length === 0 || genres.includes(b.genre);
      return byQuery && byGenre;
    });
  }, [query, genres]);
  return (
    <div className="acervo">
      <CatalogSection
        onSearch={setQuery}
        onGenresChange={setGenres}
        genresSource={allGenres}
        selectedGenres={genres}
      />
      <section className="bookgrid" style={{ marginTop: "2rem" }}>
        <BookCarousel title={genres.length ? `Filtrados (${filtered.length})` : "Todos os livros"}>
          {filtered.map((book) => (
            <BookCards
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              image={book.image}
            />
          ))}
        </BookCarousel>
      </section>
    </div>
  );
}
