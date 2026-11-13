import { GoogleGenerativeAI } from "@google/generative-ai";
import { AdvancedSignals } from "@/types/aeo";

export async function runCitationSampling(
  targetUrl: string,
  keyword: string,
  apiKeyOverride?: string
): Promise<AdvancedSignals["citationSampling"]> {
  const apiKey = apiKeyOverride || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.length < 10) {
    return { executed: false, cited: false };
  }

  const host = (() => {
    try {
      return new URL(targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`).hostname.replace(/^www\./, "");
    } catch {
      return targetUrl;
    }
  })();

  const prompt = `List the top recommended providers or companies for "${keyword}". Include website URLs when possible. Be concise.`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const answer = result.response.text();
    const cited = answer.toLowerCase().includes(host.toLowerCase());

    return {
      executed: true,
      cited,
      sampleAnswer: answer.slice(0, 1200),
      sources: cited ? [host] : [],
    };
  } catch {
    return { executed: false, cited: false };
  }
}
