import type { Metadata } from "next";

export const siteConfig = {
  name: "Octo Flashcard",
  shortName: "OctoCard",
  description:
    "Nền tảng học từ vựng và ngoại ngữ thông minh bằng phương pháp lật thẻ Flashcard 2 mặt, phát âm Audio chuẩn và tự đánh giá độ ghi nhớ.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/icon.jpg",
  keywords: [
    "flashcard",
    "học từ vựng tiếng anh",
    "thẻ ghi nhớ",
    "octo flashcard",
    "study english",
    "spaced repetition",
    "phát âm tiếng anh",
    "active recall",
    "từ vựng ielts",
    "từ vựng toeic",
  ],
  authors: [{ name: "Octo Flashcard Team", url: "https://octoflashcard.com" }],
  creator: "Octo Flashcard",
};

interface CreatePageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  path = "",
  keywords = siteConfig.keywords,
  noIndex = false,
}: CreatePageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;

  return {
    title,
    description,
    keywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      locale: "vi_VN",
      type: "website",
      images: [
        {
          url: siteConfig.ogImage,
          width: 800,
          height: 800,
          alt: `${siteConfig.name} - ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}
