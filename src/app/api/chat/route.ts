import { NextRequest } from "next/server";
import { SENTIERA_SYSTEM_PROMPT } from "@/lib/chat-system-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const XAI_API_URL = "https://api.x.ai/v1/chat/completions";
const MODEL = process.env.XAI_MODEL || "grok-4.7";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Chat is not configured. XAI_API_KEY is missing on the server." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  let body: { messages?: Message[] };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const incoming = Array.isArray(body.messages) ? body.messages : [];

  const history = incoming
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  const messages: Message[] = [
    { role: "system", content: SENTIERA_SYSTEM_PROMPT },
    ...history,
  ];

  try {
    const res = await fetch(XAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.5,
        max_tokens: 400,
        stream: true,
      }),
    });

    if (!res.ok || !res.body) {
      const errText = await res.text().catch(() => "");
      console.error("xAI error", res.status, errText.slice(0, 800));

      let detail = "The assistant is temporarily unavailable.";
      if (res.status === 401 || res.status === 403) {
        detail = "The API key was rejected. Check XAI_API_KEY on the host and redeploy.";
      } else if (res.status === 404) {
        detail = `Model \"${MODEL}\" was not found. List available models at https://api.x.ai/v1/models and set XAI_MODEL to one of them.`;
      } else if (res.status === 429) {
        detail = "Rate limit reached. Try again in a moment.";
      } else if (errText) {
        try {
          const parsed = JSON.parse(errText);
          detail = parsed?.error?.message || parsed?.error || detail;
        } catch {
          detail = errText.slice(0, 180);
        }
      }

      return new Response(JSON.stringify({ error: detail }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = res.body!.getReader();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;
              const data = trimmed.slice(5).trim();
              if (data === "[DONE]") continue;

              try {
                const json = JSON.parse(data);
                const delta = json?.choices?.[0]?.delta?.content;
                if (typeof delta === "string" && delta.length > 0) {
                  controller.enqueue(encoder.encode(delta));
                }
              } catch {
                // ignore malformed chunks
              }
            }
          }
        } catch (err) {
          console.error("Stream error", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  } catch (err) {
    console.error("Chat route error", err);
    return new Response(
      JSON.stringify({
        error: "Something went wrong. Please try again or email hello@sentieratech.com.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
