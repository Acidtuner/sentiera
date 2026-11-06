"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STARTER = [
  "What is AEO?",
  "How do you work with clients in Dubai?",
  "I'd like a visibility review",
];

const IDLE_MS = 30_000;

function BotIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 546.38 532.47"
      className={className}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M355.7,161.72h-63.96v-45.67c13.64-4.45,23.11-14.12,23.11-25.35,0-15.44-19.59-17.4-41.66-17.4s-38.26,1.96-38.26,17.4c0,11.23,9.46,20.9,23.11,25.35v45.67h-63.96c-42.94,0-77.74,34.81-77.74,77.74v88.47c0,60.49,49.04,109.53,109.53,109.53h98.04c60.49,0,109.53-49.04,109.53-109.53v-88.47c0-42.94-34.81-77.74-77.74-77.74ZM195.83,276.96v-22.72c0-12.5,10.14-22.64,22.64-22.64h0c12.5,0,22.64,10.14,22.64,22.64v22.72c0,12.5-10.14,22.64-22.64,22.64h0c-12.5,0-22.64-10.14-22.64-22.64ZM331.49,368.11l-42.21,10.55h-26.21l-45.79-10.55v-23.83h114.21v23.83ZM353.71,276.96c0,12.5-10.14,22.64-22.64,22.64s-22.64-10.14-22.64-22.64v-22.72c0-12.5,10.14-22.64,22.64-22.64s22.64,10.14,22.64,22.64v22.72ZM546.38,238.91v74.21c0,17.2-13.95,31.15-31.15,31.15h-17.52v44.74c0,79.1-64.35,143.45-143.45,143.45h-101.06v-28.36h-.18v-28.94c0-5.64,4.57-10.21,10.21-10.21h24.51c5.64,0,10.21,4.57,10.21,10.21v27.3h56.3c62.56,0,113.45-50.89,113.45-113.45v-164.5c0-107.26-87.26-194.52-194.52-194.52S78.67,117.26,78.67,224.52v120.11h-30v-.35h-17.52c-17.2,0-31.15-13.95-31.15-31.15v-74.21c0-17.2,13.95-31.15,31.15-31.15h18.14c3.93-53.66,26.72-103.57,65.15-142.01C156.84,23.35,213.22,0,273.19,0s116.35,23.35,158.76,65.76c38.43,38.43,61.22,88.35,65.15,142.01h18.14c17.2,0,31.15,13.95,31.15,31.15Z" />
    </svg>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hello. I can answer questions about Sentiera’s services or help you put together a short brief for the team. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasNudged = useRef(false);

  const resetIdle = useCallback(() => {
    if (hasNudged.current || open) return;
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      if (!open && !hasNudged.current) {
        setShowNudge(true);
        hasNudged.current = true;
      }
    }, IDLE_MS);
  }, [open]);

  useEffect(() => {
    const events = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"] as const;
    const onActivity = () => resetIdle();

    events.forEach((e) => window.addEventListener(e, onActivity, { passive: true }));
    resetIdle();

    return () => {
      events.forEach((e) => window.removeEventListener(e, onActivity));
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [resetIdle]);

  useEffect(() => {
    if (open) setShowNudge(false);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });

      const data = await res.json();
      const reply =
        data.reply ||
        "Sorry, I couldn’t get a reply just now. You can email hello@sentieratech.com or message us on WhatsApp.";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again or email hello@sentieratech.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    send(input);
  }

  function dismissNudge() {
    setShowNudge(false);
  }

  return (
    <>
      {showNudge && !open && (
        <div className="fixed bottom-24 right-6 z-50 max-w-[260px] border border-hairline bg-white px-4 py-3 shadow-lg">
          <button
            type="button"
            onClick={dismissNudge}
            className="absolute top-1.5 right-2 text-slate-400 hover:text-slate-700 text-sm leading-none"
            aria-label="Dismiss"
          >
            ×
          </button>
          <p className="font-sans text-sm text-slate-800 pr-4">
            Questions about SEO, AEO or how we work? I can help.
          </p>
          <button
            type="button"
            onClick={() => {
              setShowNudge(false);
              setOpen(true);
            }}
            className="mt-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-tech-blue hover:text-tech-blue-600"
          >
            Open chat →
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-tech-blue text-white shadow-lg transition hover:bg-tech-blue-600 hover:scale-105 ${!open && showNudge ? "bot-nudge" : ""}`}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <span className="text-xl leading-none">×</span>
        ) : (
          <BotIcon className={`h-8 w-8 text-white ${!showNudge ? "bot-idle" : ""}`} />
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[min(560px,calc(100vh-8rem))] w-[min(380px,calc(100vw-2rem))] flex-col border border-hairline bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-tech-blue text-white">
                <BotIcon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-sans text-sm font-semibold text-slate-950">Sentiera</p>
                <p className="font-mono text-[10px] uppercase tracking-wide text-slate-500">
                  Ask about services or leave a brief
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-slate-400 hover:text-slate-700"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-sm px-3 py-2 font-sans text-sm leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-tech-blue text-white"
                    : "mr-auto bg-slate-50 text-slate-800"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="mr-auto rounded-sm bg-slate-50 px-3 py-2 font-mono text-xs text-slate-500">
                …
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {STARTER.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => send(s)}
                  className="rounded-full border border-hairline px-3 py-1 font-sans text-xs text-slate-600 hover:border-tech-blue hover:text-tech-blue"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-hairline p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 border border-hairline px-3 py-2 font-sans text-sm focus:border-tech-blue focus:outline-none"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded-sm bg-tech-blue px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
