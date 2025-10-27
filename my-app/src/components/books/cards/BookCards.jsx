import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Star, Plus } from "lucide-react";
import { useUser } from "../../../context/UserContext";
import "./BookCards.css";
import { useNavigate } from "react-router-dom";

export default function BookCards({ id, title, author, image }) {
  const navigate = useNavigate();
  const {
    favorites,
    toggleFavorite,
    lists,
    addBookToList,
    removeBookFromList,
    createListAndAdd,
    updateReadingProgress,
  } = useUser();

  const isFavorite = useMemo(() => favorites.includes(id), [favorites, id]);

  // UI: menu de listas
  const [menuOpen, setMenuOpen] = useState(false);
  const [newListName, setNewListName] = useState("");
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  const Popover = ({ children, width = 230 }) => {
    const [style, setStyle] = useState({ top: 0, left: 0, width });

    useEffect(() => {
      const update = () => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const gap = 8;
        const menuW = width;
        const vw = window.innerWidth;
        let left = rect.left;
        if (left + menuW + gap > vw) {
          left = Math.max(gap, rect.right - menuW);
        }
        const top = Math.min(
          window.innerHeight - 16,
          rect.bottom + gap
        );
        setStyle({ top, left, width: menuW, position: "fixed", zIndex: 1000 });
      };
      update();
      window.addEventListener("resize", update);
      window.addEventListener("scroll", update, { passive: true });
      return () => {
        window.removeEventListener("resize", update);
        window.removeEventListener("scroll", update);
      };
    }, [width]);

    return createPortal(
      <div ref={menuRef} className="bc-menu" style={style} role="dialog" aria-label="Adicionar a uma lista">
        {children}
      </div>,
      document.body
    );
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onOutside = (e) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target) &&
        btnRef.current && !btnRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [menuOpen]);

  const listHasBook = (list) => Array.isArray(list?.books) && list.books.includes(id);

  const handleToggleInList = (list) => {
    if (!list) return;
    if (listHasBook(list)) removeBookFromList(list.id, id);
    else addBookToList(list.id, id);
  };

  const handleCreateList = () => {
    const name = newListName.trim();
    if (!name) return;
    const existing = lists.find(
      (l) => l.title.trim().toLowerCase() === name.toLowerCase()
    );
    if (existing) {
      if (!listHasBook(existing)) addBookToList(existing.id, id);
      setNewListName("");
      setMenuOpen(false);
      return;
    }
    createListAndAdd(name, id);
    setNewListName("");
    setMenuOpen(false);
  };

  const handleStartReading = () => {
    updateReadingProgress(id, 1, 100);
    navigate(`/livro/${id}/${id}`);
  };

  return (
    <div className="bookcard-container bookcard-modern">
      <div className="bookcard-image-area">
        {/* Favoritar */}
        <button
          className={`bookcard-favorite ${isFavorite ? "active" : ""}`}
          onClick={() => toggleFavorite(id)}
          aria-label="Favoritar"
        >
          <Star size={20} />
        </button>

        {/* Menu de listas */}
        <button
          ref={btnRef}
          className={`bookcard-add ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Adicionar em listas"
        >
          <Plus size={20} />
        </button>

        {menuOpen && (
          <Popover>
            <strong className="bc-menu__title">Adicionar a...</strong>

            <div className="bc-menu__list">
              {lists.length > 0 ? (
                lists.map((list) => (
                  <label key={list.id} className="bc-menu__item">
                    <input
                      type="checkbox"
                      checked={listHasBook(list)}
                      onChange={() => handleToggleInList(list)}
                    />
                    <span>{list.title}</span>
                  </label>
                ))
              ) : (
                <p className="bc-menu__empty">Nenhuma lista criada ainda.</p>
              )}
            </div>

            <div className="bc-menu__new">
              <input
                className="bc-menu__input"
                type="text"
                placeholder="Criar nova lista..."
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreateList()}
              />
              <button
                className="bc-menu__iconbtn"
                onClick={handleCreateList}
                aria-label="Criar lista"
                title="Criar lista"
              >
                <Plus size={16} />
              </button>
            </div>
          </Popover>
        )}

        <img src={image} alt={title} className="bookcard-image" />
      </div>

      <div className="bookcard-footer-modern">
        <h3 className="bookcard-title-modern">{title}</h3>
        <p className="bookcard-author-modern">{author}</p>

        <button className="bookcard-button" onClick={handleStartReading}>
          Iniciar Leitura
        </button>
      </div>
    </div>
  );
}
