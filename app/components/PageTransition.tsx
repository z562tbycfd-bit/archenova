"use client";

import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // pathname が変わると DOM が再生成され、CSSアニメが毎回走る
  return (
    <div key={pathname} className="pt">
      {children}
    </div>
  );
}
