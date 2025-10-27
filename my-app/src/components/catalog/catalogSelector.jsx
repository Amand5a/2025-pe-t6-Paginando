import React, { useMemo, useRef, useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import "./catalogSelector.css";
import "../../index.css";

export default function CatalogContainer({ onSearch, onGenresChange, genresSource, selectedGenres = [] }) {
  const fallback = ["Fantasia","Ficção Científica","Romance","Mistério","Terror","Clássico","Drama","Aventura"];
  const genres = useMemo(() => (genresSource && genresSource.length ? genresSource : fallback), [genresSource]);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [tempSel, setTempSel] = useState(new Set(selectedGenres));
  const btnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => setTempSel(new Set(selectedGenres)), [selectedGenres]);

  useEffect(() => {
    if (!open) return;
    const onOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && btnRef.current && !btnRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [open]);

  const apply = () => { onGenresChange && onGenresChange(Array.from(tempSel)); setOpen(false); };
  const clear = () => { setTempSel(new Set()); onGenresChange && onGenresChange([]); };

  return (
    <section className="catalog">
      <div className="catalog__content">
        <h1 className="title title--xl text-center">Explore o Acervo</h1>
        <p className="subtitle subtitle--md text-center">Busque por títulos, autores ou filtre por gêneros.</p>

        <div className="catalog__controls">
          <div className="catalog__search">
            <Search className="catalog__search-icon" />
            <input
              type="text"
              placeholder="Buscar por título, autor ou palavra-chave..."
              className="catalog__input"
              value={query}
              onChange={(e) => { setQuery(e.target.value); onSearch && onSearch(e.target.value); }}
            />
          </div>

          <div style={{ position: "relative" }}>
            <button ref={btnRef} className="catalog__filter-btn" onClick={() => setOpen((v) => !v)}>
              <SlidersHorizontal size={18} />
              Filtros
            </button>
            {open && (
              <div ref={menuRef} className="catalog__filter-pop">
                <strong className="catalog__filter-title">Gêneros</strong>
                <div className="catalog__filter-list">
                  {genres.map((g) => (
                    <label key={g} className="catalog__filter-item">
                      <input
                        type="checkbox"
                        checked={tempSel.has(g)}
                        onChange={() => {
                          const next = new Set(tempSel);
                          if (next.has(g)) next.delete(g); else next.add(g);
                          setTempSel(next);
                        }}
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
                <div className="catalog__filter-actions">
                  <button className="catalog__filter-clear" onClick={clear}>Limpar</button>
                  <button className="catalog__filter-apply" onClick={apply}>Aplicar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

