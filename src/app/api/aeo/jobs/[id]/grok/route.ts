import { NextResponse } from "next/server";
import { getJob, updateJob } from "@/lib/jobs";
import { runLiveSearchGrounding } from "@/lib/liveSearchGrounding";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id).catch(() => null);
  if (!job) return NextResponse.json({ success: false, error: "Check not found." }, { status: 404 });

  await updateJob(id, { grok_status: "running" });
  const result = await runLiveSearchGrounding(
    job.target_url,
    job.keyword || "",
    undefined,
    process.env.XAI_API_KEY,
    job.company || ""
  );
  await updateJob(id, { grok_status: result.executed ? "done" : "failed", grok_result: result });
  return NextResponse.json({ success: true, result });
}
