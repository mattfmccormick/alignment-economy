import Link from "next/link";
import { SubpageNav, SubpageFooter } from "@/components/site-nav";

export const metadata = {
  title: "Demo | Alignment Economy",
  description:
    "Explore a working demo of the Alignment Economy platform. See the participant dashboard, miner verification queue, and court system in action.",
  alternates: { canonical: "https://alignmenteconomy.org/demo" },
};

const views = [
  {
    href: "/dashboard",
    label: "Participant",
    icon: "👤",
    color: "bg-ae-teal",
    border: "border-ae-teal/20",
    description:
      "See your daily point allocations (Active, Supportive, Ambient), send points to others, register durable goods, vouch for humans, and track your transaction history.",
    features: [
      "1,440 Active Points per day",
      "Send & receive points",
      "Register goods for Supportive Points",
      "Tag spaces for Ambient Points",
      "Vouch for other humans",
      "Transaction history",
    ],
  },
  {
    href: "/miner",
    label: "Miner",
    icon: "⛏️",
    color: "bg-amber-500",
    border: "border-amber-500/20",
    description:
      "Review identity verification requests. Approve or flag accounts based on biometrics, government ID, and vouching chains. Earn points for accurate verification work.",
    features: [
      "Verification request queue",
      "Review biometric submissions",
      "Check vouching chains",
      "Approve / flag / reject",
      "Miner accuracy score",
      "Blockchain explorer",
    ],
  },
  {
    href: "/court",
    label: "Court",
    icon: "⚖️",
    color: "bg-purple-600",
    border: "border-purple-600/20",
    description:
      "Resolve disputes about identity, fraud, and vouching. Serve on juries, review evidence, and issue rulings. Every decision creates precedent for the network.",
    features: [
      "Active dispute queue",
      "Evidence review",
      "Jury selection",
      "Ruling & appeals",
      "Case precedent history",
      "Stake-based arbitration",
    ],
  },
];

export default function DemoPage() {
  return (
    <>
      <SubpageNav />

      {/* Hero */}
      <section className="bg-ae-navy pt-24 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-ae-teal/10 border border-ae-teal/30 text-ae-teal text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-ae-teal rounded-full animate-pulse" />
            Live Demo
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            See it working.
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            This is a functional demo of the Alignment Economy platform with
            simulated data. Explore every side of the system: earn points, verify
            humans, resolve disputes.
          </p>
        </div>
      </section>

      {/* View cards */}
      <section className="bg-ae-warm py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {views.map((v) => (
              <Link
                key={v.href}
                href={v.href}
                className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div
                  className={`w-14 h-14 ${v.color} rounded-2xl flex items-center justify-center text-2xl mb-5`}
                >
                  {v.icon}
                </div>
                <h2 className="font-heading text-xl font-bold text-ae-navy mb-2 group-hover:text-ae-teal transition-colors">
                  {v.label} View
                </h2>
                <p className="text-ae-slate text-sm leading-relaxed mb-5">
                  {v.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {v.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <svg
                        className="w-4 h-4 text-ae-teal shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-1 text-ae-teal text-sm font-medium group-hover:gap-2 transition-all">
                  Launch {v.label} View
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          {/* How it connects */}
          <div className="mt-16 bg-white rounded-2xl border border-gray-100 p-8 md:p-12">
            <h2 className="font-heading text-2xl font-bold text-ae-navy mb-6 text-center">
              How the pieces fit together
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl mb-3">👤</div>
                <h3 className="font-semibold text-ae-navy mb-2">
                  Participants earn & spend
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Every verified human gets 1,440 Active Points daily. Spend
                  them on goods, services, or gift them. They expire at midnight,
                  so hoarding is pointless.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">⛏️</div>
                <h3 className="font-semibold text-ae-navy mb-2">
                  Miners verify humans
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Instead of burning electricity (proof of work), miners verify
                  that each account belongs to a real person. They earn points
                  for accurate verification.
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">⚖️</div>
                <h3 className="font-semibold text-ae-navy mb-2">
                  Courts resolve disputes
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Decentralized juries handle identity challenges, fraud
                  reports, and vouching disputes. Every ruling sets precedent
                  for the network.
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-gray-400 text-sm mt-8">
            This demo uses simulated data. No real points are created or
            transferred. The live network is under development.
          </p>
        </div>
      </section>

      <SubpageFooter />
    </>
  );
}
