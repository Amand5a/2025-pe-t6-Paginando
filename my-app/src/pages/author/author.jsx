import React, { useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { authors } from "../../data/authors";
import { books } from "../../data/books";

export default function AuthorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const author = authors.find((a) => a.id === Number(id));

  const authorBooks = useMemo(() => books.filter((b) => b.authorId === Number(id)), [id]);

  if (!author) {
    return (
      <div style={{ padding: "1.5rem" }}>
        <p>Autor não encontrado.</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  return (
    <section style={{ display: "grid", gap: "1.25rem", padding: "1rem" }}>
      <header style={{ display: "flex", gap: 16, alignItems: "center" }}>
        {author.image && (
          <img src={author.image} alt={author.name} style={{ width: 120, height: 120, objectFit: "cover", borderRadius: "50%" }} />
        )}
        <div>
          <h1 style={{ margin: 0 }}>{author.name}</h1>
          <p style={{ margin: "4px 0", color: "#64748b" }}>
            {author.nationality} • {author.birthDate}
          </p>
        </div>
      </header>

      {author.biography && (
        <article>
          <h3>Biografia</h3>
          <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{author.biography}</p>
        </article>
      )}

      {Array.isArray(author.notableWorks) && author.notableWorks.length > 0 && (
        <section>
          <h3>Obras notáveis</h3>
          <ul>
            {author.notableWorks.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </section>
      )}

      {Array.isArray(author.awards) && author.awards.length > 0 && (
        <section>
          <h3>Prêmios</h3>
          <ul>
            {author.awards.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3>Livros do autor</h3>
        <div style={{ display: "grid", gap: 12 }}>
          {authorBooks.length > 0 ? (
            authorBooks.map((b) => (
              <Link key={b.id} to={`/livro/${b.id}`} style={{ color: "#0ea5e9" }}>
                {b.title}
              </Link>
            ))
          ) : (
            <p>Sem livros no catálogo.</p>
          )}
        </div>
      </section>

      <div>
        <button onClick={() => navigate(-1)} style={{ padding: "0.6rem 1rem", borderRadius: 8, border: "1px solid #cbd5e1", background: "transparent", cursor: "pointer" }}>Voltar</button>
      </div>
    </section>
  );
}

