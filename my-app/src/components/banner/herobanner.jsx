import React from "react";
import { useNavigate } from "react-router-dom";
import "./herobanner.css";

export default function HeroBanner() {
  const navigate = useNavigate();

  const handleStartReading = () => {
    navigate("/acervo");
  };

  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Bem-vindo ao Paginando</h1>
        <p className="hero__subtitle">
          Explore uma vasta coleção de livros e recomendações personalizadas.
        </p>
        <button className="hero__button" onClick={handleStartReading}>
          Começar a Ler
        </button>
      </div>
    </section>
  );
}
