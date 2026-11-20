export const GROK_MODEL = process.env.XAI_MODEL || "grok-4.7";

function textFromResponse(data: {
  output_text?: string;
  output?: Array<{
    type?: string;
    text?: string;
    content?: Array<{ type?: string; text?: string }> | string;
  }>;
  choices?: Array<{ message?: { content?: string } }>;
}): string {
  if (data.output_text?.trim()) return data.output_text.trim();
  const parts: string[] = [];
  for (const item of data.output || []) {
    if (item.text) parts.push(item.text);
    if (typeof item.content === "string") parts.push(item.content);
    if (Array.isArray(item.content)) {
      for (const block of item.content) {
        if (block.text) parts.push(block.text);
      }
    }
  }
  if (parts.length) return parts.join("\n").trim();
  return data.choices?.[0]?.message?.content?.trim() || "";
}

export async function askGrok(prompt: string, apiKey: string, useSearch = false): Promise<string> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), useSearch ? 40000 : 20000);
  try {
    const res = await fetch(useSearch ? "https://api.x.ai/v1/responses" : "https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        useSearch
          ? {
              model: GROK_MODEL,
              input: [{ role: "user", content: prompt }],
              tools: [{ type: "web_search" }],
              max_output_tokens: 800,
            }
          : {
              model: GROK_MODEL,
              messages: [{ role: "user", content: prompt }],
              max_tokens: 600,
            }
      ),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error?.message || `Grok failed (${res.status})`);
    const text = textFromResponse(data);
    if (!text) throw new Error("Grok returned an empty answer.");
    return text;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(useSearch ? "Grok search timed out." : "Grok timed out.");
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
