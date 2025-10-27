
import React from "react";
import { Routes, Route, useNavigate, } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Layout from "./core/layout/layout";
import Favoritos from "./pages/favoritos/favoritos";
import Acervo from "./pages/acervo/acervo";
import TextBookReader from "./components/books/reader/BookReader";
import Home from "./pages/home/home";
import BookDetails from "./pages/book/book";
import AuthorDetails from "./pages/author/author";


function BookReaderPage() {
  const navigate = useNavigate();

  return (
    <TextBookReader
      txtUrl="/epub/1.epub"     // ✅ caminho público correto
      title="Meu Livro de Teste"
      bookId="teste-livro"
      onBack={() => navigate(-1)} // botão voltar
    />
  );
}

export default function App() {
  return (
    <UserProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/acervo" element={<Acervo />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/livro/:id" element={<BookDetails />} />
          <Route path="/autor/:id" element={<AuthorDetails />} />
          <Route path="/livro/:id/page" element={<BookReaderPage />} />
        </Routes>
      </Layout>
    </UserProvider>
  );
}
