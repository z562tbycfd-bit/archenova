"use client";

import { useEffect } from "react";

export default function MobileHomeScrollReset() {
  useEffect(() => {
    /*
     * HOMEを開いた直後のスクロール位置を
     * ブラウザに復元させない。
     *
     * ユーザーがスクロールを開始した後に
     * 再度先頭へ戻す処理は行わない。
     */
    const previousRestoration =
      window.history.scrollRestoration;

    window.history.scrollRestoration = "manual";

    /*
     * 初期表示時に一度だけ先頭へ移動する。
     * タイマーによる繰り返しの位置変更はしない。
     */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    return () => {
      window.history.scrollRestoration =
        previousRestoration;
    };
  }, []);

  return null;
}