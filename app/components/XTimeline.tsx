"use client";

import { useEffect } from "react";

export default function XTimeline() {
  useEffect(() => {
    // すでに widgets.js が読み込まれている場合は再描画だけ行う
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
        href="https://twitter.com/ArcheNova_X"
      >
        Posts by ArcheNova_X
      </a>
    </section>
  );
}
