"use client";

import { FormEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Source = {
  metadata: {
    source?: string;
    title?: string;
  };
  similarity_score?: number;
};

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  sources?: Source[];
};

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export function AssistantPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = question.trim();
    if (!query || isLoading) {
      return;
    }

    setQuestion("");
    setError(null);
    setIsLoading(true);
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: "user", text: query },
    ]);

    try {
      const response = await fetch(`${apiBaseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          typeof payload?.detail === "string"
            ? payload.detail
            : "The assistant could not answer right now.",
        );
      }

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: payload.answer,
          sources: payload.sources,
        },
      ]);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "The assistant is unavailable right now.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const suggestedQuestions = [
    "What did Shreya work on at Wipro?",
    "Tell me about the financial regime-shift project.",
    "What is Shreya learning at Accenture?",
  ];

  return (
    <div className="space-y-5" id="assistant">
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="focus-ring group flex w-full items-end justify-between gap-4 text-left"
        >
          <span>
            <span className="block text-tech text-primary">
              Portfolio assistant
            </span>
            <span className="mt-2 block font-display text-3xl leading-none tracking-[-0.03em] text-foreground sm:text-4xl">
              Talk to the portfolio
            </span>
          </span>
          <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary transition-transform group-hover:rotate-45">
            ↗
          </span>
        </button>
        <p className="max-w-lg text-body-sm text-muted-foreground">
          A grounded conversation with the work, education, and technical
          direction documented here.
        </p>
      </div>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-5 pt-2">
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuestion(suggestion)}
                    className="focus-ring border-b border-border px-0.5 py-2 text-left text-sm text-muted-foreground transition hover:border-primary hover:text-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              {messages.length > 0 ? (
                <div
                  className="max-h-80 space-y-3 overflow-y-auto pr-1"
                  aria-live="polite"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`rounded-2xl border p-4 ${
                        message.role === "user"
                          ? "border-primary/20 bg-primary/8"
                          : "border-border bg-background/45"
                      }`}
                    >
                      <p className="text-tech text-muted-foreground">
                        {message.role === "user"
                          ? "You"
                          : "Portfolio assistant"}
                      </p>
                      <p className="mt-2 text-body-sm text-foreground">
                        {message.text}
                      </p>
                      {message.sources && message.sources.length > 0 ? (
                        <p className="mt-3 text-tech text-muted-foreground">
                          Sources:{" "}
                          {message.sources
                            .map((source) => source.metadata.source)
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : null}

              <form className="space-y-3" onSubmit={handleSubmit}>
                <label className="sr-only" htmlFor="assistant-question">
                  Ask a question
                </label>
                <textarea
                  id="assistant-question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  placeholder="What did Shreya work on at Wipro?"
                  rows={3}
                  disabled={isLoading}
                  className="focus-ring min-h-24 w-full resize-y rounded-2xl border border-border bg-background/45 px-4 py-3 text-body-sm text-foreground placeholder:text-muted-foreground disabled:cursor-wait disabled:opacity-60"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-tech text-muted-foreground">
                    {isLoading
                      ? "Searching the portfolio knowledge base..."
                      : "Grounded answers only"}
                  </p>
                  <button
                    type="submit"
                    disabled={isLoading || !question.trim()}
                    className="focus-ring inline-flex h-10 items-center justify-center rounded-full border border-primary bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isLoading ? "Thinking..." : "Ask"}
                  </button>
                </div>
              </form>

              {error ? (
                <p
                  className="rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-body-sm text-destructive"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
