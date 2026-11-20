import { NextResponse } from "next/server";
import { getJob } from "@/lib/jobs";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const job = await getJob(id);
    if (!job) return NextResponse.json({ success: false, error: "Check not found." }, { status: 404 });
    return NextResponse.json({ success: true, job });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not read the check.";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
