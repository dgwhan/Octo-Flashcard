import type { Metadata, Viewport } from "next";
import AppLayout from "@/src/components/layout/AppLayout";
import { I18nProvider } from "@/src/i18n";
import { siteConfig } from "@/src/config/seo";
import { Fraunces, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

// Display + body; both ship a Vietnamese subset so diacritics stay in one face.
const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  axes: ["opsz"], // SOFT/WONK dropped: they doubled the font payload (~215KB) for a barely visible change
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0b110f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Octo Flashcard · Tám cách học tiếng Anh, một chỗ",
    template: "%s | Octo Flashcard",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Octo Flashcard · Tám cách học tiếng Anh, một chỗ",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Octo Flashcard: nghe hiểu, nói được, nhớ thật lâu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Octo Flashcard · Tám cách học tiếng Anh, một chỗ",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // icons come from app/favicon.ico, app/icon.png and app/apple-icon.png (file conventions)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`h-full antialiased ${fraunces.variable} ${beVietnam.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <I18nProvider>
          <AppLayout>{children}</AppLayout>
        </I18nProvider>
      </body>
    </html>
  );
}
