import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LINK = '</llms.txt>; rel="describedby"; type="text/plain"';

const HOMEPAGE_MARKDOWN = `# Sentiera Technologies Limited

Be the business AI recommends.

Traditional search is fading. We architect AI infrastructure and answer-engine optimisation so your enterprise is the entity ChatGPT, Gemini and Google AI recommend.

Masdar City, Abu Dhabi, UAE.

## Start here

- [Get a free Cortex snapshot](https://www.sentieratech.com/cortex)
- [Book a Complimentary Visibility Review](https://www.sentieratech.com/contact)

## Products

- [Cortex](https://www.sentieratech.com/cortex): a free snapshot of how clearly your public pages state who you are and what you offer.
- [Sourza](https://www.sentieratech.com/products/sourza): an autonomous B2B procurement marketplace connecting industrial manufacturing with GCC enterprise buyers.

## Company

- [About Sentiera](https://www.sentieratech.com/about)
- [Resources](https://www.sentieratech.com/resources)
- [Contact](https://www.sentieratech.com/contact): hello@sentieratech.com

Agent index: https://www.sentieratech.com/llms.txt
`;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const acceptsMarkdown = request.headers.get("accept")?.includes("text/markdown");

  if (pathname === "/" && acceptsMarkdown) {
    return new NextResponse(HOMEPAGE_MARKDOWN, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Link: LINK,
        Vary: "Accept",
      },
    });
  }

  const response = NextResponse.next();
  if (pathname === "/") {
    response.headers.set("Link", LINK);
    response.headers.set("Vary", "Accept");
  }
  return response;
}

export const config = {
  matcher: ["/"],
};
