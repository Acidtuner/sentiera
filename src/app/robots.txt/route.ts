const SITE = "https://www.sentieratech.com";

export function GET() {
  const body = [
    "User-Agent: *",
    "Content-Signal: search=yes, ai-train=no",
    "Allow: /",
    "",
    "User-Agent: GPTBot",
    "Allow: /",
    "",
    "User-Agent: ChatGPT-User",
    "Allow: /",
    "",
    "User-Agent: Google-Extended",
    "Allow: /",
    "",
    "User-Agent: PerplexityBot",
    "Allow: /",
    "",
    "User-Agent: ClaudeBot",
    "Allow: /",
    "",
    "User-Agent: anthropic-ai",
    "Allow: /",
    "",
    "User-Agent: Applebot-Extended",
    "Allow: /",
    "",
    `Host: ${SITE}`,
    `Sitemap: ${SITE}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
