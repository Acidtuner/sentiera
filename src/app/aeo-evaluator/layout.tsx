import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AEO Evaluator — Free AI Visibility Audit",
  description:
    "Run a free Answer Engine Optimization (AEO) audit. Score your site's AI recommendation rate, entity clarity, and RAG-readiness for ChatGPT, Gemini, Perplexity and Google AI Overviews.",
};

export default function AEOLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
