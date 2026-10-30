"use client";

import Image from "next/image";
import { useState } from "react";

const RELATIONS = [
  {
    id: "nations",
    number: "01",
    name: "Nations",
    role: "Sovereignty & Public Governance",
    description:
      "ArcheNova respects national sovereignty, applicable law, and the independent responsibilities of public institutions. Civilizational independence does not imply exemption from legal obligations.",
  },
  {
    id: "companies",
    number: "02",
    name: "Companies",
    role: "Innovation & Economic Systems",
    description:
      "Companies pursue their own commercial purposes. ArcheNova maintains a distinct civilizational purpose without requiring corporate ownership, control, or subordination.",
  },
  {
    id: "research",
    number: "03",
    name: "Research Institutions",
    role: "Scientific Discovery & Evidence",
    description:
      "Scientific claims remain open to independent testing, criticism, and revision. ArcheNova recognizes the autonomy of research institutions and the authority of reproducible evidence.",
  },
  {
    id: "organizations",
    number: "04",
    name: "International Organizations",
    role: "International Frameworks & Standards",
    description:
      "ArcheNova recognizes the distinct mandates of international organizations and the relevance of applicable standards, without claiming their authority or endorsement.",
  },
  {
    id: "society",
    number: "05",
    name: "Civil Society",
    role: "Pluralism & Participation",
    description:
      "Civil society retains its independent voices, values, and associations. Coexistence requires respect for diversity, freedom of inquiry, and the ability to challenge institutional claims.",
  },
  {
    id: "civilizations",
    number: "06",
    name: "Other Civilizations",
    role: "Distinct Futures & Continuity",
    description:
      "ArcheNova does not claim exclusive authority over civilization or its future. Different civilizations and emerging civilizational systems may pursue distinct paths while respecting one another.",
  },
] as const;

export default function CivilizationalRelationsPortal() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeRelation, setActiveRelation] =
    useState<string | null>(null);

  const selectedRelation = RELATIONS.find(
    (item) => item.id === activeRelation,
  );

  return (
    <section
      id="civilizational-relations"
      data-home-section
      data-home-chapter="relations"
      className="home-page an-home-2026__section an-relations-home"
      aria-labelledby="an-relations-home-title"
    >
      <div className="an-home-2026__glass an-relations-home__glass">
        <div className="an-relations-home__layout">
          <header className="an-relations-home__header">
            <p className="an-relations-home__eyebrow">
              ARCHENOVA / CIVILIZATIONAL RELATIONS
            </p>

            <h2
              id="an-relations-home-title"
              className="an-relations-home__title"
            >
              Independent by Design.
              <span>Coexistent by Principle.</span>
            </h2>

            <p className="an-relations-home__lead">
              ArcheNova is developing an independent
              scientific civilization with its own purpose,
              systems, and enduring principles.
            </p>

            <p className="an-relations-home__description">
              It seeks to coexist with nations, companies,
              institutions, civil society, and other
              civilizations—not to replace, govern,
              or subordinate them.
            </p>
          </header>

          <figure className="an-relations-home__figure">
            <div className="an-relations-home__image-wrap">
              <Image
                src="/images/civilizational-relations.jpeg"
                alt="Conceptual relationship diagram placing ArcheNova at the center, with coexistence connections to nations, companies, international organizations, research institutions, civil society, and other civilizations."
                width={1125}
                height={717}
                sizes="(max-width: 700px) 94vw, (max-width: 1200px) 90vw, 1100px"
                className="an-relations-home__image"
              />
            </div>

            <figcaption className="an-relations-home__caption">
              CONCEPTUAL COEXISTENCE FRAMEWORK
              <span>
                Independence without isolation.
                Coexistence without subordination.
              </span>
            </figcaption>
          </figure>

          <div className="an-relations-home__details">
            <button
              type="button"
              className="an-relations-home__details-trigger"
              aria-expanded={detailsOpen}
              aria-controls="an-relations-home-details-panel"
              onClick={() => {
                setDetailsOpen((current) => !current);
                setActiveRelation(null);
              }}
            >
              <span className="an-relations-home__details-copy">
                <small>SIX DISTINCT RELATIONSHIPS</small>
                <strong>Explore Coexistence</strong>
              </span>

              <span
                className="an-relations-home__symbol"
                aria-hidden="true"
              >
                {detailsOpen ? "−" : "+"}
              </span>
            </button>

            <div
              id="an-relations-home-details-panel"
              className="an-relations-home__details-panel"
              hidden={!detailsOpen}
            >
              <div className="an-relations-home__relations-grid">
                {RELATIONS.map((item) => {
                  const isActive = activeRelation === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={[
                        "an-relations-home__relation",
                        isActive ? "is-active" : "",
                      ].join(" ")}
                      aria-pressed={isActive}
                      onClick={() =>
                        setActiveRelation(
                          isActive ? null : item.id,
                        )
                      }
                    >
                      <span className="an-relations-home__relation-number">
                        {item.number}
                      </span>

                      <span className="an-relations-home__relation-copy">
                        <strong>{item.name}</strong>
                        <small>{item.role}</small>
                      </span>

                      <span aria-hidden="true">
                        {isActive ? "−" : "+"}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedRelation && (
                <div
                  className="an-relations-home__explanation"
                  role="status"
                >
                  <span>RELATIONSHIP PRINCIPLE</span>
                  <h3>{selectedRelation.name}</h3>
                  <p>{selectedRelation.description}</p>
                </div>
              )}

              <p className="an-relations-home__boundary">
                This framework expresses intended principles
                of coexistence. It does not imply formal
                partnerships, institutional endorsement,
                diplomatic recognition, or sovereign status.
              </p>
            </div>
          </div>

          <footer className="an-relations-home__footer">
            <span>SCIENTIFIC DISCOVERY</span>
            <span>RESPONSIBLE ENGINEERING</span>
            <span>ENDURING PRINCIPLES</span>
          </footer>
        </div>
      </div>
    </section>
  );
}