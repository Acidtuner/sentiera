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
