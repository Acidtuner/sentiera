export type ResourceArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
};

export const resources: ResourceArticle[] = [
  {
    slug: "ai-procurement-pipeline",
    title: "The AI Procurement Pipeline: Why B2B Buyers Are Bypassing Your Website",
    excerpt:
      "Enterprise buyers no longer comb through brochures. They ask an AI to build the shortlist. If your data is unreadable, you are skipped.",
    date: "18 November 2026",
    readTime: "4 min",
    image: "/resources/ai-procurement-pipeline.jpg",
    imageAlt: "A website dissolving into a structured pathway toward a recommendation node",
    paragraphs: [
      "For years, enterprise procurement followed a predictable digital pathway: buyers searched for solutions, clicked through to manufacturer websites, and manually combed through brochures and product pages to compile vendor lists. Today, that manual scavenger hunt is being replaced by artificial intelligence.",
      "Enterprise procurement officers and technical buyers are increasingly deploying AI agents and large language models to do the heavy lifting. Instead of browsing, they ask platforms such as ChatGPT, Google AI Overviews, or enterprise-specific tools to compile vendor shortlists, compare technical specifications, and summarise capabilities in seconds.",
      "The implications for B2B brands are direct. Modern buyers want immediate, synthesised answers. If your technical data is locked in unstructured formats, or hidden behind visually heavy pages that AI crawlers cannot easily parse, your brand will not be included in the synthesised response. When the AI skips you, a competitor is recommended by default.",
      "To protect the revenue pipeline, a brand has to move from being merely searchable to being recommended by the AI systems that enterprise buyers trust. That requires a shift in digital infrastructure, so capabilities are explicitly mapped and readable for machine ingestion.",
    ],
  },
  {
    slug: "knowledge-graphs-vs-keywords",
    title: "Knowledge Graphs vs. Keywords: The Technical Shift to Answer Engine Optimisation",
    excerpt:
      "Answer engines do not rank keywords. They map entities and relationships. A knowledge graph is how a brand becomes retrievable.",
    date: "18 November 2026",
    readTime: "4 min",
    image: "/resources/knowledge-graphs-vs-keywords.jpg",
    imageAlt: "A knowledge graph of connected nodes with a central accent node",
    paragraphs: [
      "For over a decade, digital marketing success was measured by keyword density, backlink profiles and organic page rankings. With the mainstream adoption of generative AI search, that measure is no longer enough.",
      "Transitioning to Answer Engine Optimisation is not only a marketing task. It is a data engineering requirement. AI platforms do not read keywords the way legacy search engines did. They map entities, relationships and context. To feed these systems, enterprises need a knowledge graph.",
      "A knowledge graph uses structured data, clear entity relationships and semantic HTML to tell a model exactly who a company is, what it does, and how its products relate to specific industry problems. It turns a static website into a structured source ready for retrieval-augmented generation.",
      "If the current infrastructure still relies on legacy SEO tactics alone, it is being optimised for a version of the internet that is fading. Winning in the era of generative AI means replacing keyword stuffing with structured data that answer engines can trust and retrieve.",
    ],
  },
  {
    slug: "surviving-the-zero-click-web",
    title: "Surviving the Zero-Click Web: Is Your Enterprise Brand Invisible to AI?",
    excerpt:
      "The answer now appears before the click. If the model omits your brand, the deal can be lost before you know the buyer existed.",
    date: "18 November 2026",
    readTime: "4 min",
    image: "/resources/surviving-the-zero-click-web.jpg",
    imageAlt: "A search interface synthesising an answer while a brand silhouette sits outside it",
    paragraphs: [
      "The internet is moving toward a zero-click environment. When a user asks a complex question, AI engines synthesise an answer on the search interface. The user gets the information, and the journey can end before a link is clicked.",
      "Imagine a prospective client asking a model to recommend the top suppliers in your industry and region. If the AI invents incorrect information about your services, or simply omits your brand because the data is inaccessible, the deal is lost without you knowing the prospect existed.",
      "That is a direct threat to enterprise market share. Surviving the zero-click web requires a clear view of how the brand is perceived by large language models. Enterprises need to audit recommendation rates, so identity, location and core services are explicit to natural language systems.",
      "If your brand is invisible to AI, you are invisible to the modern buyer.",
    ],
  },
  {
    slug: "industrial-intelligence",
    title: "Industrial Intelligence: Structuring Legacy Manufacturing Data for the AI Era",
    excerpt:
      "Decades of specifications trapped in PDFs are a liability when procurement bots only read machine-readable data.",
    date: "18 November 2026",
    readTime: "4 min",
    image: "/resources/industrial-intelligence.jpg",
    imageAlt: "Stacked documents transforming into a structured industrial lattice",
    paragraphs: [
      "Traditional manufacturing, logistics and heavy industry brands in the UAE and the wider GCC often hold real enterprise value on outdated digital infrastructure. Decades of specifications, supply-chain data and product catalogues sit in static PDFs or unstructured databases.",
      "In the AI era, those formats are a liability. AI is moving into the shop floor and the procurement chain. Modern procurement agents are built to extract, compare and verify technical capabilities. If they meet a decade-old site with unstructured data, they skip it and move to a competitor whose data is machine-readable.",
      "Enterprises need to convert legacy industrial data into AI-readable assets. That means moving catalogue PDFs into schema-rich web environments and applying precise semantic markup.",
      "For heavy industry, adapting to Answer Engine Optimisation is not a branding exercise. It is how supply-chain capabilities stay digitally verified and accessible to the autonomous procurement systems of tomorrow.",
    ],
  },
  {
    slug: "the-execution-gap",
    title: "The Execution Gap: Why Enterprise AI Requires Both Boardroom Strategy and Deep Engineering",
    excerpt:
      "Agencies often lack the engineering. Offshore shops often lack the boardroom. The gap between them is where AI programmes stall.",
    date: "18 November 2026",
    readTime: "4 min",
    image: "/resources/the-execution-gap.jpg",
    imageAlt: "A strategy plane and an engineering lattice meeting at a central node",
    paragraphs: [
      "As the urgency to adapt to Answer Engine Optimisation grows, many enterprise brands fall into an execution gap. Local marketing agencies often fail at AI integration because they lack the engineering talent required to build structured data architectures. Pure offshore development shops often fail because they lack the strategic context and boardroom presence needed to align technology with enterprise goals.",
      "Sentiera Technologies Limited was built to close that gap. We operate as a consultancy with its own production floor, pairing strategy with technical scale.",
      "Enterprise architecture, boardroom strategy and client advisory are led from our headquarters in Masdar City, Abu Dhabi. The heavy lifting — AI infrastructure, web deployment and high-volume structured content — is driven by our dedicated technical hub in Bangalore.",
      "Clients receive strategic alignment in the UAE, backed by the engineering required to rebuild their digital ecosystems for the AI era.",
    ],
  },
  {
    slug: "death-of-the-ten-blue-links",
    title: "The Death of the Ten Blue Links: Why Your Brand Needs an Architecture Shift",
    excerpt:
      "Buyers no longer browse ten results. They ask an AI and receive one answer. If your brand is not cited, you are invisible.",
    date: "17 November 2026",
    readTime: "4 min",
    image: "/resources/death-of-the-ten-blue-links.jpg",
    imageAlt: "Ten blue links dissolving into a single pathway toward a geometric structure",
    paragraphs: [
      "For over a quarter century, the digital economy was built on a simple promise: rank in the top ten results, and the traffic will follow. We called them the ten blue links. That era is over.",
      "Today, B2B buyers and consumers do not search to browse. They ask to receive. Platforms such as ChatGPT, Perplexity and Google AI Overviews read the web and synthesise a single answer. The journey often ends before a link is clicked.",
      "For enterprise brands, this is a tangible threat. If your brand is not cited by the AI, you effectively do not exist to that market. This is the shift from search engine optimisation to answer engine optimisation.",
      "To stay visible in this landscape, the digital infrastructure has to change. Fragmented, visually heavy websites are hard for models to read. AI systems need clear semantic markup, structured data and dense entity relationships.",
      "Sentiera Technologies Limited bridges this gap. Strategic leadership and client architecture are led from Masdar City. Technical execution, custom model integration and high-volume content are driven by our dedicated hub in Bangalore.",
      "Sourza, our proprietary autonomous B2B procurement platform, is proof of what is possible. We do not only advise on AI. We build the digital infrastructure that enables it.",
      "Do not let your brand be rendered invisible. Architect the intelligence pathway with Sentiera, and be the business AI recommends.",
    ],
  },
];

export function getResource(slug: string) {
  return resources.find((item) => item.slug === slug);
}
