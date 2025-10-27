import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { books } from "../../data/books";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === Number(id));

  if (!book) {
    return (
      <div style={{ padding: "1.5rem" }}>
        <p>Livro não encontrado.</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  return (
    <section style={{ display: "grid", gap: "1rem", padding: "1rem" }}>
      <header style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {book.image && (
          <img src={book.image} alt={book.title} style={{ width: 120, height: 160, objectFit: "cover", borderRadius: 8 }} />
        )}
        <div>
          <h1 style={{ margin: 0 }}>{book.title}</h1>
          <p style={{ margin: "4px 0", color: "#475569" }}>
            por {" "}
            <Link to={`/autor/${book.authorId}`} style={{ color: "#0ea5e9" }}>
              {book.author}
            </Link>
          </p>
          <p style={{ margin: 0, color: "#64748b" }}>
            Gênero: {book.genre} • Avaliação: {book.rating}
          </p>
        </div>
      </header>

      {book.synopsis && (
        <article>
          <h3>Sinopse</h3>
          <p style={{ lineHeight: 1.7 }}>{book.synopsis}</p>
        </article>
      )}

      <div>
        <button onClick={() => navigate(`/livro/${book.id}/page`)} style={btnPrimary}>Ler agora</button>
        <button onClick={() => navigate(-1)} style={{ ...btnOutline, marginLeft: 8 }}>Voltar</button>
      </div>
    </section>
  );
}

const btnPrimary = {
  padding: "0.6rem 1rem",
  borderRadius: 8,
  border: "none",
  background: "#ff6b00",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer",
};

const btnOutline = {
  padding: "0.6rem 1rem",
  borderRadius: 8,
  border: "1px solid #cbd5e1",
  background: "transparent",
  color: "#334155",
  fontWeight: 600,
  cursor: "pointer",
};

