import { NextRequest, NextResponse } from "next/server";
import { SENTIERA_SYSTEM_PROMPT } from "@/lib/chat-system-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const XAI_API_URL = "https://api.x.ai/v1/chat/completions";
const MODEL = process.env.XAI_MODEL || "grok-4.3";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is not configured. XAI_API_KEY is missing on the server." },
      { status: 500 }
    );
  }

  let body: { messages?: Message[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
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
        temperature: 0.4,
        max_tokens: 800,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error("xAI error", res.status, errText.slice(0, 800));

      let detail = "The assistant is temporarily unavailable.";
      if (res.status === 401 || res.status === 403) {
        detail = "The API key was rejected. Check XAI_API_KEY on the host and redeploy.";
      } else if (res.status === 404) {
        detail = `Model \"${MODEL}\" was not found. Set XAI_MODEL to a current id such as grok-4.3.`;
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

      return NextResponse.json({ error: detail }, { status: 502 });
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content?.trim() || "";

    if (!reply) {
      return NextResponse.json(
        { error: "No reply received from the model." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Chat route error", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email hello@sentieratech.com." },
      { status: 500 }
    );
  }
}
