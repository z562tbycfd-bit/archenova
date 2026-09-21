"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ==========================================================
   ARCHENOVA / WORKS

   THE LIVING EXHIBITION

   Episteme  / Cognitive Intelligence
   Aetherion / Civilization Manufacturing
   Framework / Reality-Grounded Architecture

   DESIGN
   - Pure black background
   - Translucent black glass
   - Large editorial typography
   - Three distinct conceptual artworks
   - Responsive, accessible interactive exhibits

   EVIDENCE BOUNDARY
   - Conceptual visuals are not experimental evidence.
   - Proposed architectures are not operating facilities.
   - Roadmaps describe intended development, not
     independently verified achievements.

   This file is self-contained.
========================================================== */

type WorkId = "episteme" | "aetherion" | "framework";

type Exhibit = {
  label: string;
  title: string;
  lead: string;
  body: string;
  points: {
    name: string;
    detail: string;
  }[];
  question: string;
};

type Work = {
  id: WorkId;
  number: string;
  category: string;
  name: string;
  subtitle: string;
  statement: string;
  description: string;
  stage: string;
  stageDetail: string;
  visualNote: string;
  href: string;
  action: string;
  collaboration: string;
  exhibits: Exhibit[];
  pathway: {
    label: string;
    title: string;
    detail: string;
    criterion: string;
  }[];
  boundaries: {
    label: string;
    title: string;
    detail: string;
  }[];
};

const WORKS: Work[] = [
  {
    id: "episteme",
    number: "01",
    category: "COGNITIVE INTELLIGENCE",
    name: "Episteme",
    subtitle: "An intelligence that keeps the question alive.",
    statement:
      "Not an answer machine. An environment for asking, examining, challenging, and revising.",
    description:
      "Episteme is ArcheNova's evolving cognitive environment. Its intended architecture connects natural dialogue with structured inquiry, research exploration, explicit uncertainty, and the ability to revisit earlier reasoning. The ambition is not to make every response sound certain. It is to help people move from an initial question toward a claim they can examine and, when necessary, correct.",
    stage: "EVOLVING DIGITAL ENVIRONMENT",
    stageDetail:
      "A public Episteme experience is accessible through ArcheNova. The architecture shown here describes its design direction; individual capabilities, integrations, and evaluation methods may be implemented or validated at different stages.",
    visualNote:
      "The luminous neural portrait is conceptual artwork. It does not depict a model's actual internal state, cognition, or a human brain.",
    href: "/home#episteme-dialogue",
    action: "EXPERIENCE EPISTEME",
    collaboration:
      "Human–AI dialogue, reasoning evaluation, scientific retrieval, provenance, uncertainty representation, interface design, and safe agentic systems.",
    exhibits: [
      {
        label: "01 / THE CONVERSATION",
        title: "A question is the beginning.",
        lead:
          "A useful conversation should be able to change direction without losing its purpose.",
        body:
          "Episteme's conversational layer is designed around flexible inquiry: a user can ask, explore, challenge, compare, and simulate possible explanations. The interaction should preserve the distinction between what the user asked, what the system inferred, and what remains unknown.",
        points: [
          {
            name: "ASK",
            detail:
              "Clarify the question, its context, and what a satisfactory answer would require.",
          },
          {
            name: "EXPLORE",
            detail:
              "Open alternative explanations and relevant lines of investigation.",
          },
          {
            name: "CHALLENGE",
            detail:
              "Inspect assumptions, counterexamples, limitations, and possible failure modes.",
          },
          {
            name: "COMPARE",
            detail:
              "Examine competing models against explicit, user-relevant criteria.",
          },
          {
            name: "SIMULATE",
            detail:
              "Explore conditional scenarios while clearly separating simulation from observation.",
          },
        ],
        question:
          "Can a conversation remain coherent while its assumptions and conclusions are repeatedly revised?",
      },
      {
        label: "02 / COGNITIVE ARCHITECTURE",
        title: "Continuity without false certainty.",
        lead:
          "A long conversation needs more than a longer transcript.",
        body:
          "The proposed architecture separates conversational continuity, response composition, evidence handling, and the user's ability to correct the system. A remembered statement should not silently become a verified fact. A generated hypothesis should not be presented as an observation.",
        points: [
          {
            name: "CONVERSATIONAL CONTINUITY",
            detail:
              "Carry forward relevant questions, decisions, and unresolved threads without treating earlier outputs as infallible.",
          },
          {
            name: "RESPONSE COMPOSITION",
            detail:
              "Assemble a readable response from the user's objective, available context, alternatives, and limitations.",
          },
          {
            name: "EVIDENCE PROVENANCE",
            detail:
              "Distinguish user-provided context, retrieved sources, model inference, and externally verified results.",
          },
          {
            name: "CORRECTION PATH",
            detail:
              "Make it possible to challenge an assumption and revise subsequent reasoning.",
          },
        ],
        question:
          "Which information must persist, and which information must remain explicitly provisional?",
      },
      {
        label: "03 / SCIENTIFIC REASONING",
        title: "From plausible language to testable claims.",
        lead:
          "A compelling explanation is not, by itself, a scientific result.",
        body:
          "Episteme's research direction is to support the progression from question to hypothesis, discriminating observation, independent verification, and revision. Its role is to help structure inquiry, not to replace experiments, peer review, or the researcher's judgment.",
        points: [
          {
            name: "CLAIM",
            detail:
              "State precisely what is being proposed and what is already established.",
          },
          {
            name: "ALTERNATIVES",
            detail:
              "Identify competing explanations that could account for the same observation.",
          },
          {
            name: "DISCRIMINATING TEST",
            detail:
              "Specify what evidence would support, weaken, or falsify each explanation.",
          },
          {
            name: "REVISION",
            detail:
              "Update the model when new evidence conflicts with the original account.",
          },
        ],
        question:
          "What observation would make the system change its answer rather than merely restate it?",
      },
      {
        label: "04 / HUMAN AUTHORITY",
        title: "Capability does not grant authority.",
        lead:
          "The person using the system retains responsibility for consequential decisions.",
        body:
          "As cognitive tools become more capable, the system should make its uncertainty, scope, and available correction paths more visible—not less. Recommendations, simulations, and proposed actions must remain distinguishable from actions that have actually been authorized and executed.",
        points: [
          {
            name: "OBSERVABILITY",
            detail:
              "Show what the system is doing and which information supports its output.",
          },
          {
            name: "INTERRUPTIBILITY",
            detail:
              "Allow a user to stop or redirect a process before it expands in scope.",
          },
          {
            name: "REVERSIBILITY",
            detail:
              "Prefer steps that can be inspected and corrected before consequential commitments.",
          },
          {
            name: "USER CONTROL",
            detail:
              "Preserve meaningful choice over objectives, assumptions, and next actions.",
          },
        ],
        question:
          "Can a person understand, challenge, and stop the system before its effects exceed their control?",
      },
    ],
    pathway: [
      {
        label: "STAGE 01 / EXPERIENCE",
        title: "Natural dialogue",
        detail:
          "Provide an accessible environment for asking questions and exploring responses.",
        criterion:
          "The user can initiate, redirect, and continue a conversation.",
      },
      {
        label: "STAGE 02 / STRUCTURE",
        title: "Traceable reasoning",
        detail:
          "Separate claims, assumptions, alternatives, and evidence requirements.",
        criterion:
          "A reader can identify which parts of a response require independent verification.",
      },
      {
        label: "STAGE 03 / EVALUATION",
        title: "Correction under challenge",
        detail:
          "Test whether the system revises mistaken or unsupported conclusions.",
        criterion:
          "Repeatable evaluations show appropriate revision rather than confident persistence.",
      },
      {
        label: "STAGE 04 / INTEGRATION",
        title: "Research-connected intelligence",
        detail:
          "Connect dialogue to source examination, reproducible workflows, and bounded tools.",
        criterion:
          "Source attribution, tool behavior, and user authorization can be independently inspected.",
      },
      {
        label: "STAGE 05 / SCALE",
        title: "Persistent correctability",
        detail:
          "Expand capability only while monitoring, intervention, and recovery remain effective.",
        criterion:
          "Capability growth does not outrun demonstrated oversight and correction.",
      },
    ],
    boundaries: [
      {
        label: "ACCESSIBLE",
        title: "A public digital experience",
        detail:
          "The current interface and its accessible interactions can be explored directly.",
      },
      {
        label: "TO BE TESTED",
        title: "Reasoning and continuity quality",
        detail:
          "Reliable performance requires defined tasks, evaluation datasets, failure analysis, and repeatable testing.",
      },
      {
        label: "NOT IMPLIED",
        title: "Scientific or autonomous authority",
        detail:
          "A fluent response does not establish scientific truth, independent discovery, or permission to act.",
      },
    ],
  },
  {
    id: "aetherion",
    number: "02",
    category: "CIVILIZATION MANUFACTURING",
    name: "Aetherion",
    subtitle: "A factory is a system that can reproduce capability.",
    statement:
      "Engineer. Fabricate. Test. Correct. Reproduce. Release.",
    description:
      "Aetherion is ArcheNova's proposed civilization-scale manufacturing environment. Its central idea is to connect engineering design, production, testing, correction, and repeatable release within one accountable system. Orbital manufacturing is one possible future operating environment—not an established facility or a prerequisite for the underlying manufacturing architecture.",
    stage: "SYSTEM ARCHITECTURE / CONCEPT",
    stageDetail:
      "Aetherion is presented as an architectural and engineering direction. The exhibition does not claim that an orbital factory, autonomous production line, or validated manufacturing platform is currently operating.",
    visualNote:
      "The luminous orbital composition is conceptual artwork. Its rings do not represent calculated trajectories, engineering dimensions, or an operating facility.",
    href: "/home#aetherion",
    action: "EXPLORE AETHERION",
    collaboration:
      "Systems engineering, automation, manufacturing, robotics, quality assurance, materials, energy systems, space infrastructure, and operational safety.",
    exhibits: [
      {
        label: "01 / THE FACTORY",
        title: "From design to reproducible production.",
        lead:
          "A manufacturing system must do more than produce one successful artifact.",
        body:
          "The proposed Aetherion architecture connects requirements, design, fabrication, inspection, feedback, and controlled release. The intended output is not merely a finished object, but a production process whose performance can be measured and repeated under defined conditions.",
        points: [
          {
            name: "ENGINEER",
            detail:
              "Translate a required function into specifications, tolerances, interfaces, and test conditions.",
          },
          {
            name: "FABRICATE",
            detail:
              "Choose processes, materials, equipment, and controls that can produce the specified result.",
          },
          {
            name: "TEST",
            detail:
              "Measure performance, defects, safety margins, and variation against acceptance criteria.",
          },
          {
            name: "CORRECT",
            detail:
              "Identify causes of failure and verify that changes improve the process.",
          },
          {
            name: "REPRODUCE & RELEASE",
            detail:
              "Demonstrate repeatability before authorizing wider deployment.",
          },
        ],
        question:
          "Can the system reproduce acceptable results when materials, operators, equipment, and conditions vary?",
      },
      {
        label: "02 / THE OPERATING SYSTEM",
        title: "Every production step needs a feedback path.",
        lead:
          "Automation becomes useful when it makes the process observable and controllable.",
        body:
          "Aetherion's proposed control layer would connect physical equipment with production records, measurement, fault detection, and human authorization. Digital representations can support the process, but they must remain distinguishable from actual machine states and measured outcomes.",
        points: [
          {
            name: "PHYSICAL PROCESS",
            detail:
              "Machines, materials, tools, energy, and the environment in which production occurs.",
          },
          {
            name: "SENSING & TRACEABILITY",
            detail:
              "Measurements, component identity, process history, and uncertainty.",
          },
          {
            name: "CONTROL & INTERLOCKS",
            detail:
              "Bounded automation, safe states, fault handling, and emergency interruption.",
          },
          {
            name: "HUMAN REVIEW",
            detail:
              "Explicit approval for changes that exceed validated operating conditions.",
          },
        ],
        question:
          "Can a fault be detected, isolated, and corrected before it propagates into the next production stage?",
      },
      {
        label: "03 / THE ENVIRONMENT",
        title: "Where should production happen?",
        lead:
          "The operating environment must earn its place in the architecture.",
        body:
          "Terrestrial, remote, and orbital production each impose different requirements. Orbital manufacturing may offer process-specific opportunities, but also introduces launch logistics, power, thermal management, radiation exposure, maintenance, debris risk, and difficult recovery. Aetherion should evaluate these trade-offs for a specific product rather than assume that space is inherently the better factory.",
        points: [
          {
            name: "PRODUCT SELECTION",
            detail:
              "Identify a product and measurable property that could benefit from a different production environment.",
          },
          {
            name: "GROUND BASELINE",
            detail:
              "Establish what existing terrestrial methods can already achieve.",
          },
          {
            name: "ENVIRONMENTAL ADVANTAGE",
            detail:
              "Define a test that distinguishes the proposed benefit from other process changes.",
          },
          {
            name: "TOTAL SYSTEM COST",
            detail:
              "Include transport, energy, reliability, servicing, safety, and end-of-life obligations.",
          },
        ],
        question:
          "For which specific product would the full system outperform a well-designed terrestrial alternative?",
      },
      {
        label: "04 / THE GOVERNANCE GATE",
        title: "Production authority must be earned.",
        lead:
          "A working prototype is not yet permission for unrestricted deployment.",
        body:
          "The proposed release process separates technical performance from operational permission. A product or process advances only when relevant evidence, safety controls, traceability, recovery provisions, and accountable decision-making are sufficient for its intended use.",
        points: [
          {
            name: "REQUIREMENTS GATE",
            detail:
              "Are the intended function, operating limits, and acceptance criteria explicit?",
          },
          {
            name: "VERIFICATION GATE",
            detail:
              "Do tests show that the design meets its specified requirements?",
          },
          {
            name: "REPRODUCIBILITY GATE",
            detail:
              "Can the result be repeated under defined production conditions?",
          },
          {
            name: "RELEASE GATE",
            detail:
              "Are remaining risks, responsibilities, and recovery measures acceptable for the intended deployment?",
          },
        ],
        question:
          "What evidence would justify the next increase in production volume or operational autonomy?",
      },
    ],
    pathway: [
      {
        label: "STAGE 01 / DEFINE",
        title: "Choose a real product",
        detail:
          "Select a specific manufacturing target, customer need, and measurable performance requirement.",
        criterion:
          "The target has explicit specifications and a credible existing-process baseline.",
      },
      {
        label: "STAGE 02 / MODEL",
        title: "Design the process",
        detail:
          "Map material flow, equipment, energy, controls, failure modes, and economics.",
        criterion:
          "The proposed process has testable technical and operational assumptions.",
      },
      {
        label: "STAGE 03 / PROTOTYPE",
        title: "Build a bounded demonstrator",
        detail:
          "Test a small-scale process under controlled, observable conditions.",
        criterion:
          "Measured results meet predefined criteria and failures can be diagnosed.",
      },
      {
        label: "STAGE 04 / REPRODUCE",
        title: "Prove repeatable production",
        detail:
          "Measure variation across repeated runs, equipment conditions, and relevant operators.",
        criterion:
          "Yield, quality, safety, and recovery remain within specified limits.",
      },
      {
        label: "STAGE 05 / DEPLOY",
        title: "Scale by demonstrated need",
        detail:
          "Compare terrestrial and alternative operating environments before committing to deployment.",
        criterion:
          "The complete system offers a justified benefit with accountable operating and end-of-life plans.",
      },
    ],
    boundaries: [
      {
        label: "PRESENTED",
        title: "A manufacturing architecture",
        detail:
          "The exhibition describes proposed system functions, engineering dependencies, and validation stages.",
      },
      {
        label: "TO BE DEMONSTRATED",
        title: "Product and process feasibility",
        detail:
          "A specific product, measurable advantage, prototype, and repeatability data are needed.",
      },
      {
        label: "NOT IMPLIED",
        title: "An operating orbital megafactory",
        detail:
          "The conceptual artwork and architecture do not establish construction, operation, or commercial production.",
      },
    ],
  },
  {
    id: "framework",
    number: "03",
    category: "SCIENTIFIC & ENGINEERING FRAMEWORK",
    name: "Framework",
    subtitle: "Reality retains the final word.",
    statement:
      "Distinguish. Test. Reproduce. Engineer. Correct. Learn.",
    description:
      "The ArcheNova Framework is a proposed way to connect scientific inquiry with engineering decisions and responsible implementation. It separates reality from representations, hypotheses from evidence, and technical capability from permission to scale. Its purpose is to make progress inspectable: what is claimed, what has been tested, what can be reproduced, and what must remain correctable.",
    stage: "RESEARCH & DESIGN FRAMEWORK",
    stageDetail:
      "The framework is an evolving conceptual and methodological architecture. Its usefulness must be assessed through specific applications, explicit evaluation criteria, and comparison with existing scientific and engineering methods.",
    visualNote:
      "The particle manifold is decorative mathematical-inspired artwork. It is not a measured dataset, validated physical model, or experimental result.",
    href: "/research",
    action: "EXPLORE RESEARCH",
    collaboration:
      "Theoretical science, experimental methods, measurement, model validation, systems engineering, safety, reproducibility, and institutional design.",
    exhibits: [
      {
        label: "01 / REALITY CONTACT",
        title: "A model is not the world.",
        lead:
          "The first task is to identify what an observation can actually distinguish.",
        body:
          "The framework begins by separating physical reality, observations, measurements, datasets, mathematical models, and interpretations. Different models may explain the same data. A persuasive narrative cannot resolve that ambiguity; a discriminating observation or experiment may.",
        points: [
          {
            name: "OBSERVATION",
            detail:
              "Specify what was observed, under which conditions, and by which instrument or method.",
          },
          {
            name: "MEASUREMENT",
            detail:
              "Describe calibration, uncertainty, detection limits, and potential bias.",
          },
          {
            name: "MODEL",
            detail:
              "State assumptions, parameters, applicable domain, and competing explanations.",
          },
          {
            name: "DISCRIMINATION",
            detail:
              "Identify an outcome that would separate the proposed model from alternatives.",
          },
        ],
        question:
          "Which possible result would show that the preferred explanation is incomplete or wrong?",
      },
      {
        label: "02 / REACHABILITY",
        title: "Can the desired state actually be reached?",
        lead:
          "A theoretically possible outcome is not necessarily an engineering capability.",
        body:
          "The proposed reachability layer asks whether a system can move from its current state to a specified target under real constraints. Energy, materials, time, manufacturing tolerance, uncertainty, safety, and control authority can all make an apparently attractive state inaccessible.",
        points: [
          {
            name: "TARGET STATE",
            detail:
              "Define the desired result in measurable rather than purely aspirational terms.",
          },
          {
            name: "AVAILABLE CONTROLS",
            detail:
              "Identify the interventions, resources, and physical mechanisms that could produce it.",
          },
          {
            name: "CONSTRAINTS",
            detail:
              "Include physical laws, cost, time, uncertainty, and operational limits.",
          },
          {
            name: "ROBUSTNESS",
            detail:
              "Test whether the result remains reachable when conditions vary.",
          },
        ],
        question:
          "What minimum causal structure is sufficient to reach the target reliably?",
      },
      {
        label: "03 / CORRECTABILITY",
        title: "Can the system recover when the model fails?",
        lead:
          "A successful first run is not enough for durable infrastructure.",
        body:
          "The correctability layer examines whether failures can be detected, interrupted, isolated, repaired, and learned from. It also asks whether a system can be replaced or retired when its assumptions no longer hold. The appropriate controls depend on the domain and the consequences of failure.",
        points: [
          {
            name: "OBSERVE",
            detail:
              "Detect meaningful deviations before their consequences become unacceptable.",
          },
          {
            name: "INTERRUPT",
            detail:
              "Provide a credible means to stop or contain unsafe behavior.",
          },
          {
            name: "RECOVER",
            detail:
              "Restore useful function or transition to a defined safe state.",
          },
          {
            name: "REPLACE",
            detail:
              "Avoid architectures that make a failed component or institution impossible to retire.",
          },
        ],
        question:
          "Does the system's ability to correct failure remain sufficient as its scale and consequences increase?",
      },
      {
        label: "04 / CIVILIZATION DESIGN",
        title: "Value must survive deployment.",
        lead:
          "A capability becomes infrastructure only when its consequences can be managed over time.",
        body:
          "The final layer connects validated science and engineering to manufacturing, institutions, long-term maintenance, and public consequences. A technically feasible intervention can still fail to deliver durable value if its operating costs, failure modes, incentives, or recovery obligations are ignored.",
        points: [
          {
            name: "IMPLEMENTATION",
            detail:
              "Translate validated capability into a maintainable physical or digital system.",
          },
          {
            name: "ACCOUNTABILITY",
            detail:
              "Define who can authorize, inspect, challenge, and stop consequential operations.",
          },
          {
            name: "LIFECYCLE",
            detail:
              "Include maintenance, resource use, degradation, replacement, and end-of-life.",
          },
          {
            name: "FEEDBACK",
            detail:
              "Use real operating outcomes to revise the model, design, and governance.",
          },
        ],
        question:
          "Does deployment preserve the ability to learn, correct, and change course?",
      },
    ],
    pathway: [
      {
        label: "GATE 01 / IDENTIFY",
        title: "Define the claim",
        detail:
          "Separate the question, proposed explanation, assumptions, and existing evidence.",
        criterion:
          "The claim is precise enough to be challenged.",
      },
      {
        label: "GATE 02 / DISCRIMINATE",
        title: "Design a decisive test",
        detail:
          "Identify observations that distinguish the claim from credible alternatives.",
        criterion:
          "At least one possible result could materially weaken the claim.",
      },
      {
        label: "GATE 03 / REPRODUCE",
        title: "Repeat the result",
        detail:
          "Document methods, uncertainty, conditions, and independent replication requirements.",
        criterion:
          "The result survives appropriately controlled repeat testing.",
      },
      {
        label: "GATE 04 / ENGINEER",
        title: "Build reliable capability",
        detail:
          "Translate the supported mechanism into a system with defined operating limits.",
        criterion:
          "Performance and failure behavior are measurable under relevant conditions.",
      },
      {
        label: "GATE 05 / CORRECT",
        title: "Bound deployment",
        detail:
          "Demonstrate observation, interruption, recovery, and accountable release.",
        criterion:
          "The proposed scale does not exceed the demonstrated capacity to manage failure.",
      },
    ],
    boundaries: [
      {
        label: "PRESENTED",
        title: "An explicit method of inquiry",
        detail:
          "The framework organizes questions, evidence requirements, engineering decisions, and correction paths.",
      },
      {
        label: "TO BE EVALUATED",
        title: "Usefulness across domains",
        detail:
          "Specific applications must demonstrate whether the framework improves decisions or outcomes compared with relevant alternatives.",
      },
      {
        label: "NOT IMPLIED",
        title: "A universal scientific theory",
        detail:
          "The framework is not presented as a new physical law or proof that every domain follows one mathematical model.",
      },
    ],
  },
];

const EXHIBITION_PRINCIPLES = [
  {
    number: "01",
    title: "Encounter",
    text: "Enter a public experience, conceptual architecture, or research proposition.",
  },
  {
    number: "02",
    title: "Understand",
    text: "Explore its internal structure, dependencies, and intended capabilities.",
  },
  {
    number: "03",
    title: "Challenge",
    text: "Distinguish what exists from what still requires testing or implementation.",
  },
  {
    number: "04",
    title: "Continue",
    text: "Follow the work, examine its open questions, or propose a specific contribution.",
  },
];

/* ==========================================================
   SHARED COMPONENTS
========================================================== */

function Arrow({
  diagonal = false,
}: {
  diagonal?: boolean;
}) {
  return (
    <svg
      className="aw-arrow"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {diagonal ? (
        <>
          <path d="M5 19 19 5" />
          <path d="M8 5h11v11" />
        </>
      ) : (
        <>
          <path d="M3 12h17" />
          <path d="m13 5 7 7-7 7" />
        </>
      )}
    </svg>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px 80px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`aw-reveal ${
        visible ? "is-visible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function Glass({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`aw-glass ${className}`}>
      {children}
    </div>
  );
}

function seeded(index: number, seed: number) {
  const value =
    Math.sin(index * 127.1 + seed * 311.7) *
    43758.5453;

  return value - Math.floor(value);
}

/* ==========================================================
   CONCEPTUAL ARTWORK

   All three visuals are deterministic local SVGs.
   They are illustrations, not measurements or
   engineering simulations.
========================================================== */

const EPISTEME_HEAD =
  "M662 128 C565 82 427 101 348 169 " +
  "C285 223 253 300 264 379 " +
  "C270 425 251 463 218 508 " +
  "C201 532 207 549 237 552 " +
  "L267 557 L255 599 " +
  "C250 620 264 631 287 635 " +
  "C279 674 296 704 335 713 " +
  "C374 723 413 705 442 717 " +
  "C490 737 494 801 479 908 " +
  "L761 908 C729 829 706 771 728 700 " +
  "C746 641 801 573 813 476 " +
  "C833 325 776 184 662 128 Z";

function EpistemeVisual() {
  const nodes = useMemo(
    () =>
      Array.from({ length: 350 }, (_, index) => {
        const angle =
          seeded(index, 11) * Math.PI * 2;

        const radius = Math.sqrt(
          seeded(index, 12),
        );

        return {
          x:
            506 +
            Math.cos(angle) * radius * 305,
          y:
            480 +
            Math.sin(angle) * radius * 385,
          r:
            0.55 +
            seeded(index, 13) * 1.45,
        };
      }),
    [],
  );

  return (
    <svg
      className="aw-art-svg aw-art-svg--episteme"
      viewBox="0 0 1000 1000"
      role="img"
      aria-label="Conceptual golden neural threads forming an abstract left-facing head"
    >
      <defs>
        <clipPath id="aw-ep-head-clip">
          <path d={EPISTEME_HEAD} />
        </clipPath>

        <radialGradient id="aw-ep-node-light">
          <stop
            offset="0%"
            stopColor="#fff9e6"
            stopOpacity=".95"
          />
          <stop
            offset="35%"
            stopColor="#e8c98b"
            stopOpacity=".45"
          />
          <stop
            offset="100%"
            stopColor="#d6a95e"
            stopOpacity="0"
          />
        </radialGradient>

        <filter id="aw-ep-soft-glow">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <g className="aw-ep-breath">
        <path
          d={EPISTEME_HEAD}
          fill="#b28b50"
          fillOpacity=".015"
          stroke="#e5c58d"
          strokeOpacity=".34"
          strokeWidth="1.15"
        />

        <g clipPath="url(#aw-ep-head-clip)">
          {Array.from(
            { length: 94 },
            (_, index) => {
              const x =
                190 + index * 7.2;

              const bend =
                seeded(index, 21) * 150 - 75;

              return (
                <path
                  key={`vertical-${index}`}
                  d={`M${x} 65 C${
                    x + bend
                  } 310 ${
                    x - bend * 0.75
                  } 600 ${
                    x + bend * 0.38
                  } 960`}
                  fill="none"
                  stroke="#e8ca91"
                  strokeWidth=".55"
                  strokeOpacity={
                    0.07 +
                    seeded(index, 22) * 0.3
                  }
                />
              );
            },
          )}

          {Array.from(
            { length: 67 },
            (_, index) => {
              const y =
                125 + index * 12.5;

              const bend =
                seeded(index, 23) * 110 - 55;

              return (
                <path
                  key={`horizontal-${index}`}
                  d={`M180 ${y} C370 ${
                    y + bend
                  } 610 ${
                    y - bend
                  } 850 ${
                    y + bend * 0.4
                  }`}
                  fill="none"
                  stroke="#efd9ac"
                  strokeWidth=".55"
                  strokeOpacity={
                    0.06 +
                    seeded(index, 24) * 0.22
                  }
                />
              );
            },
          )}

          {nodes.map((node, index) => {
            const next =
              nodes[
                (index * 17 + 43) %
                  nodes.length
              ];

            return (
              <line
                key={`connection-${index}`}
                x1={node.x}
                y1={node.y}
                x2={next.x}
                y2={next.y}
                stroke="#e9c78c"
                strokeWidth=".55"
                strokeOpacity=".13"
              />
            );
          })}

          <path
            d="M449 185 C550 280 372 369 529 462 S387 629 510 721 S592 831 559 958"
            fill="none"
            stroke="#f5d99d"
            strokeWidth="14"
            strokeOpacity=".35"
            filter="url(#aw-ep-soft-glow)"
          />

          <path
            d="M449 185 C550 280 372 369 529 462 S387 629 510 721 S592 831 559 958"
            fill="none"
            stroke="#fff2d2"
            strokeWidth=".9"
            strokeOpacity=".55"
          />

          {nodes.map((node, index) => (
            <g key={`node-${index}`}>
              {index % 9 === 0 && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.r * 7}
                  fill="url(#aw-ep-node-light)"
                  opacity=".85"
                />
              )}

              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={
                  index % 5 === 0
                    ? "#fff8e9"
                    : "#e9c58c"
                }
                opacity={
                  0.38 +
                  seeded(index, 25) * 0.62
                }
              />
            </g>
          ))}
        </g>

        <path
          d="M348 169 C285 223 253 300 264 379 C270 425 251 463 218 508 C201 532 207 549 237 552 L267 557"
          fill="none"
          stroke="#fff0cd"
          strokeWidth="1.2"
          strokeOpacity=".55"
        />
      </g>
    </svg>
  );
}

function AetherionVisual() {
  return (
    <svg
      className="aw-art-svg aw-art-svg--aetherion"
      viewBox="0 0 1000 1000"
      role="img"
      aria-label="Conceptual silver orbital rings surrounding a luminous core"
    >
      <defs>
        <radialGradient id="aw-ae-core">
          <stop
            offset="0%"
            stopColor="#fff"
            stopOpacity="1"
          />
          <stop
            offset="12%"
            stopColor="#fff"
            stopOpacity=".9"
          />
          <stop
            offset="38%"
            stopColor="#dfe4ed"
            stopOpacity=".35"
          />
          <stop
            offset="100%"
            stopColor="#fff"
            stopOpacity="0"
          />
        </radialGradient>

        <filter id="aw-ae-blur">
          <feGaussianBlur stdDeviation="13" />
        </filter>
      </defs>

      {Array.from(
        { length: 210 },
        (_, index) => (
          <circle
            key={`background-${index}`}
            cx={seeded(index, 31) * 1000}
            cy={seeded(index, 32) * 1000}
            r={
              0.3 +
              seeded(index, 33) * 1.05
            }
            fill="#fff"
            opacity={
              0.08 +
              seeded(index, 34) * 0.42
            }
          />
        ),
      )}

      <g className="aw-ae-breath">
        <g
          fill="none"
          stroke="#f4f5f8"
          strokeLinecap="round"
        >
          {Array.from(
            { length: 16 },
            (_, index) => (
              <ellipse
                key={`upright-${index}`}
                cx="500"
                cy="500"
                rx={149 + index * 2.25}
                ry={345 + index * 1.05}
                transform={`rotate(${
                  index * 0.5 - 4
                } 500 500)`}
                strokeWidth={
                  index % 5 === 0
                    ? 1.15
                    : 0.6
                }
                strokeOpacity={
                  0.1 +
                  (index % 6) * 0.058
                }
              />
            ),
          )}

          {Array.from(
            { length: 18 },
            (_, index) => (
              <ellipse
                key={`left-${index}`}
                cx="500"
                cy="500"
                rx={350 + index * 1.65}
                ry={121 + index * 1.1}
                transform={`rotate(${
                  -34 + index * 0.35
                } 500 500)`}
                strokeWidth={
                  index % 6 === 0
                    ? 1.15
                    : 0.55
                }
                strokeOpacity={
                  0.1 +
                  (index % 6) * 0.055
                }
              />
            ),
          )}

          {Array.from(
            { length: 18 },
            (_, index) => (
              <ellipse
                key={`right-${index}`}
                cx="500"
                cy="500"
                rx={350 + index * 1.65}
                ry={121 + index * 1.1}
                transform={`rotate(${
                  34 - index * 0.35
                } 500 500)`}
                strokeWidth={
                  index % 6 === 0
                    ? 1.15
                    : 0.55
                }
                strokeOpacity={
                  0.1 +
                  (index % 6) * 0.055
                }
              />
            ),
          )}

          {Array.from(
            { length: 11 },
            (_, index) => (
              <ellipse
                key={`inner-${index}`}
                cx="500"
                cy="500"
                rx={110 + index * 6.5}
                ry={220 + index * 7}
                transform={`rotate(${
                  index * 13
                } 500 500)`}
                strokeWidth=".55"
                strokeOpacity=".1"
              />
            ),
          )}
        </g>

        {Array.from(
          { length: 400 },
          (_, index) => {
            const angle =
              seeded(index, 41) *
              Math.PI *
              2;

            const radius =
              Math.sqrt(
                seeded(index, 42),
              ) * 400;

            return (
              <circle
                key={`particle-${index}`}
                cx={
                  500 +
                  Math.cos(angle) *
                    radius
                }
                cy={
                  500 +
                  Math.sin(angle) *
                    radius
                }
                r={
                  0.4 +
                  seeded(index, 43) *
                    1.35
                }
                fill="#fff"
                opacity={
                  0.13 +
                  seeded(index, 44) *
                    0.68
                }
              />
            );
          },
        )}

        <circle
          cx="500"
          cy="500"
          r="145"
          fill="url(#aw-ae-core)"
          filter="url(#aw-ae-blur)"
          opacity=".85"
        />

        <circle
          cx="500"
          cy="500"
          r="104"
          fill="url(#aw-ae-core)"
        />

        <circle
          cx="500"
          cy="500"
          r="20"
          fill="#fff"
          opacity=".95"
        />

        <circle
          cx="500"
          cy="500"
          r="4"
          fill="#fff"
        />
      </g>
    </svg>
  );
}

function FrameworkVisual() {
  const points = useMemo(() => {
    const rows = 65;
    const columns = 116;

    return Array.from(
      { length: rows * columns },
      (_, index) => {
        const row = Math.floor(
          index / columns,
        );

        const column =
          index % columns;

        const u =
          (column / (columns - 1)) *
          Math.PI *
          2;

        const v =
          (row / (rows - 1)) *
          Math.PI;

        const folds =
          1 +
          0.18 *
            Math.sin(6 * u + 2 * v) +
          0.12 *
            Math.cos(9 * u - 3 * v);

        const radius =
          (285 +
            58 *
              Math.sin(
                3 * v + 4 * u,
              )) *
          folds;

        const x =
          500 +
          Math.cos(u) *
            Math.sin(v) *
            radius +
          20 * Math.sin(5 * v);

        const y =
          500 +
          Math.sin(u) *
            Math.sin(v) *
            radius *
            0.69 +
          Math.cos(v) * 118;

        const depth =
          Math.cos(
            u + v * 0.8,
          );

        return {
          x,
          y,
          opacity: Math.max(
            0.065,
            Math.min(
              0.86,
              0.3 + depth * 0.23,
            ),
          ),
        };
      },
    );
  }, []);

  return (
    <svg
      className="aw-art-svg aw-art-svg--framework"
      viewBox="0 0 1000 1000"
      role="img"
      aria-label="Conceptual folded particle manifold in blue-white and lavender"
    >
      <defs>
        <radialGradient id="aw-fw-core">
          <stop
            offset="0%"
            stopColor="#fffaf3"
            stopOpacity=".7"
          />
          <stop
            offset="28%"
            stopColor="#d7d9f5"
            stopOpacity=".29"
          />
          <stop
            offset="100%"
            stopColor="#aeb8f1"
            stopOpacity="0"
          />
        </radialGradient>

        <filter id="aw-fw-blur">
          <feGaussianBlur stdDeviation="11" />
        </filter>
      </defs>

      <g className="aw-fw-breath">
        <ellipse
          cx="500"
          cy="500"
          rx="295"
          ry="156"
          transform="rotate(-12 500 500)"
          fill="url(#aw-fw-core)"
          filter="url(#aw-fw-blur)"
        />

        {points.map(
          (point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={
                index % 23 === 0
                  ? 1.05
                  : 0.52
              }
              fill={
                index % 13 === 0
                  ? "#fff3e6"
                  : index % 3 === 0
                    ? "#b7c8ff"
                    : "#e1ddff"
              }
              opacity={
                point.opacity
              }
            />
          ),
        )}

        {Array.from(
          { length: 18 },
          (_, index) => (
            <ellipse
              key={`fold-${index}`}
              cx="500"
              cy="500"
              rx={115 + index * 9}
              ry={
                38 + index * 6.3
              }
              transform={`rotate(${
                -27 + index * 3
              } 500 500)`}
              fill="none"
              stroke="#d6d7ff"
              strokeWidth=".55"
              strokeOpacity=".085"
            />
          ),
        )}
      </g>
    </svg>
  );
}

function WorkVisual({
  type,
}: {
  type: WorkId;
}) {
  return (
    <div
      className={`aw-visual aw-visual--${type}`}
    >
      {type === "episteme" && (
        <EpistemeVisual />
      )}

      {type === "aetherion" && (
        <AetherionVisual />
      )}

      {type === "framework" && (
        <FrameworkVisual />
      )}
    </div>
  );
}

/* ==========================================================
   INTERACTIVE EXHIBITION

   Each work has its own selected panel.
   Selection is local UI state, not a claim that
   a corresponding physical system is running.
========================================================== */

function WorkExhibition({
  work,
}: {
  work: Work;
}) {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const active =
    work.exhibits[activeIndex] ??
    work.exhibits[0];

  return (
    <div
      id={`${work.id}-exhibition`}
      className="aw-screen aw-exhibition"
    >
      <div className="aw-section-inner">
        <Reveal>
          <p className="aw-kicker">
            THE LIVING EXHIBITION /{" "}
            {work.number}
          </p>

          <h3 className="aw-display">
            Enter the
            <br />
            <span>architecture.</span>
          </h3>

          <p className="aw-section-intro">
            Select a layer to explore the
            questions, system structure, and
            intended development of{" "}
            {work.name}.
          </p>
        </Reveal>

        <div className="aw-exhibition__layout">
          <Reveal>
            <nav
              className="aw-exhibition__menu"
              aria-label={`${work.name} exhibition layers`}
            >
              {work.exhibits.map(
                (exhibit, index) => (
                  <button
                    key={exhibit.label}
                    type="button"
                    className={`aw-exhibition__menu-item ${
                      activeIndex === index
                        ? "is-active"
                        : ""
                    }`}
                    aria-pressed={
                      activeIndex === index
                    }
                    onClick={() =>
                      setActiveIndex(index)
                    }
                  >
                    <span className="aw-exhibition__menu-number">
                      {String(
                        index + 1,
                      ).padStart(2, "0")}
                    </span>

                    <span className="aw-exhibition__menu-name">
                      {exhibit.title}
                    </span>

                    <Arrow diagonal />
                  </button>
                ),
              )}
            </nav>
          </Reveal>

          <Reveal>
            <Glass className="aw-exhibition__panel">
              <div
                key={`${work.id}-${activeIndex}`}
                className="aw-exhibition__panel-content"
                aria-live="polite"
              >
                <div className="aw-exhibition__panel-top">
                  <span className="aw-small-label">
                    {active.label}
                  </span>

                  <span className="aw-exhibition__counter">
                    {String(
                      activeIndex + 1,
                    ).padStart(2, "0")}
                    {" / "}
                    {String(
                      work.exhibits.length,
                    ).padStart(2, "0")}
                  </span>
                </div>

                <h4>{active.title}</h4>

                <p className="aw-exhibition__lead">
                  {active.lead}
                </p>

                <p className="aw-exhibition__body">
                  {active.body}
                </p>

                <div className="aw-exhibition__point-grid">
                  {active.points.map(
                    (point, index) => (
                      <div
                        className="aw-exhibition__point"
                        key={point.name}
                      >
                        <span className="aw-small-label">
                          {String(
                            index + 1,
                          ).padStart(2, "0")}
                          {" / "}
                          {point.name}
                        </span>

                        <p>
                          {point.detail}
                        </p>
                      </div>
                    ),
                  )}
                </div>

                <div className="aw-exhibition__question">
                  <span className="aw-small-label">
                    THE QUESTION THAT
                    REMAINS
                  </span>

                  <p>
                    {active.question}
                  </p>
                </div>
              </div>
            </Glass>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   DEVELOPMENT PATHWAY

   The pathway is a proposed sequence of validation
   requirements. It is not a completion tracker.
========================================================== */

function WorkPathway({
  work,
}: {
  work: Work;
}) {
  const [expanded, setExpanded] =
    useState<number | null>(0);

  return (
    <div
      id={`${work.id}-pathway`}
      className="aw-screen aw-pathway"
    >
      <div className="aw-section-inner aw-pathway__layout">
        <Reveal>
          <p className="aw-kicker">
            DEVELOPMENT PATHWAY /{" "}
            {work.number}
          </p>

          <h3 className="aw-display">
            What must
            <br />
            <span>happen next?</span>
          </h3>

          <p className="aw-section-intro">
            A proposed sequence of development
            and validation gates. Each stage
            defines what would need to be
            demonstrated before progressing
            further.
          </p>
        </Reveal>

        <Reveal>
          <Glass className="aw-pathway__panel">
            <div className="aw-pathway__heading">
              <span className="aw-small-label">
                {work.name.toUpperCase()} /
                DEVELOPMENT LOGIC
              </span>

              <span className="aw-pathway__legend">
                PROPOSED STAGES — NOT A
                COMPLETION STATUS
              </span>
            </div>

            {work.pathway.map(
              (step, index) => {
                const isOpen =
                  expanded === index;

                return (
                  <div
                    key={step.label}
                    className={`aw-pathway__step ${
                      isOpen
                        ? "is-open"
                        : ""
                    }`}
                  >
                    <button
                      type="button"
                      className="aw-pathway__trigger"
                      aria-expanded={
                        isOpen
                      }
                      onClick={() =>
                        setExpanded(
                          isOpen
                            ? null
                            : index,
                        )
                      }
                    >
                      <span className="aw-pathway__number">
                        {String(
                          index + 1,
                        ).padStart(2, "0")}
                      </span>

                      <span className="aw-pathway__trigger-copy">
                        <span className="aw-small-label">
                          {step.label}
                        </span>

                        <strong>
                          {step.title}
                        </strong>
                      </span>

                      <span
                        className="aw-pathway__toggle"
                        aria-hidden="true"
                      >
                        {isOpen
                          ? "−"
                          : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="aw-pathway__detail">
                        <p>
                          {step.detail}
                        </p>

                        <div className="aw-pathway__criterion">
                          <span className="aw-small-label">
                            ADVANCEMENT
                            CRITERION
                          </span>

                          <p>
                            {
                              step.criterion
                            }
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              },
            )}
          </Glass>
        </Reveal>
      </div>
    </div>
  );
}

/* ==========================================================
   PAGE
========================================================== */

export default function WorksPage() {
  const [
    activeCollaboration,
    setActiveCollaboration,
  ] = useState<WorkId>("episteme");

  const selectedWork =
    WORKS.find(
      (work) =>
        work.id ===
        activeCollaboration,
    ) ?? WORKS[0];

  return (
    <main
      className="aw"
      id="works-top"
    >
      {/* ================================================
          OPENING
      ================================================ */}

      <section
        className="aw-screen aw-opening"
        aria-labelledby="aw-page-title"
      >
        <header className="aw-opening__top">
          <Link
            href="/home"
            className="aw-back"
          >
            <span
              className="aw-back__arrow"
              aria-hidden="true"
            />

            <span>ARCHENOVA</span>
          </Link>

          <span className="aw-top-label">
            WORKS / RESEARCH ·
            ENGINEERING · CREATION
          </span>
        </header>

        <div className="aw-opening__content">
          <Reveal>
            <p className="aw-kicker">
              AN EXHIBITION OF
              POSSIBILITIES IN PROGRESS
            </p>

            <h1 id="aw-page-title">
              Ideas become
              <br />
              <span>work.</span>
            </h1>

            <p className="aw-opening__intro">
              Enter the ideas. Explore
              their architecture. Discover
              what exists, what could
              become possible, and what
              reality must still decide.
            </p>
          </Reveal>
        </div>

        <nav
          className="aw-opening__index"
          aria-label="Works exhibition"
        >
          {WORKS.map((work) => (
            <a
              key={work.id}
              href={`#${work.id}`}
              className="aw-opening__index-link"
            >
              <span className="aw-opening__index-number">
                {work.number}
              </span>

              <span className="aw-opening__index-copy">
                <strong>
                  {work.name}
                </strong>

                <small>
                  {work.category}
                </small>
              </span>

              <Arrow diagonal />
            </a>
          ))}
        </nav>

        <div className="aw-opening__bottom">
          <span>
            THREE WORLDS / ONE
            EVOLVING BODY OF WORK
          </span>

          <a href="#explore">
            ENTER THE EXHIBITION
            <span aria-hidden="true">
              ↓
            </span>
          </a>
        </div>
      </section>

      {/* ================================================
          INTRODUCTION
      ================================================ */}

      <section
        id="explore"
        className="aw-screen aw-introduction"
        aria-labelledby="aw-introduction-title"
      >
        <div className="aw-section-inner aw-introduction__layout">
          <Reveal>
            <p className="aw-kicker">
              THE WORKS / 001—003
            </p>

            <h2
              id="aw-introduction-title"
              className="aw-display"
            >
              Three worlds.
              <br />
              <span>
                One continuous
                question.
              </span>
            </h2>

            <p className="aw-section-intro">
              How does an idea become
              something people can
              understand, test, build,
              correct, and ultimately
              use?
            </p>
          </Reveal>

          <Reveal>
            <Glass className="aw-introduction__note">
              <span className="aw-small-label">
                THE EXHIBITION
              </span>

              <p className="aw-introduction__statement">
                Intelligence
                <br />
                that can be challenged.
                <br />
                <br />
                Manufacturing
                <br />
                that can be reproduced.
                <br />
                <br />
                Frameworks
                <br />
                that remain open
                to reality.
              </p>

              <p className="aw-muted">
                Each environment is
                presented according to
                its actual form:
                accessible digital
                experience, proposed
                system architecture,
                or evolving research
                framework.
              </p>
            </Glass>
          </Reveal>
        </div>
      </section>

      {/* ================================================
          EXHIBITION PRINCIPLES
      ================================================ */}

      <section className="aw-screen aw-principles">
        <div className="aw-section-inner">
          <Reveal>
            <p className="aw-kicker">
              HOW TO EXPLORE
            </p>

            <h2 className="aw-display">
              Don't just
              <br />
              <span>look at the work.</span>
            </h2>

            <p className="aw-section-intro">
              Enter its structure.
              Discover the assumptions.
              Follow the path from
              possibility to evidence.
            </p>
          </Reveal>

          <div className="aw-principles__grid">
            {EXHIBITION_PRINCIPLES.map(
              (item) => (
                <Reveal
                  key={item.number}
                >
                  <Glass className="aw-principles__card">
                    <span className="aw-small-label">
                      {item.number} / 04
                    </span>

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>
                  </Glass>
                </Reveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ================================================
          THREE WORKS
      ================================================ */}

      {WORKS.map((work) => (
        <section
          key={work.id}
          id={work.id}
          className={`aw-work aw-work--${work.id}`}
          aria-labelledby={`aw-${work.id}-title`}
        >
          {/* HERO */}

          <div className="aw-screen aw-work__hero">
            <header className="aw-work__hero-top">
              <div className="aw-work__identity">
                <span>
                  WORK {work.number} / 03
                </span>

                <span>
                  {work.category}
                </span>
              </div>

              <a
                href="#explore"
                className="aw-work__all"
              >
                ALL WORKS
                <Arrow diagonal />
              </a>
            </header>

            <div className="aw-work__art-stage">
              <WorkVisual
                type={work.id}
              />
            </div>

            <div className="aw-work__hero-copy">
              <Reveal>
                <Glass className="aw-work__heading-glass">
                  <span className="aw-small-label">
                    {work.category} /{" "}
                    {work.number}
                  </span>

                  <h2
                    id={`aw-${work.id}-title`}
                  >
                    {work.name}
                  </h2>

                  <p>
                    {work.subtitle}
                  </p>
                </Glass>
              </Reveal>
            </div>

            <div className="aw-work__hero-bottom">
              <span>
                CONCEPTUAL VISUAL /
                NOT EXPERIMENTAL
                EVIDENCE
              </span>

              <a
                href={`#${work.id}-inside`}
              >
                DISCOVER THE WORK
                <span aria-hidden="true">
                  ↓
                </span>
              </a>
            </div>
          </div>

          {/* THE IDEA */}

          <div
            id={`${work.id}-inside`}
            className="aw-screen aw-work__inside"
          >
            <div className="aw-section-inner aw-work__inside-layout">
              <Reveal>
                <p className="aw-kicker">
                  INSIDE THE WORK /{" "}
                  {work.number}
                </p>

                <h3 className="aw-display">
                  Beyond the
                  <br />
                  <span>first impression.</span>
                </h3>

                <p className="aw-section-intro">
                  {work.statement}
                </p>

                <p className="aw-work__visual-note">
                  {work.visualNote}
                </p>
              </Reveal>

              <Reveal>
                <Glass className="aw-work__description">
                  <span className="aw-small-label">
                    THE CENTRAL IDEA
                  </span>

                  <p>
                    {work.description}
                  </p>

                  <Link
                    href={work.href}
                    className="aw-button aw-button--light"
                  >
                    <span>
                      {work.action}
                    </span>

                    <Arrow diagonal />
                  </Link>
                </Glass>
              </Reveal>
            </div>
          </div>

          {/* INTERACTIVE ARCHITECTURE */}

          <WorkExhibition
            work={work}
          />

          {/* DEVELOPMENT PATHWAY */}

          <WorkPathway
            work={work}
          />

          {/* EVIDENCE BOUNDARIES */}

          <div className="aw-screen aw-work__depth">
            <div className="aw-section-inner aw-work__depth-layout">
              <Reveal>
                <p className="aw-kicker">
                  EVIDENCE & LIMITS /{" "}
                  {work.number}
                </p>

                <h3 className="aw-display">
                  What exists.
                  <br />
                  <span>
                    What remains open.
                  </span>
                </h3>

                <p className="aw-section-intro">
                  {work.stageDetail}
                </p>
              </Reveal>

              <div className="aw-detail-grid">
                {work.boundaries.map(
                  (boundary) => (
                    <Reveal
                      key={boundary.label}
                    >
                      <Glass className="aw-detail">
                        <span className="aw-small-label">
                          {
                            boundary.label
                          }
                        </span>

                        <h4>
                          {
                            boundary.title
                          }
                        </h4>

                        <p>
                          {
                            boundary.detail
                          }
                        </p>
                      </Glass>
                    </Reveal>
                  ),
                )}
              </div>

              <Reveal>
                <Glass className="aw-work__next">
                  <div className="aw-work__next-copy">
                    <span className="aw-small-label">
                      CURRENT
                      PRESENTATION
                    </span>

                    <h4>
                      {work.stage}
                    </h4>

                    <p>
                      Explore the
                      available work or
                      propose a specific
                      research and
                      technical
                      collaboration.
                    </p>
                  </div>

                  <div className="aw-work__next-actions">
                    <Link
                      href={work.href}
                      className="aw-button aw-button--light"
                    >
                      <span>
                        {work.action}
                      </span>

                      <Arrow diagonal />
                    </Link>

                    <a
                      href="#collaboration"
                      className="aw-button aw-button--dark"
                      onClick={() =>
                        setActiveCollaboration(
                          work.id,
                        )
                      }
                    >
                      <span>
                        DISCUSS THIS WORK
                      </span>

                      <Arrow />
                    </a>
                  </div>
                </Glass>
              </Reveal>
            </div>
          </div>
        </section>
      ))}

      {/* ================================================
          SHARED FRAMEWORK
      ================================================ */}

      <section
        id="evidence"
        className="aw-screen aw-evidence"
        aria-labelledby="aw-evidence-title"
      >
        <div className="aw-section-inner">
          <Reveal>
            <p className="aw-kicker">
              THE CONNECTION BETWEEN
              THE WORKS
            </p>

            <h2
              id="aw-evidence-title"
              className="aw-display"
            >
              Intelligence.
              <br />
              Engineering.
              <br />
              <span>
                Reality.
              </span>
            </h2>

            <p className="aw-section-intro">
              Episteme explores and
              challenges possible
              explanations. Framework
              defines what evidence
              would be needed.
              Aetherion explores how
              validated capability
              could become repeatable
              production. Real-world
              results must then inform
              the next cycle.
            </p>
          </Reveal>

          <Reveal>
            <Glass className="aw-system">
              <div className="aw-system__flow">
                <div className="aw-system__node">
                  <span className="aw-small-label">
                    01 / COGNITION
                  </span>

                  <strong>
                    Episteme
                  </strong>

                  <p>
                    Ask · Explore ·
                    Challenge
                  </p>
                </div>

                <span
                  className="aw-system__arrow"
                  aria-hidden="true"
                >
                  →
                </span>

                <div className="aw-system__node">
                  <span className="aw-small-label">
                    02 / VALIDATION
                  </span>

                  <strong>
                    Framework
                  </strong>

                  <p>
                    Distinguish ·
                    Test · Correct
                  </p>
                </div>

                <span
                  className="aw-system__arrow"
                  aria-hidden="true"
                >
                  →
                </span>

                <div className="aw-system__node">
                  <span className="aw-small-label">
                    03 / REALIZATION
                  </span>

                  <strong>
                    Aetherion
                  </strong>

                  <p>
                    Engineer ·
                    Reproduce ·
                    Release
                  </p>
                </div>
              </div>

              <div className="aw-system__return">
                <span className="aw-small-label">
                  THE FEEDBACK LOOP
                </span>

                <p>
                  Real-world outcomes
                  → New evidence
                  → Revised models
                  → Improved systems
                </p>
              </div>
            </Glass>
          </Reveal>
        </div>
      </section>

      {/* ================================================
          COLLABORATION
      ================================================ */}

      <section
        id="collaboration"
        className="aw-screen aw-collaboration"
        aria-labelledby="aw-collaboration-title"
      >
        <div className="aw-section-inner aw-collaboration__layout">
          <Reveal>
            <p className="aw-kicker">
              RESEARCH & TECHNICAL
              COLLABORATION
            </p>

            <h2
              id="aw-collaboration-title"
              className="aw-display"
            >
              The next step
              <br />
              <span>
                begins with a
                question.
              </span>
            </h2>

            <p className="aw-section-intro">
              Select a work and
              identify a specific
              research question,
              engineering constraint,
              evaluation method, or
              implementation
              opportunity.
            </p>
          </Reveal>

          <Reveal>
            <Glass className="aw-collaboration__panel">
              <span className="aw-small-label">
                SELECT AN AREA
                OF INTEREST
              </span>

              <div className="aw-collaboration__options">
                {WORKS.map(
                  (work) => (
                    <button
                      key={work.id}
                      type="button"
                      className={`aw-collaboration__option ${
                        activeCollaboration ===
                        work.id
                          ? "is-active"
                          : ""
                      }`}
                      aria-pressed={
                        activeCollaboration ===
                        work.id
                      }
                      onClick={() =>
                        setActiveCollaboration(
                          work.id,
                        )
                      }
                    >
                      <span>
                        {work.name}
                      </span>

                      <span
                        aria-hidden="true"
                      >
                        {activeCollaboration ===
                        work.id
                          ? "●"
                          : "○"}
                      </span>
                    </button>
                  ),
                )}
              </div>

              <div
                className="aw-collaboration__selection"
                aria-live="polite"
              >
                <span className="aw-small-label">
                  COLLABORATION
                  FOCUS
                </span>

                <p>
                  {
                    selectedWork.collaboration
                  }
                </p>
              </div>

              <Link
                href={`/contact?subject=${encodeURIComponent(
                  `ArcheNova Works — ${selectedWork.name}`,
                )}`}
                className="aw-button aw-button--light aw-collaboration__cta"
              >
                <span>
                  DISCUSS
                  COLLABORATION
                </span>

                <Arrow diagonal />
              </Link>

              <p className="aw-collaboration__note">
                Include the work,
                the question or
                challenge, and the
                expertise or
                contribution you
                wish to propose.
              </p>
            </Glass>
          </Reveal>
        </div>
      </section>

      {/* ================================================
          FOOTER
      ================================================ */}

      <footer className="aw-footer">
        <Glass className="aw-footer__frame">
          <div>
            <span className="aw-small-label">
              ARCHENOVA / WORKS
            </span>

            <p>
              Research. Engineering.
              Creation.
            </p>
          </div>

          <Link href="/home">
            <span>
              RETURN TO ARCHENOVA
            </span>

            <Arrow diagonal />
          </Link>
        </Glass>
      </footer>

      {/* ================================================
          STYLES
      ================================================ */}

      <style jsx global>{`
        /* ==============================================
           WORKS-ONLY ROOT COMPATIBILITY
        ============================================== */

        html:has(.aw),
        body:has(.aw) {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          min-width: 0 !important;
          max-width: none !important;
          background: #000 !important;
          scroll-behavior: smooth;
        }

        body:has(.aw) {
          overflow-x: clip !important;
        }

        body:has(.aw) .site-header {
          display: none !important;
        }

        body:has(.aw) .site-content {
          position: relative !important;
          z-index: 1 !important;
          display: block !important;
          width: 100% !important;
          min-width: 0 !important;
          max-width: none !important;
          min-height: 100svh !important;
          margin: 0 !important;
          padding: 0 !important;
          border: 0 !important;
          border-radius: 0 !important;
          background: #000 !important;
          box-shadow: none !important;
          transform: none !important;
          overflow: visible !important;
        }

        body:has(.aw) .site-content::before,
        body:has(.aw) .site-content::after {
          display: none !important;
        }

        /* ==============================================
           FOUNDATION
        ============================================== */

        .aw,
        .aw *,
        .aw *::before,
        .aw *::after {
          box-sizing: border-box;
        }

        .aw {
          --aw-white: rgba(250, 251, 253, 0.98);
          --aw-muted: rgba(233, 236, 242, 0.75);
          --aw-faint: rgba(233, 236, 242, 0.48);
          --aw-line: rgba(255, 255, 255, 0.13);
          --aw-side: clamp(16px, 3.5vw, 70px);
          --aw-block: clamp(28px, 4vw, 62px);

          position: relative;
          isolation: isolate;
          display: block;
          width: 100%;
          min-width: 0;
          max-width: none;
          min-height: 100svh;
          margin: 0;
          padding: 0;
          overflow-x: clip;
          background: #000 !important;
          color: var(--aw-white);

          font-family:
            -apple-system,
            BlinkMacSystemFont,
            "SF Pro Display",
            "SF Pro Text",
            "Helvetica Neue",
            Arial,
            sans-serif;

          -webkit-font-smoothing: antialiased;
        }

        .aw a {
          color: inherit;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }

        .aw button {
          font: inherit;
          -webkit-tap-highlight-color: transparent;
        }

        .aw a:focus-visible,
        .aw button:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 4px;
        }

        .aw a,
        .aw button,
        .aw h1,
        .aw h2,
        .aw h3,
        .aw h4,
        .aw p,
        .aw strong,
        .aw span {
          min-width: 0;
        }

        .aw-screen {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          min-width: 0;
          max-width: none;
          min-height: 100svh;
          height: auto;
          padding:
            var(--aw-block)
            var(--aw-side);
          background: #000 !important;
          scroll-margin-top: 0;
        }

        .aw-section-inner {
          width: 100%;
          min-width: 0;
          max-width: none;
          margin: 0;
        }

        .aw-kicker,
        .aw-small-label {
          font-size: 10px;
          font-weight: 550;
          line-height: 1.6;
          letter-spacing: 0.15em;
        }

        .aw-kicker {
          margin: 0 0 clamp(18px, 3vw, 38px);
          color: var(--aw-faint);
        }

        .aw-small-label {
          color: var(--aw-faint);
        }

        .aw-display {
          max-width: 100%;
          margin: 0;
          font-size: clamp(42px, 7vw, 116px);
          font-weight: 510;
          line-height: 1.07;
          letter-spacing: -0.072em;
          overflow-wrap: break-word;
        }

        .aw-display span {
          color: rgba(237, 240, 245, 0.47);
        }

        .aw-section-intro {
          max-width: 760px;
          margin:
            clamp(24px, 3vw, 38px)
            0 0;
          color: var(--aw-muted);
          font-size: clamp(15px, 1.4vw, 20px);
          line-height: 1.8;
        }

        .aw-muted {
          color: var(--aw-muted);
        }

        .aw-arrow {
          flex: 0 0 auto;
          width: 19px;
          height: 19px;
          stroke: currentColor;
          stroke-width: 1.35;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* ==============================================
           GLASS
        ============================================== */

        .aw-glass {
          position: relative;
          isolation: isolate;
          min-width: 0;
          max-width: 100%;
          overflow: hidden;

          border:
            1px solid
            rgba(255, 255, 255, 0.15);

          border-radius:
            clamp(20px, 2.3vw, 34px);

          background:
            linear-gradient(
              145deg,
              rgba(33, 35, 40, 0.46),
              rgba(12, 13, 17, 0.59) 48%,
              rgba(4, 5, 8, 0.69)
            );

          -webkit-backdrop-filter:
            blur(24px) saturate(105%);

          backdrop-filter:
            blur(24px) saturate(105%);

          box-shadow:
            inset 0 1px 0
              rgba(255, 255, 255, 0.075),
            0 22px 75px
              rgba(0, 0, 0, 0.2);
        }

        .aw-glass::before {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;

          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.035),
              transparent 42%,
              transparent 82%,
              rgba(255, 255, 255, 0.012)
            );
        }

        /* ==============================================
           REVEAL
        ============================================== */

        .aw-reveal {
          width: 100%;
          min-width: 0;
          opacity: 0;
          transform: translate3d(0, 20px, 0);

          transition:
            opacity 0.8s ease,
            transform 1s
              cubic-bezier(0.16, 1, 0.3, 1);
        }

        .aw-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* ==============================================
           OPENING
        ============================================== */

        .aw-opening {
          justify-content: space-between;
          gap: clamp(24px, 4svh, 52px);
        }

        .aw-opening__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 100%;
          gap: 16px;
        }

        .aw-back {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          min-height: 40px;
          color: var(--aw-muted);
          font-size: 11px;
          font-weight: 650;
          letter-spacing: 0.13em;
        }

        .aw-back__arrow {
          flex: 0 0 auto;
          width: 9px;
          height: 9px;
          border-left: 1px solid currentColor;
          border-bottom: 1px solid currentColor;
          transform: rotate(45deg);
        }

        .aw-top-label {
          color: var(--aw-faint);
          font-size: 10px;
          line-height: 1.6;
          letter-spacing: 0.12em;
          text-align: right;
        }

        .aw-opening__content {
          width: 100%;
          margin: auto 0;
          padding-block:
            clamp(12px, 3svh, 46px);
        }

        .aw-opening__content h1 {
          max-width: 100%;
          margin: 0;
          font-size: clamp(62px, 11vw, 190px);
          font-weight: 510;
          line-height: 0.98;
          letter-spacing: -0.085em;
          overflow-wrap: break-word;
        }

        .aw-opening__content h1 span {
          color: rgba(238, 241, 246, 0.44);
        }

        .aw-opening__intro {
          max-width: 700px;
          margin:
            clamp(24px, 3vw, 42px)
            0 0;
          color: var(--aw-muted);
          font-size: clamp(16px, 1.5vw, 22px);
          line-height: 1.75;
        }

        .aw-opening__index {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          width: 100%;
          gap: clamp(10px, 1.5vw, 22px);
        }

        .aw-opening__index-link {
          display: grid;
          grid-template-columns:
            25px minmax(0, 1fr) 19px;
          align-items: center;
          min-width: 0;
          min-height: 105px;
          gap: clamp(10px, 1.2vw, 20px);
          padding: clamp(17px, 2vw, 28px);
          border: 1px solid var(--aw-line);
          border-radius: 20px;

          background:
            linear-gradient(
              145deg,
              rgba(35, 37, 42, 0.46),
              rgba(7, 8, 11, 0.66)
            );

          -webkit-backdrop-filter:
            blur(24px);

          backdrop-filter:
            blur(24px);

          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .aw-opening__index-number {
          color: var(--aw-faint);
          font-size: 10px;
        }

        .aw-opening__index-copy {
          display: grid;
          gap: 8px;
        }

        .aw-opening__index-copy strong {
          font-size: clamp(15px, 1.5vw, 23px);
          font-weight: 480;
          line-height: 1.25;
          letter-spacing: -0.035em;
          overflow-wrap: anywhere;
        }

        .aw-opening__index-copy small {
          color: var(--aw-faint);
          font-size: 9px;
          line-height: 1.5;
          letter-spacing: 0.08em;
        }

        .aw-opening__bottom,
        .aw-work__hero-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 100%;
          gap: 16px;
          color: var(--aw-faint);
          font-size: 9px;
          line-height: 1.6;
          letter-spacing: 0.12em;
        }

        .aw-opening__bottom a,
        .aw-work__hero-bottom a {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          color: var(--aw-white);
        }

        .aw-opening__bottom a span,
        .aw-work__hero-bottom a span {
          font-size: 20px;
          line-height: 1;
        }

        /* ==============================================
           INTRODUCTION
        ============================================== */

        .aw-introduction__layout {
          display: grid;
          grid-template-columns:
            minmax(0, 1.2fr)
            minmax(0, 0.8fr);
          align-items: center;
          gap: clamp(32px, 5vw, 90px);
        }

        .aw-introduction__note {
          width: 100%;
          padding:
            clamp(26px, 3.5vw, 58px);
        }

        .aw-introduction__statement {
          margin: 24px 0;
          font-size:
            clamp(22px, 2.5vw, 38px);
          line-height: 1.38;
          letter-spacing: -0.045em;
        }

        .aw-introduction__note .aw-muted {
          margin: 0;
          font-size:
            clamp(14px, 1.15vw, 18px);
          line-height: 1.85;
        }

        /* ==============================================
           EXHIBITION PRINCIPLES
        ============================================== */

        .aw-principles__grid {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: clamp(12px, 1.5vw, 24px);
          margin-top:
            clamp(40px, 5vw, 78px);
        }

        .aw-principles__grid > .aw-reveal {
          height: 100%;
        }

        .aw-principles__card {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 250px;
          padding:
            clamp(24px, 2.5vw, 40px);
        }

        .aw-principles__card h3 {
          margin: 35px 0 18px;
          font-size:
            clamp(24px, 2.2vw, 36px);
          font-weight: 490;
          letter-spacing: -0.05em;
        }

        .aw-principles__card p {
          margin: auto 0 0;
          color: var(--aw-muted);
          font-size: 14px;
          line-height: 1.8;
        }

        /* ==============================================
           WORK HERO
        ============================================== */

        .aw-work {
          width: 100%;
          min-width: 0;
          background: #000;
        }

        .aw-work__hero {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr);
          grid-template-rows:
            auto
            minmax(0, 1fr)
            auto
            auto;
          align-content: stretch;
          min-height: 100svh;
          height: auto;
          gap: clamp(12px, 2svh, 26px);
        }

        .aw-work__hero-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px 24px;
        }

        .aw-work__identity {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px 24px;
          color: var(--aw-faint);
          font-size: 10px;
          line-height: 1.5;
          letter-spacing: 0.12em;
        }

        .aw-work__all {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--aw-muted);
          font-size: 10px;
          line-height: 1.5;
          letter-spacing: 0.1em;
        }

        .aw-work__all .aw-arrow {
          width: 15px;
          height: 15px;
        }

        .aw-work__art-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-width: 0;
          min-height:
            clamp(260px, 40svh, 640px);
          overflow: hidden;
          pointer-events: none;
        }

        .aw-visual {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          min-width: 0;
          overflow: hidden;
          background: transparent;
        }

        .aw-art-svg {
          display: block;
          width: min(100%, 900px);
          height: 100%;
          max-height: 640px;
          aspect-ratio: 1 / 1;
          object-fit: contain;
          overflow: visible;
        }

        .aw-art-svg--episteme {
          width: min(100%, 770px);
        }

        .aw-art-svg--aetherion {
          width: min(100%, 930px);
        }

        .aw-art-svg--framework {
          width: min(100%, 900px);
        }

        .aw-work__hero-copy {
          width: 100%;
          min-width: 0;
        }

        .aw-work__heading-glass {
          width: fit-content;
          max-width: 100%;
          padding:
            clamp(22px, 2.5vw, 38px)
            clamp(24px, 3vw, 46px);
        }

        .aw-work__heading-glass h2 {
          max-width: 100%;
          margin: 12px 0 0;
          font-size:
            clamp(54px, 6.6vw, 110px);
          font-weight: 510;
          line-height: 1.02;
          letter-spacing: -0.078em;
          overflow-wrap: break-word;
        }

        .aw-work__heading-glass p {
          margin:
            clamp(12px, 1.5vw, 22px)
            0 0;
          color: var(--aw-muted);
          font-size:
            clamp(15px, 1.35vw, 21px);
          line-height: 1.6;
        }

        .aw-work__hero-bottom {
          padding: 16px 20px;
          border: 1px solid var(--aw-line);
          border-radius: 17px;
          background:
            rgba(9, 10, 13, 0.56);
          -webkit-backdrop-filter:
            blur(18px);
          backdrop-filter:
            blur(18px);
        }

        /* ==============================================
           ART MOTION
        ============================================== */

        .aw-ep-breath,
        .aw-ae-breath,
        .aw-fw-breath {
          transform-origin: 50% 50%;
          transform-box: view-box;
        }

        .aw-ep-breath {
          animation:
            awEpBreath
            9s ease-in-out infinite;
        }

        .aw-ae-breath {
          animation:
            awAeBreath
            14s ease-in-out infinite;
        }

        .aw-fw-breath {
          animation:
            awFwBreath
            12s ease-in-out infinite;
        }

        @keyframes awEpBreath {
          0%,
          100% {
            opacity: 0.84;
            transform: scale(0.99);
          }

          50% {
            opacity: 1;
            transform: scale(1.012);
          }
        }

        @keyframes awAeBreath {
          0%,
          100% {
            opacity: 0.85;
            transform: scale(0.985);
          }

          50% {
            opacity: 1;
            transform: scale(1.012);
          }
        }

        @keyframes awFwBreath {
          0%,
          100% {
            opacity: 0.79;
            transform: scale(0.99);
          }

          50% {
            opacity: 1;
            transform: scale(1.015);
          }
        }

        /* ==============================================
           INSIDE THE WORK
        ============================================== */

        .aw-work__inside-layout {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 0.85fr);
          align-items: center;
          gap: clamp(30px, 5vw, 90px);
        }

        .aw-work__visual-note {
          max-width: 650px;
          margin: 26px 0 0;
          color: var(--aw-faint);
          font-size: 12px;
          line-height: 1.8;
        }

        .aw-work__description {
          width: 100%;
          padding:
            clamp(26px, 3.5vw, 60px);
        }

        .aw-work__description > p {
          margin: 26px 0 36px;
          font-size:
            clamp(19px, 2vw, 29px);
          line-height: 1.6;
          letter-spacing: -0.035em;
        }

        /* ==============================================
           INTERACTIVE EXHIBITION
        ============================================== */

        .aw-exhibition .aw-section-inner {
          display: grid;
          gap: clamp(32px, 4vw, 65px);
        }

        .aw-exhibition__layout {
          display: grid;
          grid-template-columns:
            minmax(0, 0.65fr)
            minmax(0, 1.35fr);
          align-items: start;
          gap: clamp(16px, 2.5vw, 38px);
        }

        .aw-exhibition__menu {
          display: grid;
          gap: 10px;
        }

        .aw-exhibition__menu-item {
          display: grid;
          grid-template-columns:
            24px minmax(0, 1fr) 19px;
          align-items: center;
          width: 100%;
          min-width: 0;
          min-height: 90px;
          gap: 16px;
          padding: 20px;
          border:
            1px solid var(--aw-line);
          border-radius: 19px;
          background:
            rgba(20, 21, 25, 0.35);
          color: var(--aw-muted);
          text-align: left;
          cursor: pointer;

          transition:
            border-color 0.3s ease,
            background 0.3s ease,
            color 0.3s ease;
        }

        .aw-exhibition__menu-item.is-active {
          border-color:
            rgba(255, 255, 255, 0.4);
          background:
            rgba(43, 45, 51, 0.48);
          color: #fff;
        }

        .aw-exhibition__menu-number {
          color: var(--aw-faint);
          font-size: 10px;
        }

        .aw-exhibition__menu-name {
          font-size:
            clamp(16px, 1.5vw, 23px);
          line-height: 1.35;
          letter-spacing: -0.035em;
        }

        .aw-exhibition__panel {
          width: 100%;
          min-height: 650px;
          padding:
            clamp(26px, 3.3vw, 56px);
        }

        .aw-exhibition__panel-content {
          animation:
            awPanelEnter
            0.45s ease both;
        }

        @keyframes awPanelEnter {
          from {
            opacity: 0;
            transform:
              translateY(8px);
          }

          to {
            opacity: 1;
            transform:
              translateY(0);
          }
        }

        .aw-exhibition__panel-top {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .aw-exhibition__counter {
          color: var(--aw-faint);
          font-size: 10px;
          letter-spacing: 0.12em;
        }

        .aw-exhibition__panel h4 {
          max-width: 850px;
          margin: 34px 0 20px;
          font-size:
            clamp(34px, 4vw, 68px);
          font-weight: 490;
          line-height: 1.1;
          letter-spacing: -0.065em;
        }

        .aw-exhibition__lead {
          max-width: 750px;
          margin: 0 0 22px;
          font-size:
            clamp(17px, 1.65vw, 25px);
          line-height: 1.55;
          letter-spacing: -0.025em;
        }

        .aw-exhibition__body {
          max-width: 790px;
          margin: 0;
          color: var(--aw-muted);
          font-size: 14px;
          line-height: 1.9;
        }

        .aw-exhibition__point-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 0 28px;
          margin-top: 34px;
          border-top:
            1px solid var(--aw-line);
        }

        .aw-exhibition__point {
          padding: 23px 0;
          border-bottom:
            1px solid var(--aw-line);
        }

        .aw-exhibition__point p {
          margin: 12px 0 0;
          color: var(--aw-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .aw-exhibition__question {
          margin-top: 34px;
          padding:
            clamp(22px, 2.4vw, 36px);
          border:
            1px solid
            rgba(255, 255, 255, 0.13);
          border-radius: 19px;
          background:
            rgba(255, 255, 255, 0.035);
        }

        .aw-exhibition__question p {
          margin: 14px 0 0;
          font-size:
            clamp(18px, 1.8vw, 28px);
          line-height: 1.55;
          letter-spacing: -0.03em;
        }

        /* ==============================================
           DEVELOPMENT PATHWAY
        ============================================== */

        .aw-pathway__layout {
          display: grid;
          grid-template-columns:
            minmax(0, 0.85fr)
            minmax(0, 1.15fr);
          align-items: center;
          gap: clamp(30px, 5vw, 90px);
        }

        .aw-pathway__panel {
          width: 100%;
          padding:
            clamp(22px, 3vw, 48px);
        }

        .aw-pathway__heading {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-bottom: 24px;
        }

        .aw-pathway__legend {
          max-width: 240px;
          color: var(--aw-faint);
          font-size: 9px;
          line-height: 1.6;
          letter-spacing: 0.07em;
        }

        .aw-pathway__step {
          border-top:
            1px solid var(--aw-line);
        }

        .aw-pathway__trigger {
          display: grid;
          grid-template-columns:
            28px minmax(0, 1fr) 24px;
          align-items: center;
          width: 100%;
          min-height: 93px;
          gap: 15px;
          padding: 20px 0;
          border: 0;
          background: transparent;
          color: #fff;
          text-align: left;
          cursor: pointer;
        }

        .aw-pathway__number {
          color: var(--aw-faint);
          font-size: 10px;
        }

        .aw-pathway__trigger-copy {
          display: grid;
          gap: 8px;
        }

        .aw-pathway__trigger-copy strong {
          font-size:
            clamp(18px, 1.7vw, 26px);
          font-weight: 490;
          line-height: 1.3;
          letter-spacing: -0.035em;
        }

        .aw-pathway__toggle {
          font-size: 22px;
          font-weight: 300;
          text-align: center;
        }

        .aw-pathway__detail {
          padding:
            0 0 27px 43px;
        }

        .aw-pathway__detail > p {
          margin: 0;
          color: var(--aw-muted);
          font-size: 14px;
          line-height: 1.85;
        }

        .aw-pathway__criterion {
          margin-top: 20px;
          padding: 20px;
          border-radius: 15px;
          background:
            rgba(255, 255, 255, 0.045);
        }

        .aw-pathway__criterion p {
          margin: 10px 0 0;
          font-size: 13px;
          line-height: 1.8;
        }

        /* ==============================================
           EVIDENCE & LIMITS
        ============================================== */

        .aw-work__depth-layout {
          display: grid;
          gap: clamp(26px, 4vw, 56px);
        }

        .aw-detail-grid {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          align-items: stretch;
          gap: clamp(12px, 1.5vw, 24px);
        }

        .aw-detail-grid > .aw-reveal {
          height: 100%;
        }

        .aw-detail {
          width: 100%;
          height: 100%;
          min-height: 270px;
          padding:
            clamp(24px, 2.6vw, 42px);
        }

        .aw-detail h4 {
          margin: 28px 0 18px;
          font-size:
            clamp(22px, 2.1vw, 32px);
          font-weight: 490;
          line-height: 1.3;
          letter-spacing: -0.04em;
          overflow-wrap: break-word;
        }

        .aw-detail p {
          margin: 0;
          color: var(--aw-muted);
          font-size: 14px;
          line-height: 1.85;
        }

        .aw-work__next {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 100%;
          gap: 24px;
          padding:
            clamp(24px, 2.8vw, 44px);
        }

        .aw-work__next-copy {
          flex: 1 1 290px;
        }

        .aw-work__next-copy h4 {
          margin: 14px 0 0;
          font-size:
            clamp(21px, 2vw, 30px);
          font-weight: 490;
          letter-spacing: -0.04em;
        }

        .aw-work__next-copy p {
          max-width: 530px;
          margin: 14px 0 0;
          color: var(--aw-muted);
          font-size: 14px;
          line-height: 1.75;
        }

        .aw-work__next-actions {
          display: flex;
          align-items: stretch;
          flex-wrap: wrap;
          min-width: 0;
          gap: 12px;
        }

        /* ==============================================
           BUTTONS
        ============================================== */

        .aw-button {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          min-width: 0;
          max-width: 100%;
          min-height: 54px;
          gap: 18px;
          padding: 13px 22px;
          border-radius: 999px;
          font-size: 10px;
          font-weight: 650;
          line-height: 1.5;
          letter-spacing: 0.09em;

          transition:
            transform 0.3s ease,
            background 0.3s ease,
            border-color 0.3s ease;
        }

        .aw-button > span {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .aw-button--light {
          background:
            rgba(248, 250, 252, 0.97);
          color: #08090b !important;
        }

        .aw-button--dark {
          border:
            1px solid
            rgba(255, 255, 255, 0.24);
          background:
            rgba(255, 255, 255, 0.055);
          color:
            var(--aw-white) !important;
        }

        /* ==============================================
           SYSTEM CONNECTION
        ============================================== */

        .aw-evidence .aw-section-inner {
          display: grid;
          gap: clamp(35px, 5vw, 80px);
        }

        .aw-system {
          padding:
            clamp(25px, 3.5vw, 60px);
        }

        .aw-system__flow {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            25px
            minmax(0, 1fr)
            25px
            minmax(0, 1fr);
          align-items: center;
          gap: clamp(10px, 1.5vw, 25px);
        }

        .aw-system__node {
          min-width: 0;
          padding: 22px 0;
        }

        .aw-system__node strong {
          display: block;
          margin-top: 22px;
          font-size:
            clamp(24px, 3vw, 49px);
          font-weight: 490;
          line-height: 1.15;
          letter-spacing: -0.055em;
          overflow-wrap: anywhere;
        }

        .aw-system__node p {
          margin: 16px 0 0;
          color: var(--aw-muted);
          font-size: 13px;
          line-height: 1.8;
        }

        .aw-system__arrow {
          color: var(--aw-faint);
          font-size: 24px;
          text-align: center;
        }

        .aw-system__return {
          margin-top: 30px;
          padding-top: 30px;
          border-top:
            1px solid var(--aw-line);
        }

        .aw-system__return p {
          margin: 15px 0 0;
          font-size:
            clamp(17px, 1.8vw, 27px);
          line-height: 1.6;
          letter-spacing: -0.025em;
        }

        /* ==============================================
           COLLABORATION
        ============================================== */

        .aw-collaboration__layout {
          display: grid;
          grid-template-columns:
            minmax(0, 1.1fr)
            minmax(0, 0.9fr);
          align-items: center;
          gap: clamp(30px, 5vw, 90px);
        }

        .aw-collaboration__panel {
          width: 100%;
          padding:
            clamp(25px, 3.5vw, 54px);
        }

        .aw-collaboration__panel > .aw-small-label {
          display: block;
          margin: 0 0 24px;
        }

        .aw-collaboration__options {
          border-top:
            1px solid var(--aw-line);
        }

        .aw-collaboration__option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          min-width: 0;
          min-height: 65px;
          gap: 16px;
          padding: 14px 0;
          border: 0;
          border-bottom:
            1px solid var(--aw-line);
          background: transparent;
          color: var(--aw-muted);
          font-size: 15px;
          line-height: 1.5;
          text-align: left;
          cursor: pointer;
        }

        .aw-collaboration__option > span:first-child {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .aw-collaboration__option > span:last-child {
          flex: 0 0 auto;
          font-size: 10px;
        }

        .aw-collaboration__option.is-active {
          color: #fff;
        }

        .aw-collaboration__selection {
          min-height: 125px;
          padding-top: 26px;
        }

        .aw-collaboration__selection p {
          margin: 14px 0 0;
          font-size: 15px;
          line-height: 1.75;
        }

        .aw-collaboration__cta {
          width: 100%;
          margin-top: 14px;
        }

        .aw-collaboration__note {
          margin: 20px 0 0;
          color: var(--aw-faint);
          font-size: 11px;
          line-height: 1.75;
        }

        /* ==============================================
           FOOTER
        ============================================== */

        .aw-footer {
          width: 100%;
          min-width: 0;
          padding:
            0
            var(--aw-side)
            var(--aw-block);
          background: #000 !important;
        }

        .aw-footer__frame {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 100%;
          gap: 25px;
          padding:
            clamp(24px, 3vw, 44px);
        }

        .aw-footer__frame p {
          margin: 12px 0 0;
          color: var(--aw-muted);
          font-size: 13px;
          line-height: 1.7;
        }

        .aw-footer__frame > a {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-size: 10px;
          line-height: 1.5;
          letter-spacing: 0.1em;
        }

        /* ==============================================
           HOVER
        ============================================== */

        @media (hover: hover) {
          .aw-opening__index-link:hover {
            transform:
              translateY(-3px);
            border-color:
              rgba(255, 255, 255, 0.36);
            background:
              rgba(28, 28, 31, 0.55);
          }

          .aw-exhibition__menu-item:hover {
            border-color:
              rgba(255, 255, 255, 0.36);
            color: #fff;
          }

          .aw-button:hover {
            transform:
              translateY(-2px);
          }

          .aw-button--light:hover {
            background: #fff;
          }

          .aw-button--dark:hover {
            border-color:
              rgba(255, 255, 255, 0.5);
          }

          .aw-collaboration__option:hover {
            color: #fff;
          }

          .aw-pathway__trigger:hover
            .aw-pathway__trigger-copy strong {
            color:
              rgba(255, 255, 255, 0.7);
          }
        }

        /* ==============================================
           TABLET
        ============================================== */

        @media (max-width: 1100px) {
          .aw-introduction__layout,
          .aw-work__inside-layout,
          .aw-pathway__layout,
          .aw-collaboration__layout {
            grid-template-columns:
              minmax(0, 1fr);
          }

          .aw-exhibition__layout {
            grid-template-columns:
              minmax(0, 1fr);
          }

          .aw-exhibition__menu {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .aw-principles__grid,
          .aw-detail-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .aw-work__next-actions {
            width: 100%;
          }
        }

        /* ==============================================
           MOBILE
        ============================================== */

        @media (max-width: 760px) {
          .aw {
            --aw-side: 12px;
            --aw-block:
              clamp(24px, 4svh, 42px);
          }

          .aw-glass {
            border-radius: 21px;
          }

          .aw-kicker,
          .aw-small-label {
            font-size: 9px;
            letter-spacing: 0.12em;
          }

          .aw-display {
            font-size:
              clamp(39px, 9vw, 70px);
            line-height: 1.08;
          }

          .aw-section-intro {
            font-size: 14px;
          }

          .aw-top-label {
            display: none;
          }

          .aw-back {
            font-size: 10px;
          }

          .aw-opening {
            gap: 22px;
          }

          .aw-opening__content {
            padding-block: 20px;
          }

          .aw-opening__content h1 {
            font-size:
              clamp(54px, 11.5vw, 90px);
            line-height: 1;
          }

          .aw-opening__intro {
            margin-top: 23px;
            font-size: 15px;
          }

          .aw-opening__index {
            grid-template-columns:
              minmax(0, 1fr);
            gap: 9px;
          }

          .aw-opening__index-link {
            min-height: 70px;
            gap: 12px;
            padding: 15px 17px;
            border-radius: 17px;
          }

          .aw-opening__index-copy strong {
            font-size:
              clamp(15px, 4.1vw, 20px);
          }

          .aw-opening__index-copy small {
            font-size: 8px;
          }

          .aw-opening__bottom {
            font-size: 8px;
            letter-spacing: 0.07em;
          }

          .aw-introduction__layout,
          .aw-work__inside-layout,
          .aw-collaboration__layout {
            grid-template-columns:
              minmax(0, 1fr);
            gap: 30px;
          }

          .aw-introduction__note,
          .aw-work__description {
            padding: 26px;
          }

          .aw-introduction__statement {
            font-size: 23px;
          }

          .aw-introduction__note .aw-muted {
            font-size: 13px;
          }

          .aw-principles__grid {
            grid-template-columns:
              minmax(0, 1fr);
            gap: 12px;
            margin-top: 32px;
          }

          .aw-principles__card {
            min-height: 0;
            padding: 26px;
          }

          .aw-principles__card h3 {
            margin: 18px 0 12px;
            font-size: 27px;
          }

          .aw-principles__card p {
            font-size: 13px;
          }

          .aw-work__hero {
            grid-template-rows:
              auto
              minmax(0, 1fr)
              auto
              auto;
            gap:
              clamp(12px, 2svh, 20px);
          }

          .aw-work__identity {
            gap: 6px 14px;
            font-size: 9px;
          }

          .aw-work__all {
            font-size: 9px;
          }

          .aw-work__art-stage {
            min-height:
              clamp(240px, 36svh, 480px);
          }

          .aw-art-svg,
          .aw-art-svg--episteme,
          .aw-art-svg--aetherion,
          .aw-art-svg--framework {
            width: min(100%, 580px);
            max-height: 480px;
          }

          .aw-work__heading-glass {
            width: 100%;
            padding: 22px;
          }

          .aw-work__heading-glass h2 {
            font-size:
              clamp(48px, 11vw, 76px);
            line-height: 1.04;
          }

          .aw-work--framework
            .aw-work__heading-glass h2 {
            font-size:
              clamp(42px, 10vw, 70px);
          }

          .aw-work__heading-glass p {
            margin-top: 12px;
            font-size: 14px;
          }

          .aw-work__hero-bottom {
            gap: 9px;
            padding: 14px 16px;
            font-size: 8px;
            letter-spacing: 0.07em;
          }

          .aw-work__description > p {
            margin: 22px 0 28px;
            font-size: 20px;
          }

          .aw-exhibition .aw-section-inner {
            gap: 26px;
          }

          .aw-exhibition__layout {
            gap: 15px;
          }

          .aw-exhibition__menu {
            grid-template-columns:
              minmax(0, 1fr);
            gap: 8px;
          }

          .aw-exhibition__menu-item {
            min-height: 67px;
            padding: 15px;
            border-radius: 16px;
          }

          .aw-exhibition__menu-name {
            font-size: 16px;
          }

          .aw-exhibition__panel {
            min-height: 0;
            padding: 25px;
          }

          .aw-exhibition__panel h4 {
            margin: 25px 0 15px;
            font-size:
              clamp(32px, 8vw, 49px);
          }

          .aw-exhibition__lead {
            font-size: 18px;
          }

          .aw-exhibition__body {
            font-size: 13px;
          }

          .aw-exhibition__point-grid {
            grid-template-columns:
              minmax(0, 1fr);
            margin-top: 25px;
          }

          .aw-exhibition__point {
            padding: 18px 0;
          }

          .aw-exhibition__question {
            margin-top: 25px;
            padding: 20px;
          }

          .aw-exhibition__question p {
            font-size: 19px;
          }

          .aw-pathway__layout {
            gap: 30px;
          }

          .aw-pathway__panel {
            padding: 23px;
          }

          .aw-pathway__trigger {
            min-height: 80px;
            gap: 10px;
          }

          .aw-pathway__trigger-copy strong {
            font-size: 19px;
          }

          .aw-pathway__detail {
            padding-left: 0;
          }

          .aw-detail-grid {
            grid-template-columns:
              minmax(0, 1fr);
            gap: 12px;
          }

          .aw-detail {
            min-height: 0;
            padding: 26px;
          }

          .aw-detail h4 {
            margin: 22px 0 14px;
            font-size: 25px;
          }

          .aw-detail p {
            font-size: 13px;
          }

          .aw-work__next {
            gap: 24px;
            padding: 25px;
          }

          .aw-work__next-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .aw-button {
            width: 100%;
            min-height: 53px;
            padding: 12px 18px;
            font-size: 9px;
          }

          .aw-system {
            padding: 25px;
          }

          .aw-system__flow {
            grid-template-columns:
              minmax(0, 1fr);
            gap: 8px;
          }

          .aw-system__node {
            padding: 18px 0;
          }

          .aw-system__node strong {
            margin-top: 10px;
            font-size: 35px;
          }

          .aw-system__arrow {
            text-align: left;
            transform: rotate(90deg);
            transform-origin: 12px 12px;
            margin: 3px 0;
          }

          .aw-system__return p {
            font-size: 19px;
          }

          .aw-collaboration__panel {
            padding: 25px;
          }

          .aw-collaboration__option {
            min-height: 61px;
            font-size: 13px;
          }

          .aw-footer__frame {
            align-items: flex-start;
            gap: 25px;
            padding: 25px;
          }
        }

        /* ==============================================
           SMALL MOBILE
        ============================================== */

        @media (max-width: 390px) {
          .aw {
            --aw-side: 9px;
          }

          .aw-opening__content h1 {
            font-size:
              clamp(43px, 10.8vw, 54px);
          }

          .aw-work__heading-glass {
            padding: 19px;
          }

          .aw-work__heading-glass h2 {
            font-size:
              clamp(42px, 10.4vw, 52px);
          }

          .aw-work--framework
            .aw-work__heading-glass h2 {
            font-size:
              clamp(36px, 9vw, 47px);
          }

          .aw-work__hero-bottom {
            align-items: flex-start;
            flex-direction: column;
          }

          .aw-exhibition__panel,
          .aw-pathway__panel {
            padding: 20px;
          }
        }

        /* ==============================================
           SHORT VIEWPORTS / LANDSCAPE
        ============================================== */

        @media (max-height: 650px) {
          .aw {
            --aw-block: 20px;
          }

          .aw-opening {
            gap: 18px;
          }

          .aw-opening__content {
            padding-block: 8px;
          }

          .aw-work__hero {
            gap: 12px;
          }

          .aw-work__art-stage {
            min-height: 210px;
          }

          .aw-art-svg {
            max-height: 360px;
          }

          .aw-work__heading-glass {
            padding: 19px 24px;
          }

          .aw-work__heading-glass h2 {
            font-size:
              clamp(40px, 5vw, 75px);
          }

          .aw-work__heading-glass p {
            margin-top: 9px;
          }
        }

        /* ==============================================
           REDUCED MOTION
        ============================================== */

        @media (
          prefers-reduced-motion: reduce
        ) {
          html:has(.aw) {
            scroll-behavior: auto;
          }

          .aw *,
          .aw *::before,
          .aw *::after {
            animation: none !important;
            transition: none !important;
          }

          .aw-reveal {
            opacity: 1 !important;
            transform: none !important;
          }
        }
          /* ==================================================
   OPENING / 01–03
   COMPACT CARDS + BORDER CLIPPING FIX
================================================== */

.aw-opening__index {
  gap: clamp(8px, 1vw, 14px);

  /* 上方向への移動で枠が切れないよう余白を確保 */
  padding-top: 5px;
  padding-bottom: 5px;
  overflow: visible;
}

.aw-opening__index-link {
  position: relative;

  grid-template-columns: 20px minmax(0, 1fr) 16px;

  min-height: 72px;
  gap: 10px;
  padding: 14px 18px;

  border-radius: 16px;
  overflow: visible;

  transform: translate3d(0, 0, 0);
}

.aw-opening__index-link strong {
  font-size: clamp(13px, 1.2vw, 18px);
}

.aw-opening__index-number {
  font-size: 9px;
}

.aw-opening__index-link .aw-arrow {
  width: 16px;
  height: 16px;
}

@media (hover: hover) {
  .aw-opening__index-link:hover {
    transform: translate3d(0, -2px, 0);
  }
}

.aw-opening__index-link:focus-visible {
  transform: translate3d(0, -2px, 0);
}

/* MOBILE */

@media (max-width: 760px) {
  .aw-opening__index {
    gap: 7px;
  }

  .aw-opening__index-link {
    grid-template-columns: 18px minmax(0, 1fr) 15px;

    min-height: 58px;
    gap: 10px;
    padding: 11px 14px;

    border-radius: 14px;
  }

  .aw-opening__index-link strong {
    font-size: 14px;
  }

  .aw-opening__index-link .aw-arrow {
    width: 15px;
    height: 15px;
  }
}
      `}</style>
    </main>
  );
}