export interface CivilizationNode {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  tone:
    | "science"
    | "technology"
    | "enterprise"
    | "governance"
    | "education"
    | "omega";

  orbit: number;

  x: number;
  y: number;

  color: string;
}

export const civilizationNodes: CivilizationNode[] = [
  {
    id: "science",

    type: "Type R",

    title: "Science",

    subtitle: "Reality Discovery",

    description:
      "Observe reality, discover principles, and expand human understanding.",

    href: "/architecture",

    tone: "science",

    orbit: 1,

    x: 50,

    y: 6,

    color: "#7bd7ff",
  },

  {
    id: "technology",

    type: "Type I",

    title: "Technology",

    subtitle: "Implementation",

    description:
      "Transform knowledge into engineering capability and infrastructure.",

    href: "/builder",

    tone: "technology",

    orbit: 1,

    x: 86,

    y: 28,

    color: "#72a9ff",
  },

  {
    id: "enterprise",

    type: "Type S",

    title: "Enterprise",

    subtitle: "Capability Scaling",

    description:
      "Scale engineering into sustainable economic ecosystems.",

    href: "/programs",

    tone: "enterprise",

    orbit: 1,

    x: 82,

    y: 76,

    color: "#8df3b2",
  },

  {
    id: "governance",

    type: "Type G",

    title: "Governance",

    subtitle: "Institutional Trust",

    description:
      "Create legitimacy, law, public trust, and long-term continuity.",

    href: "/senate",

    tone: "governance",

    orbit: 1,

    x: 18,

    y: 76,

    color: "#ffd87a",
  },

  {
    id: "education",

    type: "Type T",

    title: "Education",

    subtitle: "Knowledge Transmission",

    description:
      "Preserve and transmit civilization across generations.",

    href: "/episteme",

    tone: "education",

    orbit: 1,

    x: 14,

    y: 28,

    color: "#dca7ff",
  },

  {
    id: "omega",

    type: "Type Ω",

    title: "ArcheNova",

    subtitle: "Recursive Civilization",

    description:
      "Integrate science, technology, enterprise, governance, and education into one recursive civilization.",

    href: "/architecture",

    tone: "omega",

    orbit: 0,

    x: 50,

    y: 50,

    color: "#fff3d0",
  },
];