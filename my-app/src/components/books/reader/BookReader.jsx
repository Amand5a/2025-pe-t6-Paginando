import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Lazy-load do ReactReader para evitar quebrar o app caso a lib esteja ausente/incompatível
const LazyReactReader = lazy(() =>
  import("react-reader").then((m) => ({ default: m.ReactReader }))
);

/**
 * BookReader
 * Rota: /ler/:id
 * Carrega automaticamente /public/epub/:id.epub
 */
export default function BookReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(0);
  const [rendition, setRendition] = useState(null);
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState(100);

  const epubUrl = `/epub/${id}.epub`;

  useEffect(() => {
    if (!rendition) return;
    rendition.themes.register("light", { body: { background: "#fff", color: "#111" } });
    rendition.themes.register("dark", { body: { background: "#0f172a", color: "#f8fafc" } });
    rendition.themes.register("sepia", { body: { background: "#f6f1e7", color: "#3f382c" } });
    rendition.themes.select(theme);
    rendition.themes.fontSize(`${fontSize}%`);
  }, [rendition, theme, fontSize]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "0.75rem 1rem",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 8,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#ff6b00",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0.5rem 1rem",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          ← Voltar
        </button>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setFontSize((f) => Math.min(f + 10, 200))}>A+</button>
          <button onClick={() => setFontSize((f) => Math.max(f - 10, 60))}>A-</button>
          <button
            onClick={() =>
              setTheme((t) => (t === "light" ? "dark" : t === "dark" ? "sepia" : "light"))
            }
          >
            Tema
          </button>
        </div>
      </div>

      {/* Leitor */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <Suspense fallback={<div style={{ padding: 16 }}>Carregando leitor…</div>}>
          <LazyReactReader
            url={epubUrl}
            title={`Livro ${id}`}
            location={location}
            locationChanged={(epubcfi) => setLocation(epubcfi)}
            getRendition={(r) => setRendition(r)}
            epubInitOptions={{ openAs: "epub" }}
            epubOptions={{ manager: "continuous", flow: "paginated" }}
          />
        </Suspense>
      </div>
    </div>
  );
}

