import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memes",
  description:
    "The Alignment Economy explained in 36 memes: why fiat is failing, why Bitcoin can't fix it, and how the Alignment Economy works.",
  alternates: { canonical: "https://alignmenteconomy.org/memes" },
  openGraph: {
    title: "Memes | The Alignment Economy",
    description:
      "36 memes explaining why fiat is failing, why Bitcoin can't fix it, and how the Alignment Economy works.",
    url: "https://alignmenteconomy.org/memes",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
