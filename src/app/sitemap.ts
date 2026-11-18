import type { MetadataRoute } from "next";
import { resources } from "@/lib/resources";

const SITE = "https://www.sentieratech.com";

const staticRoutes = [
  "",
  "/about",
  "/products",
  "/products/sourza",
  "/cortex",
  "/resources",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE}${path || "/"}`,
      lastModified: "2026-11-18",
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : 0.7,
    })),
    ...resources.map((article) => ({
      url: `${SITE}/resources/${article.slug}`,
      lastModified: article.isoDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
