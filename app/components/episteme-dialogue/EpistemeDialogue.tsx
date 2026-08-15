"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";


/* ==========================================================
   TYPES
========================================================== */

type DialogueMode =
  | "ask"
  | "explore"
  | "challenge"
  | "compare"
  | "simulate";


type SignalItem = {
  id:
    string;

  title:
    string;

  summary:
    string;

  category:
    string;

  source:
    string;

  url:
    string | null;

  level:
    string;

  publishedAt:
    string | null;
};


type DialogueMessage = {
  id:
    string;

  role:
    "user" |
    "episteme";

  mode:
    DialogueMode;

  text:
    string;

  createdAt:
    number;

  intelligence?:
    IntelligenceObject;
};


type IntelligenceObject = {
  interpretation:
    string;

  evidence:
    string;

  uncertainty:
    string;

  nextQuestions:
    string[];

  signalIds:
    string[];
};


type RawRecord =
  Record<
    string,
    unknown
  >;


/* ==========================================================
   MODES
========================================================== */

const MODES:
  readonly {
    id:
      DialogueMode;

    label:
      string;

    description:
      string;
  }[] = [
    {
      id:
        "ask",

      label:
        "Ask",

      description:
        "Ask Episteme directly.",
    },

    {
      id:
        "explore",

      label:
        "Explore",

      description:
        "Discover related signals and emerging connections.",
    },

    {
      id:
        "challenge",

      label:
        "Challenge",

      description:
        "Search for weaknesses, contradictions, and falsifiers.",
    },

    {
      id:
        "compare",

      label:
        "Compare",

      description:
        "Compare competing signals, systems, or trajectories.",
    },

    {
      id:
        "simulate",

      label:
        "Simulate",

      description:
        "Explore an explicit counterfactual scenario.",
    },
  ];


/* ==========================================================
   SUGGESTED QUESTIONS
========================================================== */

const SUGGESTIONS = [
  "What changed in civilization today?",
  "Which scientific signals matter most?",
  "What bottleneck may be migrating next?",
  "Challenge the strongest current conclusion.",
  "What becomes possible if a major constraint disappears?",
];


/* ==========================================================
   HELPERS
========================================================== */

function normalize(
  value:
    string,
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


function words(
  value:
    string,
) {
  return normalize(
    value,
  )
    .split(
      " ",
    )
    .filter(
      (
        item,
      ) =>
        item.length >=
        4,
    );
}


function stringValue(
  value:
    unknown,
) {
  return typeof value ===
    "string"
    ? value
    : "";
}


function firstString(
  object:
    RawRecord,

  keys:
    string[],
) {
  for (
    const key
    of keys
  ) {
    const value =
      stringValue(
        object[
          key
        ],
      );

    if (
      value.trim()
    ) {
      return value;
    }
  }

  return "";
}


function parseSignal(
  value:
    unknown,

  index:
    number,
): SignalItem | null {
  if (
    !value ||
    typeof value !==
      "object"
  ) {
    return null;
  }


  const record =
    value as RawRecord;


  const title =
    firstString(
      record,
      [
        "title",
        "name",
        "headline",
      ],
    );


  if (
    !title
  ) {
    return null;
  }


  const id =
    firstString(
      record,
      [
        "id",
        "slug",
      ],
    ) ||
    `signal-${index}`;


  const summary =
    firstString(
      record,
      [
        "summary",
        "description",
        "whyItMatters",
        "text",
      ],
    );


  const category =
    firstString(
      record,
      [
        "category",
        "domain",
        "signalCategory",
      ],
    ) ||
    "INTELLIGENCE";


  const source =
    firstString(
      record,
      [
        "source",
        "publisher",
      ],
    ) ||
    "ArcheNova";


  const url =
    firstString(
      record,
      [
        "sourceUrl",
        "url",
        "link",
      ],
    ) ||
    null;


  const level =
    firstString(
      record,
      [
        "level",
        "signalLevel",
        "state",
      ],
    ) ||
    "SIGNAL";


  const publishedAt =
    firstString(
      record,
      [
        "publishedAt",
        "updatedAt",
        "date",
      ],
    ) ||
    null;


  return {
    id,
    title,
    summary,
    category:
      category.toUpperCase(),

    source,
    url,
    level:
      level.toUpperCase(),

    publishedAt,
  };
}


function extractSignals(
  payload:
    unknown,
) {
  if (
    Array.isArray(
      payload,
    )
  ) {
    return payload
      .map(
        parseSignal,
      )
      .filter(
        (
          item,
        ): item is SignalItem =>
          item !==
          null,
      );
  }


  if (
    !payload ||
    typeof payload !==
      "object"
  ) {
    return [];
  }


  const record =
    payload as RawRecord;


  const candidates =
    [
      record.items,
      record.signals,
      record.data,
    ];


  for (
    const candidate
    of candidates
  ) {
    if (
      Array.isArray(
        candidate,
      )
    ) {
      return candidate
        .map(
          parseSignal,
        )
        .filter(
          (
            item,
          ): item is SignalItem =>
            item !==
            null,
        );
    }
  }


  return [];
}


function formatTime(
  timestamp:
    number,
) {
  return new Intl.DateTimeFormat(
    "en",
    {
      hour:
        "2-digit",

      minute:
        "2-digit",
    },
  ).format(
    timestamp,
  );
}


/* ==========================================================
   SIGNAL RELEVANCE
========================================================== */

function scoreSignal(
  query:
    string,

  signal:
    SignalItem,
) {
  const queryWords =
    words(
      query,
    );


  if (
    queryWords.length ===
      0
  ) {
    return 0;
  }


  const title =
    normalize(
      signal.title,
    );


  const summary =
    normalize(
      signal.summary,
    );


  const category =
    normalize(
      signal.category,
    );


  let score =
    0;


  queryWords.forEach(
    (
      word,
    ) => {
      if (
        title.includes(
          word,
        )
      ) {
        score +=
          6;
      }


      if (
        summary.includes(
          word,
        )
      ) {
        score +=
          3;
      }


      if (
        category.includes(
          word,
        )
      ) {
        score +=
          2;
      }
    },
  );


  return score;
}


/* ==========================================================
   PHASE 1 INTELLIGENCE ENGINE

   This deliberately does NOT pretend to be a frontier
   language model.

   It structures current indexed evidence and provides an
   orchestration layer that can later be replaced by a
   grounded Episteme backend.
========================================================== */

function buildIntelligence(
  query:
    string,

  mode:
    DialogueMode,

  signals:
    SignalItem[],
): IntelligenceObject {
  const ranked =
    [...signals]
      .map(
        (
          signal,
        ) => ({
          signal,

          score:
            scoreSignal(
              query,
              signal,
            ),
        }),
      )
      .sort(
        (
          a,
          b,
        ) =>
          b.score -
          a.score,
      );


  let relevant =
    ranked
      .filter(
        (
          item,
        ) =>
          item.score >
          0,
      )
      .slice(
        0,
        5,
      )
      .map(
        (
          item,
        ) =>
          item.signal,
      );


  if (
    relevant.length ===
      0
  ) {
    relevant =
      signals.slice(
        0,
        5,
      );
  }


  const lead =
    relevant[0];


  const evidence =
    relevant.length >
    0
      ? `${relevant.length} indexed intelligence signals are currently attached to this inquiry.`
      : "No matching indexed signal is currently available.";


  let interpretation =
    "";

  let uncertainty =
    "This is a structured interpretation of currently indexed ArcheNova intelligence, not a final statement about reality.";

  let nextQuestions:
    string[] =
    [];


  switch (
    mode
  ) {
    case "ask":
      interpretation =
        lead
          ? `The strongest currently indexed connection is “${lead.title}”. The available material suggests that the question should be examined through its observed evidence, causal interpretation, engineering consequences, and unresolved constraints rather than through a single headline.`
          : "The inquiry is valid, but the current indexed signal set does not yet support a strong synthesis.";

      nextQuestions =
        [
          "What evidence supports this interpretation?",
          "What remains unknown?",
          "Which bottleneck matters most?",
        ];

      break;


    case "explore":
      interpretation =
        relevant.length >
        0
          ? `Episteme finds ${relevant.length} potentially related signals. The useful next step is to inspect whether they represent one underlying transition or several superficially similar developments.`
          : "No sufficiently related indexed signal was found.";

      nextQuestions =
        [
          "Show the strongest related signal.",
          "What connects these developments?",
          "Which domain is changing fastest?",
        ];

      break;


    case "challenge":
      interpretation =
        lead
          ? `The current interpretation should remain provisional. A strong challenge would test whether the evidence behind “${lead.title}” survives independent measurement, alternative causal explanations, and conditions under which the claimed effect should disappear.`
          : "A falsification analysis requires a more specific claim or evidence object.";

      uncertainty =
        "Correlation, common assumptions, incomplete replication, model dependence, and measurement boundaries may weaken the apparent conclusion.";

      nextQuestions =
        [
          "What observation could falsify this?",
          "Which assumption is weakest?",
          "What contradictory evidence should be searched for?",
        ];

      break;


    case "compare": {
      const first =
        relevant[0];

      const second =
        relevant[1];


      interpretation =
        first &&
        second
          ? `The current comparison begins with “${first.title}” and “${second.title}”. They should be compared on evidence quality, causal mechanism, engineering maturity, scalability, uncertainty, and civilization-level consequence—not headline similarity alone.`
          : "A meaningful comparison requires at least two sufficiently related intelligence objects.";

      nextQuestions =
        [
          "Which has stronger evidence?",
          "Which is closer to engineering deployment?",
          "Where do their assumptions diverge?",
        ];

      break;
    }


    case "simulate":
      interpretation =
        lead
          ? `Treat the inquiry as a conditional scenario rather than a prediction. If the constraint represented by “${lead.title}” changes materially, the next task is to identify second-order effects and the next bottleneck that becomes scarce.`
          : "A useful simulation requires an explicit changed condition.";

      uncertainty =
        "Simulation is conditional reasoning. It is not an observed future and should remain separate from empirical evidence.";

      nextQuestions =
        [
          "What constraint moves next?",
          "What second-order effect appears?",
          "Which assumption dominates the scenario?",
        ];

      break;
  }


  return {
    interpretation,

    evidence,

    uncertainty,

    nextQuestions,

    signalIds:
      relevant.map(
        (
          signal,
        ) =>
          signal.id,
      ),
  };
}


/* ==========================================================
   COMPONENT
========================================================== */

export default function EpistemeDialogue() {
  const [
    mode,
    setMode,
  ] =
    useState<DialogueMode>(
      "ask",
    );


  const [
    query,
    setQuery,
  ] =
    useState(
      "",
    );


  const [
    signals,
    setSignals,
  ] =
    useState<
      SignalItem[]
    >(
      [],
    );


  const [
    loadingSignals,
    setLoadingSignals,
  ] =
    useState(
      true,
    );


  const [
    messages,
    setMessages,
  ] =
    useState<
      DialogueMessage[]
    >(
      [],
    );


  const [
    thinking,
    setThinking,
  ] =
    useState(
      false,
    );


  const [
    signalPanelOpen,
    setSignalPanelOpen,
  ] =
    useState(
      true,
    );


  const conversationRef =
    useRef<
      HTMLDivElement |
      null
    >(
      null,
    );


  /* ========================================================
     LOAD LIVE SIGNALS
  ======================================================== */

  useEffect(() => {
    let active =
      true;


    async function load() {
      try {
        const response =
          await fetch(
            "/data/signals.json",
            {
              cache:
                "no-store",
            },
          );


        if (
          !response.ok
        ) {
          throw new Error(
            `Signals request failed: ${response.status}`,
          );
        }


        const payload =
          await response.json();


        if (
          !active
        ) {
          return;
        }


        setSignals(
          extractSignals(
            payload,
          ),
        );
      } catch (
        error
      ) {
        console.error(
          "[EpistemeDialogue] signals:",
          error,
        );
      } finally {
        if (
          active
        ) {
          setLoadingSignals(
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


  /* ========================================================
     AUTO SCROLL
  ======================================================== */

  useEffect(() => {
    const element =
      conversationRef.current;


    if (
      !element
    ) {
      return;
    }


    element.scrollTo({
      top:
        element.scrollHeight,

      behavior:
        "smooth",
    });
  }, [
    messages,
    thinking,
  ]);


  /* ========================================================
     ACTIVE MODE
  ======================================================== */

  const activeMode =
    useMemo(
      () =>
        MODES.find(
          (
            item,
          ) =>
            item.id ===
            mode,
        ) ??
        MODES[0],
      [
        mode,
      ],
    );


  /* ========================================================
     SIGNAL LOOKUP
  ======================================================== */

  const signalMap =
    useMemo(
      () =>
        new Map(
          signals.map(
            (
              signal,
            ) => [
              signal.id,
              signal,
            ],
          ),
        ),
      [
        signals,
      ],
    );


  /* ========================================================
     ASK
  ======================================================== */

  function submitQuestion(
    value?:
      string,
  ) {
    const finalQuery =
      (
        value ??
        query
      ).trim();


    if (
      !finalQuery ||
      thinking
    ) {
      return;
    }


    const userMessage:
      DialogueMessage = {
        id:
          `user-${Date.now()}`,

        role:
          "user",

        mode,

        text:
          finalQuery,

        createdAt:
          Date.now(),
      };


    setMessages(
      (
        previous,
      ) => [
        ...previous,
        userMessage,
      ],
    );


    setQuery(
      "",
    );


    setThinking(
      true,
    );


    /*
     * Small deliberate latency creates a calm,
     * readable conversation transition.
     *
     * This is NOT pretending that a remote model
     * is reasoning.
     */

    window.setTimeout(
      () => {
        const intelligence =
          buildIntelligence(
            finalQuery,
            mode,
            signals,
          );


        const epistemeMessage:
          DialogueMessage = {
          id:
            `episteme-${Date.now()}`,

          role:
            "episteme",

          mode,

          text:
            intelligence
              .interpretation,

          intelligence,

          createdAt:
            Date.now(),
        };


        setMessages(
          (
            previous,
          ) => [
            ...previous,
            epistemeMessage,
          ],
        );


        setThinking(
          false,
        );
      },
      420,
    );
  }


  function submit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    submitQuestion();
  }


  /* ========================================================
     NEW THREAD
  ======================================================== */

  function newThread() {
    setMessages(
      [],
    );

    setQuery(
      "",
    );

    setMode(
      "ask",
    );
  }


  /* ========================================================
     UI
  ======================================================== */

  return (
    <section className="ep-dialogue">

      {/* ==================================================
          AMBIENT WORLD
      ================================================== */}

      <div
        className="ep-dialogue__ambient"
        aria-hidden="true"
      />

      <div
        className="ep-dialogue__grid"
        aria-hidden="true"
      />


      {/* ==================================================
          TOP BAR
      ================================================== */}

      <header className="ep-dialogue__top">

        <div className="ep-dialogue__brand">
          <span>
            ARCHENOVA
          </span>

          <strong>
            EPISTEME
          </strong>

          <small>
            CONVERSATIONAL INTELLIGENCE
          </small>
        </div>


        <div className="ep-dialogue__top-actions">

          <span className="ep-dialogue__live">
            <i />

            LIVE
          </span>


          <button
            type="button"
            className="ep-dialogue__new"
            onClick={
              newThread
            }
          >
            New Inquiry
          </button>

        </div>
      </header>


      {/* ==================================================
          WORKSPACE
      ================================================== */}

      <div
        className={[
          "ep-dialogue__workspace",

          signalPanelOpen
            ? "has-signals"
            : "",
        ].join(
          " ",
        )}
      >

        {/* =================================================
            CONVERSATION
        ================================================= */}

        <main className="ep-dialogue__conversation">

          <div
            ref={
              conversationRef
            }
            className="ep-dialogue__thread"
          >

            {/* =============================================
                EMPTY STATE
            ============================================= */}

            {messages.length ===
              0 && (
              <div className="ep-dialogue__welcome">

                <span className="ep-dialogue__welcome-label">
                  EPISTEME
                </span>


                <h1>
                  What do you want
                  <br />
                  to understand?
                </h1>


                <p>
                  Explore science,
                  technology, evidence,
                  and civilization through
                  dialogue.
                </p>


                <div className="ep-dialogue__suggestions">

                  {SUGGESTIONS.map(
                    (
                      suggestion,
                    ) => (
                      <button
                        key={
                          suggestion
                        }
                        type="button"
                        onClick={() => {
                          submitQuestion(
                            suggestion,
                          );
                        }}
                      >
                        <span>
                          {
                            suggestion
                          }
                        </span>

                        <span
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </button>
                    ),
                  )}

                </div>
              </div>
            )}


            {/* =============================================
                MESSAGES
            ============================================= */}

            {messages.map(
              (
                message,
              ) => {

                const attachedSignals =
                  message
                    .intelligence
                    ?.signalIds
                    .map(
                      (
                        id,
                      ) =>
                        signalMap.get(
                          id,
                        ),
                    )
                    .filter(
                      (
                        item,
                      ): item is SignalItem =>
                        Boolean(
                          item,
                        ),
                    ) ??
                  [];


                return (
                  <article
                    key={
                      message.id
                    }
                    className={[
                      "ep-message",

                      message.role ===
                        "user"
                        ? "ep-message--user"
                        : "ep-message--episteme",
                    ].join(
                      " ",
                    )}
                  >

                    <header>
                      <span>
                        {message.role ===
                        "user"
                          ? "YOU"
                          : "EPISTEME"}
                      </span>

                      <small>
                        {
                          message.mode
                            .toUpperCase()
                        }
                        {" · "}
                        {
                          formatTime(
                            message.createdAt,
                          )
                        }
                      </small>
                    </header>


                    <div className="ep-message__body">
                      <p>
                        {
                          message.text
                        }
                      </p>
                    </div>


                    {message.intelligence && (
                      <div className="ep-intelligence">

                        <div className="ep-intelligence__grid">

                          <section>
                            <span>
                              EVIDENCE STATE
                            </span>

                            <p>
                              {
                                message
                                  .intelligence
                                  .evidence
                              }
                            </p>
                          </section>


                          <section>
                            <span>
                              UNCERTAINTY
                            </span>

                            <p>
                              {
                                message
                                  .intelligence
                                  .uncertainty
                              }
                            </p>
                          </section>

                        </div>


                        {attachedSignals.length >
                          0 && (
                          <div className="ep-intelligence__signals">

                            <span className="ep-intelligence__label">
                              RELATED SIGNALS
                            </span>


                            {attachedSignals
                              .slice(
                                0,
                                3,
                              )
                              .map(
                                (
                                  signal,
                                ) => (
                                  <button
                                    key={
                                      signal.id
                                    }
                                    type="button"
                                    onClick={() => {
                                      setQuery(
                                        `Explain the significance of: ${signal.title}`,
                                      );

                                      setMode(
                                        "ask",
                                      );
                                    }}
                                  >
                                    <small>
                                      {
                                        signal.category
                                      }
                                    </small>

                                    <strong>
                                      {
                                        signal.title
                                      }
                                    </strong>

                                    <span>
                                      ASK →
                                    </span>
                                  </button>
                                ),
                              )}

                          </div>
                        )}


                        <div className="ep-intelligence__followups">

                          {message
                            .intelligence
                            .nextQuestions
                            .map(
                              (
                                question,
                              ) => (
                                <button
                                  key={
                                    question
                                  }
                                  type="button"
                                  onClick={() => {
                                    submitQuestion(
                                      question,
                                    );
                                  }}
                                >
                                  {
                                    question
                                  }

                                  <span>
                                    →
                                  </span>
                                </button>
                              ),
                            )}

                        </div>

                      </div>
                    )}

                  </article>
                );
              },
            )}


            {/* =============================================
                THINKING
            ============================================= */}

            {thinking && (
              <div className="ep-dialogue__thinking">
                <span />

                <span />

                <span />

                <small>
                  Structuring intelligence
                </small>
              </div>
            )}

          </div>


          {/* =================================================
              COMPOSER
          ================================================= */}

          <div className="ep-dialogue__composer-shell">

            <div className="ep-dialogue__modes">

              {MODES.map(
                (
                  item,
                ) => (
                  <button
                    key={
                      item.id
                    }
                    type="button"
                    title={
                      item.description
                    }
                    className={
                      mode ===
                      item.id
                        ? "is-active"
                        : ""
                    }
                    onClick={() => {
                      setMode(
                        item.id,
                      );
                    }}
                  >
                    {
                      item.label
                    }
                  </button>
                ),
              )}

            </div>


            <form
              className="ep-dialogue__composer"
              onSubmit={
                submit
              }
            >

              <textarea
                value={
                  query
                }
                rows={
                  1
                }
                placeholder={`${
                  activeMode.label
                } Episteme...`}
                onChange={(
                  event,
                ) => {
                  setQuery(
                    event
                      .target
                      .value,
                  );
                }}
                onKeyDown={(
                  event,
                ) => {
                  if (
                    event.key ===
                      "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();

                    submitQuestion();
                  }
                }}
                aria-label="Ask Episteme"
              />


              <button
                type="submit"
                disabled={
                  thinking ||
                  !query.trim()
                }
                aria-label="Send inquiry"
              >
                ↑
              </button>

            </form>


            <div className="ep-dialogue__composer-meta">

              <span>
                {
                  activeMode.description
                }
              </span>


              <button
                type="button"
                onClick={() => {
                  setSignalPanelOpen(
                    (
                      current,
                    ) =>
                      !current,
                  );
                }}
              >
                {signalPanelOpen
                  ? "Hide Live Signals"
                  : "Show Live Signals"}
              </button>

            </div>

          </div>

        </main>


        {/* =================================================
            X-LIKE LIVE INTELLIGENCE STREAM
        ================================================= */}

        {signalPanelOpen && (
          <aside className="ep-dialogue__signals">

            <header className="ep-dialogue__signals-head">

              <div>
                <span>
                  LIVE SIGNALS
                </span>

                <strong>
                  Civilization now.
                </strong>
              </div>


              <small>
                {
                  loadingSignals
                    ? "SYNC"
                    : `${signals.length} INDEXED`
                }
              </small>

            </header>


            <div className="ep-dialogue__signal-feed">

              {signals
                .slice(
                  0,
                  12,
                )
                .map(
                  (
                    signal,
                    index,
                  ) => (
                    <article
                      key={
                        signal.id
                      }
                      className="ep-signal"
                    >

                      <header>
                        <span>
                          <i />

                          {
                            signal.category
                          }
                        </span>

                        <small>
                          {index <
                          3
                            ? "NOW"
                            : signal.level}
                        </small>
                      </header>


                      <h3>
                        {
                          signal.title
                        }
                      </h3>


                      {signal.summary && (
                        <p>
                          {
                            signal.summary
                          }
                        </p>
                      )}


                      <footer>

                        <span>
                          {
                            signal.source
                          }
                        </span>


                        <div>

                          {signal.url && (
                            <a
                              href={
                                signal.url
                              }
                              target="_blank"
                              rel="noreferrer"
                            >
                              Source ↗
                            </a>
                          )}


                          <button
                            type="button"
                            onClick={() => {
                              setMode(
                                "ask",
                              );

                              setQuery(
                                `Explain why this signal matters: ${signal.title}`,
                              );
                            }}
                          >
                            Ask Episteme →
                          </button>

                        </div>

                      </footer>

                    </article>
                  ),
                )}

            </div>

          </aside>
        )}

      </div>


      {/* ==================================================
          CSS
      ================================================== */}

      <style jsx global>{`

        /* ==================================================
           PAGE
        ================================================== */

        .episteme-dialogue-page {
          width: 100% !important;
          max-width: none !important;

          min-height: 100dvh;

          margin: 0 !important;
          padding: 0 !important;

          overflow: hidden;

          background: #000;
        }


        /* ==================================================
           ROOT
        ================================================== */

        .ep-dialogue {
          position: relative;

          isolation: isolate;

          width: 100%;

          height: 100dvh;

          overflow: hidden;

          background:
            #000;

          color:
            rgba(
              248,
              250,
              252,
              0.94
            );
        }


        /* ==================================================
           ENVIRONMENT
        ================================================== */

        .ep-dialogue__ambient {
          position: absolute;

          inset: 0;

          z-index: -3;

          pointer-events: none;

          background:
            radial-gradient(
              circle
              at
              50%
              -10%,
              rgba(
                180,
                220,
                245,
                0.07
              ),
              transparent
              36%
            ),

            radial-gradient(
              circle
              at
              100%
              50%,
              rgba(
                110,
                160,
                200,
                0.035
              ),
              transparent
              34%
            ),

            #000;
        }


        .ep-dialogue__grid {
          position: absolute;

          inset: 0;

          z-index: -2;

          opacity: 0.12;

          pointer-events: none;

          background-image:
            linear-gradient(
              rgba(
                255,
                255,
                255,
                0.025
              )
              1px,
              transparent
              1px
            ),

            linear-gradient(
              90deg,
              rgba(
                255,
                255,
                255,
                0.025
              )
              1px,
              transparent
              1px
            );

          background-size:
            72px
            72px;

          mask-image:
            radial-gradient(
              ellipse
              at center,
              black,
              transparent
              90%
            );

          -webkit-mask-image:
            radial-gradient(
              ellipse
              at center,
              black,
              transparent
              90%
            );
        }


        /* ==================================================
           TOP
        ================================================== */

        .ep-dialogue__top {
          position: relative;

          z-index: 20;

          height: 78px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          padding:
            0
            clamp(
              22px,
              4vw,
              48px
            );

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          background:
            rgba(
              0,
              0,
              0,
              0.35
            );

          -webkit-backdrop-filter:
            blur(24px);

          backdrop-filter:
            blur(24px);
        }


        .ep-dialogue__brand {
          display: flex;

          align-items:
            baseline;

          gap: 12px;
        }


        .ep-dialogue__brand
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size: 6px;

          font-weight: 650;

          letter-spacing:
            0.2em;
        }


        .ep-dialogue__brand
        > strong {
          color:
            rgba(
              249,
              251,
              252,
              0.96
            );

          font-size: 14px;

          font-weight: 460;

          letter-spacing:
            0.08em;
        }


        .ep-dialogue__brand
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size: 6px;

          letter-spacing:
            0.14em;
        }


        .ep-dialogue__top-actions {
          display: flex;

          align-items: center;

          gap: 14px;
        }


        .ep-dialogue__live {
          display: inline-flex;

          align-items: center;

          gap: 7px;

          color:
            rgba(
              255,
              255,
              255,
              0.34
            );

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.16em;
        }


        .ep-dialogue__live i {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            rgba(
              137,
              240,
              193,
              0.82
            );

          box-shadow:
            0
            0
            12px
            rgba(
              137,
              240,
              193,
              0.36
            );
        }


        .ep-dialogue__new {
          min-height: 35px;

          padding:
            0
            13px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.08
            );

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              0.025
            );

          color:
            rgba(
              255,
              255,
              255,
              0.55
            );

          font: inherit;

          font-size: 7px;

          letter-spacing:
            0.1em;

          cursor: pointer;

          -webkit-backdrop-filter:
            blur(14px);

          backdrop-filter:
            blur(14px);
        }


        /* ==================================================
           WORKSPACE
        ================================================== */

        .ep-dialogue__workspace {
          height:
            calc(
              100dvh -
              78px
            );

          display: grid;

          grid-template-columns:
            minmax(
              0,
              1fr
            );

          overflow: hidden;
        }


        .ep-dialogue__workspace.has-signals {
          grid-template-columns:
            minmax(
              0,
              1fr
            )
            minmax(
              310px,
              390px
            );
        }


        /* ==================================================
           CONVERSATION
        ================================================== */

        .ep-dialogue__conversation {
          position: relative;

          min-width: 0;

          height: 100%;

          display: grid;

          grid-template-rows:
            minmax(
              0,
              1fr
            )
            auto;

          overflow: hidden;
        }


        .ep-dialogue__thread {
          min-height: 0;

          overflow-y: auto;

          overscroll-behavior:
            contain;

          padding:
            clamp(
              34px,
              5vw,
              70px
            )
            clamp(
              20px,
              6vw,
              90px
            )
            42px;

          scrollbar-width:
            thin;

          scrollbar-color:
            rgba(
              255,
              255,
              255,
              0.1
            )
            transparent;
        }


        /* ==================================================
           WELCOME
        ================================================== */

        .ep-dialogue__welcome {
          width:
            min(
              760px,
              100%
            );

          min-height: 100%;

          display: flex;

          flex-direction: column;

          justify-content: center;

          margin:
            0 auto;

          padding:
            40px
            0
            80px;

          text-align: center;
        }


        .ep-dialogue__welcome-label {
          color:
            rgba(
              190,
              223,
              240,
              0.48
            );

          font-size: 7px;

          font-weight: 650;

          letter-spacing:
            0.26em;
        }


        .ep-dialogue__welcome h1 {
          margin:
            23px
            0
            0;

          color:
            rgba(
              249,
              251,
              252,
              0.97
            );

          font-size:
            clamp(
              44px,
              6vw,
              74px
            );

          font-weight: 260;

          line-height: 0.97;

          letter-spacing:
            -0.055em;
        }


        .ep-dialogue__welcome p {
          max-width: 470px;

          margin:
            27px
            auto
            0;

          color:
            rgba(
              220,
              230,
              236,
              0.45
            );

          font-size: 12px;

          line-height: 1.75;
        }


        /* ==================================================
           SUGGESTIONS
        ================================================== */

        .ep-dialogue__suggestions {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(
                0,
                1fr
              )
            );

          gap: 9px;

          width:
            min(
              660px,
              100%
            );

          margin:
            38px
            auto
            0;
        }


        .ep-dialogue__suggestions
        button {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 18px;

          min-height: 58px;

          padding:
            13px
            16px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.07
            );

          border-radius:
            17px;

          background:
            rgba(
              255,
              255,
              255,
              0.018
            );

          color:
            rgba(
              235,
              241,
              245,
              0.55
            );

          -webkit-backdrop-filter:
            blur(16px);

          backdrop-filter:
            blur(16px);

          font: inherit;

          font-size: 9px;

          line-height: 1.5;

          text-align: left;

          cursor: pointer;

          transition:
            border-color
            0.3s ease,

            background
            0.3s ease,

            color
            0.3s ease;
        }


        .ep-dialogue__suggestions
        button:hover {
          border-color:
            rgba(
              180,
              225,
              245,
              0.15
            );

          background:
            rgba(
              180,
              225,
              245,
              0.035
            );

          color:
            rgba(
              255,
              255,
              255,
              0.82
            );
        }


        /* ==================================================
           MESSAGE
        ================================================== */

        .ep-message {
          width:
            min(
              790px,
              100%
            );

          margin:
            0
            auto;

          padding:
            28px
            0;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );
        }


        .ep-message header {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 20px;
        }


        .ep-message header
        > span {
          color:
            rgba(
              190,
              222,
              239,
              0.48
            );

          font-size: 7px;

          font-weight: 650;

          letter-spacing:
            0.18em;
        }


        .ep-message--user
        header > span {
          color:
            rgba(
              255,
              255,
              255,
              0.3
            );
        }


        .ep-message header
        small {
          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 6px;

          letter-spacing:
            0.12em;
        }


        .ep-message__body p {
          margin:
            17px
            0
            0;

          color:
            rgba(
              239,
              244,
              247,
              0.75
            );

          font-size:
            clamp(
              14px,
              1.6vw,
              17px
            );

          font-weight: 380;

          line-height: 1.75;

          letter-spacing:
            -0.01em;
        }


        .ep-message--user
        .ep-message__body p {
          color:
            rgba(
              255,
              255,
              255,
              0.53
            );
        }


        /* ==================================================
           INTELLIGENCE OBJECT
        ================================================== */

        .ep-intelligence {
          margin-top: 25px;
        }


        .ep-intelligence__grid {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(
                0,
                1fr
              )
            );

          gap: 1px;

          overflow: hidden;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-radius: 18px;

          background:
            rgba(
              255,
              255,
              255,
              0.05
            );
        }


        .ep-intelligence__grid
        section {
          padding: 18px;

          background:
            rgba(
              3,
              5,
              7,
              0.72
            );
        }


        .ep-intelligence__grid
        section > span,
        .ep-intelligence__label {
          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font-size: 6px;

          font-weight: 650;

          letter-spacing:
            0.17em;
        }


        .ep-intelligence__grid p {
          margin:
            10px
            0
            0;

          color:
            rgba(
              220,
              230,
              235,
              0.48
            );

          font-size: 9px;

          line-height: 1.7;
        }


        /* ==================================================
           ATTACHED SIGNALS
        ================================================== */

        .ep-intelligence__signals {
          display: grid;

          gap: 8px;

          margin-top: 18px;
        }


        .ep-intelligence__signals
        > button {
          display: grid;

          grid-template-columns:
            90px
            minmax(
              0,
              1fr
            )
            auto;

          align-items: center;

          gap: 12px;

          width: 100%;

          padding:
            13px
            14px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-radius: 14px;

          background:
            rgba(
              255,
              255,
              255,
              0.015
            );

          color: inherit;

          font: inherit;

          text-align: left;

          cursor: pointer;
        }


        .ep-intelligence__signals
        button small {
          color:
            rgba(
              190,
              220,
              235,
              0.38
            );

          font-size: 5px;

          letter-spacing:
            0.14em;
        }


        .ep-intelligence__signals
        button strong {
          overflow: hidden;

          color:
            rgba(
              245,
              248,
              250,
              0.66
            );

          font-size: 9px;

          font-weight: 430;

          text-overflow:
            ellipsis;

          white-space: nowrap;
        }


        .ep-intelligence__signals
        button > span {
          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          font-size: 6px;
        }


        /* ==================================================
           FOLLOWUPS
        ================================================== */

        .ep-intelligence__followups {
          margin-top: 16px;

          border-top:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );
        }


        .ep-intelligence__followups
        button {
          width: 100%;

          display: flex;

          justify-content:
            space-between;

          gap: 15px;

          padding:
            12px
            0;

          border: 0;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.035
            );

          background:
            transparent;

          color:
            rgba(
              220,
              230,
              236,
              0.4
            );

          font: inherit;

          font-size: 8px;

          text-align: left;

          cursor: pointer;

          transition:
            color
            0.25s ease;
        }


        .ep-intelligence__followups
        button:hover {
          color:
            rgba(
              255,
              255,
              255,
              0.78
            );
        }


        /* ==================================================
           THINKING
        ================================================== */

        .ep-dialogue__thinking {
          width:
            min(
              790px,
              100%
            );

          display: flex;

          align-items: center;

          gap: 6px;

          margin:
            0
            auto;

          padding:
            26px
            0;
        }


        .ep-dialogue__thinking
        > span {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              190,
              224,
              240,
              0.5
            );

          animation:
            epThinking
            1.25s
            ease-in-out
            infinite;
        }


        .ep-dialogue__thinking
        > span:nth-child(2) {
          animation-delay:
            0.12s;
        }


        .ep-dialogue__thinking
        > span:nth-child(3) {
          animation-delay:
            0.24s;
        }


        .ep-dialogue__thinking
        small {
          margin-left: 7px;

          color:
            rgba(
              255,
              255,
              255,
              0.24
            );

          font-size: 6px;

          letter-spacing:
            0.12em;
        }


        @keyframes epThinking {
          0%,
          100% {
            opacity: 0.2;

            transform:
              translateY(
                0
              );
          }

          50% {
            opacity: 1;

            transform:
              translateY(
                -3px
              );
          }
        }


        /* ==================================================
           COMPOSER AREA
        ================================================== */

        .ep-dialogue__composer-shell {
          position: relative;

          z-index: 30;

          padding:
            10px
            clamp(
              18px,
              6vw,
              90px
            )
            max(
              18px,
              env(
                safe-area-inset-bottom
              )
            );

          background:
            linear-gradient(
              to top,
              rgba(
                0,
                0,
                0,
                0.98
              )
              52%,
              rgba(
                0,
                0,
                0,
                0.72
              ),
              transparent
            );
        }


        .ep-dialogue__modes {
          width:
            min(
              790px,
              100%
            );

          display: flex;

          gap: 6px;

          margin:
            0
            auto
            9px;

          overflow-x: auto;

          scrollbar-width: none;
        }


        .ep-dialogue__modes::-webkit-scrollbar {
          display: none;
        }


        .ep-dialogue__modes
        button {
          flex:
            0
            0
            auto;

          padding:
            7px
            11px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          border-radius:
            999px;

          background:
            rgba(
              255,
              255,
              255,
              0.018
            );

          color:
            rgba(
              255,
              255,
              255,
              0.3
            );

          font: inherit;

          font-size: 6px;

          font-weight: 600;

          letter-spacing:
            0.1em;

          cursor: pointer;
        }


        .ep-dialogue__modes
        button.is-active {
          border-color:
            rgba(
              190,
              225,
              240,
              0.14
            );

          background:
            rgba(
              190,
              225,
              240,
              0.055
            );

          color:
            rgba(
              240,
              247,
              250,
              0.75
            );
        }


        /* ==================================================
           COMPOSER
        ================================================== */

        .ep-dialogue__composer {
          width:
            min(
              790px,
              100%
            );

          display: grid;

          grid-template-columns:
            minmax(
              0,
              1fr
            )
            auto;

          align-items:
            end;

          gap: 10px;

          margin:
            0
            auto;

          padding:
            8px
            8px
            8px
            18px;

          border:
            1px solid
            rgba(
              255,
              255,
              255,
              0.09
            );

          border-radius:
            21px;

          background:
            linear-gradient(
              145deg,
              rgba(
                19,
                21,
                24,
                0.72
              ),
              rgba(
                5,
                6,
                8,
                0.78
              )
            );

          -webkit-backdrop-filter:
            blur(26px)
            saturate(115%);

          backdrop-filter:
            blur(26px)
            saturate(115%);

          box-shadow:
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              0.045
            ),
            0
            18px
            55px
            rgba(
              0,
              0,
              0,
              0.3
            );
        }


        .ep-dialogue__composer
        textarea {
          width: 100%;

          max-height: 130px;

          resize: none;

          overflow-y: auto;

          padding:
            9px
            0;

          border: 0;

          outline: 0;

          background:
            transparent;

          color:
            rgba(
              248,
              250,
              252,
              0.9
            );

          font:
            inherit;

          font-size: 11px;

          line-height: 1.55;
        }


        .ep-dialogue__composer
        textarea::placeholder {
          color:
            rgba(
              255,
              255,
              255,
              0.23
            );
        }


        .ep-dialogue__composer
        > button {
          width: 38px;
          height: 38px;

          display: grid;

          place-items: center;

          border: 0;

          border-radius:
            13px;

          background:
            rgba(
              245,
              248,
              250,
              0.92
            );

          color:
            rgba(
              0,
              0,
              0,
              0.9
            );

          font-size: 15px;

          cursor: pointer;

          transition:
            opacity
            0.25s ease;
        }


        .ep-dialogue__composer
        > button:disabled {
          opacity: 0.2;

          cursor: default;
        }


        .ep-dialogue__composer-meta {
          width:
            min(
              790px,
              100%
            );

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 18px;

          margin:
            7px
            auto
            0;

          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 5px;

          letter-spacing:
            0.08em;
        }


        .ep-dialogue__composer-meta
        button {
          border: 0;

          background:
            transparent;

          color:
            rgba(
              255,
              255,
              255,
              0.28
            );

          font: inherit;

          cursor: pointer;
        }


        /* ==================================================
           LIVE SIGNAL PANEL
        ================================================== */

        .ep-dialogue__signals {
          min-width: 0;

          height: 100%;

          overflow: hidden;

          border-left:
            1px solid
            rgba(
              255,
              255,
              255,
              0.055
            );

          background:
            rgba(
              2,
              4,
              6,
              0.5
            );

          -webkit-backdrop-filter:
            blur(26px);

          backdrop-filter:
            blur(26px);
        }


        .ep-dialogue__signals-head {
          height: 86px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 16px;

          padding:
            0
            20px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.05
            );
        }


        .ep-dialogue__signals-head
        > div {
          display: flex;

          flex-direction: column;

          gap: 6px;
        }


        .ep-dialogue__signals-head
        span {
          color:
            rgba(
              190,
              222,
              238,
              0.42
            );

          font-size: 6px;

          font-weight: 650;

          letter-spacing:
            0.18em;
        }


        .ep-dialogue__signals-head
        strong {
          color:
            rgba(
              246,
              249,
              251,
              0.7
            );

          font-size: 12px;

          font-weight: 410;
        }


        .ep-dialogue__signals-head
        > small {
          color:
            rgba(
              255,
              255,
              255,
              0.22
            );

          font-size: 5px;

          letter-spacing:
            0.12em;
        }


        .ep-dialogue__signal-feed {
          height:
            calc(
              100% -
              86px
            );

          overflow-y: auto;

          overscroll-behavior:
            contain;

          scrollbar-width:
            none;
        }


        .ep-dialogue__signal-feed::-webkit-scrollbar {
          display: none;
        }


        /* ==================================================
           SIGNAL / X-LIKE POST
        ================================================== */

        .ep-signal {
          padding:
            20px;

          border-bottom:
            1px solid
            rgba(
              255,
              255,
              255,
              0.045
            );

          transition:
            background
            0.25s ease;
        }


        .ep-signal:hover {
          background:
            rgba(
              255,
              255,
              255,
              0.018
            );
        }


        .ep-signal header {
          display: flex;

          align-items: center;

          justify-content:
            space-between;

          gap: 12px;
        }


        .ep-signal header
        > span {
          display: flex;

          align-items: center;

          gap: 7px;

          color:
            rgba(
              190,
              220,
              235,
              0.4
            );

          font-size: 5px;

          font-weight: 650;

          letter-spacing:
            0.14em;
        }


        .ep-signal header
        i {
          width: 4px;
          height: 4px;

          border-radius: 50%;

          background:
            rgba(
              145,
              225,
              190,
              0.72
            );
        }


        .ep-signal header
        small {
          color:
            rgba(
              255,
              255,
              255,
              0.18
            );

          font-size: 5px;

          letter-spacing:
            0.1em;
        }


        .ep-signal h3 {
          margin:
            13px
            0
            0;

          color:
            rgba(
              244,
              248,
              250,
              0.76
            );

          font-size: 12px;

          font-weight: 430;

          line-height: 1.45;

          letter-spacing:
            -0.01em;
        }


        .ep-signal p {
          display:
            -webkit-box;

          margin:
            10px
            0
            0;

          overflow: hidden;

          color:
            rgba(
              215,
              225,
              231,
              0.38
            );

          font-size: 8px;

          line-height: 1.65;

          -webkit-box-orient:
            vertical;

          -webkit-line-clamp:
            3;
        }


        .ep-signal footer {
          display: flex;

          align-items:
            flex-end;

          justify-content:
            space-between;

          gap: 12px;

          margin-top: 15px;
        }


        .ep-signal footer
        > span {
          color:
            rgba(
              255,
              255,
              255,
              0.2
            );

          font-size: 5px;
        }


        .ep-signal footer
        > div {
          display: flex;

          align-items: center;

          gap: 10px;
        }


        .ep-signal footer
        a,
        .ep-signal footer
        button {
          padding: 0;

          border: 0;

          background:
            transparent;

          color:
            rgba(
              190,
              220,
              235,
              0.34
            );

          font: inherit;

          font-size: 5px;

          text-decoration:
            none;

          cursor: pointer;
        }


        .ep-signal footer
        a::after {
          display:
            none !important;
        }


        /* ==================================================
           TABLET
        ================================================== */

        @media (
          max-width: 1050px
        ) {

          .ep-dialogue__workspace.has-signals {
            grid-template-columns:
              minmax(
                0,
                1fr
              )
              320px;
          }


          .ep-dialogue__thread {
            padding-left:
              30px;

            padding-right:
              30px;
          }


          .ep-dialogue__composer-shell {
            padding-left:
              30px;

            padding-right:
              30px;
          }
        }


        /* ==================================================
           MOBILE
        ================================================== */

        @media (
          max-width: 768px
        ) {

          .ep-dialogue {
            height:
              100dvh;
          }


          .ep-dialogue__top {
            height: 64px;

            padding:
              0
              14px;
          }


          .ep-dialogue__brand
          > span,
          .ep-dialogue__brand
          > small {
            display: none;
          }


          .ep-dialogue__brand
          > strong {
            font-size: 12px;
          }


          .ep-dialogue__new {
            min-height: 32px;

            padding:
              0
              11px;

            font-size: 6px;
          }


          .ep-dialogue__workspace,
          .ep-dialogue__workspace.has-signals {
            height:
              calc(
                100dvh -
                64px
              );

            display: block;
          }


          .ep-dialogue__conversation {
            height: 100%;
          }


          .ep-dialogue__signals {
            position: absolute;

            inset:
              64px
              0
              0
              0;

            z-index: 100;

            height:
              calc(
                100dvh -
                64px
              );

            border-left: 0;

            background:
              rgba(
                0,
                0,
                0,
                0.88
              );

            -webkit-backdrop-filter:
              blur(30px);

            backdrop-filter:
              blur(30px);
          }


          .ep-dialogue__thread {
            padding:
              24px
              17px
              30px;
          }


          .ep-dialogue__welcome {
            padding:
              26px
              0
              60px;
          }


          .ep-dialogue__welcome h1 {
            font-size:
              clamp(
                40px,
                12.5vw,
                56px
              );
          }


          .ep-dialogue__welcome p {
            max-width: 300px;

            font-size: 10px;
          }


          .ep-dialogue__suggestions {
            grid-template-columns:
              1fr;

            margin-top: 29px;
          }


          .ep-dialogue__suggestions
          button {
            min-height: 52px;
          }


          .ep-message {
            padding:
              23px
              0;
          }


          .ep-message__body p {
            font-size: 13px;
          }


          .ep-intelligence__grid {
            grid-template-columns:
              1fr;
          }


          .ep-intelligence__signals
          > button {
            grid-template-columns:
              minmax(
                0,
                1fr
              )
              auto;
          }


          .ep-intelligence__signals
          button small {
            display: none;
          }


          .ep-dialogue__composer-shell {
            padding:
              8px
              13px
              max(
                10px,
                env(
                  safe-area-inset-bottom
                )
              );
          }


          .ep-dialogue__composer {
            border-radius: 19px;
          }


          .ep-dialogue__composer-meta
          > span {
            max-width: 65%;

            overflow: hidden;

            text-overflow:
              ellipsis;

            white-space:
              nowrap;
          }

        }


        /* ==================================================
           SMALL MOBILE
        ================================================== */

        @media (
          max-width: 430px
        ) {

          .ep-dialogue__live {
            display: none;
          }


          .ep-dialogue__welcome h1 {
            font-size:
              clamp(
                37px,
                12vw,
                49px
              );
          }

        }


        /* ==================================================
           REDUCED MOTION
        ================================================== */

        @media (
          prefers-reduced-motion:
          reduce
        ) {

          .ep-dialogue *,
          .ep-dialogue *::before,
          .ep-dialogue *::after {
            animation:
              none !important;

            transition:
              none !important;

            scroll-behavior:
              auto !important;
          }

        }

        /* ==========================================================
   EPISTEME DIALOGUE
   MOBILE — KEEP ASK ALWAYS VISIBLE
========================================================== */

@media (max-width: 768px) {

  /*
   * 会話本体を常に表示
   */
  .ep-dialogue__conversation {
    position: relative !important;

    display: grid !important;

    grid-template-rows:
      minmax(0, 1fr)
      auto !important;

    width: 100% !important;
    height: 100% !important;

    overflow: hidden !important;
  }


  /*
   * Thread側だけをスクロール
   * Ask composerは固定領域に残す
   */
  .ep-dialogue__thread {
    min-height: 0 !important;

    overflow-y: auto !important;
    overflow-x: hidden !important;

    padding:
      24px
      17px
      170px !important;

    -webkit-overflow-scrolling: touch;
  }


  /*
   * ASKエリアを常に画面下部へ表示
   */
  .ep-dialogue__composer-shell {
    position: absolute !important;

    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;

    z-index: 220 !important;

    width: 100% !important;

    padding:
      10px
      13px
      max(
        12px,
        env(safe-area-inset-bottom)
      ) !important;

    background:
      linear-gradient(
        to top,
        rgba(0, 0, 0, 0.99) 58%,
        rgba(0, 0, 0, 0.9) 76%,
        rgba(0, 0, 0, 0.5) 90%,
        transparent
      ) !important;

    pointer-events: auto !important;
  }


  /*
   * モード選択もAskの上に常時表示
   */
  .ep-dialogue__modes {
    display: flex !important;

    width: 100% !important;

    margin:
      0
      0
      8px !important;

    padding:
      0
      2px !important;

    gap: 6px !important;

    overflow-x: auto !important;

    scrollbar-width: none;
  }

  .ep-dialogue__modes::-webkit-scrollbar {
    display: none;
  }


  .ep-dialogue__modes button {
    flex: 0 0 auto !important;

    min-height: 29px !important;

    padding:
      0
      10px !important;

    font-size:
      6px !important;

    border-radius:
      999px !important;
  }


  /*
   * ChatGPT的なAskバー
   */
  .ep-dialogue__composer {
    position: relative !important;

    z-index: 2 !important;

    width: 100% !important;

    min-height: 58px !important;

    margin:
      0 !important;

    padding:
      8px
      8px
      8px
      16px !important;

    border:
      1px solid
      rgba(255, 255, 255, 0.11) !important;

    border-radius:
      20px !important;

    background:
      linear-gradient(
        145deg,
        rgba(22, 24, 28, 0.78),
        rgba(4, 5, 7, 0.88)
      ) !important;

    -webkit-backdrop-filter:
      blur(26px)
      saturate(115%) !important;

    backdrop-filter:
      blur(26px)
      saturate(115%) !important;

    box-shadow:
      inset
      0
      1px
      0
      rgba(255, 255, 255, 0.05),

      0
      18px
      50px
      rgba(0, 0, 0, 0.42) !important;
  }


  .ep-dialogue__composer textarea {
    display: block !important;

    width: 100% !important;

    min-height: 38px !important;

    max-height: 110px !important;

    padding:
      9px
      0 !important;

    color:
      rgba(248, 250, 252, 0.94) !important;

    font-size:
      11px !important;

    line-height:
      1.5 !important;
  }


  .ep-dialogue__composer textarea::placeholder {
    color:
      rgba(255, 255, 255, 0.3) !important;
  }


  /*
   * 送信ボタン
   */
  .ep-dialogue__composer > button {
    display: grid !important;

    width: 40px !important;
    height: 40px !important;

    place-items: center !important;

    border-radius:
      13px !important;

    opacity: 1;

    visibility: visible !important;
  }


  .ep-dialogue__composer > button:disabled {
    opacity: 0.24 !important;
  }


  /*
   * composer下の説明
   */
  .ep-dialogue__composer-meta {
    display: flex !important;

    width: 100% !important;

    margin:
      7px
      0
      0 !important;

    padding:
      0
      3px !important;
  }


  /*
   * LIVE SIGNALSを会話より上に常駐させない
   */
  .ep-dialogue__signals {
    position: fixed !important;

    top: 64px !important;
    right: 0 !important;
    bottom: 0 !important;
    left: 0 !important;

    z-index: 180 !important;

    width: 100% !important;
    height: auto !important;

    padding-bottom:
      150px !important;

    background:
      rgba(0, 0, 0, 0.9) !important;

    -webkit-backdrop-filter:
      blur(30px)
      saturate(110%) !important;

    backdrop-filter:
      blur(30px)
      saturate(110%) !important;
  }


  /*
   * Live Signalsを開いていても
   * Ask欄だけはその上に表示
   */
  .ep-dialogue__signals
  ~ .ep-dialogue__composer-shell,
  .ep-dialogue__composer-shell {
    z-index: 220 !important;
  }


  /*
   * モバイルでは説明テキストより
   * Ask機能を優先
   */
  .ep-dialogue__composer-meta > span {
    display: none !important;
  }


  .ep-dialogue__composer-meta button {
    margin-left: auto !important;

    color:
      rgba(230, 238, 243, 0.4) !important;

    font-size:
      6px !important;

    letter-spacing:
      0.08em !important;
  }
}

      `}</style>
    </section>
  );
}