import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Join the Alignment Economy. Build the protocol, connect us with collaborators, run the blockchain as a miner, or sign up to be notified when we launch.",
  openGraph: {
    title: "Get Involved | The Alignment Economy",
    description:
      "Build, connect, mine, or participate. Join the team building a new economic system.",
    url: "https://alignmenteconomy.org/get-involved",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
