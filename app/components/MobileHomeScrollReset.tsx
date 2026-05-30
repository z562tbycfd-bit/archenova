"use client";

import { useEffect } from "react";

export default function MobileHomeScrollReset() {
  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (!isMobile) return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const reset = () => {
      const first = document.querySelector<HTMLElement>("[data-home-section]");
      if (first) {
        first.scrollIntoView({ block: "start", behavior: "auto" });
      } else {
        window.scrollTo(0, 0);
      }
    };

    reset();

    const t1 = window.setTimeout(reset, 80);
    const t2 = window.setTimeout(reset, 300);
    const t3 = window.setTimeout(reset, 700);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  return null;
}