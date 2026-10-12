import EpistemeDialogue from "../components/episteme-dialogue/EpistemeDialogue";

export default function EpistemeDialoguePage() {
  return (
    <main className="episteme-dialogue-page">
      <EpistemeDialogue />
      <style>{`
        .episteme-dialogue-page {
          position: relative;
          isolation: isolate;
          width: 100%;
          max-width: none;
          min-width: 0;
          height: 100dvh;
          min-height: 0;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background: #050506;
        }
        .episteme-dialogue-page > .ep-dialogue {
          width: 100%;
          min-width: 0;
          max-width: none;
          height: 100%;
          margin: 0;
        }
      `}</style>
    </main>
  );
}
