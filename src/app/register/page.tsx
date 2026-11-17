"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/?auth=register");
  }, [router]);
  return (
    <div className="min-h-[40vh] flex items-center justify-center">
      <p className="font-mono text-sm text-slate-500">Redirecting…</p>
    </div>
  );
}
