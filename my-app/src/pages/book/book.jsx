import React, { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { books } from "../../data/books";
import "./book.css";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === Number(id));
  const authorId = useMemo(() => (book ? book.authorId : undefined), [book]);

  if (!book) {
    return (
      <div style={{ padding: "1.5rem" }}>
        <p>Livro não encontrado.</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  return (
    <section className="bookpage">
      <header className="bookpage__header">
        {book.image && (
          <img src={book.image} alt={book.title} className="bookpage__cover" />
        )}
        <div className="bookpage__meta">
          <h1 className="bookpage__title">{book.title}</h1>
          <p className="bookpage__by">
            por {" "}
            {authorId ? (
              <Link to={`/autor/${authorId}`} className="bookpage__authorlink">
                {book.author}
              </Link>
            ) : (
              <span>{book.author}</span>
            )}
          </p>
          <div className="bookpage__tags">
            {book.genre && <span className="tag">{book.genre}</span>}
            {book.rating != null && (
              <span className="tag tag--rating">★ {book.rating}</span>
            )}
          </div>
          <div className="bookpage__actions">
            <button className="btn btn--accent btn--md" onClick={() => navigate(`/livro/${book.id}/page`)}>
              Ler agora
            </button>
            <button className="btn btn--default btn--md" onClick={() => navigate(-1)}>
              Voltar
            </button>
          </div>
        </div>
      </header>

      {book.synopsis && (
        <section className="bookpage__section">
          <h3 className="bookpage__sectiontitle">Sinopse</h3>
          <p className="bookpage__text">{book.synopsis}</p>
        </section>
      )}
    </section>
  );
}

