import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Bridge: A Short Story",
  description:
    "A short story about the three eras of human economics: Capture, Convince, and Coordinate. How do we get what we need without taking it or tricking people into giving it?",
  openGraph: {
    title: "The Bridge: A Short Story | The Alignment Economy",
    description:
      "A short story about the three eras of human economics and the path to a system where cooperation wins.",
    url: "https://alignmenteconomy.org/bridge",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
