import type { Metadata } from "next";
import AppLayout from "@/src/components/layout/AppLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Octo Flashcard",
  description: "English flashcard learning application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
