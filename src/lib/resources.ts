export type ResourceSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type ResourceArticle = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  isoDate: string;
  readTime: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
  sections?: ResourceSection[];
};

export const resources: ResourceArticle[] = [
  {
    slug: "ai-agents-vs-saas",
    title: "Are AI agents the new SaaS? What GCC companies can use them for now",
    excerpt:
      "AI agents will not replace SaaS wholesale. They take away the parts where the software sits and waits for a person to do the work.",
    date: "19 November 2026",
    isoDate: "2026-11-19",
    readTime: "6 min",
    image: "/resources/ai-agents-vs-saas.jpg",
    imageAlt: "A SaaS dashboard shattering into a pathway of agent nodes ending at a human review",
    paragraphs: [
      "AI agents will not replace SaaS wholesale. They take away parts of it: the parts where the software sits and waits for a person to do the work.",
      "At Sentiera Technologies, we are building for companies in the GCC from Abu Dhabi. Here is what we have learned from replacing a tool with agents ourselves, and what we think it means for a GCC business buying software today.",
    ],
    sections: [
      {
        heading: "What's the difference between an AI agent and SaaS?",
        paragraphs: [
          "SaaS gives a team a tool. The team logs in and does the work inside it. You pay for access, usually per seat.",
          "An AI agent does a defined piece of the work itself. It takes an input, produces an output, and hands it to a person to check. You are no longer paying for a place to do the work. You are paying for work that gets done.",
        ],
      },
      {
        heading: "Will AI agents replace SaaS, or sit alongside it?",
        paragraphs: [
          "Our view: agents take away parts of SaaS applications, not the whole category.",
          "Most software has two kinds of features. Some help a person think, decide or collaborate. Others are passive: they store work, display it or move it to the next person. The passive parts are the ones agents take over first, because an agent can do the step instead of waiting for someone to do it.",
          "The tool does not disappear overnight. It gets thinner, until one day you notice you are paying for features nobody opens.",
        ],
      },
      {
        heading: "What does this look like in practice?",
        paragraphs: [
          "Our team in Bangalore used storyboard software for video work. It did what it promised: it gave us a place to build storyboards. But every frame still depended on a person filling it in.",
          "So we replaced it with a workflow on a self-hosted automation platform, run by specialised AI agents. Each agent handles one step:",
        ],
        list: [
          "One turns the script into a screenplay.",
          "One generates the storyboard slides from the screenplay.",
          "One produces the final art renders.",
        ],
      },
      {
        heading: "A person still signs off",
        paragraphs: [
          "A person reviews and edits the output at every step before it moves on. The agents do the first pass; our team keeps the judgement.",
          "The result was a better cost structure and a faster route to market. Not because the model was clever, but because we redesigned the work around it.",
        ],
      },
      {
        heading: "Where can a GCC company use AI agents today?",
        paragraphs: [
          "Start with the work your team repeats every week and mostly moves from one place to another. Good first candidates:",
        ],
        list: [
          "Turning one input into several outputs. A brief becomes a draft, a draft becomes versions for each channel, and someone signs off.",
          "Preparing documents for review. Pulling details from a quote, a contract or an RFQ into a standard summary before a person checks it.",
          "Keeping content current. Updating product pages, FAQs and listings so customers and AI answer engines see the same, correct information.",
          "First-line enquiries. Sorting and drafting replies to routine questions, with a person approving anything that commits the business.",
        ],
      },
      {
        heading: "The test",
        paragraphs: [
          "The test is simple: if the software only stores or passes along work a person still has to do, an agent can probably do that step.",
        ],
      },
      {
        heading: "What should a GCC buyer ask before buying an AI agent?",
        paragraphs: [
          "Three questions matter more than which model sits underneath.",
          "Does it know our workflow? An agent is only as good as the steps it follows. Our storyboard pipeline works because we know what a good screenplay, storyboard and render look like, and where each one usually goes wrong. Ask the vendor to show you the steps, not just the demo.",
          "Where does a person sign off? No serious business should hand real work to an agent without clear limits, a human approval and a record of what the agent did. In our workflow, nothing moves forward without approval. That is not a weakness of the agent. It is what makes it usable.",
          "Where does our data go, and what does each run cost? Ask where the model runs and whether your data leaves the country. Across the GCC, the UAE, Saudi Arabia and the financial free zones each set their own conditions for sending personal data abroad. A self-hosted workflow lets you choose where it sits. Rules change, so confirm with your advisor. Agents also use storage and compute every time they run, so ask what each run costs and who pays for it. We self-host our own workflow to keep both the data and the cost under control.",
          "How you pay for that work is a separate question. We wrote about it in our piece on outcome-based pricing: https://www.linkedin.com/pulse/outcome-based-pricing-why-software-subscriptions-making-attoor-27trf/",
        ],
      },
      {
        heading: "Why is a thin wrapper around someone else's model a weak product?",
        paragraphs: [
          "If a product is a nice screen on top of someone else's model, the next model update can copy it.",
          "What lasts is everything around the model: the workflow, the steps, the human checks, and the cost discipline. Our gains did not come from a better model. They came from knowing the work well enough to rebuild it.",
          "That is why the best partner for an agent is often not a pure software vendor. It is a team that already knows the workflow inside out and will build the agent around it.",
        ],
      },
      {
        heading: "The real question",
        paragraphs: [
          "For a GCC business, the question is not \"should we buy an AI agent?\" It is \"which part of our software just waits for a person?\"",
          "Which tool in your stack would you replace first?",
        ],
      },
    ],
  },
  {
    slug: "ai-procurement-pipeline",
    title: "The AI procurement pipeline: how to check whether AI recommends you to B2B buyers",
    excerpt:
      "A buyer can start a supplier search by asking an AI tool. If it does not name you, you may never hear about the enquiry you lost.",
    date: "18 November 2026",
    isoDate: "2026-11-18",
    readTime: "6 min",
    image: "/resources/ai-procurement-pipeline.jpg",
    imageAlt: "A website dissolving into a structured pathway toward a recommendation node",
    paragraphs: [
      "A B2B buyer can now start a supplier search by asking an AI tool instead of opening ten websites. If that tool does not name you, you may never hear about the enquiry you lost. Here is how to see where you stand, and what to fix first.",
    ],
    sections: [
      {
        heading: "What has changed in how buyers find suppliers?",
        paragraphs: [
          "A procurement officer used to search, click through to supplier websites and build a shortlist by hand. Now they can ask ChatGPT, Google's AI Overviews or an in-house AI tool to do that first pass: which suppliers in the UAE make stainless steel valves to ASME standards, or which ISO 9001 machining vendors ship to Saudi Arabia.",
          "The tool reads what it can find, picks a few names and summarises them. The buyer often starts from that answer. Your website still matters, but the first impression may now happen in someone else's interface.",
        ],
      },
      {
        heading: "How do you know if AI tools recommend you?",
        paragraphs: [
          "You can check this yourself in about 15 minutes.",
          "Write down five questions your buyers ask before they contact a supplier. Use their words, not yours: the product, the standard, the location, the quantity.",
          "Ask each one in two or three AI tools, such as ChatGPT, Gemini and Google with AI Overviews.",
          "Note three things for each answer. Are you named? Is what it says about you correct? Which sources does it cite or link to?",
          "If competitors appear and you do not, or you appear with the wrong capabilities, the problem is usually not your product. It is that the information AI needs about you is missing, hard to read, or inconsistent.",
        ],
      },
      {
        heading: "Why do AI tools skip a capable supplier?",
        paragraphs: ["It usually comes down to a few things:"],
        list: [
          "Key facts are locked in PDFs or images. Tolerances, materials, certifications and capacities sit in a brochure scan or a product photo, not in text on a page.",
          "One page tries to say everything. A single Products page lists twenty capabilities in a line each, so no page clearly answers any one question.",
          "The basics are not stated plainly. Where you are based, which markets you serve, which standards you meet and typical lead times are not written anywhere a machine can find them.",
          "Your facts disagree with each other. The website, directory listings and LinkedIn page give different addresses, names or product ranges, so an AI cannot be sure which is right.",
        ],
      },
      {
        heading: "What should you fix first?",
        paragraphs: ["Start with what a buyer asks before they ever contact you."],
        list: [
          "Give each core capability its own page, written in plain text, with the specifications buyers compare.",
          "Answer the real questions on the page. Add a short FAQ for each capability: standards, materials, minimum order, lead time, delivery regions.",
          "Add structured data so search engines and AI tools can read your organisation, products and FAQs without guessing.",
          "Make your facts match everywhere. Use the same company name, address, certifications and product names on your site, directories and social profiles.",
          "Check again every month. Ask the same five questions and see what changed.",
        ],
      },
      {
        heading: "Where does Sentiera fit?",
        paragraphs: [
          "None of this guarantees that an AI tool will recommend you. What it does is remove the reasons it cannot.",
          "This is the work we do. From Abu Dhabi, our team rebuilds a B2B brand's website and content so AI tools and search engines can read, understand and cite it, and then keeps it current as buyers' questions change.",
        ],
      },
      {
        heading: "See what AI tells your buyers about you",
        paragraphs: [
          "Send us your website and the three questions your buyers ask most. Our Abu Dhabi team will run them through the main AI tools and show you what comes back: whether you are named, what is said about you, and the first three things we would fix.",
          "Email hello@sentieratech.com with the subject AI visibility check, or call +971 58 573 7464.",
        ],
      },
    ],
  },
  {
    slug: "knowledge-graphs-vs-keywords",
    title: "Knowledge Graphs vs. Keywords: The Technical Shift to Answer Engine Optimisation",
    excerpt:
      "Answer engines do not rank keywords. They map entities and relationships. A knowledge graph is how a brand becomes retrievable.",
    date: "18 November 2026",
    isoDate: "2026-11-18",
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
    isoDate: "2026-11-18",
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
    isoDate: "2026-11-18",
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
    isoDate: "2026-11-18",
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
    isoDate: "2026-11-17",
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
