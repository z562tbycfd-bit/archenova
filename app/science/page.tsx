import ScienceHome from "../components/ScienceHome";

export default function SciencePage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Science</h1>
        <p className="page-lead">
          Latest signals from major journals—compressed into titles and structural summaries.
        </p>
      </div>

      <ScienceHome mode="page" />
    </main>
  );
}