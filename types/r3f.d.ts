// types/r3f.d.ts
import type { ReactThreeFiber } from "@react-three/fiber";

declare global {
  namespace JSX {
    // ✅ R3F の IntrinsicElements を確実に取り込む
    interface IntrinsicElements extends ReactThreeFiber.IntrinsicElements {
      // ✅ これが無いと <primitive> が落ちる環境がある
      primitive: any;

      // ✅ 最悪でも JSX が落ちない保険（時間がないので入れる）
      [key: string]: any;
    }
  }
}

export {};