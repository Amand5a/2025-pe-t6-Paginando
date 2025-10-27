import React from "react";
import CatalogSection from "../../components/catalog/catalogSelector";
import { books } from "../../data/books";
import BookCards from "../../components/books/cards/BookCards";
import BookCarousel from "../../components/books/carousel/BookCarousel";

export default function Acervo() {
  return (
    <div className="acervo">
      <CatalogSection />
      <section className="bookgrid" style={{ marginTop: "2rem" }}>
        <BookCarousel title="Todos os livros">
          {books.map((book) => (
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
