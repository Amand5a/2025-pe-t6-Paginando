import React from "react";
import { Clock, Bookmark, GraduationCap } from "lucide-react";
import "./ui.css";

export function Sidebar() {
  const sidebarItems = [
    { name: "Histórico", icon: Clock, path: "/historico" },
    { name: "Clubs", icon: GraduationCap, path: "/clubs" },
    { name: "Minhas Listas", icon: Bookmark, path: "/minhas-listas" },
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
