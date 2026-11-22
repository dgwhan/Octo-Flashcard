import type { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/seo";
import { ROUTES } from "@/src/config/routes";
import { GRAMMAR_ROADMAP_TOPICS } from "@/src/features/grammar/data";
import { VOA_LESSONS } from "@/src/features/voa/data/voa.data";

// Public, indexable pages only: user flashcard sets and auth pages are left out on purpose.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path}`;
  const modules = [
    ROUTES.ROADMAP,
    ROUTES.VOA,
    ROUTES.VOCABULARY,
    ROUTES.GRAMMAR,
    ROUTES.SPEAKING,
    ROUTES.SPEAKING_SHADOWING,
    ROUTES.SPEAKING_PRONUNCIATION,
    ROUTES.SPEAKING_ROLEPLAY,
    ROUTES.SPEAKING_IELTS,
    ROUTES.SENTENCES,
    ROUTES.IPA,
    ROUTES.DICTIONARY,
  ];

  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    ...modules.map((p) => ({ url: url(p), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...GRAMMAR_ROADMAP_TOPICS.map((t) => ({ url: url(ROUTES.GRAMMAR_DETAIL(t.id)), priority: 0.6 })),
    ...VOA_LESSONS.map((l) => ({ url: url(ROUTES.VOA_DETAIL(l.slug)), priority: 0.6 })),
  ];
}
