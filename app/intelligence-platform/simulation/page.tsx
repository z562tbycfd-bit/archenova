"use client";

import Link from "next/link";

export default function CivilizationSimulationPage() {
 const scenarios = [
   {
     name: "Expansion Strategy",
     capability: 25,
     risk: 15,
     infrastructure: 20,
   },
   {
     name: "Balanced Strategy",
     capability: 15,
     risk: 5,
     infrastructure: 12,
   },
   {
     name: "Risk-Control Strategy",
     capability: 8,
     risk: -20,
     infrastructure: 6,
   },
 ];

 return (
   <main className="page-standard">
     ...
   </main>
 );
}