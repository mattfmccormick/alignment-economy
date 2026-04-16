import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fund the Build",
  description:
    "Support the Alignment Economy, a nonprofit building a new economic system. Donations go directly to research, engineering, and building in the open.",
  alternates: { canonical: "https://alignmenteconomy.org/fund" },
  openGraph: {
    title: "Fund the Build | The Alignment Economy",
    description:
      "Nonprofit. Funds go directly to research, engineering, and building in the open.",
    url: "https://alignmenteconomy.org/fund",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
