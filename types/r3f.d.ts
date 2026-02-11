/// <reference types="react" />

import type { ReactThreeFiber } from "@react-three/fiber";

declare global {
  namespace JSX {
    // ✅ これが一番互換性が高い（v8/v9の差に強い）
    interface IntrinsicElements extends ReactThreeFiber.IntrinsicElements {}
  }
}

export {};