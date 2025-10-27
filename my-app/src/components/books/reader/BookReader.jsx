import React, { useEffect, useState, useRef, useCallback, useMemo, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { books } from "../../../data/books"; // 🔹 Ajuste conforme sua pasta

const LazyReactReader = lazy(() =>
  import("react-reader").then((m) => ({ default: m.ReactReader }))
);

const THEMES = {
  light: {
    "--reader-bg": "var(--white)",
    "--reader-fg": "var(--text-primary)",
    "--reader-muted": "var(--text-secondary)",
    "--reader-accent": "var(--accent-orange)",
    "--reader-panel": "var(--white)",
    "--reader-border": "var(--border)",
    "--reader-highlight": "var(--accent-light)",
  },
  dark: {
    "--reader-bg": "#0f172a",
    "--reader-fg": "#e2e8f0",
    "--reader-muted": "#94a3b8",
    "--reader-accent": "var(--accent-orange)",
    "--reader-panel": "#0b1220",
    "--reader-border": "#1e293b",
    "--reader-highlight": "#172033",
  },
  sepia: {
    "--reader-bg": "#f6f1e7",
    "--reader-fg": "#3f382c",
    "--reader-muted": "#7a6f5e",
    "--reader-accent": "#b4622d",
    "--reader-panel": "#f4eee2",
    "--reader-border": "#e7dcc8",
    "--reader-highlight": "#efe6d6",
  },
};

// helpers
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const savePref = (id, k, v) => localStorage.setItem(`reader:${id}:${k}`, JSON.stringify(v));
const loadPref = (id, k, f) => {
  const raw = localStorage.getItem(`reader:${id}:${k}`);
  return raw ? JSON.parse(raw) : f;
};

export default function BookReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === Number(id));
  const epubUrl = `/epub/${id}.epub`;

  const [theme, setTheme] = useState(() => loadPref(id, "theme", "light"));
  const [fontSize, setFontSize] = useState(() => loadPref(id, "fontSize", 110));
  const [location, setLocation] = useState(() => loadPref(id, "location", 0));
  const [rendition, setRendition] = useState(null);
  const saveThrottle = useRef(0);

  const themeVars = useMemo(() => THEMES[theme] || THEMES.light, [theme]);

  useEffect(() => savePref(id, "theme", theme), [id, theme]);
  useEffect(() => savePref(id, "fontSize", fontSize), [id, fontSize]);
  useEffect(() => savePref(id, "location", location), [id, location]);

  useEffect(() => {
    if (!rendition) return;
    const base = {
      fontFamily: "'Inter', sans-serif",
      lineHeight: 1.75,
      fontSize: `${fontSize}%`,
      textAlign: "justify",
      padding: "0 3rem",
      columnGap: "3rem",
    };

    rendition.themes.register("light", { body: { ...base, background: "#f9fafb", color: "#1e293b" } });
    rendition.themes.register("dark", { body: { ...base, background: "#0f172a", color: "#e2e8f0" } });
    rendition.themes.register("sepia", { body: { ...base, background: "#f4eee2", color: "#3f382c" } });
    rendition.themes.select(theme);
  }, [rendition, theme, fontSize]);

  const onLocationChanged = useCallback(
    (epubcfi) => {
      setLocation(epubcfi);
      const now = Date.now();
      if (now - saveThrottle.current > 500) {
        savePref(id, "location", epubcfi);
        saveThrottle.current = now;
      }
    },
    [id]
  );

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--reader-bg)",
        color: "var(--reader-fg)",
        fontFamily: "'Inter', sans-serif",
        ...themeVars,
      }}
    >
      {/* Header limpo */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "var(--reader-panel)",
          borderBottom: "1px solid var(--reader-border)",
          padding: "0.75rem 1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <button onClick={() => navigate(-1)} style={btnStyleSecondary}>
          ⬅ Voltar
        </button>

        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button onClick={() => setFontSize((v) => clamp(v - 10, 80, 200))} style={btnStyle}>
            A-
          </button>
          <div style={{ alignSelf: "center", fontSize: 13, color: "var(--reader-muted)", minWidth: 48, textAlign: "center" }}>
            {fontSize}%
          </div>
          <button onClick={() => setFontSize((v) => clamp(v + 10, 80, 200))} style={btnStyle}>
            A+
          </button>
          <button onClick={() => setTheme((t) => (t === "light" ? "sepia" : t === "sepia" ? "dark" : "light"))} style={btnStyle}>
            Tema
          </button>
        </div>
      </div>

      {/* Leitor EPUB */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <Suspense fallback={<div style={{ padding: "2rem" }}>Carregando livro…</div>}>
          <LazyReactReader
            url={epubUrl}
            showToc={false} // 🔹 remove menu hamburguer
            location={location}
            locationChanged={onLocationChanged}
            getRendition={setRendition}
            epubInitOptions={{ openAs: "epub" }}
            epubOptions={{ flow: "paginated" }}
          />
        </Suspense>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "sticky",
          bottom: 0,
          background: "var(--reader-panel)",
          borderTop: "1px solid var(--reader-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
          fontSize: 12,
          color: "var(--reader-muted)",
        }}
      >
        <span>Dicas: A+/A- • T (tema)</span>
        <span>
          Tema:{" "}
          <strong style={{ color: "var(--reader-fg)" }}>
            {theme[0].toUpperCase() + theme.slice(1)}
          </strong>{" "}
          · Fonte:{" "}
          <strong style={{ color: "var(--reader-fg)" }}>{fontSize}%</strong>
        </span>
      </div>
    </div>
  );
}

// estilos
const btnBase = {
  border: "1px solid var(--reader-border)",
  background: "var(--reader-panel)",
  color: "var(--reader-fg)",
  borderRadius: 10,
  padding: "0.45rem 0.75rem",
  fontWeight: 600,
  cursor: "pointer",
  transition: "background 0.15s ease, transform 0.05s ease",
};
const btnStyle = { ...btnBase };
const btnStyleSecondary = { ...btnBase, background: "var(--reader-highlight)" };
