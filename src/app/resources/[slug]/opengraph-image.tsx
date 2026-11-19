import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getResource } from "@/lib/resources";

export const alt = "Sentiera resource";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ResourceOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getResource(slug);
  const title = article?.title || "Sentiera Resources";

  let imageSrc = "";
  if (article) {
    const file = await readFile(path.join(process.cwd(), "public", article.image.replace(/^\//, "")));
    imageSrc = `data:image/jpeg;base64,${file.toString("base64")}`;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f8fafc",
          color: "#0f172a",
        }}
      >
        {imageSrc ? (
          <img src={imageSrc} width={630} height={630} style={{ width: 630, height: 630, objectFit: "cover" }} />
        ) : (
          <div style={{ width: 630, height: 630, background: "#0066FF" }} />
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 570,
            padding: "48px",
          }}
        >
          <div style={{ fontSize: 18, letterSpacing: 3, color: "#0066FF", textTransform: "uppercase" }}>
            Sentiera
          </div>
          <div style={{ marginTop: 20, fontSize: 40, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
