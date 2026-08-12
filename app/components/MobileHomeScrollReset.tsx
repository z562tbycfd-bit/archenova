"use client";

import {
  useEffect,
} from "react";

export default function MobileHomeScrollReset() {
  useEffect(() => {
    /*
     * ブラウザ標準の
     * 前回スクロール位置復元を停止。
     *
     * HOMEを開いた時は
     * PC / Mobile 共通で
     *必ず HERO から開始する。
     */
    if (
      "scrollRestoration" in
      window.history
    ) {
      window.history.scrollRestoration =
        "manual";
    }

    const resetToHero =
      () => {
        const hero =
          document.getElementById(
            "home-hero",
          );

        if (hero) {
          hero.scrollIntoView({
            block: "start",
            behavior: "auto",
          });

          return;
        }

        /*
         * HEROがまだDOMへ
         *生成されていない場合の保険。
         */
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "auto",
        });
      };

    /*
     * 初回レンダリング直後
     */
    resetToHero();

    /*
     * Next.jsの描画、
     * 動画要素、
     * Reveal等による
     * 初期レイアウト確定後にも
     * 再度HEROへ固定する。
     */
    const frame =
      window.requestAnimationFrame(
        resetToHero,
      );

    const t1 =
      window.setTimeout(
        resetToHero,
        80,
      );

    const t2 =
      window.setTimeout(
        resetToHero,
        250,
      );

    const t3 =
      window.setTimeout(
        resetToHero,
        600,
      );

    return () => {
      window.cancelAnimationFrame(
        frame,
      );

      window.clearTimeout(
        t1,
      );

      window.clearTimeout(
        t2,
      );

      window.clearTimeout(
        t3,
      );
    };
  }, []);

  return null;
}