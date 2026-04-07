import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "White Paper",
  description:
    "Read the Alignment Economy white paper: a peer-to-peer electronic cash system built on proof of human, daily point allocations, and daily rebasing for stable purchasing power.",
  openGraph: {
    title: "White Paper | The Alignment Economy",
    description:
      "A peer-to-peer electronic cash system built on proof of human, daily point allocations, and daily rebasing.",
    url: "https://alignmenteconomy.org/white-paper",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
