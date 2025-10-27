import React, { useMemo, useState } from "react";
import { useUser } from "../../context/UserContext";
import { books } from "../../data/books";
import BookCards from "../../components/books/cards/BookCards";
import ListMenu from "./actions/actionbutton";
import { Pencil, Trash2 } from "lucide-react";
import "./favoritos.css";

export default function Favoritos() {
  const { favorites, lists, createList, deleteList, renameList } = useUser();
  const [activeTab, setActiveTab] = useState("favoritos");

  const slugify = (s) => String(s || "").toLowerCase().replace(/\s+/g, "-");
  const activeList = useMemo(() => {
    if (activeTab === "favoritos") return null;
    return lists.find((l) => slugify(l.title) === activeTab) || null;
  }, [activeTab, lists]);

  // ✅ Criação de lista simples
  const handleCreateList = () => {
    const title = prompt("Digite o nome da nova lista:");
    if (title && title.trim()) {
      createList(title.trim());
    }
  };

  // ✅ Obtém os IDs dos livros conforme aba selecionada
  const filteredBookIds = useMemo(() => {
    if (activeTab === "favoritos") return favorites;
    const list = lists.find((l) => slugify(l.title) === activeTab);
    return list ? list.books : [];
  }, [activeTab, favorites, lists]);

  // ✅ Filtra objetos reais dos livros com base nos IDs
  const filteredBooks = useMemo(
    () => books.filter((b) => filteredBookIds.includes(b.id)),
    [filteredBookIds]
  );

  // ✅ Cria abas dinâmicas (favoritos + listas do usuário)
  const tabs = useMemo(() => {
    const base = [{ id: "favoritos", label: "Favoritos" }];
    const userLists = lists.map((l) => ({ id: slugify(l.title), label: l.title }));
    return [...base, ...userLists];
  }, [lists]);

  const handleRename = () => {
    if (!activeList) return;
    const next = window.prompt("Renomear lista:", activeList.title);
    if (!next || !next.trim()) return;
    renameList(activeList.id, next.trim());
    setActiveTab(slugify(next.trim()));
  };

  const handleDelete = () => {
    if (!activeList) return;
    const ok = window.confirm(`Deseja excluir a lista "${activeList.title}"?`);
    if (!ok) return;
    deleteList(activeList.id);
    setActiveTab("favoritos");
  };

  return (
    <section className="favoritos">
      <header className="page__header">
        <h1 className="title title--xl text-center">Favoritos & Listas</h1>
        <p className="subtitle subtitle--md text-center">
          Gerencie seus livros favoritados e listas personalizadas.
        </p>
      </header>

      {/*  Menu  */}
      <ListMenu
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onCreateList={handleCreateList}
        tabs={tabs}
      />

      {activeList && (
        <div className="favoritos__toolbar" role="group" aria-label="Ações da lista">
          <button className="favtool__btn" onClick={handleRename} title="Renomear lista" aria-label="Renomear lista">
            <Pencil size={16} />
            <span>Renomear</span>
          </button>
          <button className="favtool__btn favtool__btn--danger" onClick={handleDelete} title="Excluir lista" aria-label="Excluir lista">
            <Trash2 size={16} />
            <span>Excluir</span>
          </button>
        </div>
      )}

      {/* Grid de cards */}
      <div className="favoritos__grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCards
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              image={book.image}
            />
          ))
        ) : (
          <p className="favoritos__empty">Nenhum livro encontrado nesta lista.</p>
        )}
      </div>
    </section>
  );
}
