const deployChecklist = [
  "Review generated code",
  "Check live preview",
  "Test mobile layout",
  "Copy files into project",
  "Run npm run build",
  "Deploy to production",
];

export default function BuilderDeploy() {
  return (
    <div className="builder-panel">
      <span className="home-section-label">DEPLOY</span>

      <h2>Deployment checklist</h2>

      <div className="feed-list">
        {deployChecklist.map((item) => (
          <div key={item} className="feed-row wide">
            <div className="feed-source">Checklist</div>
            <div className="feed-title">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}