"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    twttr?: any;
  }
}

export default function XTimeline() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const ensureWidgets = async () => {
      // すでに twttr があるなら再描画
      if (window.twttr?.widgets?.load) {
        window.twttr.widgets.load();
        return;
      }

      // widgets.js が無ければ追加
      const existing = document.querySelector(
        'script[src="https://platform.twitter.com/widgets.js"]'
      ) as HTMLScriptElement | null;

      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => {
          if (!cancelled) window.twttr?.widgets?.load?.();
        };
        document.body.appendChild(script);
        return;
      }

      // script はあるが twttr がまだの場合、少し待って再描画
      setTimeout(() => {
        if (!cancelled) window.twttr?.widgets?.load?.();
      }, 200);
    };

    ensureWidgets();

    return () => {
      cancelled = true;
    };
  }, [pathname]); // ★ページ遷移や再レンダでも必ず再描画

  return (
    <section className="x-timeline">
      <h2 className="x-title">Latest from X</h2>

      <div className="x-frame">
        <a
          className="twitter-timeline"
          data-theme="dark"
          data-chrome="noheader nofooter noborders transparent"
          data-tweet-limit="5"
          data-dnt="true"
          href="https://x.com/ArcheNova_X"
        >
          Posts by ArcheNova_X
        </a>
      </div>
    </section>
  );
}
