export const realizingTechnologies = [
  {
    slug: "house",
    title: "House",
    image: "/images/future/house.jpg",
    icon: "⌂",
    overview: "A future living system where architecture, energy, AI, and environmental adaptation become one integrated habitat.",
    science: "Materials science, environmental engineering, energy systems, human factors, AI control, and climate-responsive design.",
    realization: "Scientific discovery becomes materials, sensors, energy modules, autonomous control, and finally deployable living infrastructure.",
    after: "Housing becomes adaptive infrastructure: safer, cleaner, more autonomous, and capable of supporting resilient communities.",
  },
  {
    slug: "vertical-tower",
    title: "Vertical-Tower",
    image: "/images/future/vertical-tower.jpg",
    icon: "❖",
    overview: "A vertical infrastructure system that integrates energy, mobility, logistics, habitation, and AI-based urban control.",
    science: "Structural engineering, control theory, urban systems, power systems, robotics, and complex systems science.",
    realization: "Vertical design becomes smart infrastructure through structural innovation, autonomous logistics, distributed energy, and governance systems.",
    after: "Cities become denser, more adaptive, and less dependent on horizontal expansion.",
  },
  {
    slug: "mobility",
    title: "Mobility",
    image: "/images/future/mobility.jpg",
    icon: "⥤",
    overview: "Next-generation mobility beyond conventional roads, enabled by autonomy, electric propulsion, and intelligent traffic systems.",
    science: "Aerodynamics, battery science, control systems, sensor fusion, robotics, and safety engineering.",
    realization: "Scientific principles become vehicles, navigation systems, charging infrastructure, regulation, and public adoption.",
    after: "Mobility shifts from vehicle ownership to autonomous, distributed, and infrastructure-connected movement.",
  },
  {
    slug: "physical-ai",
    title: "Physical AI",
    image: "/images/future/physical-ai.jpg",
    icon: "☺︎",
    overview: "AI that acts in the physical world through robots, machines, laboratories, infrastructure, and autonomous operations.",
    science: "Computer science, robotics, neuroscience, control theory, embodied intelligence, and information theory.",
    realization: "AI models become sensors, actuators, robotic systems, digital twins, and autonomous physical workflows.",
    after: "AI becomes an operational layer of civilization, not only a digital tool.",
  },
  {
    slug: "civilization-city",
    title: "Civilization-City",
    image: "/images/future/civilization-city.jpg",
    icon: "✵",
    overview: "An integrated city model where energy, mobility, intelligence, governance, and infrastructure become one adaptive civilization system.",
    science: "Urban science, environmental science, systems engineering, energy science, economics, and governance design.",
    realization: "Scientific capability becomes urban infrastructure through planning, regulation, technology deployment, and social adoption.",
    after: "The city becomes a civilization-scale platform for resilience, adaptation, and future possibility.",
  },
];

export function getRealizingTechnology(slug: string) {
  return realizingTechnologies.find((item) => item.slug === slug);
}