"use client";

import { useEffect } from "react";

export default function CivilizationIntelligenceMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".ci2-page");
    const stage = document.querySelector<HTMLElement>(".ci2-stage");
    const dna = document.querySelector<HTMLElement>(".ci2-dna");
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".ci2-card"),
    );

    if (!root || !stage || !dna || cards.length === 0) return;

    let ticking = false;

    const update = () => {
      const rect = stage.getBoundingClientRect();
      const viewport = window.innerHeight || 1;

      const progress = Math.min(
        1,
        Math.max(0, (viewport - rect.top) / (viewport + rect.height)),
      );

      root.style.setProperty("--ci-scroll", String(progress));
      root.style.setProperty("--ci-rotate", `${progress * 42 - 21}deg`);

      const activeIndex = Math.min(
        cards.length - 1,
        Math.max(0, Math.floor(progress * cards.length)),
      );

      cards.forEach((card, index) => {
        card.classList.toggle("ci2-card-active", index === activeIndex);
      });

      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return null;
}