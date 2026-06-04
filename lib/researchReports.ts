export const researchReports = [
  {
    slug: "physical-ai-as-infrastructure",
    title: "Physical AI as Infrastructure",
    summary:
      "The transition from digital AI systems toward embodied intelligence operating through robotics, manufacturing, logistics, laboratories, and public infrastructure.",
    overview:
      "Physical AI represents the movement of artificial intelligence from screens and servers into machines, laboratories, factories, vehicles, hospitals, and public infrastructure.",
    why:
      "Its significance is not only automation. It changes how civilization converts information into action across the physical world.",
    roadmap: [
      "AI models become perception and planning systems.",
      "Robotics connects intelligence to physical execution.",
      "Factories, logistics, healthcare, and infrastructure adopt embodied AI.",
      "Physical AI becomes an operational layer of civilization.",
    ],
    impact:
      "The long-term result may be infrastructure that can observe, decide, repair, optimize, and adapt in real time.",
  },
  {
    slug: "future-mobility-architectures",
    title: "Future Mobility Architectures",
    summary:
      "Pathways from autonomous vehicles and aerial systems toward integrated transportation ecosystems and post-road mobility systems.",
    overview:
      "Future mobility is not simply faster transportation. It is the redesign of movement through autonomy, electrification, sensor networks, aerial systems, and infrastructure coordination.",
    why:
      "Mobility determines access to labor, healthcare, education, logistics, cities, and emergency response. Changing mobility changes the structure of society.",
    roadmap: [
      "Autonomous driving improves local movement.",
      "Electric platforms reduce dependence on combustion systems.",
      "Aerial mobility creates new layers of transportation.",
      "Integrated mobility networks become infrastructure.",
    ],
    impact:
      "Future mobility may shift transportation from vehicle ownership toward adaptive, distributed, and coordinated movement systems.",
  },
  {
    slug: "orbital-habitat-systems",
    title: "Orbital Habitat Systems",
    summary:
      "Research into long-term human habitation beyond Earth and the infrastructure required for sustainable expansion.",
    overview:
      "Orbital habitat systems represent the attempt to transform space from a destination into a livable operational environment.",
    why:
      "The challenge is not only reaching orbit. The deeper challenge is sustaining life, energy, materials, governance, and adaptation beyond Earth.",
    roadmap: [
      "Launch systems reduce access cost.",
      "Life-support systems become more closed-loop.",
      "Manufacturing and maintenance become orbital capabilities.",
      "Habitats become repeatable infrastructure.",
    ],
    impact:
      "Orbital habitats may become the first step toward civilization that is no longer entirely planet-dependent.",
  },
];

export function getResearchReport(slug: string) {
  return researchReports.find((report) => report.slug === slug);
}