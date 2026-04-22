import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alignmenteconomy.org"),
  title: {
    default: "The Alignment Economy | A New Way to Measure and Transfer Value",
    template: "%s | The Alignment Economy",
  },
  description:
    "The dollar buys less every year. AI is coming for your job. Your mom's work was never counted. The Alignment Economy is a nonprofit building a new way to measure and transfer value.",
  keywords: [
    "alignment economy",
    "new economic system",
    "proof of human",
    "daily point allocations",
    "alternative to fiat",
    "alternative to bitcoin",
    "nonprofit economics",
    "invisible labor",
    "caregiving economy",
    "economic reform",
    "decentralized currency",
    "daily rebasing",
  ],
  authors: [{ name: "The Alignment Economy" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alignmenteconomy.org",
    siteName: "The Alignment Economy",
    title: "The Alignment Economy | A New Way to Measure and Transfer Value",
    description:
      "The dollar buys less every year. AI is coming for your job. Your mom's work was never counted.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Alignment Economy",
    description:
      "The dollar buys less every year. AI is coming for your job. Your mom's work was never counted.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://alignmenteconomy.org",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PTYC6Z2P8G" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PTYC6Z2P8G');
            `,
          }}
        />
        {/* Structured data for Google/AI search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "The Alignment Economy",
              url: "https://alignmenteconomy.org",
              logo: "https://alignmenteconomy.org/apple-touch-icon.png",
              image: "https://alignmenteconomy.org/apple-touch-icon.png",
              description:
                "The dollar buys less every year. AI is coming for your job. Your mom's work was never counted. A nonprofit building a new way to measure and transfer value.",
              foundingDate: "2025",
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@alignmenteconomy.org",
                contactType: "general",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "The Alignment Economy",
              url: "https://alignmenteconomy.org",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
