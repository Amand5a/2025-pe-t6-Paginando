import React from "react";
import { Star, Clock, Bookmark, GraduationCap } from "lucide-react";
import "./ui.css";

export function Sidebar() {
  const sidebarItems = [
    { name: "Favoritos", icon: Star, path: "/favoritos" },
    { name: "Ler Mais Tarde", icon: Clock, path: "/ler-mais-tarde" },
    { name: "Me Indicaram", icon: Bookmark, path: "/me-indicar" },
    { name: "Estudos", icon: GraduationCap, path: "/estudos" },
  ];

  return (
    <aside className="sidebar">
      {sidebarItems.map((item) => (
        <a key={item.name} href={item.path} className="sidebar__item">
          <item.icon size={18} />
          <span>{item.name}</span>
        </a>
      ))}
    </aside>
  );
}
