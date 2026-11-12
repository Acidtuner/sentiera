import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "sentiera Cortex — Free AI Visibility Audit",
  description:
    "sentiera Cortex: free Answer Engine Optimization (AEO) diagnostic. Score AI recommendation rate, entity clarity, and RAG-readiness for ChatGPT, Gemini, Perplexity and Google AI Overviews.",
};

export default function AEOLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
