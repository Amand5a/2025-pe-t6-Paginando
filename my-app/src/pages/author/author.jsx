import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authors } from "../../data/authors";
import { books } from "../../data/books";
import BookCards from "../../components/books/cards/BookCards";
import "./author.css";

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
    <section className="authorpage">
      <header className="authorpage__header">
        {author.image && (
          <img src={author.image} alt={author.name} className="authorpage__avatar" />
        )}
        <div>
          <h1 className="authorpage__name">{author.name}</h1>
          <p className="authorpage__info">{author.nationality} • {author.birthDate}</p>
        </div>
      </header>

      {author.biography && (
        <article className="authorpage__section">
          <h3 className="authorpage__title">Biografia</h3>
          <p className="authorpage__text">{author.biography}</p>
        </article>
      )}

      {Array.isArray(author.notableWorks) && author.notableWorks.length > 0 && (
        <section className="authorpage__section">
          <h3 className="authorpage__title">Obras notáveis</h3>
          <div className="chips">
            {author.notableWorks.map((w, i) => (
              <span className="chip" key={i}>{w}</span>
            ))}
          </div>
        </section>
      )}

      {Array.isArray(author.awards) && author.awards.length > 0 && (
        <section className="authorpage__section">
          <h3 className="authorpage__title">Prêmios</h3>
          <div className="chips">
            {author.awards.map((w, i) => (
              <span className="chip chip--muted" key={i}>{w}</span>
            ))}
          </div>
        </section>
      )}

      <section className="authorpage__section">
        <h3 className="authorpage__title">Livros do autor</h3>
        <div className="authorpage__grid">
          {authorBooks.length > 0 ? (
            authorBooks.map((b) => (
              <BookCards key={b.id} id={b.id} title={b.title} author={b.author} image={b.image} />
            ))
          ) : (
            <p>Sem livros no catálogo.</p>
          )}
        </div>
      </section>

      <div className="authorpage__actions">
        <button className="btn btn--default btn--md" onClick={() => navigate(-1)}>Voltar</button>
      </div>
    </section>
  );
}
