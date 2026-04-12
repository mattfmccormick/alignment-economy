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
    "The Alignment Economy is a 501(c)(3) nonprofit building a new economic system with daily point allocations, daily rebasing, and proof of human verification. Fiat is failing. Bitcoin can't fix it. This is the third way.",
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
      "Fiat is failing. Bitcoin can't fix it. The Alignment Economy is a 501(c)(3) building the third way: daily point allocations, daily rebasing, proof of human.",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Alignment Economy",
    description:
      "A new way to measure and transfer value. Daily point allocations. Daily rebasing. Proof of human.",
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
              description:
                "A 501(c)(3) nonprofit building a new economic system that makes invisible labor visible and aligns incentives so cooperation wins.",
              foundingDate: "2025",
              nonprofitStatus: "501(c)(3)",
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
