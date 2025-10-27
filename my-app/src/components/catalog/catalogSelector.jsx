import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import "./catalogSelector.css";
import "../../index.css";

export default function CatalogContainer() {
  const genres = [
    "Fantasia",
    "Ficção Científica",
    "Romance",
    "Mistério",
    "Terror",
    "Clássico",
    "Drama",
    "Aventura",
  ];

  return (
    <section className="catalog">
      <div className="catalog__content">
        <h1 className="title title--xl text-center">Explore o Acervo</h1>
        <p className="subtitle subtitle--md text-center">
          Busque por títulos, autores ou gêneros e descubra novas leituras.
        </p>

        {/* Linha de busca e filtro */}
        <div className="catalog__controls">
          <div className="catalog__search">
            <Search className="catalog__search-icon" />
            <input
              type="text"
              placeholder="Buscar por título, autor ou palavra-chave..."
              className="catalog__input"
            />
          </div>

          <button className="catalog__filter-btn">
            <SlidersHorizontal size={18} />
            Filtros
          </button>
        </div>

        {/* Gêneros */}
        <div className="catalog__genres">
          {genres.map((genre) => (
            <button key={genre} className="catalog__chip">
              {genre}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
