import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order confirmed",
  description: "Your order with Sentiera Technologies has been received.",
};

export default async function CheckoutSuccess({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; success?: string }>;
}) {
  const { order, success } = await searchParams;
  const confirmed = success === "true" || success === "1" || Boolean(order);

  return (
    <div className="relative bg-white">
      <section className="relative overflow-hidden border-b border-hairline pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-2xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>Checkout</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl font-bold tracking-tight-heading text-slate-950">
            {confirmed ? "We’ve received your order." : "Thanks for visiting."}
          </h1>
          <p className="mt-4 font-sans text-lg text-slate-700">
            {confirmed
              ? "The team will be in touch shortly. You can also reach us at hello@sentieratech.com."
              : "If something looks incomplete, email hello@sentieratech.com and we’ll sort it."}
          </p>
          {order ? (
            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-slate-500">
              Reference: {order}
            </p>
          ) : null}
          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-sm bg-tech-blue px-8 py-4 font-mono text-xs font-semibold uppercase tracking-wider text-white shadow-tech-button transition-all duration-200 hover:bg-tech-blue-600"
            >
              Back to home →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
