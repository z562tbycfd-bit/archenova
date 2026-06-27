type BuilderHistoryProps = {
  history: string[];
};

export default function BuilderHistory({
  history,
}: BuilderHistoryProps) {
  return (
    <section className="glass-block">
      <span className="home-section-label">
        BUILD HISTORY
      </span>

      <h2>Recent Builds</h2>

      <div className="feed-list">
        {history.length > 0 ? (
          history.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="feed-row wide"
            >
              <div className="feed-source">
                Build
              </div>

              <div className="feed-title">
                {item}
              </div>
            </div>
          ))
        ) : (
          <div className="feed-row wide">
            <div className="feed-source">
              Empty
            </div>

            <div className="feed-title">
              No builds yet.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}