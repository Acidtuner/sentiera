import { NextResponse } from "next/server";
import { getJob, updateJob } from "@/lib/jobs";
import { runSiteCheck } from "@/lib/siteCheck";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id).catch(() => null);
  if (!job) return NextResponse.json({ success: false, error: "Check not found." }, { status: 404 });

  await updateJob(id, { site_status: "running" });
  try {
    const result = await runSiteCheck(job.target_url);
    await updateJob(id, { site_status: "done", site_result: result });
    return NextResponse.json({ success: true, result });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Site read failed.";
    await updateJob(id, { site_status: "failed", site_result: { error: message } });
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
