import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Memes",
  description:
    "The Alignment Economy explained in 64 memes across three stages: Awakening (fiat is failing), Crypto Curious (Bitcoin can't fix it), and First Step (how the AE works).",
  openGraph: {
    title: "Memes | The Alignment Economy",
    description:
      "64 memes explaining why fiat is failing, why Bitcoin can't fix it, and how the Alignment Economy works.",
    url: "https://alignmenteconomy.org/memes",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
