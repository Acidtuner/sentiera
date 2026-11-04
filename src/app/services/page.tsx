import React from "react";
import type { Metadata } from "next";
import ServicesAccordion, { type ServiceItem } from "@/components/ServicesAccordion";

export const metadata: Metadata = {
  title: "Services | SEO, AEO, Web & Creative | Sentiera",
  description: "SEO, AEO, digital strategy, websites, social creatives, video, brochures, events graphics and internal communications for businesses in Abu Dhabi and Dubai.",
};

const services: ServiceItem[] = [
  {
    id: "seo-aeo",
    title: "SEO and AEO",
    summary: "SEO and AEO make your business easier to find on Google and more likely to be named in AI answers. We work on your pages, listings and technical set-up so search engines and AI tools understand who you are, what you do and where you work.",
    detail: "Clear pages, real answers to real questions, and consistent business details form the base. We plan both SEO and AEO together so your visibility work compounds.",
    items: ["Website and search audit", "Pages written around the questions your customers ask", "Google Business Profile and local listings", "Structured data and technical fixes"],
    cta: "Review your visibility",
    ctaHref: "/contact?intent=visibility-review",
  },
  {
    id: "digital-marketing-strategy",
    title: "Digital marketing strategy",
    summary: "A digital marketing strategy sets out where to focus, what to say and in what order. You get one clear plan that ties search, social, content and events together, agreed with your Abu Dhabi lead.",
    detail: "We review current channels, set audience and message priorities, and turn that into a practical plan by channel and quarter, with regular reviews as it runs.",
    items: ["Review of your current channels and content", "Audience and message priorities", "A practical plan by channel and quarter", "Regular reviews as the plan runs"],
    cta: "Discuss your strategy",
    ctaHref: "/contact",
  },
  {
    id: "social-media-creatives",
    title: "Social media creatives",
    summary: "Social media creatives are the posts, graphics and short videos that keep your brand visible and consistent. We plan, design and write them to your brand guidelines, month by month.",
    detail: "Steady posting supports both brand presence and the signals search engines and AI tools use to understand what you do.",
    items: ["Monthly content calendar", "Post designs, carousels and short videos", "Captions written for each platform", "Scheduling and publishing support"],
    cta: "Plan your social content",
    ctaHref: "/contact",
  },
  {
    id: "website-design",
    title: "Website design and management",
    summary: "Website design and management covers building your site and keeping it current. You get clear, fast pages written for customers, search engines and AI tools, with ongoing updates handled by us.",
    detail: "Structure, design, build and technical SEO are set from the start, with hosting and maintenance support afterwards.",
    items: ["Site structure, design and build", "Page copy written around customer questions", "Hosting, updates and maintenance support", "Technical SEO set-up from the start"],
    cta: "Discuss your website",
    ctaHref: "/contact",
  },
  {
    id: "video-photography",
    title: "Brand video and photography",
    summary: "Brand video and photography show your people, products and premises as they are. We plan each shoot around where the content will be used, then edit and deliver it ready for each channel.",
    detail: "Assets are produced for website, social and search use so the same shoot supports multiple channels.",
    items: ["Shoot planning and scripting", "Brand, product, team and location photography", "Brand films and short videos for social and web", "Editing and delivery in each channel's formats"],
    cta: "Plan a shoot",
    ctaHref: "/contact",
  },
  {
    id: "brochures-print",
    title: "Brochures and printed collateral",
    summary: "Brochures and printed collateral give clients and partners something clear to take away. We write and design them to match your brand and your digital content.",
    detail: "Company and product materials are produced as print-ready files that stay consistent with your online presence.",
    items: ["Company and product brochures", "Profiles, flyers and leave-behinds", "Copywriting and layout", "Print-ready files"],
    cta: "Discuss your brochure",
    ctaHref: "/contact",
  },
  {
    id: "events-graphics",
    title: "Events graphics",
    summary: "Events graphics give your stand, stage and screens a consistent look. We design the full set for your event, from pre-event promotion to on-site displays and follow-up posts.",
    detail: "Stand, backdrop, presentation and social creatives are designed as one system for the event.",
    items: ["Stand, backdrop and banner designs", "Presentation and screen graphics", "Pre-event and follow-up social creatives", "Print-ready and screen-ready files"],
    cta: "Plan your next event",
    ctaHref: "/contact",
  },
  {
    id: "internal-communications",
    title: "Internal communications",
    summary: "Internal communications keep your teams informed and connected. We write and design the newsletters, announcements and campaigns your people actually read.",
    detail: "Newsletters, internal campaign creatives, presentations and reusable templates are produced for your teams.",
    items: ["Newsletters and announcements", "Internal campaign creatives", "Presentations and town-hall materials", "Templates your team can reuse"],
    cta: "Discuss internal comms",
    ctaHref: "/contact",
  },
];

export default function Services() {
  return (
    <div className="relative bg-white">
      <section className="relative overflow-hidden border-b border-hairline pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 [background-image:radial-gradient(#0066FF_0.75px,transparent_0.75px)] [background-size:32px_32px]" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[360px] bg-tech-blue/5 blur-[120px] rounded-full" aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest-tag text-tech-blue font-semibold mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-tech-blue" />
            <span>Services</span>
          </div>
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight-heading text-slate-950">Our services</h1>
          <p className="mt-6 font-sans text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">Strategy and client leadership from Masdar City, Abu Dhabi. Delivery by our full production team.</p>
        </div>
      </section>

      <section className="relative bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <ServicesAccordion services={services} />
        </div>
      </section>
    </div>
  );
}
