import React from "react";
import "./herobanner.css";

export default function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero__content">
        <h1 className="hero__title">Bem-vindo à Biblioteca Virtual</h1>
        <p className="hero__subtitle">
          Explore uma vasta coleção de livros e recomendações personalizadas.
        </p>
        <button className="hero__button">Começar a Ler</button>
      </div>
    </section>
  );
}
