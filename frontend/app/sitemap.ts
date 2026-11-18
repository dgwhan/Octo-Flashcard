import type { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/seo";
import { ROUTES } from "@/src/config/routes";
import { GRAMMAR_ROADMAP_TOPICS } from "@/src/features/grammar/grammar.data";
import { VOA_LESSONS } from "@/src/features/voa/voa.data";
import { LIBRIVOX_AUDIOBOOKS } from "@/src/features/audiobooks/audiobook.data";

// Public, indexable pages only: user flashcard sets and auth pages are left out on purpose.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path}`;
  const modules = [
    ROUTES.VOA,
    ROUTES.VOCABULARY,
    ROUTES.GRAMMAR,
    ROUTES.AUDIOBOOKS,
    ROUTES.TATOEBA,
    ROUTES.IPA,
    ROUTES.DICTIONARY,
  ];

  return [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    ...modules.map((p) => ({ url: url(p), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...GRAMMAR_ROADMAP_TOPICS.map((t) => ({ url: url(ROUTES.GRAMMAR_DETAIL(t.id)), priority: 0.6 })),
    ...VOA_LESSONS.map((l) => ({ url: url(ROUTES.VOA_DETAIL(l.slug)), priority: 0.6 })),
    ...LIBRIVOX_AUDIOBOOKS.map((b) => ({ url: url(ROUTES.AUDIOBOOKS_DETAIL(b.slug)), priority: 0.5 })),
  ];
}
