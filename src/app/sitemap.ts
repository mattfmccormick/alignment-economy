import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://alignmenteconomy.org";
  const now = new Date();

  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/white-paper`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/bridge`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/get-involved`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/fund`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/memes`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/demo`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
