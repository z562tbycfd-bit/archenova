"use client";

import { useState } from "react";

const slides = [
  {
    label: "DISCOVERY",
    image: "/images/archenova-discovery.jpeg",
  },
  {
    label: "IMPLEMENTATION",
    image: "/images/archenova-implementation.jpeg",
  },
  {
    label: "CIVILIZATION",
    image: "/images/archenova-civilization.jpeg",
  },
];

export default function ArcheNovaDiscoverySlider() {
  const [index, setIndex] = useState(0);
  const slide = slides[index];

  function nextSlide() {
    setIndex((current) => (current + 1) % slides.length);
  }

  return (
    <button
      type="button"
      className="an-image-slider"
      onClick={nextSlide}
      aria-label={`ArcheNova ${slide.label}`}
    >
      <img
        src={slide.image}
        alt={slide.label}
        className="an-image-slider-img"
      />

      <div className="an-image-slider-dots">
        {slides.map((item, i) => (
          <span
            key={item.label}
            className={i === index ? "active" : ""}
          />
        ))}
      </div>
    </button>
  );
}