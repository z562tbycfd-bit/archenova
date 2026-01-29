import { NextResponse } from "next/server";

type SourceKey = "NATURE" | "SCIENCE" | "APS";

type Item = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  sourceKey: SourceKey;
};

const FALLBACK: Record<SourceKey, Item[]> = {
  NATURE: [
    {
      id: "nature-home",
      title: "Nature — Latest Research / News",
      summary:
        "High-signal updates across disciplines. Use as a top-level sensor for frontier shifts entering mainstream science.",
      url: "https://www.nature.com",
      source: "Nature",
      sourceKey: "NATURE",
    },
    {
      id: "nature-news",
      title: "Nature — News",
      summary:
        "Where discoveries become narratives: policy, funding, and institutional consequences begin to crystallize here.",
      url: "https://www.nature.com/news",
      source: "Nature",
      sourceKey: "NATURE",
    },
    {
      id: "nature-research",
      title: "Nature — Research",
      summary:
        "Peer-reviewed papers and letters—signals before hype. Track structure, not headlines.",
      url: "https://www.nature.com/nature/research",
      source: "Nature",
      sourceKey: "NATURE",
    },
    {
      id: "nature-physics",
      title: "Nature — Physics",
      summary:
        "Frontier physics coverage. Useful as a macro sensor when fundamental constraints shift.",
      url: "https://www.nature.com/subjects/physics",
      source: "Nature",
      sourceKey: "NATURE",
    },
    {
      id: "nature-technology",
      title: "Nature — Technology",
      summary:
        "Engineering transitions from lab to system—watch for irreversible deployment patterns.",
      url: "https://www.nature.com/subjects/technology",
      source: "Nature",
      sourceKey: "NATURE",
    },
  ],

  SCIENCE: [
    {
      id: "science-journal",
      title: "Science Magazine — Journal",
      summary:
        "Flagship weekly journal. Track where consensus starts to form around new mechanisms and capabilities.",
      url: "https://www.science.org/journal/science",
      source: "Science",
      sourceKey: "SCIENCE",
    },
    {
      id: "science-news",
      title: "Science — News",
      summary:
        "Fast-moving coverage. Good for early institutional signals and controversy boundaries.",
      url: "https://www.science.org/news",
      source: "Science",
      sourceKey: "SCIENCE",
    },
    {
      id: "science-policy",
      title: "Science — Policy",
      summary:
        "Where governance, funding, and regulation intersect with research—useful for “institutional lag” sensing.",
      url: "https://www.science.org/topic/policy",
      source: "Science",
      sourceKey: "SCIENCE",
    },
    {
      id: "science-technology",
      title: "Science — Technology",
      summary:
        "Signals of implementation: materials, devices, and system-level engineering.",
      url: "https://www.science.org/topic/technology",
      source: "Science",
      sourceKey: "SCIENCE",
    },
    {
      id: "science-ai",
      title: "Science — Artificial Intelligence",
      summary:
        "Watch when AI becomes infrastructure rather than research: scaling, compute, reliability, deployment.",
      url: "https://www.science.org/topic/artificial-intelligence",
      source: "Science",
      sourceKey: "SCIENCE",
    },
  ],

  APS: [
    {
      id: "aps-prl",
      title: "Physical Review Letters (PRL) — APS",
      summary:
        "High-impact physics results. Track hard constraint shifts: measurement, materials, quantum, field theory.",
      url: "https://journals.aps.org/prl/",
      source: "APS",
      sourceKey: "APS",
    },
    {
      id: "aps-latest",
      title: "APS Journals — Latest",
      summary:
        "Broader APS updates. Useful as a wider net across subfields and special collections.",
      url: "https://journals.aps.org",
      source: "APS",
      sourceKey: "APS",
    },
    {
      id: "aps-prx",
      title: "Physical Review X (PRX)",
      summary:
        "Open-access high-impact physics—good sensor for emerging structures and methods.",
      url: "https://journals.aps.org/prx/",
      source: "APS",
      sourceKey: "APS",
    },
    {
      id: "aps-pra",
      title: "Physical Review A",
      summary:
        "Quantum, AMO, information—where “control → structure” signals appear early.",
      url: "https://journals.aps.org/pra/",
      source: "APS",
      sourceKey: "APS",
    },
    {
      id: "aps-prb",
      title: "Physical Review B",
      summary:
        "Condensed matter and materials: topology, moiré, correlated systems—constraint physics in action.",
      url: "https://journals.aps.org/prb/",
      source: "APS",
      sourceKey: "APS",
    },
  ],
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const src = (searchParams.get("src") || "NATURE") as SourceKey;

  const items = FALLBACK[src] ?? FALLBACK.NATURE;

  return NextResponse.json({
    ok: true,
    updatedAt: new Date().toISOString(),
    items,
  });
}