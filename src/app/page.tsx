"use client";

import { useEffect, useRef, useState } from "react";

/* ── Logo: Stylized "A" mark (two converging lines) ── */
function ALogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-label="Alignment Economy logo">
      {/* Two converging lines forming an A */}
      <path d="M20 4L6 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 4L34 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      {/* Crossbar */}
      <path d="M11 24H29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Intersection Observer hook for scroll animations ── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ══════════════════════════════════════════════════════
   NAV
   ══════════════════════════════════════════════════════ */
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "The Pattern", href: "#the-pattern" },
    { label: "Why It Matters", href: "#why-it-matters" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Requirements", href: "#requirements" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ae-navy/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <span className={`transition-colors ${scrolled ? "text-ae-teal" : "text-ae-teal"}`}>
            <ALogo className="w-9 h-9" />
          </span>
          <span className={`font-semibold text-lg transition-colors ${scrolled ? "text-white" : "text-white"}`}>
            Alignment Economy
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`nav-link transition-colors ${
                scrolled ? "text-gray-300 hover:text-white" : "text-white/70 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#where-are-you"
            className="bg-ae-teal text-white px-5 py-2 rounded-full hover:bg-ae-teal-light transition-colors text-sm font-medium"
          >
            Get Involved
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-ae-navy/95 backdrop-blur-md border-t border-white/10 px-6 pb-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block py-3 text-gray-300 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#where-are-you"
            className="block mt-3 text-center bg-ae-teal text-white px-5 py-3 rounded-full hover:bg-ae-teal-light transition-colors font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Get Involved
          </a>
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1: THE HOOK (Hero)
   ══════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero-gradient relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background converging lines */}
      <div className="converge-lines absolute inset-0 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <line x1="200" y1="800" x2="600" y2="100" stroke="rgba(43,106,106,0.15)" strokeWidth="1" />
          <line x1="1000" y1="800" x2="600" y2="100" stroke="rgba(43,106,106,0.15)" strokeWidth="1" />
          <line x1="100" y1="800" x2="600" y2="200" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5" />
          <line x1="1100" y1="800" x2="600" y2="200" stroke="rgba(201,168,76,0.08)" strokeWidth="0.5" />
          <line x1="300" y1="800" x2="600" y2="50" stroke="rgba(43,106,106,0.06)" strokeWidth="0.5" />
          <line x1="900" y1="800" x2="600" y2="50" stroke="rgba(43,106,106,0.06)" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight mb-8 tracking-tight">
          Two strategies.
          <br />
          Ten thousand years.
          <br />
          <span className="text-ae-gold">Both failing.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
          Force worked until the weapons got too powerful. Persuasion worked
          until nobody could trust anything. There's a third way, and it
          changes everything.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#the-pattern"
            className="bg-ae-teal text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-ae-teal-light transition-colors"
          >
            Show Me
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors"
          >
            Read The Bridge
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2: THE PATTERN (Three Eras)
   ══════════════════════════════════════════════════════ */
function ThePattern() {
  const ref = useFadeIn();

  return (
    <section id="the-pattern" className="py-24 md:py-36 px-6 bg-white">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <p className="text-ae-teal font-medium text-sm tracking-wide uppercase mb-4 text-center">
          The Pattern Nobody Talks About
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-ae-navy mb-6 text-center leading-tight">
          Three eras. One trajectory.
        </h2>
        <p className="text-ae-slate text-lg text-center max-w-2xl mx-auto mb-20 leading-relaxed">
          Humanity has only ever had two strategies for getting what it needs.
          Both worked, until the tools got too powerful. We're watching the
          second one break in real time.
        </p>

        {/* Three Era Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Era 1 */}
          <div className="relative rounded-2xl border border-red-100 bg-red-50/50 p-8 card-hover">
            <div className="text-red-400 font-bold text-sm tracking-wide uppercase mb-4">
              Era 1
            </div>
            <h3 className="text-2xl font-bold text-ae-navy mb-2">Capture</h3>
            <p className="text-ae-slate/70 text-sm font-medium mb-4">Take by force</p>
            <p className="text-ae-slate leading-relaxed">
              For thousands of years, if you wanted something, you took it.
              Swords, armies, empires. Every economy was organized around who
              could take from whom.
            </p>
            <div className="mt-6 pt-4 border-t border-red-100">
              <p className="text-red-500 text-sm font-medium">
                Broke when nuclear weapons made destruction mutual. Win-lose
                became lose-lose.
              </p>
            </div>
          </div>

          {/* Era 2 */}
          <div className="relative rounded-2xl border border-yellow-100 bg-yellow-50/50 p-8 card-hover">
            <div className="text-yellow-600 font-bold text-sm tracking-wide uppercase mb-4">
              Era 2
            </div>
            <h3 className="text-2xl font-bold text-ae-navy mb-2">Convince</h3>
            <p className="text-ae-slate/70 text-sm font-medium mb-4">Take by persuasion</p>
            <p className="text-ae-slate leading-relaxed">
              So humans shifted to convincing. Advertising, media, algorithms,
              attention capture. Get people to <em>want</em> to give you what
              you have.
            </p>
            <div className="mt-6 pt-4 border-t border-yellow-100">
              <p className="text-yellow-700 text-sm font-medium">
                Breaking now. AI-powered persuasion is fracturing shared
                reality. When deepfakes make evidence meaningless, trust
                collapses.
              </p>
            </div>
          </div>

          {/* Era 3 */}
          <div className="relative rounded-2xl border border-ae-teal/20 bg-ae-teal/5 p-8 card-hover ring-2 ring-ae-teal/20">
            <div className="text-ae-teal font-bold text-sm tracking-wide uppercase mb-4">
              Era 3
            </div>
            <h3 className="text-2xl font-bold text-ae-navy mb-2">Coordinate</h3>
            <p className="text-ae-gold text-sm font-medium mb-4">Align incentives</p>
            <p className="text-ae-slate leading-relaxed">
              If you can't take it and you can't trick people into giving it,
              what's left? You build a system where cooperation is the winning
              move. Not because people are virtuous, but because the incentives
              make it so.
            </p>
            <div className="mt-6 pt-4 border-t border-ae-teal/20">
              <p className="text-ae-teal text-sm font-medium">
                This is the third era. And it starts now.
              </p>
            </div>
          </div>
        </div>

        {/* The Key Insight */}
        <div className="bg-ae-navy rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-4">
            Here's the key insight:
          </p>
          <p className="text-white text-xl md:text-2xl font-semibold leading-relaxed">
            The real enemy was never other humans. It's entropy: disorder, decay,
            things falling apart. For ten thousand years, we pointed our most
            powerful resource (human attention) at each other.{" "}
            <span className="text-ae-gold">
              The Alignment Economy points it at the actual problem.
            </span>
          </p>
        </div>

        <div className="text-center mt-12">
          <a
            href="#why-it-matters"
            className="inline-flex items-center gap-2 text-ae-teal font-medium hover:text-ae-teal-light transition-colors text-lg"
          >
            Why does this matter to me?
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3: THE BRIDGE (Why Both Sides Win)
   ══════════════════════════════════════════════════════ */
function TheBridge() {
  const ref = useFadeIn();

  return (
    <section id="why-it-matters" className="py-24 md:py-36 px-6 bg-ae-warm">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <p className="text-ae-teal font-medium text-sm tracking-wide uppercase mb-4 text-center">
          Not Left. Not Right. Forward.
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-ae-navy mb-6 text-center leading-tight">
          This isn't a side. It's a bridge.
        </h2>
        <p className="text-ae-slate text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Most systems ask you to pick a side. This one doesn't have to, because
          it's solving the thing both sides actually agree on: the measuring
          stick is broken.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Sound Money Side */}
          <div className="bg-white rounded-2xl p-8 md:p-10 card-hover">
            <div className="w-12 h-12 rounded-full bg-ae-navy/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-ae-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-ae-navy mb-4">
              If you care about sound money and individual liberty
            </h3>
            <p className="text-ae-slate leading-relaxed">
              No central authority can manipulate supply. No inflation by decree.
              No first-mover advantage that rewards insiders. The system can't
              be printed, diluted, or controlled. Bitcoin tried to solve this but
              created a deflation trap (nobody spends a currency that only goes
              up). The Alignment Economy solves it without the trap.
            </p>
          </div>

          {/* Human Dignity Side */}
          <div className="bg-white rounded-2xl p-8 md:p-10 card-hover">
            <div className="w-12 h-12 rounded-full bg-ae-teal/10 flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-ae-navy mb-4">
              If you care about human dignity and invisible labor
            </h3>
            <p className="text-ae-slate leading-relaxed">
              The mother raising children, the teacher shaping minds, the
              neighbor holding a community together, all of this finally shows up
              in the economy. Not through government redistribution, but through
              a measuring stick that actually sees it. Caregiving, teaching, and
              community work earn value the same way any other contribution does.
            </p>
          </div>
        </div>

        <div className="text-center">
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 text-ae-teal font-medium hover:text-ae-teal-light transition-colors text-lg"
          >
            Show me the system
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4: THE SYSTEM (How It Works)
   ══════════════════════════════════════════════════════ */
function TheSystem() {
  const ref = useFadeIn();

  const points = [
    {
      name: "Active Points",
      amount: "1,440/day",
      color: "bg-ae-teal",
      tagline: "Expire in 24 hours. Spend them or lose them.",
      detail: "Kills hoarding. Ensures the economy keeps moving.",
    },
    {
      name: "Supportive Points",
      amount: "144/day",
      color: "bg-ae-gold",
      tagline: "Flow to the durable goods you use.",
      detail: "Your chair, laptop, shoes. The longer it lasts, the more its maker earns.",
    },
    {
      name: "Ambient Points",
      amount: "14.4/day",
      color: "bg-emerald-600",
      tagline: "Flow to the spaces you occupy.",
      detail: "Parks, buildings, roads. Presence-based funding replaces taxation.",
    },
    {
      name: "Earned Points",
      amount: "No limit",
      color: "bg-purple-600",
      tagline: "Received from others. Can be saved.",
      detail: "Caregiving, teaching, and community work finally show up in the ledger.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-36 px-6 bg-white">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <p className="text-ae-teal font-medium text-sm tracking-wide uppercase mb-4 text-center">
          The Mechanics
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-ae-navy mb-6 text-center leading-tight">
          Every verified human. Every day. Four flows.
        </h2>
        <p className="text-ae-slate text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          No tokens. No speculation. No blockchain lottery. Points flow to where
          attention, durability, and care actually happen.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {points.map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border border-gray-100 p-7 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${p.color}`} />
                  <h3 className="text-lg font-semibold text-ae-navy">{p.name}</h3>
                </div>
                <span className="text-ae-teal font-bold text-sm">{p.amount}</span>
              </div>
              <p className="text-ae-navy font-medium mb-1">{p.tagline}</p>
              <p className="text-ae-slate text-sm leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>

        {/* Daily Rebase */}
        <div className="bg-ae-navy rounded-2xl p-8 md:p-10 max-w-3xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-3">The Daily Rebase</h3>
          <p className="text-gray-300 leading-relaxed">
            Every day, accounts adjust so your share of the total economy stays
            constant as new people join. Your number might change, but your
            purchasing power doesn't. No inflation. No deflation. Joining on day
            one or year ten gives you the same footing.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center bg-ae-teal text-white px-7 py-3 rounded-full font-medium hover:bg-ae-teal-light transition-colors"
          >
            Read the White Paper
          </a>
          <a
            href="#proof-of-human"
            className="text-center border-2 border-ae-navy text-ae-navy px-7 py-3 rounded-full font-medium hover:bg-ae-navy hover:text-white transition-colors"
          >
            How do you verify people?
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5: PROOF OF HUMAN
   ══════════════════════════════════════════════════════ */
function ProofOfHuman() {
  const ref = useFadeIn();

  return (
    <section id="proof-of-human" className="py-24 md:py-32 px-6 bg-ae-warm">
      <div ref={ref} className="fade-in-section max-w-4xl mx-auto">
        <p className="text-ae-teal font-medium text-sm tracking-wide uppercase mb-4 text-center">
          The Trust Layer
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-ae-navy mb-6 text-center leading-tight">
          Proof of Human, not Proof of Work
        </h2>
        <p className="text-ae-slate text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Three paths to verification. No single point of failure. No
          institution required.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-8 text-center card-hover">
            <div className="w-14 h-14 rounded-full bg-ae-teal/10 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a48.667 48.667 0 00-6.898 12.208M12.5 6.875a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0zM12 13.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-ae-navy text-lg mb-2">Biometrics</h3>
            <p className="text-ae-slate text-sm leading-relaxed">
              Prove you're unique through biometric verification.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center card-hover">
            <div className="w-14 h-14 rounded-full bg-ae-teal/10 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm-3.375 6.75h4.5a1.125 1.125 0 001.125-1.125v-.375a3 3 0 00-6 0v.375c0 .621.504 1.125 1.125 1.125z" />
              </svg>
            </div>
            <h3 className="font-bold text-ae-navy text-lg mb-2">Government ID</h3>
            <p className="text-ae-slate text-sm leading-relaxed">
              Traditional identity documents as a verification layer.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 text-center card-hover">
            <div className="w-14 h-14 rounded-full bg-ae-gold/10 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-ae-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-ae-navy text-lg mb-2">Social Vouching</h3>
            <p className="text-ae-slate text-sm leading-relaxed">
              Ten people staking their own points on your humanity. No documents
              needed if your community backs you. Skin in the game, not trust in
              institutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 6: THE FIVE REQUIREMENTS (Comparison Grid)
   ══════════════════════════════════════════════════════ */
function Requirements() {
  const ref = useFadeIn();

  const reqs = [
    { label: "No central authority can manipulate supply", fiat: false, btc: true, ae: true },
    { label: "No first-mover advantage", fiat: false, btc: false, ae: true },
    { label: "No deflation trap", fiat: true, btc: false, ae: true },
    { label: "Invisible labor becomes visible", fiat: false, btc: false, ae: true },
    { label: "The measuring stick measures what matters", fiat: false, btc: false, ae: true },
  ];

  function Check() {
    return (
      <svg className="w-6 h-6 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }

  function Cross() {
    return (
      <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }

  return (
    <section id="requirements" className="py-24 md:py-36 px-6 bg-white">
      <div ref={ref} className="fade-in-section max-w-4xl mx-auto">
        <p className="text-ae-teal font-medium text-sm tracking-wide uppercase mb-4 text-center">
          The Credibility Test
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-ae-navy mb-6 text-center leading-tight">
          Five requirements. One system meets them all.
        </h2>
        <p className="text-ae-slate text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Any system that replaces money must meet all five. Check for yourself.
        </p>

        {/* Comparison table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-4 pr-4 text-ae-slate font-medium text-sm">Requirement</th>
                <th className="py-4 px-4 text-center text-ae-slate font-medium text-sm w-24">Fiat</th>
                <th className="py-4 px-4 text-center text-ae-slate font-medium text-sm w-24">Bitcoin</th>
                <th className="py-4 px-4 text-center font-bold text-ae-teal text-sm w-24">AE</th>
              </tr>
            </thead>
            <tbody>
              {reqs.map((r, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-5 pr-4 text-ae-navy font-medium">{r.label}</td>
                  <td className="py-5 px-4"><div className="check-cell">{r.fiat ? <Check /> : <Cross />}</div></td>
                  <td className="py-5 px-4"><div className="check-cell">{r.btc ? <Check /> : <Cross />}</div></td>
                  <td className="py-5 px-4"><div className="check-cell"><Check /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center mt-10 text-ae-navy text-lg font-semibold">
          Bitcoin met the first. Fiat meets none.{" "}
          <span className="text-ae-teal">The Alignment Economy meets all five.</span>
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 7: WHERE ARE YOU? (Buyer's Journey)
   ══════════════════════════════════════════════════════ */
function WhereAreYou() {
  const ref = useFadeIn();

  const paths = [
    {
      emoji: "1",
      title: "I'm intrigued",
      description: "Read The Bridge, a story that walks through the entire history and vision in a way that sticks.",
      cta: "Read The Bridge",
      href: "#",
      style: "border-ae-teal/20 hover:border-ae-teal",
    },
    {
      emoji: "2",
      title: "I'm convinced the problem is real",
      description: "Read the White Paper. The full technical and economic argument, laid out with rigor.",
      cta: "Read the White Paper",
      href: "#",
      style: "border-ae-teal/20 hover:border-ae-teal",
    },
    {
      emoji: "3",
      title: "I want updates",
      description: "Sign up for the newsletter. Stay in the loop, get early access, find ways to contribute.",
      cta: "Subscribe",
      href: "#join",
      style: "border-ae-teal/20 hover:border-ae-teal",
    },
    {
      emoji: "4",
      title: "I want to fund this",
      description: "This is a 501(c)(3). Contributions are tax-deductible. No token sales, no equity, no ICO. This is a public good.",
      cta: "Donate",
      href: "#join",
      style: "border-ae-gold/30 hover:border-ae-gold",
    },
    {
      emoji: "5",
      title: "I want to build this",
      description: "Engineers, designers, economists, writers, organizers. If you want to help make this real, reach out.",
      cta: "Get in Touch",
      href: "mailto:hello@alignmenteconomy.org",
      style: "border-ae-gold/30 hover:border-ae-gold",
    },
  ];

  return (
    <section id="where-are-you" className="py-24 md:py-36 px-6 bg-ae-navy">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <p className="text-ae-teal font-medium text-sm tracking-wide uppercase mb-4 text-center">
          Choose Your Path
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-center leading-tight">
          Where are you?
        </h2>
        <p className="text-gray-400 text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Everyone enters this at a different door. Find yours.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {paths.map((p) => (
            <a
              key={p.title}
              href={p.href}
              target={p.href.startsWith("http") || p.href.startsWith("mailto") ? undefined : undefined}
              className={`journey-card block rounded-2xl border-2 ${p.style} bg-white/5 p-7 group`}
            >
              <div className="w-10 h-10 rounded-full bg-ae-teal/20 flex items-center justify-center text-ae-teal font-bold text-sm mb-5">
                {p.emoji}
              </div>
              <h3 className="text-white text-lg font-semibold mb-3">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-5">{p.description}</p>
              <span className="inline-flex items-center gap-1.5 text-ae-teal font-medium text-sm group-hover:text-ae-teal-light transition-colors">
                {p.cta}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 8: NEWSLETTER + DONATE
   ══════════════════════════════════════════════════════ */
function JoinSection() {
  const ref = useFadeIn();

  return (
    <section id="join" className="py-24 md:py-32 px-6 bg-white">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Newsletter */}
          <div className="rounded-2xl border border-gray-100 p-8 md:p-10">
            <h3 className="text-2xl font-bold text-ae-navy mb-3">Stay in the loop</h3>
            <p className="text-ae-slate leading-relaxed mb-6">
              Progress updates, early access, and ways to contribute. No spam,
              no hype.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Newsletter signup coming soon!");
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3 rounded-full border border-gray-200 text-ae-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal"
              />
              <button
                type="submit"
                className="bg-ae-teal text-white px-7 py-3 rounded-full font-medium hover:bg-ae-teal-light transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Donate */}
          <div className="rounded-2xl bg-ae-navy p-8 md:p-10 text-white">
            <h3 className="text-2xl font-bold mb-3">Fund a public good</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              This isn't a startup. It's a 501(c)(3) nonprofit. No equity, no
              token sale, no ICO. If you believe the measuring stick needs
              fixing, help us fix it.
            </p>
            <p className="text-gray-400 text-sm mb-6">
              Contributions are tax-deductible. We accept fiat and crypto.
            </p>
            <a
              href="#"
              className="inline-block bg-ae-gold text-ae-navy px-7 py-3 rounded-full font-semibold hover:bg-ae-gold-light transition-colors"
            >
              Donate
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-12 px-6 bg-ae-navy border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <span className="text-ae-teal">
              <ALogo className="w-8 h-8" />
            </span>
            <div>
              <span className="text-white font-semibold block">Alignment Economy</span>
              <span className="text-gray-500 text-sm">A 501(c)(3) nonprofit</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">White Paper</a>
            <a href="#" className="hover:text-white transition-colors">The Bridge</a>
            <a href="#join" className="hover:text-white transition-colors">Newsletter</a>
            <a href="#join" className="hover:text-white transition-colors">Donate</a>
            <a href="mailto:hello@alignmenteconomy.org" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5 text-gray-600 text-xs text-center">
          Building the economy that measures what matters.
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ThePattern />
      <TheBridge />
      <TheSystem />
      <ProofOfHuman />
      <Requirements />
      <WhereAreYou />
      <JoinSection />
      <Footer />
    </>
  );
}
