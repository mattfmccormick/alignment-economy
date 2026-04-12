import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fund the Build",
  description:
    "Support the Alignment Economy, a 501(c)(3) nonprofit building a new economic system. Tax-deductible donations go directly to research, engineering, and building in the open.",
  alternates: { canonical: "https://alignmenteconomy.org/fund" },
  openGraph: {
    title: "Fund the Build | The Alignment Economy",
    description:
      "501(c)(3) nonprofit. Tax-deductible. Funds go directly to research, engineering, and building in the open.",
    url: "https://alignmenteconomy.org/fund",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
