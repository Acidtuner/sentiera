export interface AEOMetrics {
  ai_recommendation_rate: number; // 0 - 40
  entity_accuracy_health: number; // 0 - 30
  rag_readiness_score: number; // 0 - 30
}

export interface AEOResult {
  overall_aeo_score: number; // 0 - 100
  metrics: AEOMetrics;
  is_invisible_to_ai: boolean; // true if overall score < 50
  schema_markup_detected: boolean;
  diagnostic_summary: string; // 2-3 sentence clinical executive summary
  critical_gaps: string[]; // 2-3 specific failures
  recommended_fixes: string[]; // 2-3 actionable fixes
  signalsUsed?: string[];
}

export interface GroundingSource {
  title: string;
  uri: string;
  domain: string;
  isTargetDomain: boolean;
}

export interface LiveGroundingResult {
  executed: boolean;
  queryPrompt: string;
  aiSynthesizedAnswer: string;
  groundingQueries: string[];
  citedSources: GroundingSource[];
  brandVisibilityStatus: "CITED_AND_RECOMMENDED" | "MENTIONED_ONLY" | "OMITTED_FROM_AI_SHORTLIST";
  targetUrlFound: boolean;
  targetBrandFound: boolean;
  competitorsCited: Array<{
    title: string;
    domain: string;
    uri: string;
  }>;
  aiVerdictSummary: string;
}

export interface AnalyzedPage {
  url: string;
  title: string;
  reason: string;
  wordCount: number;
  hasSchema: boolean;
}

export interface ScrapedData {
  url: string;
  title: string;
  description: string;
  canonical?: string;
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  jsonLdSchemas: Record<string, unknown>[];
  schemaMarkupDetected: boolean;
  bodyTextSnippet: string;
  fullCleanText: string;
  wordCount: number;
  openGraph: Record<string, string>;
  hasFaqStructure: boolean;
  hasAuthorOrOrg: boolean;
  analyzedPages?: AnalyzedPage[];
}

export interface AuditRequestPayload {
  targetUrl: string;
  targetKeyword: string;
  customContent?: string;
  apiKey?: string;
  enableLiveSearchGrounding?: boolean;
}

export interface AuditResponsePayload {
  success: boolean;
  data?: AEOResult;
  liveGrounding?: LiveGroundingResult;
  scrapedData?: {
    url: string;
    title: string;
    description: string;
    wordCount: number;
    schemaMarkupDetected: boolean;
    schemasCount: number;
    analyzedPages?: AnalyzedPage[];
  };
  error?: string;
}
