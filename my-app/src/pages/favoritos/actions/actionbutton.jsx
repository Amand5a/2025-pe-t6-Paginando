import React, { useState, useEffect, useRef } from "react";
import "./actionbutton.css";
import Button from "../../../components/ui/button";
import { Plus } from "lucide-react";

/**
 * Componente de menu de listas dinâmicas.
 * Recebe as abas da página (Favoritos, Estudos, etc)
 */
export default function ListMenu({ activeTab, onTabChange, onCreateList, tabs = [] }) {
  const [isMobile, setIsMobile] = useState(false);
  const scrollerRef = useRef(null);
  const activeRef = useRef(null);

  // Detecta se a tela é pequena
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Centraliza a aba ativa dentro do scroller ao trocar
  useEffect(() => {
    const el = activeRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeTab]);

  return (
    <div className="listmenu">
      {isMobile ? (
        <div className="listmenu__mobile">
          <select
            className="listmenu__select"
            value={activeTab}
            onChange={(e) => onTabChange(e.target.value)}
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.label}
              </option>
            ))}
          </select>

          <Button
            variant="accent"
            size="md"
            icon={Plus}
            onClick={onCreateList}
            className="listmenu__newlist"
          >
            Nova Lista
          </Button>
        </div>
      ) : (
        <div className="listmenu__row">
          <div className="listmenu__scroller" ref={scrollerRef}>
            {tabs.map((tab) => (
              <span
                key={tab.id}
                ref={activeTab === tab.id ? activeRef : null}
                className="listmenu__chipwrap"
              >
                <Button
                  variant="default"
                  size="md"
                  active={activeTab === tab.id}
                  onClick={() => onTabChange(tab.id)}
                >
                  {tab.label}
                </Button>
              </span>
            ))}
          </div>

          <Button variant="accent" size="md" icon={Plus} onClick={onCreateList} className="listmenu__newlist">
            Nova Lista
          </Button>
        </div>
      )}
    </div>
  );
}
