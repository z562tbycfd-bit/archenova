export default function BuilderTerminal() {
  return (
    <div className="builder-panel">
      <span className="home-section-label">TERMINAL</span>

      <h2>Suggested commands</h2>

      <pre className="builder-terminal">{`# Copy generated files into your project

# Run locally
npm run dev

# Build before deployment
npm run build`}</pre>
    </div>
  );
}