import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import EpubBookReader from "../../components/books/reader/BookReader";
import { books } from "../../data/books";

export default function ReaderPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const bookId = Number(id);
  const book = books.find((b) => b.id === bookId);

  // Origem dos EPUBs; ajustado para a pasta usada por você ("public/epub").
  const bookUrl = `/epub/${bookId}.epub`;
  const title = book?.title || "Leitura";

  return (
    <EpubBookReader
      bookUrl={bookUrl}
      title={title}
      bookId={`book-${bookId}`}
      onBack={() => navigate(-1)}
    />
  );
}
