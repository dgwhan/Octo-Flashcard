import type { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // personal study pages and API proxies have nothing for search engines
      disallow: ["/api/", "/auth/", "/flashcards/create"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
