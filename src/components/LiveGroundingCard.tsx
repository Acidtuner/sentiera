"use client";

import React from "react";
import { LiveGroundingResult } from "@/types/aeo";

interface Props {
  data?: LiveGroundingResult;
}

export default function LiveGroundingCard({ data }: Props) {
  if (!data || !data.executed) return null;
  return (
    <div className="bg-white p-4 rounded-xl border border-hairline text-sm">
      <p className="font-mono text-xs uppercase text-slate-500 mb-1">Live Grounding</p>
      <p>{data.aiVerdictSummary}</p>
    </div>
  );
}
