import React from "react";
import "./ui.css";

export function Header() {
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Acervo", path: "/acervo" },
    { name: "Salvos", path: "/favoritos" },
    { name: "Expert Reader", path: "/expert" },
  ];

  return (
    <header className="header">
      <h1 className="header__logo">Paginando</h1>

      <nav className="header__nav">
        {menuItems.map((item) => (
          <a key={item.name} href={item.path} className="header__link">
            {item.name}
          </a>
        ))}
      </nav>
    </header>
  );
}

