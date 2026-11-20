import { GoogleGenAI } from "@google/genai";

export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-4-hydrogen";

export async function askGemini(prompt: string, apiKey: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });
  const interaction = await ai.interactions.create({
    model: GEMINI_MODEL,
    input: prompt,
    generation_config: { thinking_level: "low" },
  });
  const text = (interaction.output_text || "").trim();
  if (!text) {
    throw new Error("Gemini returned an empty answer.");
  }
  return text;
}
