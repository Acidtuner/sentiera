import { GoogleGenAI } from "@google/genai";

export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-4-hydrogen";

function textFromInteraction(interaction: {
  output_text?: string;
  steps?: Array<{ content?: unknown; text?: unknown; type?: string }>;
}): string {
  const direct = (interaction.output_text || "").trim();
  if (direct) return direct;

  const parts: string[] = [];
  for (const step of interaction.steps || []) {
    if (typeof step.text === "string") parts.push(step.text);
    const content = step.content;
    if (typeof content === "string") parts.push(content);
    if (Array.isArray(content)) {
      for (const item of content) {
        if (typeof item === "string") parts.push(item);
        else if (item && typeof item === "object" && "text" in item && typeof item.text === "string") parts.push(item.text);
      }
    }
  }
  return parts.join("\n").trim();
}

export async function askGemini(prompt: string, apiKey: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });
  const interaction = await ai.interactions.create(
    {
      model: GEMINI_MODEL,
      input: prompt,
      store: false,
      generation_config: { thinking_level: "low" },
    },
    { timeout: 45000 }
  );
  const text = textFromInteraction(interaction);
  if (!text) throw new Error("Gemini returned an empty answer.");
  return text;
}
