"use client";

import { useEffect } from "react";

export default function XTimeline() {
  useEffect(() => {
    // 既に widgets.js があれば再描画のみ
    if (document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
      // @ts-ignore
      window.twttr?.widgets?.load?.();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      window.twttr?.widgets?.load?.();
    };
    document.body.appendChild(script);
  }, []);

  return (
    <section className="x-timeline">
      <h2 className="x-title">Latest from X</h2>

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
    </section>
  );
}
