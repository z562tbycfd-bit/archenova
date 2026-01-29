import { NextResponse } from "next/server";

type Cat = "A" | "B" | "C" | "D" | "E" | "F";

type Item = {
  id: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: Cat;
};

const FALLBACK: Record<Cat, Item[]> = {
  A: [
    {
      id: "oecd-tech-policy",
      title: "OECD — Technology Policy",
      summary:
        "Signals where institutional alignment begins to lag behind technology deployment, standards, and cross-border governance.",
      url: "https://www.oecd.org/en/topics/technology-policy.html",
      source: "OECD",
      category: "A",
    },
    {
      id: "nist-news-search",
      title: "NIST — News Search",
      summary:
        "Official updates on standards, security, and measurement infrastructure—where policy becomes implementation.",
      url: "https://www.nist.gov/news-events/news/search",
      source: "NIST",
      category: "A",
    },
    {
      id: "wef-regions-trade-geopolitics",
      title: "World Economic Forum — Regions, Trade & Geopolitics",
      summary:
        "Observations at the boundary where technology reshapes regions, supply chains, and institutional equilibrium.",
      url: "https://centres.weforum.org/centre-for-regions-trade-and-geopolitics/home",
      source: "WEF",
      category: "A",
    },
  ],

  B: [
    {
      id: "karpathy-x",
      title: "Andrej Karpathy (X)",
      summary:
        "Implementation-first lens: where systems move past human-level interpretability and manual control.",
      url: "https://x.com/karpathy",
      source: "X",
      category: "B",
    },
    {
      id: "sutskever-x",
      title: "Ilya Sutskever (X)",
      summary:
        "AGI-era thinking that assumes irreversibility and focuses on boundary conditions rather than optimism.",
      url: "https://x.com/ilyasut",
      source: "X",
      category: "B",
    },
    {
      id: "hinton-x",
      title: "Geoffrey Hinton (X)",
      summary:
        "Warnings worth tracking: the moment caution becomes a one-way statement rather than a debate.",
      url: "https://x.com/geoffreyhinton",
      source: "X",
      category: "B",
    },
    {
      id: "openai-announcements",
      title: "OpenAI — Company Announcements",
      summary:
        "Not the tech itself—watch what becomes ambiguous, what is emphasized, and what is quietly de-scoped.",
      url: "https://openai.com/news/company-announcements/",
      source: "OpenAI",
      category: "B",
    },
  ],

  C: [
    {
      id: "nvidia-newsroom",
      title: "NVIDIA Newsroom",
      summary:
        "Where models become logistics: deployment constraints, data center economics, and irreversible supply realities.",
      url: "https://nvidianews.nvidia.com",
      source: "NVIDIA",
      category: "C",
    },
    {
      id: "tsmc-pr",
      title: "TSMC Press Room",
      summary:
        "Geopolitics × fabrication constraints: where the world cannot ‘patch’ its way out of physics and capacity.",
      url: "https://pr.tsmc.com/english/latest-news",
      source: "TSMC",
      category: "C",
    },
    {
      id: "asml-news",
      title: "ASML News",
      summary:
        "A single non-substitutable point in the stack: where the option space collapses at the tool level.",
      url: "https://www.asml.com/en/news",
      source: "ASML",
      category: "C",
    },
  ],

  D: [
    {
      id: "psiquantum-news",
      title: "PsiQuantum — News",
      summary:
        "Signals of pushing error correction into physics and manufacturing rather than continuous control.",
      url: "https://www.psiquantum.com/news",
      source: "PsiQuantum",
      category: "D",
    },
    {
      id: "preskill-x",
      title: "John Preskill (X)",
      summary:
        "Boundary language: theory that names limits precisely instead of generalizing them away.",
      url: "https://x.com/preskill",
      source: "X",
      category: "D",
    },
    {
      id: "quanta-quantum",
      title: "Quanta Magazine",
      summary:
        "Rare mainstream writing that can discuss structure without dissolving it into hype or simplification.",
      url: "https://www.quantamagazine.org",
      source: "Quanta",
      category: "D",
    },
  ],

  E: [
    {
      id: "musk-x",
      title: "Elon Musk (X)",
      summary:
        "Track the moments when projects are pushed past the threshold where stopping becomes politically or physically hard.",
      url: "https://x.com/elonmusk",
      source: "X",
      category: "E",
    },
    {
      id: "spacex-updates",
      title: "SpaceX — Updates",
      summary:
        "Planetary infrastructure as initial conditions: staged commitments that lock in trajectories.",
      url: "https://www.spacex.com/updates",
      source: "SpaceX",
      category: "E",
    },
    {
      id: "iter-press",
      title: "ITER — Press Clippings",
      summary:
        "Success matters—but watch the irreversibility: the scale where continuation becomes the default.",
      url: "https://www.iter.org/press-clippings",
      source: "ITER",
      category: "E",
    },
    {
      id: "doe-newsroom",
      title: "U.S. Department of Energy — Newsroom",
      summary:
        "Institutional signals around nuclear, underground, and long-horizon responsibility infrastructures.",
      url: "https://www.energy.gov/newsroom",
      source: "DOE",
      category: "E",
    },
    {
      id: "ibm-newsroom",
      title: "IBM — Newsroom",
      summary:
        "Watch for roadmap stress: where promises meet physical and organizational constraints.",
      url: "https://newsroom.ibm.com",
      source: "IBM",
      category: "E",
    },
  ],

  F: [
    {
      id: "broad-news",
      title: "Broad Institute — News",
      summary:
        "Post-CRISPR direction: standardization and deployment that may define irreversible biological baselines.",
      url: "https://www.broadinstitute.org/news",
      source: "Broad",
      category: "F",
    },
    {
      id: "nature-bt",
      title: "Nature Biotechnology",
      summary:
        "Signals of the shift from lab novelty to real-world implementation—where reversibility is no longer assumed.",
      url: "https://www.nature.com/nbt/",
      source: "Nature Biotech",
      category: "F",
    },
  ],
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cat = (searchParams.get("cat") || "A") as Cat;

  const items = FALLBACK[cat] ?? FALLBACK.A;

  return NextResponse.json({
    ok: true,
    updatedAt: new Date().toISOString(),
    items,
  });
}