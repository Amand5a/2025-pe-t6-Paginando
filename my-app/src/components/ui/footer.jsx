import React from "react";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__links">
        <a href="/sobre">Sobre nós</a>
        <a href="/política">Política de Privacidade</a>
        <a href="/termos">Termos de Uso</a>
        <a href="/contact">Contacte-Nos</a>
      </div>
      <div className="footer__copyright">
        © {new Date().getFullYear()} Paginando. Todos os direitos reservados.
      </div>
    </footer>
  );
}
