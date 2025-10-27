import React, { useEffect, useRef, useState } from "react";
import "./BookCarousel.css";

export default function BookCarousel({ title, children }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    setCanPrev(scrollLeft > 2);
    setCanNext(scrollLeft < max - 2);
  };

  const scrollBy = (dir = 1) => {
    const el = trackRef.current;
    if (!el) return;
    const delta = Math.max(320, Math.floor(el.clientWidth * 0.9)) * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateArrows();
    const onScroll = () => updateArrows();
    el.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => updateArrows();
    window.addEventListener("resize", onResize);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="bookcarousel" aria-label={title || "Carrossel"}>
      {title && <h2 className="bookcarousel__title">{title}</h2>}

      <div className="bookcarousel__row">
        <button
          type="button"
          className="bookcarousel__arrow"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          aria-label="Anterior"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div ref={trackRef} className="bookcarousel__track">
          {React.Children.map(children, (child, i) => (
            <div className="bookcarousel__slide" key={i}>{child}</div>
          ))}
        </div>

        <button
          type="button"
          className="bookcarousel__arrow"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          aria-label="Próximo"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
