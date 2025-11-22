import React, { useEffect, useMemo, useRef, useState } from "react";
import { Clock, Bookmark } from "lucide-react";
import "./ui.css";
import { useUser } from "../../context/UserContext";

export function Sidebar() {
  const [showLists, setShowLists] = useState(false);
  const { lists } = useUser();

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const hasLists = Array.isArray(lists) && lists.length > 0;

  const slugify = useMemo(
    () => (s) => String(s || "").toLowerCase().replace(/\s+/g, "-"),
    []
  );

  useEffect(() => {
    if (!showLists) return;

    const handleClickOutside = (event) => {
      const btn = buttonRef.current;
      const dropdown = dropdownRef.current;
      if (!btn && !dropdown) return;

      if (
        (btn && btn.contains(event.target)) ||
        (dropdown && dropdown.contains(event.target))
      ) {
        return;
      }

      setShowLists(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLists]);

  return (
    <aside className="sidebar">
      <a href="/historico" className="sidebar__item">
        <Clock size={18} />
        <span>Histórico</span>
      </a>

      <div className="sidebar__group">
        <button
          ref={buttonRef}
          type="button"
          className="sidebar__item sidebar__item--button"
          onClick={() => setShowLists((open) => !open)}
        >
          <div className="sidebar__item-main">
            <Bookmark size={18} />
            <span>Minhas Listas</span>
          </div>
        </button>

        {showLists && (
          <div ref={dropdownRef} className="sidebar__subsection">
            {!hasLists ? (
              <p className="sidebar__subempty">
                Você ainda não criou nenhuma lista.
              </p>
            ) : (
              <ul className="sidebar__sublist">
                {lists.map((list) => (
                  <li key={list.id}>
                    <a
                      href={`/minhas-listas?tab=${slugify(list.title)}`}
                      className="sidebar__subitem-link"
                    >
                      {list.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

