"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

type DailyExperienceFile = {
  current?: {
    title?: string;
    experienceTitle?: string;

    topicFingerprint?: string[];

    classification?: {
      category?: string;
      signalCategory?: string;
    };
  };
};

type ScienceItem = {
  source?: string;
  title?: string;
  url?: string;
  summary?: string;

  publishedAt?:
    string |
    null;

  ts?: number;
};

type ScienceFile = {
  items?: ScienceItem[];
};

type RelatedResearchItem =
  ScienceItem & {
    relevanceScore:
      number;
  };


/* ==========================================================
   RESEARCH SOURCE PRIORITY
========================================================== */

const RESEARCH_SOURCE_PRIORITY = [
  "APS Physical Review Letters",
  "APS PRL",
  "APS PRX",
  "APS PR Applied",

  "arXiv Physics",
  "arXiv Quantum",
  "arXiv AI",

  "Nature Communications",
  "Nature Energy",

  "Cell",
];


/* ==========================================================
   NORMALIZATION
========================================================== */

function normalize(
  value = "",
) {
  return value
    .toLowerCase()
    .replace(
      /[^a-z0-9\s-]/g,
      " ",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}


function tokenize(
  value = "",
) {
  return normalize(
    value,
  )
    .split(" ")
    .filter(
      (word) =>
        word.length >= 4,
    );
}


/* ==========================================================
   SOURCE PRIORITY SCORE
========================================================== */

function sourcePriority(
  source = "",
) {
  const index =
    RESEARCH_SOURCE_PRIORITY.findIndex(
      (item) =>
        item === source,
    );

  if (
    index === -1
  ) {
    return 0;
  }

  return (
    RESEARCH_SOURCE_PRIORITY.length -
    index
  );
}


/* ==========================================================
   RESEARCH SOURCE CHECK
========================================================== */

function isResearchSource(
  source = "",
) {
  const normalizedSource =
    source.toLowerCase();

  return [
    "aps",
    "arxiv",
    "nature",
    "cell",
  ].some(
    (name) =>
      normalizedSource.includes(
        name,
      ),
  );
}


/* ==========================================================
   RELEVANCE SCORE
========================================================== */

function scoreResearch(
  inquiryWords: string[],
  inquiryTopics: string[],
  item: ScienceItem,
) {
  const title =
    normalize(
      item.title || "",
    );

  const summary =
    normalize(
      item.summary || "",
    );

  const combined =
    `${title} ${summary}`;

  let score = 0;


  /*
   * Inquiry title /
   * classification match
   */
  inquiryWords.forEach(
    (word) => {
      if (
        title.includes(
          word,
        )
      ) {
        score += 5;
      } else if (
        summary.includes(
          word,
        )
      ) {
        score += 2;
      }
    },
  );


  /*
   * topicFingerprint match
   */
  inquiryTopics.forEach(
    (topic) => {
      const normalizedTopic =
        normalize(
          topic,
        );

      if (
        normalizedTopic &&
        combined.includes(
          normalizedTopic,
        )
      ) {
        score += 6;
      }

      tokenize(
        normalizedTopic,
      ).forEach(
        (word) => {
          if (
            title.includes(
              word,
            )
          ) {
            score += 3;
          } else if (
            summary.includes(
              word,
            )
          ) {
            score += 1;
          }
        },
      );
    },
  );


  /*
   * Reliable research-source boost
   */
  score +=
    sourcePriority(
      item.source,
    ) * 0.35;


  /*
   * Recency bonus
   */
  if (item.ts) {
    const ageDays =
      Math.max(
        0,
        (
          Date.now() -
          item.ts
        ) /
          86400000,
      );

    if (
      ageDays <= 7
    ) {
      score += 2;
    } else if (
      ageDays <= 30
    ) {
      score += 1;
    }
  }

  return score;
}


/* ==========================================================
   DATE
========================================================== */

function formatResearchDate(
  value?:
    string |
    null,
) {
  if (!value) {
    return "";
  }

  const date =
    new Date(
      value,
    );

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "";
  }

  return new Intl.DateTimeFormat(
    "en",
    {
      year:
        "numeric",

      month:
        "short",

      day:
        "numeric",
    },
  ).format(
    date,
  );
}


/* ==========================================================
   COMPONENT
========================================================== */

export default function TodaysInquiryResearch() {
  const router =
    useRouter();


  const [
    inquiry,
    setInquiry,
  ] =
    useState<
      DailyExperienceFile["current"] |
      null
    >(
      null,
    );


  const [
    science,
    setScience,
  ] =
    useState<
      ScienceItem[]
    >(
      [],
    );


  const [
    loading,
    setLoading,
  ] =
    useState(
      true,
    );


  const trackRef =
    useRef<
      HTMLDivElement |
      null
    >(
      null,
    );


  const pausedRef =
    useRef(
      false,
    );


  /* ==========================================================
     LOAD DATA
  ========================================================== */

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const [
          inquiryResponse,
          scienceResponse,
        ] =
          await Promise.all([
            fetch(
              "/data/experience/daily.json",
              {
                cache:
                  "no-store",
              },
            ),

            fetch(
              "/data/science.json",
              {
                cache:
                  "no-store",
              },
            ),
          ]);


        if (
          !inquiryResponse.ok ||
          !scienceResponse.ok
        ) {
          throw new Error(
            "Today's Inquiry research data could not be loaded.",
          );
        }


        const inquiryData =
          (
            await inquiryResponse.json()
          ) as
            DailyExperienceFile;


        const scienceData =
          (
            await scienceResponse.json()
          ) as
            ScienceFile;


        if (!active) {
          return;
        }


        setInquiry(
          inquiryData.current ??
            null,
        );


        setScience(
          Array.isArray(
            scienceData.items,
          )
            ? scienceData.items
            : [],
        );
      } catch (
        error
      ) {
        console.error(
          "[TodaysInquiryResearch] load error:",
          error,
        );
      } finally {
        if (
          active
        ) {
          setLoading(
            false,
          );
        }
      }
    }


    void load();


    return () => {
      active =
        false;
    };
  }, []);


  /* ==========================================================
     RELATED RESEARCH
  ========================================================== */

  const relatedResearch =
    useMemo<
      RelatedResearchItem[]
    >(
      () => {
        if (!inquiry) {
          return [];
        }


        const inquiryText =
          [
            inquiry.title,

            inquiry.experienceTitle,

            inquiry
              .classification
              ?.category,

            inquiry
              .classification
              ?.signalCategory,
          ]
            .filter(
              Boolean,
            )
            .join(
              " ",
            );


        const inquiryWords =
          tokenize(
            inquiryText,
          );


        const inquiryTopics =
          Array.isArray(
            inquiry.topicFingerprint,
          )
            ? inquiry.topicFingerprint
            : [];


        return science
          .filter(
            (
              item,
            ) =>
              item.title &&
              item.url &&
              isResearchSource(
                item.source,
              ),
          )

          .map(
            (
              item,
            ) => ({
              ...item,

              relevanceScore:
                scoreResearch(
                  inquiryWords,
                  inquiryTopics,
                  item,
                ),
            }),
          )

          /*
           * 関連度0でも候補を完全に消さない。
           * 上位研究を必ず表示できるようにする。
           */
          .sort(
            (
              a,
              b,
            ) =>
              b.relevanceScore -
                a.relevanceScore ||
              (
                b.ts ||
                0
              ) -
                (
                  a.ts ||
                  0
                ),
          )

          .slice(
            0,
            10,
          );
      },
      [
        inquiry,
        science,
      ],
    );


  /* ==========================================================
     AUTO SCROLL
  ========================================================== */

  useEffect(() => {
    const track =
      trackRef.current;


    if (
      !track ||
      relatedResearch.length <
        2
    ) {
      return;
    }


    const interval =
      window.setInterval(
        () => {
          if (
            pausedRef.current
          ) {
            return;
          }


          const cards =
            Array.from(
              track.querySelectorAll<HTMLElement>(
                ".ti-research-card",
              ),
            );


          if (
            cards.length === 0
          ) {
            return;
          }


          const firstCard =
            cards[0];


          const computed =
            window.getComputedStyle(
              track,
            );


          const gap =
            Number.parseFloat(
              computed.columnGap ||
                computed.gap ||
                "20",
            ) ||
            20;


          const step =
            firstCard.offsetWidth +
            gap;


          const maxScroll =
            track.scrollWidth -
            track.clientWidth;


          if (
            track.scrollLeft >=
            maxScroll - 8
          ) {
            track.scrollTo({
              left:
                0,

              behavior:
                "smooth",
            });

            return;
          }


          track.scrollBy({
            left:
              step,

            behavior:
              "smooth",
          });
        },
        4200,
      );


    return () => {
      window.clearInterval(
        interval,
      );
    };
  }, [
    relatedResearch,
  ]);


  /* ==========================================================
     MANUAL SCROLL
  ========================================================== */

  function scrollByCard(
    direction:
      -1 |
      1,
  ) {
    const track =
      trackRef.current;


    if (!track) {
      return;
    }


    const firstCard =
      track.querySelector<HTMLElement>(
        ".ti-research-card",
      );


    if (!firstCard) {
      return;
    }


    const computed =
      window.getComputedStyle(
        track,
      );


    const gap =
      Number.parseFloat(
        computed.columnGap ||
          computed.gap ||
          "20",
      ) ||
      20;


    track.scrollBy({
      left:
        direction *
        (
          firstCard.offsetWidth +
          gap
        ),

      behavior:
        "smooth",
    });
  }


  /* ==========================================================
     ENTER SIMULATION
  ========================================================== */

  function enterSimulation(
    item:
      RelatedResearchItem,
  ) {
    const params =
      new URLSearchParams();


    if (
      item.title
    ) {
      params.set(
        "title",
        item.title,
      );
    }


    if (
      item.source
    ) {
      params.set(
        "source",
        item.source,
      );
    }


    if (
      item.url
    ) {
      params.set(
        "url",
        item.url,
      );
    }


    if (
      item.summary
    ) {
      params.set(
        "summary",
        item.summary,
      );
    }


    if (
      item.publishedAt
    ) {
      params.set(
        "publishedAt",
        item.publishedAt,
      );
    }


    router.push(
      `/civilization-experience?${params.toString()}`,
    );
  }


  /* ==========================================================
     LOADING
  ========================================================== */

  if (
    loading
  ) {
    return (
      <section
        className="ti-research"
        aria-labelledby="ti-research-title"
      >
        <div className="ti-research__header">
          <div>
            <span>
              RELATED RESEARCH
            </span>

            <h2
              id="ti-research-title"
            >
              Research around
              today&apos;s inquiry.
            </h2>

            <p>
              Synchronizing
              related scientific
              research.
            </p>
          </div>
        </div>
      </section>
    );
  }


  /* ==========================================================
     EMPTY
  ========================================================== */

  if (
    relatedResearch.length ===
      0
  ) {
    return (
      <section
        className="ti-research"
        aria-labelledby="ti-research-title"
      >
        <div className="ti-research__header">
          <div>
            <span>
              RELATED RESEARCH
            </span>

            <h2
              id="ti-research-title"
            >
              Research around
              today&apos;s inquiry.
            </h2>

            <p>
              No related research
              is currently available
              from the indexed
              scientific sources.
            </p>
          </div>
        </div>
      </section>
    );
  }


  /* ==========================================================
     UI
  ========================================================== */

  return (
    <section
      className="ti-research"
      aria-labelledby="ti-research-title"
    >
      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="ti-research__header">
        <div>
          <span>
            RELATED RESEARCH
          </span>

          <h2
            id="ti-research-title"
          >
            Research around
            today&apos;s inquiry.
          </h2>

          <p>
            Scientific work
            surrounding the question
            selected by ArcheNova
            today.
          </p>
        </div>


        <div className="ti-research__controls">
          <button
            type="button"
            onClick={() =>
              scrollByCard(
                -1,
              )
            }
            aria-label="Previous research"
          >
            ←
          </button>


          <button
            type="button"
            onClick={() =>
              scrollByCard(
                1,
              )
            }
            aria-label="Next research"
          >
            →
          </button>
        </div>
      </div>


      {/* ==================================================
          CAROUSEL
      ================================================== */}

      <div
        ref={
          trackRef
        }
        className="ti-research__track"
        onMouseEnter={() => {
          pausedRef.current =
            true;
        }}
        onMouseLeave={() => {
          pausedRef.current =
            false;
        }}
        onFocus={() => {
          pausedRef.current =
            true;
        }}
        onBlur={() => {
          pausedRef.current =
            false;
        }}
        onTouchStart={() => {
          pausedRef.current =
            true;
        }}
        onTouchEnd={() => {
          window.setTimeout(
            () => {
              pausedRef.current =
                false;
            },
            1800,
          );
        }}
      >
        {relatedResearch.map(
          (
            item,
            index,
          ) => {
            const date =
              formatResearchDate(
                item.publishedAt,
              );


            return (
              <article
                key={
                  item.url ||
                  `${item.title}-${index}`
                }
                className="ti-research-card"
              >
                {/* ======================================
                    NUMBER
                ====================================== */}

                <div className="ti-research-card__index">
                  {String(
                    index +
                      1,
                  ).padStart(
                    2,
                    "0",
                  )}
                </div>


                {/* ======================================
                    CONTENT
                ====================================== */}

                <div className="ti-research-card__body">
                  <span className="ti-research-card__source">
                    {item.source ||
                      "Research"}
                  </span>


                  <h3>
                    {
                      item.title
                    }
                  </h3>


                  {item.summary && (
                    <p>
                      {
                        item.summary
                      }
                    </p>
                  )}
                </div>


                {/* ======================================
                    FOOTER
                ====================================== */}

                <footer className="ti-research-card__footer">
                  <span>
                    {date ||
                      "Scientific Research"}
                  </span>


                  <div className="ti-research-card__actions">
                    {/* ==================================
                        ORIGINAL PAPER
                    ================================== */}

                    {item.url && (
                      <a
                        href={
                          item.url
                        }
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Research

                        <span
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </a>
                    )}


                    {/* ==================================
                        CIVILIZATION EXPERIENCE
                    ================================== */}

                    <button
                      type="button"
                      className="ti-research-card__experience"
                      onClick={() =>
                        enterSimulation(
                          item,
                        )
                      }
                    >
                      <span>
                        Enter Simulation
                      </span>

                      <span
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </button>
                  </div>
                </footer>
              </article>
            );
          },
        )}
      </div>
    </section>
  );
}