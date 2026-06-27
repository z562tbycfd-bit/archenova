"use client";

type BuilderMessage = {
  role: string;
  text: string;
};

type BuilderConversationProps = {
  prompt: string;
  setPrompt: (value: string) => void;
  messages: BuilderMessage[];
  onSend: () => void;
  onReset: () => void;
};

export default function BuilderConversation({
  prompt,
  setPrompt,
  messages,
  onSend,
  onReset,
}: BuilderConversationProps) {
  return (
    <div className="builder-panel">
      <span className="home-section-label">CONVERSATION</span>

      <h2>What would you like to build?</h2>

      <div className="builder-chat">
        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className="builder-message"
          >
            <strong>{message.role}</strong>
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <textarea
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        placeholder="Example: Create a premium dashboard for a civilization intelligence platform..."
        className="builder-input"
      />

      <div className="builder-actions">
        <button
          type="button"
          onClick={onSend}
          className="back-link"
        >
          Send to Builder →
        </button>

        <button
          type="button"
          onClick={onReset}
          className="back-link"
        >
          Reset
        </button>
      </div>
    </div>
  );
}