"use client";

import { useId, useState } from "react";

/* ==========================================================
   ARCHENOVA / KNOWLEDGE INTEGRITY

   Research and Verification Architecture

   Responsibilities:
   - Scientific integrity content
   - Four integrity domains
   - Six verification gates
   - Accessible accordion interaction
   - Evidence boundary
   - Independent correction principles

   Styling:
   - All CSS is owned by app/globals.css
   - No styled-jsx
   - No inline styles
   - No frame generation

   No external storage dependency.
========================================================== */

type IntegrityDomain = {
  number: string;
  title: string;
  subtitle: string;
  principle: string;
  requirements: readonly string[];
  artifact: string;
  advancement: string;
};

const DOMAINS: readonly IntegrityDomain[] = [
  {
    number: "01",
    title: "Evidence Provenance",
    subtitle: "Traceability of Scientific Claims",
    principle:
      "Every consequential claim should be connected to identifiable observations, methods, sources, and responsible interpretations.",
    requirements: [
      "Identify primary sources and original observations.",
      "Distinguish measured results from model-based inference.",
      "Record authorship, methods, dates, and source versions.",
      "Identify missing evidence and unresolved contradictions.",
    ],
    artifact:
      "Evidence Record: claim, source, method, observation, interpretation, provenance, and limitations.",
    advancement:
      "A claim may advance when its supporting evidence can be independently located and critically examined.",
  },
  {
    number: "02",
    title: "Reproducibility",
    subtitle: "Independent Scientific Verification",
    principle:
      "A scientific result becomes more dependable when its methods, inputs, assumptions, and evaluation criteria permit independent examination and replication.",
    requirements: [
      "Publish sufficiently detailed procedures.",
      "Document input data, parameters, and model versions.",
      "Define reproducibility and acceptance criteria.",
      "Separate internal reproduction from independent replication.",
    ],
    artifact:
      "Reproducibility Package: procedures, inputs, computational environment, expected outputs, and known limitations.",
    advancement:
      "A result may advance when the claimed level of reproducibility is supported by documented testing.",
  },
  {
    number: "03",
    title: "Uncertainty & Limits",
    subtitle: "Scientific Boundaries of Knowledge",
    principle:
      "The reliability of knowledge depends on recognizing what has been measured, what remains uncertain, and where an explanation ceases to be justified.",
    requirements: [
      "Record measurement uncertainty and model assumptions.",
      "Identify competing hypotheses and alternative explanations.",
      "Define validity domains and extrapolation limits.",
      "Separate established results from speculative proposals.",
    ],
    artifact:
      "Uncertainty Register: assumptions, confidence limits, unresolved mechanisms, alternative explanations, and validity boundaries.",
    advancement:
      "A claim may advance only within the evidence-supported domain appropriate to its intended use.",
  },
  {
    number: "04",
    title: "Independent Correction",
    subtitle: "Accountability and Scientific Revision",
    principle:
      "Scientific and institutional authority must remain subject to challenge, correction, replacement, and withdrawal when evidence changes.",
    requirements: [
      "Maintain reviewable correction and revision records.",
      "Define procedures for challenging consequential claims.",
      "Preserve previous versions and reasons for changes.",
      "Withdraw unsupported claims and reassess dependent decisions.",
    ],
    artifact:
      "Correction Record: original claim, challenge, new evidence, decision, revision, and downstream consequences.",
    advancement:
      "Continued reliance requires that material errors can be detected, acknowledged, and corrected.",
  },
];

const VERIFICATION_GATES = [
  {
    number: "01",
    title: "IDENTIFICATION",
    description:
      "Identify the precise scientific or engineering claim.",
  },
  {
    number: "02",
    title: "PROVENANCE",
    description:
      "Establish the origin and traceability of evidence.",
  },
  {
    number: "03",
    title: "DISCRIMINATION",
    description:
      "Test whether evidence distinguishes competing explanations.",
  },
  {
    number: "04",
    title: "REPRODUCIBILITY",
    description:
      "Assess whether the claimed result can be reproduced.",
  },
  {
    number: "05",
    title: "INDEPENDENT REVIEW",
    description:
      "Enable examination beyond the original author or system.",
  },
  {
    number: "06",
    title: "CORRECTION",
    description:
      "Preserve the ability to revise or withdraw the claim.",
  },
] as const;

/* ==========================================================
   COMPONENT
========================================================== */

export default function ArcheNovaKnowledgeIntegrity() {
  const [openDomain, setOpenDomain] =
    useState<number | null>(null);

  const instanceId = useId().replace(/:/g, "");

  return (
    <section
      className="an-ki"
      aria-labelledby={`${instanceId}-title`}
    >
      {/* INTRODUCTION */}

  
      <header className="an-ki__header">

        <h2
          id={`${instanceId}-title`}
          className="an-ki__title"
        >
          Knowledge
          <span>Integrity.</span>
        </h2>

        <p className="an-ki__statement">
          Reality retains veto over every representation.
        </p>

        <p className="an-ki__description">
          A proposed scientific integrity architecture
          for connecting claims to evidence, evidence to
          reproducible methods, and scientific capability
          to independent correction.
        </p>

        <div className="an-ki__principle">
          <span>FOUNDATIONAL DISTINCTION</span>

          <strong>
            Reality ≠ Observation ≠ Measurement ≠ Model
            ≠ Prediction ≠ Verified Capability
          </strong>
        </div>
      </header>

      {/* FOUR INTEGRITY DOMAINS */}

      <div className="an-ki__section-heading">
        <span>THE FOUR INTEGRITY DOMAINS</span>
        <span>01 — 04</span>
      </div>

      <div className="an-ki__domains">
        {DOMAINS.map((domain, index) => {
          const expanded = openDomain === index;

          const panelId =
            `${instanceId}-domain-${domain.number}`;

          const triggerId =
            `${instanceId}-trigger-${domain.number}`;

          return (
            <article
              key={domain.number}
              className={[
                "an-ki__domain",
                expanded ? "is-open" : "",
              ].join(" ")}
            >
              <button
                id={triggerId}
                type="button"
                className="an-ki__domain-trigger"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() =>
                  setOpenDomain(
                    expanded ? null : index
                  )
                }
              >
                <span className="an-ki__number">
                  {domain.number}
                </span>

                <span className="an-ki__domain-heading">
                  <strong>{domain.title}</strong>
                  <small>{domain.subtitle}</small>
                </span>

                <span aria-hidden="true">
                  {expanded ? "−" : "+"}
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="an-ki__domain-panel"
                hidden={!expanded}
              >
                <p>{domain.principle}</p>

                <h4>ENGINEERING REQUIREMENTS</h4>

                <ul>
                  {domain.requirements.map(
                    (requirement) => (
                      <li key={requirement}>
                        {requirement}
                      </li>
                    )
                  )}
                </ul>

                <h4>REQUIRED ARTIFACT</h4>
                <p>{domain.artifact}</p>

                <h4>ADVANCEMENT GATE</h4>
                <p>{domain.advancement}</p>
              </div>
            </article>
          );
        })}
      </div>

      {/* SIX VERIFICATION GATES */}

      <div className="an-ki__section-heading an-ki__section-heading--gates">
        <span>SCIENTIFIC VERIFICATION PATHWAY</span>
        <span>01 — 06</span>
      </div>

      <div className="an-ki__gates">
        {VERIFICATION_GATES.map((gate) => (
          <div
            className="an-ki__gate"
            key={gate.number}
          >
            <span>{gate.number}</span>

            <strong>{gate.title}</strong>

            <p>{gate.description}</p>
          </div>
        ))}
      </div>

      {/* EVIDENCE BOUNDARY */}

      <div className="an-ki__boundary">
        <span>EVIDENCE BOUNDARY</span>

        <p>
          This framework defines proposed requirements
          for scientific integrity. It does not establish
          that any specific research claim, experiment,
          dataset, or operational system has passed
          independent verification.
        </p>
      </div>

      {/* FOOTER */}

      <footer className="an-ki__footer">
        <span>
          CLAIM → EVIDENCE → TEST → REVIEW → CORRECTION
        </span>

      </footer>
    </section>
  );
}