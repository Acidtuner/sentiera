import { AdvancedSignals } from "@/types/aeo";
import { askGrok } from "@/lib/gemini";

export async function runCitationSampling(
  targetUrl: string,
  keyword: string,
  apiKeyOverride?: string
): Promise<AdvancedSignals["citationSampling"]> {
  const apiKey = apiKeyOverride || process.env.XAI_API_KEY;
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
    const answer = await askGrok(prompt, apiKey);
    const cited = answer.toLowerCase().includes(host.toLowerCase());
    return {
      executed: true,
      cited,
      sampleAnswer: answer.slice(0, 1200),
      sources: cited ? [host] : [],
    };
  } catch (err) {
    return {
      executed: false,
      cited: false,
      sampleAnswer: err instanceof Error ? err.message : "Citation sample failed.",
    };
  }
}
