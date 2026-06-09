"use client";

import Link from "next/link";
import { useState } from "react";

const slides = [
  {
    label: "DISCOVERY",
    title: "Scientific Discovery",
    text: "Reality becomes observable knowledge.",
    image: "/images/archenova-discovery.jpeg",
  },
  {
    label: "IMPLEMENTATION",
    title: "Technological Realization",
    text: "Knowledge becomes engineered capability.",
    image: "/images/archenova-implementation.jpeg",
  },
  {
    label: "CIVILIZATION",
    title: "Infrastructure Formation",
    text: "Capability becomes civilization-scale architecture.",
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
    <div className="an-image-slider">
      <button
        type="button"
        className="an-image-slider-button"
        onClick={nextSlide}
        aria-label="Next ArcheNova image"
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="an-image-slider-img"
        />

        <div className="an-image-slider-overlay">
          <span className="home-section-label">{slide.label}</span>

          <h2>{slide.title}</h2>

          <p>{slide.text}</p>

          <div className="an-image-slider-dots">
            {slides.map((item, i) => (
              <span
                key={item.label}
                className={i === index ? "active" : ""}
              />
            ))}
          </div>
        </div>
      </button>

      <Link href="/archenova" className="an-image-slider-link">
        Open ArcheNova →
      </Link>
    </div>
  );
}