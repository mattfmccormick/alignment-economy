import Link from "next/link";

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-ae-teal flex items-center justify-center">
            <span className="text-white font-bold text-sm">AE</span>
          </div>
          <span className="font-semibold text-ae-navy text-lg">
            Alignment Economy
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-ae-slate">
          <a href="#how-it-works" className="hover:text-ae-teal transition-colors">
            How It Works
          </a>
          <a href="#the-problem" className="hover:text-ae-teal transition-colors">
            Why Now
          </a>
          <a href="#points" className="hover:text-ae-teal transition-colors">
            The System
          </a>
          <a
            href="#join"
            className="bg-ae-teal text-white px-5 py-2 rounded-full hover:bg-ae-teal-light transition-colors"
          >
            Join the Movement
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 md:pt-44 md:pb-32 px-6 bg-ae-warm">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-ae-teal font-medium text-sm tracking-wide uppercase mb-4">
          A 501(c)(3) Nonprofit
        </p>
        <h1 className="text-4xl md:text-6xl font-bold text-ae-navy leading-tight mb-6">
          The economy is broken.
          <br />
          <span className="text-ae-teal">We're building the fix.</span>
        </h1>
        <p className="text-lg md:text-xl text-ae-slate max-w-2xl mx-auto mb-10 leading-relaxed">
          The Alignment Economy is a new system that finally measures what
          matters: the mother raising children, the teacher shaping minds, the
          neighbor holding a community together. No tokens. No speculation. Just
          a better measuring stick.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#join"
            className="bg-ae-teal text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-ae-teal-light transition-colors"
          >
            Join the Movement
          </a>
          <a
            href="#how-it-works"
            className="border-2 border-ae-navy text-ae-navy px-8 py-4 rounded-full text-lg font-medium hover:bg-ae-navy hover:text-white transition-colors"
          >
            Learn How It Works
          </a>
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section id="the-problem" className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-ae-navy mb-6 text-center">
          Money is broken. Here's why.
        </h2>
        <p className="text-ae-slate text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          The dollar has lost 96% of its purchasing power since 1913. Bitcoin
          was supposed to fix it, but it created two new problems that make it
          unusable as actual money.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-red-50 rounded-2xl p-8">
            <div className="text-red-500 text-2xl font-bold mb-3">
              Paradox #1
            </div>
            <h3 className="text-xl font-semibold text-ae-navy mb-3">
              First-Mover Advantage
            </h3>
            <p className="text-ae-slate leading-relaxed">
              Early Bitcoin adopters got rich. Latecomers pay a premium. It's the
              same inequality in a different wrapper. Joining day one versus year
              ten shouldn't determine your place in the economy.
            </p>
          </div>
          <div className="bg-red-50 rounded-2xl p-8">
            <div className="text-red-500 text-2xl font-bold mb-3">
              Paradox #2
            </div>
            <h3 className="text-xl font-semibold text-ae-navy mb-3">
              The Deflation Trap
            </h3>
            <p className="text-ae-slate leading-relaxed">
              If a currency always goes up in value, nobody spends it. Rational
              actors hoard it. But a currency nobody spends isn't a currency at
              all. It's a collectible.
            </p>
          </div>
        </div>

        <div className="bg-ae-warm rounded-2xl p-8 md:p-12 text-center">
          <p className="text-ae-slate text-lg leading-relaxed max-w-2xl mx-auto">
            Now add AI to the mix: white collar jobs disappearing, governments
            printing more stimulus, more inflation. People with assets ride it
            out. Everyone else gets crushed.{" "}
            <span className="font-semibold text-ae-navy">
              It's a doom loop with no exit.
            </span>
          </p>
          <p className="text-ae-teal font-bold text-2xl mt-6">
            The Alignment Economy is the exit.
          </p>
        </div>
      </div>
    </section>
  );
}

function ThreeEras() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6 bg-ae-navy text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Three Eras of Human Economy
        </h2>
        <p className="text-gray-300 text-lg text-center max-w-2xl mx-auto mb-16">
          Every economic system eventually breaks when its tools get weaponized.
          We're building the third era.
        </p>

        <div className="space-y-8">
          <div className="flex gap-6 items-start">
            <div className="shrink-0 w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-xl">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Capture{" "}
                <span className="text-gray-400 font-normal">
                  (take by force)
                </span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Worked until technology made destruction mutual. Nuclear weapons
                turned win-lose into lose-lose. Force stopped working as a
                strategy.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="shrink-0 w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 font-bold text-xl">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Convince{" "}
                <span className="text-gray-400 font-normal">
                  (take by manipulation)
                </span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Worked until AI-powered persuasion fractured shared reality.
                When everyone can be manipulated at scale, trust collapses.
                Convincing stopped working as a strategy.
              </p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="shrink-0 w-16 h-16 rounded-full bg-ae-teal/30 flex items-center justify-center text-ae-gold font-bold text-xl">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Coordinate{" "}
                <span className="text-ae-gold font-normal">
                  (align incentives so cooperation wins)
                </span>
              </h3>
              <p className="text-gray-300 leading-relaxed">
                The real enemy was never other humans. It's entropy: disorder,
                decay, things falling apart. The economy should direct human
                attention toward fighting entropy, not toward fighting each
                other. That's what we're building.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PointsSection() {
  const points = [
    {
      name: "Active Points",
      amount: "1,440/day",
      color: "bg-ae-teal",
      description:
        "Given to every verified person. Expire every 24 hours. You spend them or lose them. This kills hoarding and ensures the economy keeps moving.",
    },
    {
      name: "Supportive Points",
      amount: "144/day",
      color: "bg-ae-gold",
      description:
        "Flow automatically to the durable goods you use (your chair, laptop, shoes). The longer something lasts, the more its maker earns. Goodbye, planned obsolescence.",
    },
    {
      name: "Ambient Points",
      amount: "14.4/day",
      color: "bg-emerald-600",
      description:
        "Flow to the spaces you occupy (parks, buildings, roads). More time people choose to spend somewhere means more funding. This replaces taxation with presence.",
    },
    {
      name: "Earned Points",
      amount: "Unlimited",
      color: "bg-purple-600",
      description:
        "Anything received from another person for work, care, or service. These CAN be saved. This is how caregiving, teaching, and community work finally show up in the economy.",
    },
  ];

  return (
    <section id="points" className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-ae-navy mb-4 text-center">
          Four kinds of points. One new economy.
        </h2>
        <p className="text-ae-slate text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          No tokens. No speculation. No blockchain lottery. Every verified human
          gets points every day. What you do with them is up to you.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {points.map((point) => (
            <div
              key={point.name}
              className="rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${point.color}`} />
                <h3 className="text-xl font-semibold text-ae-navy">
                  {point.name}
                </h3>
              </div>
              <div className="text-2xl font-bold text-ae-teal mb-3">
                {point.amount}
              </div>
              <p className="text-ae-slate leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-ae-warm rounded-2xl p-8 md:p-12">
          <h3 className="text-xl font-bold text-ae-navy mb-3">
            The Daily Rebase
          </h3>
          <p className="text-ae-slate leading-relaxed">
            Every day, a rebase adjusts all accounts so your share of the total
            economy stays constant as new people join. Your number might change,
            but your purchasing power doesn't. No inflation. No deflation.
            Joining on day one or year ten gives you the same footing.
          </p>
        </div>
      </div>
    </section>
  );
}

function ProofOfHuman() {
  return (
    <section className="py-20 md:py-28 px-6 bg-ae-warm">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-ae-navy mb-4 text-center">
          Proof of Human, not Proof of Work
        </h2>
        <p className="text-ae-slate text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Bitcoin burns electricity to verify transactions. We verify something
          that actually matters: that you're a real human being.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-ae-teal/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a48.667 48.667 0 00-6.898 12.208M12.5 6.875a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0zM12 13.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-ae-navy mb-2">Biometrics</h3>
            <p className="text-ae-slate text-sm leading-relaxed">
              Verify your identity through biometric data that proves you're
              unique.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-ae-teal/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm-3.375 6.75h4.5a1.125 1.125 0 001.125-1.125v-.375a3 3 0 00-6 0v.375c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <h3 className="font-semibold text-ae-navy mb-2">Government ID</h3>
            <p className="text-ae-slate text-sm leading-relaxed">
              Traditional identity documents provide another layer of
              verification.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-ae-teal/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-ae-navy mb-2">Social Vouching</h3>
            <p className="text-ae-slate text-sm leading-relaxed">
              Ten people staking their own points on your humanity can bring you
              to full participation, no documents needed. Skin in the game, not
              trust in institutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function DesignRequirements() {
  const requirements = [
    {
      number: "01",
      title: "No central authority can manipulate supply",
      description: "No king diluting coins. No central bank printing money.",
    },
    {
      number: "02",
      title: "No first-mover advantage",
      description:
        "Joining day one or year ten gives you the same footing.",
    },
    {
      number: "03",
      title: "No deflation trap",
      description:
        "The system incentivizes spending, not hoarding.",
    },
    {
      number: "04",
      title: "Invisible labor becomes visible",
      description:
        "Caregiving, teaching, and community work show up in the ledger.",
    },
    {
      number: "05",
      title: "The measuring stick measures what matters",
      description:
        "Durability, presence, and human connection, not extraction and clicks.",
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-ae-navy mb-4 text-center">
          Five Design Requirements
        </h2>
        <p className="text-ae-slate text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Any system that replaces money must meet all five. Bitcoin met the
          first. Fiat meets none. The Alignment Economy meets all of them.
        </p>

        <div className="space-y-6">
          {requirements.map((req) => (
            <div
              key={req.number}
              className="flex gap-6 items-start p-6 rounded-xl hover:bg-ae-warm transition-colors"
            >
              <div className="text-3xl font-bold text-ae-teal/30">
                {req.number}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-ae-navy mb-1">
                  {req.title}
                </h3>
                <p className="text-ae-slate">{req.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinSection() {
  return (
    <section id="join" className="py-20 md:py-28 px-6 bg-ae-navy text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          This isn't a startup. It's a public good.
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-4">
          The Alignment Economy is a 501(c)(3) nonprofit. No equity, no token
          sale, no ICO. We're funded by grants and direct contributions from
          people who believe the measuring stick needs fixing.
        </p>
        <p className="text-gray-300 text-lg leading-relaxed mb-10">
          We're building in the open. If you want to be part of what comes next,
          get on the list.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="bg-ae-gold text-ae-navy px-8 py-4 rounded-full text-lg font-semibold hover:bg-ae-gold-light transition-colors"
          >
            Join the Waitlist
          </a>
          <a
            href="#"
            className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors"
          >
            Read The Bridge
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6 bg-ae-navy border-t border-white/10 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-ae-teal flex items-center justify-center">
            <span className="text-white font-bold text-xs">AE</span>
          </div>
          <span>The Alignment Economy</span>
        </div>
        <p>A 501(c)(3) nonprofit. Building the economy that measures what matters.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ProblemSection />
      <ThreeEras />
      <PointsSection />
      <ProofOfHuman />
      <DesignRequirements />
      <JoinSection />
      <Footer />
    </>
  );
}
