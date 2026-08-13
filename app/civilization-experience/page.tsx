import ScientificWorld
  from "../components/civilization-experience/ScientificWorld";

type PageProps = {
  searchParams?: {
    title?: string;
    source?: string;
    url?: string;
    summary?: string;
    publishedAt?: string;
  };
};

export default function CivilizationExperiencePage({
  searchParams,
}: PageProps) {
  const selectedPaper = {
    title:
      searchParams?.title ??
      "",

    source:
      searchParams?.source ??
      "",

    url:
      searchParams?.url ??
      "",

    summary:
      searchParams?.summary ??
      "",

    publishedAt:
      searchParams?.publishedAt ??
      "",
  };

  const hasSelectedPaper =
    selectedPaper.title
      .trim()
      .length >
    0;

  return (
    <main className="civilization-experience-world">
      <ScientificWorld
        paper={
          hasSelectedPaper
            ? selectedPaper
            : undefined
        }
      />

      <style>{`
        /*
         * SCIENTIFIC OPEN WORLD
         *
         * 親レイアウトのwidth / max-widthから
         * 完全に独立させてViewport全面へ表示。
         */

        .civilization-experience-world {
          position: fixed;

          inset: 0;

          z-index: 0;

          isolation: isolate;

          width: 100dvw;
          max-width: none;

          height: 100dvh;
          min-height: 100dvh;

          margin: 0;
          padding: 0;

          overflow: hidden;

          background: #010204;
        }

        .civilization-experience-world
        > .scientific-world {
          position: absolute;

          inset: 0;

          width: 100dvw;
          max-width: none;

          height: 100dvh;
          min-height: 100dvh;

          margin: 0;
          padding: 0;
        }

        .civilization-experience-world
        canvas {
          position: absolute;

          inset: 0;

          display: block;

          width: 100dvw !important;
          max-width: none !important;

          height: 100dvh !important;

          margin: 0 !important;
          padding: 0 !important;

          outline: none;

          touch-action: none;
        }

        @media (max-width: 760px) {
          .civilization-experience-world,
          .civilization-experience-world
          > .scientific-world,
          .civilization-experience-world
          canvas {
            width: 100dvw;
            height: 100dvh;
          }
        }
      `}</style>
    </main>
  );
}