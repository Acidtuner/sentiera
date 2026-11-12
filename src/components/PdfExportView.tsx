"use client";

import React from "react";
import { AEOResult } from "@/types/aeo";

interface Props {
  result: AEOResult;
  targetUrl: string;
  targetKeyword: string;
}

export default function PdfExportView({ result, targetUrl, targetKeyword }: Props) {
  return (
    <div className="hidden print:block p-8">
      <h1>sentiera Cortex Report</h1>
      <p>{targetUrl} — {targetKeyword}</p>
      <p>Score: {result.overall_aeo_score}/100</p>
      <p>{result.diagnostic_summary}</p>
    </div>
  );
}
