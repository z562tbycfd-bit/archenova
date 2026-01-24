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
    const load = async () => {
      // ① 既にウィジェットがあるなら“再描画”を必ず実行
      if (window.twttr?.widgets?.load) {
        window.twttr.widgets.load();
        return;
      }

      // ② widgets.js がまだなら注入
      const existing = document.querySelector(
        'script[src="https://platform.twitter.com/widgets.js"]'
      );

      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => window.twttr?.widgets?.load?.();
        document.body.appendChild(script);
      } else {
        // scriptはあるが twttr がまだの場合 → 少し待ってから再描画
        setTimeout(() => window.twttr?.widgets?.load?.(), 150);
      }
    };

    load();
  }, [pathname]); // ★ページ遷移や再レンダ時にも必ず再描画する

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
