import EpistemeDialogue from "../components/episteme-dialogue/EpistemeDialogue";

export default function EpistemeDialoguePage() {
  return (
    <main className="episteme-dialogue-page">
      <EpistemeDialogue />
      <style>{`
        .episteme-dialogue-page {
          width: 100%;
          min-width: 0;
          max-width: none;
          min-height: 100dvh;
          margin: 0;
          padding: 0;
          overflow: clip;
          background: #000;
        }
        .episteme-dialogue-page > .ep-dialogue {
          width: 100%;
          max-width: none;
          margin: 0;
        }
      `}</style>
    </main>
  );
}
