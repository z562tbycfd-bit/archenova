/* ==========================================================
   ARCHENOVA
   CIVILIZATION EXPERIENCE
   PHASE 5D-3

   REDUCED PHYSICAL EXPERIMENT MODEL
========================================================== */


/* ==========================================================
   DOMAIN TYPES
========================================================== */

export type ExperimentDomain =
  | "quantum"
  | "materials"
  | "photonics"
  | "molecular"
  | "astrophysics"
  | "general";


/* ==========================================================
   RESEARCH OBJECT
========================================================== */

export type ExperimentPaper = {
  title?: string;

  source?: string;

  summary?: string;

  url?: string;

  publishedAt?: string;
};


/* ==========================================================
   CONTROL DEFINITIONS
========================================================== */

export type PhysicalControlKey =
  | "a"
  | "b"
  | "c";


export type PhysicalControlDefinition = {
  key:
    PhysicalControlKey;

  label:
    string;

  unit:
    string;

  min:
    number;

  max:
    number;

  step:
    number;

  defaultValue:
    number;
};


export type PhysicalControls = {
  a:
    number;

  b:
    number;

  c:
    number;
};


/* ==========================================================
   EXPERIMENT DEFINITION
========================================================== */

export type ExperimentDefinition = {
  domain:
    ExperimentDomain;

  name:
    string;

  systemLabel:
    string;

  observableLabel:
    string;

  controls: [
    PhysicalControlDefinition,
    PhysicalControlDefinition,
    PhysicalControlDefinition,
  ];
};


/* ==========================================================
   PHYSICAL TELEMETRY
========================================================== */

export type PhysicalTelemetry = {
  /*
   * Idealized reduced-model signal.
   */
  signal:
    number;

  /*
   * Observable after virtual measurement noise.
   */
  measuredSignal:
    number;

  /*
   * Effective measurement uncertainty.
   */
  noise:
    number;

  /*
   * Normalized measurement stability.
   */
  stability:
    number;

  /*
   * Effective excitation / drive energy.
   */
  energy:
    number;

  /*
   * Effective degree of physical ordering.
   */
  order:
    number;

  /*
   * Human-readable reduced physical regime.
   */
  phase:
    string;
};


/* ==========================================================
   DOMAIN DETECTION
========================================================== */

export function detectExperimentDomain(
  paper?:
    ExperimentPaper,
): ExperimentDomain {
  /*
   * HOMEから直接Scientific Worldへ入った場合は、
   * 汎用探索でも物理的変化が見えやすい
   * materials worldを初期値にする。
   */
  if (!paper) {
    return "materials";
  }


  const text =
    [
      paper.title ??
        "",

      paper.summary ??
        "",
    ]
      .join(
        " ",
      )
      .toLowerCase();


  /* --------------------------------------------------------
     QUANTUM
  -------------------------------------------------------- */

  if (
    /quantum|qubit|spin|superconduct|coherence|entang|floquet|zitterbewegung|bloch oscillation|gauge field|eigenstate thermalization/.test(
      text,
    )
  ) {
    return "quantum";
  }


  /* --------------------------------------------------------
     PHOTONICS
  -------------------------------------------------------- */

  if (
    /photon|photonic|laser|optical|frequency lattice|waveguide|cavity|interference|polarization|light field/.test(
      text,
    )
  ) {
    return "photonics";
  }


  /* --------------------------------------------------------
     MOLECULAR / BIOPHYSICAL
  -------------------------------------------------------- */

  if (
    /molecule|molecular|protein|dna|rna|ion|membrane|biological|water transport|nanopore|enzyme|mitochondria|chromatin/.test(
      text,
    )
  ) {
    return "molecular";
  }


  /* --------------------------------------------------------
     ASTROPHYSICS
  -------------------------------------------------------- */

  if (
    /star|stellar|cosm|galaxy|magnetar|telescope|x-ray|black hole|astroph|neutron star|white dwarf|vacuum birefringence|cmb|gravitational wave/.test(
      text,
    )
  ) {
    return "astrophysics";
  }


  /* --------------------------------------------------------
     MATERIALS
  -------------------------------------------------------- */

  if (
    /material|battery|film|thin film|strain|crystal|magnetic|metal|oxide|electrode|sodium-ion|lithium|phase transition|charge order/.test(
      text,
    )
  ) {
    return "materials";
  }


  return "general";
}


/* ==========================================================
   EXPERIMENT DEFINITION FACTORY
========================================================== */

export function makeExperimentDefinition(
  paper?:
    ExperimentPaper,
): ExperimentDefinition {
  const domain =
    detectExperimentDomain(
      paper,
    );


  switch (
    domain
  ) {
    /* ======================================================
       QUANTUM
    ====================================================== */

    case "quantum":
      return {
        domain:
          "quantum",

        name:
          "Quantum State Laboratory",

        systemLabel:
          "Coherent Quantum System",

        observableLabel:
          "Coherent Response",

        controls: [
          {
            key:
              "a",

            label:
              "Temperature",

            unit:
              "K",

            min:
              2,

            max:
              120,

            step:
              1,

            defaultValue:
              24,
          },

          {
            key:
              "b",

            label:
              "Field",

            unit:
              "T",

            min:
              0,

            max:
              12,

            step:
              0.1,

            defaultValue:
              3.2,
          },

          {
            key:
              "c",

            label:
              "Coupling",

            unit:
              "g",

            min:
              0,

            max:
              1,

            step:
              0.01,

            defaultValue:
              0.58,
          },
        ],
      };


    /* ======================================================
       PHOTONICS
    ====================================================== */

    case "photonics":
      return {
        domain:
          "photonics",

        name:
          "Photonics Laboratory",

        systemLabel:
          "Driven Optical System",

        observableLabel:
          "Optical Response",

        controls: [
          {
            key:
              "a",

            label:
              "Detuning",

            unit:
              "GHz",

            min:
              -10,

            max:
              10,

            step:
              0.1,

            defaultValue:
              0,
          },

          {
            key:
              "b",

            label:
              "Drive",

            unit:
              "a.u.",

            min:
              0,

            max:
              1,

            step:
              0.01,

            defaultValue:
              0.52,
          },

          {
            key:
              "c",

            label:
              "Coupling",

            unit:
              "g",

            min:
              0,

            max:
              1,

            step:
              0.01,

            defaultValue:
              0.62,
          },
        ],
      };


    /* ======================================================
       MOLECULAR
    ====================================================== */

    case "molecular":
      return {
        domain:
          "molecular",

        name:
          "Molecular Systems Laboratory",

        systemLabel:
          "Stochastic Molecular System",

        observableLabel:
          "Transport Flux",

        controls: [
          {
            key:
              "a",

            label:
              "Temperature",

            unit:
              "K",

            min:
              250,

            max:
              400,

            step:
              1,

            defaultValue:
              300,
          },

          {
            key:
              "b",

            label:
              "Gradient",

            unit:
              "Δμ",

            min:
              0,

            max:
              1,

            step:
              0.01,

            defaultValue:
              0.48,
          },

          {
            key:
              "c",

            label:
              "Drive",

            unit:
              "ω",

            min:
              -1,

            max:
              1,

            step:
              0.01,

            defaultValue:
              0.35,
          },
        ],
      };


    /* ======================================================
       ASTROPHYSICS
    ====================================================== */

    case "astrophysics":
      return {
        domain:
          "astrophysics",

        name:
          "Astrophysical Observation Laboratory",

        systemLabel:
          "Radiative Plasma System",

        observableLabel:
          "Polarized Signal",

        controls: [
          {
            key:
              "a",

            label:
              "Field",

            unit:
              "B/B₀",

            min:
              0,

            max:
              1,

            step:
              0.01,

            defaultValue:
              0.68,
          },

          {
            key:
              "b",

            label:
              "Viewing Angle",

            unit:
              "deg",

            min:
              0,

            max:
              90,

            step:
              1,

            defaultValue:
              42,
          },

          {
            key:
              "c",

            label:
              "Photon Energy",

            unit:
              "keV",

            min:
              1,

            max:
              20,

            step:
              0.1,

            defaultValue:
              6,
          },
        ],
      };


    /* ======================================================
       GENERAL
    ====================================================== */

    case "general":
      return {
        domain:
          "general",

        name:
          "General Experimental Laboratory",

        systemLabel:
          "Physical System",

        observableLabel:
          "System Response",

        controls: [
          {
            key:
              "a",

            label:
              "Control A",

            unit:
              "a.u.",

            min:
              0,

            max:
              1,

            step:
              0.01,

            defaultValue:
              0.4,
          },

          {
            key:
              "b",

            label:
              "Control B",

            unit:
              "a.u.",

            min:
              0,

            max:
              1,

            step:
              0.01,

            defaultValue:
              0.55,
          },

          {
            key:
              "c",

            label:
              "Control C",

            unit:
              "a.u.",

            min:
              0,

            max:
              1,

            step:
              0.01,

            defaultValue:
              0.5,
          },
        ],
      };


    /* ======================================================
       MATERIALS
    ====================================================== */

    case "materials":
    default:
      return {
        domain:
          "materials",

        name:
          "Materials Research Laboratory",

        systemLabel:
          "Driven Material State",

        observableLabel:
          "Order Response",

        controls: [
          {
            key:
              "a",

            label:
              "Temperature",

            unit:
              "K",

            min:
              5,

            max:
              500,

            step:
              1,

            defaultValue:
              120,
          },

          {
            key:
              "b",

            label:
              "Field",

            unit:
              "T",

            min:
              0,

            max:
              12,

            step:
              0.1,

            defaultValue:
              2.5,
          },

          {
            key:
              "c",

            label:
              "Strain",

            unit:
              "%",

            min:
              -3,

            max:
              3,

            step:
              0.05,

            defaultValue:
              0.4,
          },
        ],
      };
  }
}


/* ==========================================================
   NORMALIZATION UTILITIES
========================================================== */

function normalize(
  value:
    number,

  min:
    number,

  max:
    number,
) {
  if (
    max ===
    min
  ) {
    return 0;
  }


  return Math.max(
    0,

    Math.min(
      1,

      (
        value -
        min
      ) /
        (
          max -
          min
        ),
    ),
  );
}


/* ==========================================================
   CLAMP 0 → 1
========================================================== */

function clamp01(
  value:
    number,
) {
  return Math.max(
    0,

    Math.min(
      1,

      value,
    ),
  );
}


/* ==========================================================
   REDUCED PHYSICAL MODEL
========================================================== */

export function calculatePhysicalState(
  definition:
    ExperimentDefinition,

  controls:
    PhysicalControls,

  time:
    number,

  includeMeasurementNoise =
    true,
): PhysicalTelemetry {
  const [
    controlA,
    controlB,
    controlC,
  ] =
    definition.controls;


  const a =
    normalize(
      controls.a,

      controlA.min,

      controlA.max,
    );


  const b =
    normalize(
      controls.b,

      controlB.min,

      controlB.max,
    );


  const c =
    normalize(
      controls.c,

      controlC.min,

      controlC.max,
    );


  let signal =
    0;


  let order =
    0;


  let energy =
    0;


  let phase =
    "TRANSIENT";


  /* ========================================================
     DOMAIN-SPECIFIC REDUCED MODELS
  ======================================================== */

  switch (
    definition.domain
  ) {
    /* ======================================================
       QUANTUM
    ====================================================== */

    case "quantum": {
      /*
       * Lower temperature increases coherence.
       */
      const thermalOrder =
        1 -
        a;


      /*
       * Coupling stabilizes the coherent response,
       * while excessive departure from an illustrative
       * field window suppresses it.
       */
      const fieldPenalty =
        Math.abs(
          b -
          0.38,
        ) *
        0.34;


      const coherence =
        Math.max(
          0,

          thermalOrder *
            0.58 +
            c *
              0.58 -
            fieldPenalty,
        );


      order =
        clamp01(
          coherence,
        );


      const oscillation =
        0.72 +
        0.28 *
          Math.cos(
            time *
              1.8,
          );


      signal =
        clamp01(
          order *
            oscillation,
        );


      energy =
        clamp01(
          0.28 +
            b *
              0.46 +
            c *
              0.26,
        );


      phase =
        order >
        0.66
          ? "COHERENT"
          : order >
              0.34
            ? "PARTIAL"
            : "DECOHERENT";


      break;
    }


    /* ======================================================
       PHOTONICS
    ====================================================== */

    case "photonics": {
      /*
       * Detuning is normalized around the center
       * of the allowed control range.
       */
      const detuning =
        Math.abs(
          a -
          0.5,
        ) *
        2;


      /*
       * Simple resonance envelope.
       */
      const resonance =
        Math.exp(
          -4.5 *
            detuning *
            detuning,
        );


      order =
        clamp01(
          resonance *
            0.58 +
            c *
              0.42,
        );


      signal =
        clamp01(
          order *
            (
              0.3 +
              b *
                0.7
            ),
        );


      energy =
        clamp01(
          b,
        );


      phase =
        resonance >
        0.65
          ? "RESONANT"
          : resonance >
              0.25
            ? "DETUNED"
            : "OFF RESONANCE";


      break;
    }


    /* ======================================================
       MOLECULAR
    ====================================================== */

    case "molecular": {
      /*
       * Higher normalized temperature increases
       * stochastic transport capacity.
       */
      const thermalActivation =
        0.35 +
        a *
          0.65;


      /*
       * Drive can be positive or negative in the original
       * physical control, but normalized c is 0→1.
       *
       * Distance from the center approximates
       * magnitude of directed drive.
       */
      const directedDrive =
        Math.abs(
          c -
          0.5,
        ) *
        2;


      order =
        clamp01(
          b *
            0.54 +
            directedDrive *
              0.46,
        );


      signal =
        clamp01(
          thermalActivation *
            order,
        );


      energy =
        clamp01(
          directedDrive,
        );


      phase =
        signal >
        0.7
          ? "DIRECTED TRANSPORT"
          : signal >
              0.3
            ? "MIXED TRANSPORT"
            : "DIFFUSIVE";


      break;
    }


    /* ======================================================
       ASTROPHYSICS
    ====================================================== */

    case "astrophysics": {
      const angleFactor =
        Math.sin(
          b *
            Math.PI /
            2,
        );


      order =
        clamp01(
          a *
            0.7 +
            c *
              0.3,
        );


      signal =
        clamp01(
          order *
            (
              0.35 +
              0.65 *
                angleFactor
            ),
        );


      energy =
        clamp01(
          c,
        );


      phase =
        signal >
        0.68
          ? "STRONGLY POLARIZED"
          : signal >
              0.3
            ? "POLARIZED"
            : "WEAK SIGNAL";


      break;
    }


    /* ======================================================
       GENERAL
    ====================================================== */

    case "general": {
      order =
        clamp01(
          a *
            0.35 +
            b *
              0.4 +
            c *
              0.25,
        );


      signal =
        clamp01(
          order,
        );


      energy =
        clamp01(
          (
            a +
            b +
            c
          ) /
            3,
        );


      phase =
        signal >
        0.66
          ? "HIGH RESPONSE"
          : signal >
              0.33
            ? "INTERMEDIATE"
            : "LOW RESPONSE";


      break;
    }


    /* ======================================================
       MATERIALS
    ====================================================== */

    case "materials":
    default: {
      /*
       * Lower temperature supports ordering.
       */
      const thermalOrder =
        1 -
        a;


      /*
       * External field can support a selected
       * ordered response in this reduced model.
       */
      const fieldOrder =
        b;


      /*
       * Moderate strain is treated as favorable,
       * while large displacement from the center
       * suppresses the reduced order parameter.
       */
      const strainEffect =
        1 -
        Math.min(
          1,

          Math.abs(
            c -
            0.5,
          ) *
            1.35,
        );


      order =
        clamp01(
          thermalOrder *
            0.56 +
            fieldOrder *
              0.28 +
            strainEffect *
              0.16,
        );


      signal =
        clamp01(
          order,
        );


      energy =
        clamp01(
          0.25 +
            b *
              0.45 +
            Math.abs(
              c -
              0.5,
            ) *
              0.3,
        );


      phase =
        order >
        0.7
          ? "ORDERED"
          : order >
              0.38
            ? "COEXISTING"
            : "DISORDERED";


      break;
    }
  }


  /* ========================================================
     MEASUREMENT NOISE
  ======================================================== */

  /*
   * Less ordered states are modeled as more difficult
   * to measure reproducibly.
   */
  const noise =
    0.015 +
    (
      1 -
      order
    ) *
      0.045;


  /*
   * Deterministic pseudo-noise derived from time.
   *
   * This avoids Math.random() so the world remains
   * smoother and easier to reproduce during rendering.
   */
  const measurementNoise =
    includeMeasurementNoise
      ? (
          Math.sin(
            time *
              7.17,
          ) *
            noise *
            0.62
        ) +
        (
          Math.sin(
            time *
              13.71,
          ) *
            noise *
            0.38
        )
      : 0;


  const measuredSignal =
    clamp01(
      signal +
        measurementNoise,
    );


  /*
   * Stability is inversely related to effective noise.
   */
  const stability =
    clamp01(
      1 -
        noise *
          5,
    );


  /* ========================================================
     OUTPUT
  ======================================================== */

  return {
    signal,

    measuredSignal,

    noise,

    stability,

    energy,

    order,

    phase,
  };
}


/* ==========================================================
   THEORY PREDICTION
========================================================== */

export function calculateTheoryPrediction(
  definition:
    ExperimentDefinition,

  controls:
    PhysicalControls,
) {
  /*
   * Theory prediction deliberately excludes
   * measurement noise.
   *
   * Theory
   * ≠
   * measured observation.
   */
  const prediction =
    calculatePhysicalState(
      definition,

      controls,

      0,

      false,
    );


  return prediction.signal;
}