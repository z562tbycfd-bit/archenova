import TechnologyHome from "../components/TechnologyHome";

export default function TechnologyPage() {
  return (
    <main className="page-standard">
      <div className="page-head">
        <h1>Technology</h1>
        <p className="page-lead">
          Observing the points where technology outruns institutions, incentives,
          and human reversibility.
        </p>
      </div>

      <TechnologyHome mode="page" />
    </main>
  );
}