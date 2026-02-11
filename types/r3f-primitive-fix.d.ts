// types/r3f-primitive-fix.d.ts
import type { ReactThreeFiber } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements extends ReactThreeFiber.IntrinsicElements {
      // ✅ これが足りないせいで build が落ちている
      primitive: any;
    }
  }
}

export {};