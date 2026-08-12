"use client";

import { usePathname } from "next/navigation";

export default function SiteBackground() {
  const pathname = usePathname();

  const isCivilizationExperience =
    pathname === "/civilization-experience" ||
    pathname.startsWith(
      "/civilization-experience/",
    );

  if (isCivilizationExperience) {
    return (
      <div
        className="civilization-experience-site-bg"
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      <div
        className="site-bg"
        aria-hidden="true"
      />

      <div
        className="site-vignette"
        aria-hidden="true"
      />
    </>
  );
}