"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

/* ── Logo: Stylized "A" mark with extended crossbars ── */
function ALogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-label="Alignment Economy logo">
      <path d="M20 4L6 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 4L34 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M9 22H31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M7 28H33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Arrow between cards ── */
function ArrowRight() {
  return (
    <div className="hidden md:flex items-center justify-center text-gray-300">
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
      </svg>
    </div>
  );
}

/* ── Intersection Observer hook ── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

/* ── Scroll-spy hook for active nav ── */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/* ══════════════════════════════════════════════════════
   NAV
   ══════════════════════════════════════════════════════ */
function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sectionIds = ["fiat-is-failing", "bitcoin-cant-fix-this", "how-ae-works", "why-now", "build-with-us"];
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "/about" },
    { label: "Get Involved", href: "/get-involved" },
    { label: "Fund", href: "/fund" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-ae-navy/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-ae-teal"><ALogo className="w-8 h-8" /></span>
          <span className="text-white font-semibold text-lg hidden sm:inline">Alignment Economy</span>
        </a>
        <div className="hidden lg:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`nav-link transition-colors ${scrolled ? "text-gray-300 hover:text-white" : "text-white/70 hover:text-white"}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/white-paper" className="bg-ae-teal text-white px-5 py-2 rounded-full hover:bg-ae-teal-light transition-colors text-sm font-medium">
            White Paper
          </Link>
        </div>
        <button className="lg:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-ae-navy/95 backdrop-blur-md border-t border-white/10 px-6 pb-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="block py-3 text-gray-300 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/white-paper" className="block mt-3 text-center bg-ae-teal text-white px-5 py-3 rounded-full hover:bg-ae-teal-light transition-colors font-medium" onClick={() => setMenuOpen(false)}>
            White Paper
          </Link>
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 1: HERO
   ══════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="hero-gradient relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-none mb-6 tracking-tight">
          Alignment
          <br />
          <span className="text-ae-gold">Economy</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-6 leading-relaxed">
          The dollar buys less each year. AI is coming for your job. Your mom's
          contribution has never been valued economically.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0 mb-6 text-xs sm:text-sm tracking-wide uppercase">
          <span className="text-red-400 font-medium">Fiat is failing</span>
          <span className="hidden sm:inline text-white/20 mx-3">|</span>
          <span className="text-yellow-400 font-medium">Bitcoin can't fix this</span>
          <span className="hidden sm:inline text-white/20 mx-3">|</span>
          <span className="text-ae-teal font-medium">The Alignment Economy is a viable path forward</span>
        </div>

        <p className="text-gray-400 text-base max-w-xl mx-auto mb-10 leading-relaxed">
          The global economic system is evolving: The left wants to
          redistribute. The right wants to deregulate. Both are missing the
          point. The measuring stick is broken. The Alignment Economy is a new way to measure
          and transfer value.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#the-bridge" className="bg-ae-teal text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-ae-teal-light transition-colors">
            Show Me What You Mean ↓
          </a>
          <Link href="/white-paper" className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors">
            Read the White Paper →
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-bounce">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
        </svg>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 2: THE BRIDGE (Analogy + Three Eras)
   ══════════════════════════════════════════════════════ */
function TheBridge() {
  const ref = useFadeIn();

  return (
    <section id="the-bridge" className="py-20 md:py-28 px-6 bg-ae-warm">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-ae-navy mb-16 text-center leading-tight">
          Technological shifts take time
        </h2>

        {/* Horse → Car → Model T with arrows */}
        <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0 mb-8">
          <div className="flex-1 bg-white rounded-2xl p-7 text-center card-hover">
            <div className="text-4xl mb-3">🐴</div>
            <h3 className="font-heading text-lg font-bold text-ae-navy mb-1">Horses <span className="text-ae-slate/50 font-normal text-xs">(Pre-1886)</span></h3>
            <p className="text-ae-slate text-sm">100% of transport. Slow, limited, familiar.</p>
          </div>
          <ArrowRight />
          <div className="flex-1 bg-white rounded-2xl p-7 text-center card-hover">
            <div className="text-4xl mb-3">🚗</div>
            <h3 className="font-heading text-lg font-bold text-ae-navy mb-1">Early Cars <span className="text-ae-slate/50 font-normal text-xs">(1886-1908)</span></h3>
            <p className="text-ae-slate text-sm">Loud, broke down, odd. Only enthusiasts.</p>
          </div>
          <ArrowRight />
          <div className="flex-1 bg-white rounded-2xl p-7 text-center card-hover ring-2 ring-ae-teal/20">
            <div className="text-4xl mb-3">🏭</div>
            <h3 className="font-heading text-lg font-bold text-ae-navy mb-1">Ford Model T <span className="text-ae-teal font-normal text-xs">(1908+)</span></h3>
            <p className="text-ae-teal text-sm font-medium">The bridge to mass adoption.</p>
          </div>
        </div>

        <p className="text-center text-ae-navy font-heading text-xl font-semibold my-10">
          The same pattern is happening with money.
        </p>

        {/* Fiat → BTC → AE with arrows */}
        <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-0 mb-14">
          <div className="flex-1 bg-white rounded-2xl p-7 text-center card-hover border-2 border-red-100">
            <div className="text-red-400 font-bold text-xs tracking-wide uppercase mb-2">The Horse</div>
            <h3 className="font-heading text-lg font-bold text-ae-navy mb-1">Fiat ($)</h3>
            <p className="text-ae-slate text-sm">Familiar, but losing value every year.</p>
          </div>
          <ArrowRight />
          <div className="flex-1 bg-white rounded-2xl p-7 text-center card-hover border-2 border-yellow-100">
            <div className="text-yellow-600 font-bold text-xs tracking-wide uppercase mb-2">The Early Car</div>
            <h3 className="font-heading text-lg font-bold text-ae-navy mb-1">Bitcoin / Crypto</h3>
            <p className="text-ae-slate text-sm">Revolutionary, but unusable as daily money.</p>
          </div>
          <ArrowRight />
          <div className="flex-1 bg-white rounded-2xl p-7 text-center card-hover border-2 border-ae-teal/30 ring-2 ring-ae-teal/20">
            <div className="text-ae-teal font-bold text-xs tracking-wide uppercase mb-2">The Ford Model T</div>
            <h3 className="font-heading text-lg font-bold text-ae-navy mb-1">Alignment Economy</h3>
            <p className="text-ae-teal text-sm font-medium">The Ford Model T of money.</p>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3: PERSONAS (reduced spacing)
   ══════════════════════════════════════════════════════ */
function Personas() {
  const ref = useFadeIn();

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      el.classList.add("section-pulse");
      setTimeout(() => el.classList.remove("section-pulse"), 1200);
    }
  }, []);

  const personas = [
    {
      title: "The Traditionalist",
      quote: "The dollar and economy are working fine.",
      points: [
        "Every currency in history has failed due to inflation",
        "A stay-at-home parent is worth zero in GDP",
        "AI and robotics are coming for your job, then what?",
      ],
      cta: "That's me →",
      target: "fiat-is-failing",
      color: "border-red-200 hover:border-red-400",
      accent: "text-red-500",
    },
    {
      title: "The Skeptic",
      quote: "I know the system is broken, but crypto is all scams.",
      points: [
        "We both agree fiat isn't working, we need to find an alternative",
        "Yes, 90% of crypto is a scam",
        "BUT blockchain (a tamper-proof ledger) is a real innovation",
      ],
      cta: "That's me →",
      target: "bitcoin-cant-fix-this",
      color: "border-yellow-200 hover:border-yellow-500",
      accent: "text-yellow-600",
    },
    {
      title: "The Bitcoiner",
      quote: "BTC (ETH, Tether, etc.) is the answer already.",
      points: [
        "BTC is currently the best option available",
        "But the odds of BTC becoming a global daily currency are not high due to: first-mover advantage and deflation",
      ],
      cta: "That's me →",
      target: "bitcoin-cant-fix-this",
      color: "border-yellow-200 hover:border-yellow-500",
      accent: "text-yellow-600",
    },
    {
      title: "The Bridge Builder",
      quote: "I see the gap with the dollar and BTC. What is the fix?",
      points: [
        "Daily point allocations to lower first-mover advantage",
        "Daily rebasing to limit inflation/deflation",
        "It is not capitalism; it is not communism; it is something new",
      ],
      cta: "That's me →",
      target: "how-ae-works",
      color: "border-ae-teal/30 hover:border-ae-teal",
      accent: "text-ae-teal",
    },
  ];

  return (
    <section className="py-14 md:py-20 px-6 bg-white">
      <div ref={ref} className="fade-in-section max-w-6xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-ae-navy mb-3 text-center leading-tight">
          Where are you in the conversation?
        </h2>
        <p className="text-ae-slate text-base text-center max-w-2xl mx-auto mb-10 leading-relaxed">
          Everyone enters at a different door. Find yours, then jump to the
          section that will move you forward.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personas.map((p) => (
            <button
              key={p.title}
              onClick={() => scrollToSection(p.target)}
              className={`persona-card text-left rounded-2xl border-2 ${p.color} bg-white p-5 flex flex-col`}
            >
              <div className={`font-bold text-xs tracking-wide uppercase mb-2 ${p.accent}`}>
                {p.title}
              </div>
              <p className="text-ae-navy font-semibold text-sm mb-3 italic">
                &ldquo;{p.quote}&rdquo;
              </p>
              <div className="text-xs text-ae-slate/70 font-medium uppercase tracking-wide mb-2">We'd start here:</div>
              <ul className="text-ae-slate text-sm leading-relaxed space-y-1.5 mb-auto">
                {p.points.map((pt, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-ae-teal mt-0.5 shrink-0">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className={`mt-4 font-semibold text-sm ${p.accent}`}>
                {p.cta}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   DESIGN REQUIREMENTS (before How AE Works)
   ══════════════════════════════════════════════════════ */
function DesignRequirements() {
  const ref = useFadeIn();

  const reqs = [
    { n: "1", title: "Decentralized control", def: "No single entity controls the rules.", desc: "No central authority may manipulate the money supply, interest rates, or transaction rules.", fiat: false, btc: true, ae: true },
    { n: "2", title: "Minimized first-mover advantage", def: "Joining late doesn't mean losing out.", desc: "Late adopters must not be structurally disadvantaged relative to early adopters.", fiat: false, btc: false, ae: true },
    { n: "3", title: "Stable purchasing power", def: "What you earn today buys the same tomorrow.", desc: "Neither inflation nor deflation should erode or artificially increase the value of holdings.", fiat: false, btc: false, ae: true },
    { n: "4", title: "Incentive to transact", def: "The system rewards spending, not hoarding.", desc: "The system must encourage buying and selling, not holding and hoping.", fiat: true, btc: false, ae: true },
    { n: "5", title: "Visibility of contribution", def: "Caregiving, teaching, and maintenance finally count.", desc: "Caregiving, mentorship, maintenance of spaces and durable goods must become economically visible.", fiat: false, btc: false, ae: true },
  ];

  function Check() {
    return (
      <svg className="w-5 h-5 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    );
  }
  function Cross() {
    return (
      <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    );
  }

  return (
    <section id="design-requirements" className="py-20 md:py-28 px-6 bg-ae-warm">
      <div ref={ref} className="fade-in-section max-w-4xl mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-ae-navy mb-4 text-center leading-tight">
          Five Design Requirements
        </h2>
        <p className="text-ae-slate text-base text-center max-w-2xl mx-auto mb-12 leading-relaxed">
          Any system that replaces money must satisfy all five.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-xl overflow-hidden">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="text-left py-4 px-5 text-ae-slate font-medium text-sm">Requirement</th>
                <th className="py-4 px-3 text-center text-ae-slate font-medium text-sm w-20">Fiat</th>
                <th className="py-4 px-3 text-center text-ae-slate font-medium text-sm w-20">BTC</th>
                <th className="py-4 px-3 text-center font-bold text-ae-teal text-sm w-20">AE</th>
              </tr>
            </thead>
            <tbody>
              {reqs.map((r) => (
                <tr key={r.n} className="border-b border-gray-50">
                  <td className="py-4 px-5">
                    <div className="text-ae-navy text-sm font-medium">{r.title}</div>
                    <div className="text-ae-slate/70 text-xs mt-0.5">{r.def}</div>
                  </td>
                  <td className="py-4 px-3"><div className="check-cell">{r.fiat ? <Check /> : <Cross />}</div></td>
                  <td className="py-4 px-3"><div className="check-cell">{r.btc ? <Check /> : <Cross />}</div></td>
                  <td className="py-4 px-3"><div className="check-cell"><Check /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center mt-8 text-ae-navy font-semibold">
          Bitcoin met the first. Fiat meets none.{" "}
          <span className="text-ae-teal">The Alignment Economy meets all five.</span>
        </p>

        <h2 className="font-heading text-3xl md:text-5xl font-bold text-ae-navy mt-16 text-center leading-tight">
          How the Alignment Economy Works
        </h2>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4: FIAT IS FAILING
   ══════════════════════════════════════════════════════ */
function FiatIsFailing() {
  const ref = useFadeIn();

  return (
    <section id="fiat-is-failing" className="bg-ae-navy text-white">
      <div className="py-20 md:py-28 px-6">
        <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-center leading-tight">
            What is money? A measuring stick.
          </h2>
          <p className="text-gray-300 text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            We create value for others in exchange for money, which we use to
            obtain the value we need. Money is the measuring stick. It tells us
            what things are worth relative to each other.
          </p>
          <p className="text-gray-400 text-lg text-center max-w-2xl mx-auto mb-12">
            The problem: our measuring stick has lost 96% of its accuracy since 1913.
          </p>

          {/* Big stat */}
          <div className="text-center mb-16">
            <div className="text-7xl md:text-9xl font-bold text-red-400 font-heading">-96%</div>
            <p className="text-gray-400 text-lg mt-2">U.S. Dollar purchasing power lost since 1913</p>
          </div>

          {/* Three points */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/5 rounded-2xl p-7">
              <p className="text-white leading-relaxed">
                Governments print money at will. No accountability, no audit, no limit.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-7">
              <p className="text-white leading-relaxed">
                Each generation's savings buy less. Your grandparents bought a
                house. After rent and expenses, you don't have savings.
              </p>
            </div>
            <div className="bg-white/5 rounded-2xl p-7">
              <p className="text-white leading-relaxed">
                It feels like the weather: something that just is, not something
                being done to you.
              </p>
            </div>
          </div>

          <p className="text-center text-2xl font-bold text-red-400 font-heading">
            It is being done to you.
          </p>
        </div>
      </div>

      {/* Invisible labor - different background */}
      <div className="py-20 md:py-28 px-6 bg-[#162035]">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            And what about the value money has never measured?
          </h3>
          <p className="text-gray-300 text-lg text-center leading-relaxed mb-8">
            The economy can count every ad impression, every click, every
            fraction of a cent generated by a human glancing at a screen.
          </p>
          <p className="text-gray-400 text-center mb-6 font-medium">But it cannot see:</p>
          <div className="space-y-3 max-w-md mx-auto mb-8">
            {[
              "A mother raising the next generation",
              "A caregiver at 3 AM",
              "A mentor guiding a young person",
              "A neighbor maintaining the garden",
              "A teacher shaping thirty minds for $45,000 a year",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="text-gray-300">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-xl font-bold text-ae-gold font-heading">
            The most important work is the least visible.
          </p>
        </div>
      </div>

      {/* AI Spiral - circular graphic */}
      <div className="py-20 md:py-28 px-6 bg-ae-navy">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 text-center">
            AI is About to Make the Situation Much Worse
          </h3>
          <p className="text-gray-400 text-center mb-14">
            This cycle has already started, and it accelerates from here.
          </p>

          {/* Loop graphic - vertical on mobile, circular on desktop */}
          <div className="max-w-3xl mx-auto">
            {/* Mobile: vertical loop with connecting arrows */}
            <div className="md:hidden space-y-0">
              {[
                { step: "1", title: "AI gets more capable", desc: "Machines produce real output at near-zero cost." },
                { step: "2", title: "Jobs are displaced", desc: "Each role AI can do cheaper is a role that disappears." },
                { step: "3", title: "Government prints more", desc: "Stimulus and bailouts. Each round debases the currency." },
                { step: "4", title: "Asset prices inflate", desc: "Owners get richer automatically. Everyone else is priced out." },
                { step: "5", title: "Workers get squeezed", desc: "Workers ask for higher wages, but companies would rather invest in AI than pay them. Cost rises, jobs shrink." },
              ].map((s, i) => (
                <div key={s.step}>
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-sm shrink-0">
                        {s.step}
                      </div>
                      {i < 4 && <div className="w-0.5 h-8 bg-red-500/20 mt-1" />}
                    </div>
                    <div className="pb-4">
                      <h4 className="text-white font-semibold text-sm mb-1">{s.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Loop-back arrow */}
              <div className="flex items-center gap-4 pl-3">
                <svg className="w-6 h-6 text-red-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l-6 6m0 0l6 6m-6-6h18" />
                </svg>
                <span className="text-red-400/60 text-xs font-bold uppercase tracking-wide">Back to step 1. Repeat forever.</span>
              </div>
            </div>

            {/* Desktop: circular layout */}
            <div className="hidden md:block relative max-w-2xl mx-auto">
              <svg viewBox="0 0 500 500" className="w-full absolute inset-0" fill="none">
                <path d="M250 60 A190 190 0 1 1 220 63" stroke="rgba(239,68,68,0.12)" strokeWidth="3" fill="none" />
                <path d="M220 63 L232 50 L226 70" fill="rgba(239,68,68,0.25)" />
                <text x="250" y="245" textAnchor="middle" fill="rgba(239,68,68,0.4)" fontSize="14" fontWeight="bold">REPEAT</text>
                <text x="250" y="265" textAnchor="middle" fill="rgba(239,68,68,0.4)" fontSize="14" fontWeight="bold">FOREVER</text>
              </svg>

              <div className="relative" style={{ paddingBottom: "100%" }}>
                {[
                  { step: "1", title: "AI gets more capable", desc: "Machines produce real output at near-zero cost.", top: "2%", left: "50%", transform: "translateX(-50%)" },
                  { step: "2", title: "Jobs are displaced", desc: "Each role AI can do cheaper is a role that disappears.", top: "28%", left: "82%", transform: "translateX(-50%)" },
                  { step: "3", title: "Government prints more", desc: "Stimulus and bailouts. Each round debases the currency.", top: "68%", left: "82%", transform: "translateX(-50%)" },
                  { step: "4", title: "Asset prices inflate", desc: "Owners get richer automatically. Everyone else is priced out.", top: "68%", left: "18%", transform: "translateX(-50%)" },
                  { step: "5", title: "Workers get squeezed", desc: "Workers ask for higher wages, but companies would rather invest in AI than pay them. Cost rises, jobs shrink.", top: "28%", left: "18%", transform: "translateX(-50%)" },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="absolute bg-white/5 backdrop-blur-sm border border-red-500/20 rounded-xl p-3 text-center w-[32%]"
                    style={{ top: s.top, left: s.left, transform: s.transform }}
                  >
                    <div className="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold text-xs mx-auto mb-1.5">
                      {s.step}
                    </div>
                    <h4 className="text-white font-semibold text-sm mb-1">{s.title}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-xl font-bold text-ae-gold font-heading mt-12">
            This loop has no exit within the current system.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 5: BITCOIN CAN'T FIX THIS
   ══════════════════════════════════════════════════════ */
function BitcoinCantFix() {
  const ref = useFadeIn();

  return (
    <section id="bitcoin-cant-fix-this" className="py-20 md:py-28 px-6 bg-[#162035] text-white">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-center leading-tight">
          Bitcoin proved decentralized value transfer works.
        </h2>
        <p className="text-gray-300 text-lg text-center max-w-3xl mx-auto mb-4 leading-relaxed">
          Blockchain is real and powerful.
        </p>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          It was designed as &ldquo;peer-to-peer electronic cash.&rdquo; It became a speculative asset instead.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 rounded-2xl p-8">
            <div className="text-yellow-400 font-bold text-sm tracking-wide uppercase mb-4">Paradox #1</div>
            <h3 className="font-heading text-2xl font-bold text-white mb-4">First-Mover Advantage</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Early adopters got in cheap. Everyone else feels like they're
              buying into someone else's windfall. A system where most of the
              value was claimed before most people heard about it will never
              achieve mass adoption.
            </p>
            <p className="text-yellow-400/80 font-medium text-sm italic">
              A new country where all the land is already claimed is just the old country with a new flag.
            </p>
          </div>
          <div className="bg-white/5 rounded-2xl p-8">
            <div className="text-yellow-400 font-bold text-sm tracking-wide uppercase mb-4">Paradox #2</div>
            <h3 className="font-heading text-2xl font-bold text-white mb-4">Deflation</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              10,000 BTC for two pizzas. Years later: worth hundreds of millions.
              The lesson everyone took: never spend your Bitcoin. The result:
              everyone hoards, nobody spends, buy BTC with dollars, sell BTC for
              dollars.
            </p>
            <p className="text-yellow-400/80 font-medium text-sm italic">
              A currency nobody spends is not a currency.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white/5 rounded-2xl p-8 md:p-10">
          <h3 className="font-heading text-xl font-bold text-white mb-2">
            Stablecoins don't solve it either
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Wrapping a broken measuring stick in a blockchain doesn't fix it.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Still inflationary", desc: "Pegged to a currency that loses value every year." },
              { label: "Still centralized", desc: "Issuers can freeze accounts and delist tokens at will." },
              { label: "Still invisible", desc: "Caregiving, teaching, community work still worth zero." },
              { label: "Just faster plumbing", desc: "For the same broken system." },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 items-start">
                <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <div>
                  <span className="text-white font-medium text-sm">{item.label}.</span>{" "}
                  <span className="text-gray-400 text-sm">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 6: HOW THE ALIGNMENT ECONOMY WORKS
   ══════════════════════════════════════════════════════ */
function HowAEWorks() {
  const ref = useFadeIn();

  return (
    <section id="how-ae-works" className="py-20 md:py-28 px-6 bg-ae-warm">
      <div ref={ref} className="fade-in-section max-w-6xl mx-auto">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-ae-navy mb-4 text-center leading-tight">
          A new way to measure and transfer value
        </h2>

        {/* Three Core Mechanics */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 card-hover">
            <div className="w-12 h-12 rounded-full bg-ae-teal/10 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-3">Daily Point Allocations</h3>
            <p className="text-ae-slate text-sm leading-relaxed">
              Every verified person receives points each day tied to their 1,440
              minutes of attention. Four types: Active, Supportive, Ambient,
              Earned. This daily allocation limits first-mover advantage.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 card-hover">
            <div className="w-12 h-12 rounded-full bg-ae-teal/10 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-3">Daily Rebasing</h3>
            <p className="text-ae-slate text-sm leading-relaxed">
              An adjustment that changes absolute balances while preserving each
              person's share of the total pool. Your purchasing power stays
              constant as the network grows. Limited inflation, limited deflation.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 card-hover">
            <div className="w-12 h-12 rounded-full bg-ae-teal/10 flex items-center justify-center mb-5">
              <svg className="w-6 h-6 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-3">Proof of Human</h3>
            <p className="text-ae-slate text-sm leading-relaxed">
              A percent-human score (0-100%) helps mitigate fraud from bots and
              duplicate accounts. Miners verify humans (not math or stake). A
              court system with bounties supports quality.
            </p>
          </div>
        </div>

        {/* Four Point Types */}
        <h3 className="font-heading text-2xl font-bold text-ae-navy mb-8 text-center">The Four Point Types</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 card-hover border-t-4 border-ae-teal">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-ae-navy">Active</h4>
              <span className="text-ae-teal font-bold text-xs bg-ae-teal/10 px-2 py-1 rounded-full">1,440/day</span>
            </div>
            <p className="text-ae-slate text-sm leading-relaxed">
              Spend however you choose. Unspent points expire every 24 hours. A
              billionaire and a minimum-wage worker wake up with the same 1,440.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 card-hover border-t-4 border-ae-gold">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-ae-navy">Supportive</h4>
              <span className="text-ae-gold font-bold text-xs bg-ae-gold/10 px-2 py-1 rounded-full">144/day</span>
            </div>
            <p className="text-ae-slate text-sm leading-relaxed">
              Flows to durable goods in active use. A chair used 20 years earns
              20 years of income for its maker.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 card-hover border-t-4 border-emerald-500">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-ae-navy">Ambient</h4>
              <span className="text-emerald-600 font-bold text-xs bg-emerald-500/10 px-2 py-1 rounded-full">14.4/day</span>
            </div>
            <p className="text-ae-slate text-sm leading-relaxed">
              Flows to physical spaces occupied. A city people move to earns more
              than one people flee.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 card-hover border-t-4 border-purple-500">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-ae-navy">Earned</h4>
              <span className="text-purple-600 font-bold text-xs bg-purple-500/10 px-2 py-1 rounded-full">Saveable</span>
            </div>
            <p className="text-ae-slate text-sm leading-relaxed">
              Points received from others through transactions. The savings
              layer. Wealth differences persist based on contribution.
            </p>
          </div>
        </div>
        <p className="text-center text-ae-slate/70 text-xs mb-16 italic">
          Only individuals receive daily allocations. Not companies, governments, or AI.
        </p>

        {/* Paradox Solutions */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-ae-teal/5 border border-ae-teal/20 rounded-2xl p-8">
            <div className="text-ae-teal font-bold text-sm tracking-wide uppercase mb-3">Paradox #1: Solved</div>
            <h4 className="font-heading text-xl font-bold text-ae-navy mb-3">First-Mover Advantage</h4>
            <p className="text-ae-slate leading-relaxed">
              Day 10 joiner and Day 10,000 joiner wake up with the same 1,440 Active points.
            </p>
          </div>
          <div className="bg-ae-teal/5 border border-ae-teal/20 rounded-2xl p-8">
            <div className="text-ae-teal font-bold text-sm tracking-wide uppercase mb-3">Paradox #2: Solved</div>
            <h4 className="font-heading text-xl font-bold text-ae-navy mb-3">Deflation</h4>
            <p className="text-ae-slate leading-relaxed">
              Active points expire daily (no hoarding). Rebasing keeps purchasing
              power stable. Built for spending, not speculation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 7: WHY NOW
   ══════════════════════════════════════════════════════ */
function WhyNow() {
  const ref = useFadeIn();

  return (
    <section id="why-now" className="py-20 md:py-28 px-6 bg-ae-navy text-white">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-14 text-center leading-tight">
          Why The Alignment Economy. Why Now.
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-14">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
            <h3 className="font-heading text-xl font-bold text-red-400 mb-6">If we don't build this:</h3>
            <ul className="space-y-4">
              {[
                "AI produces more, humans earn less, governments print to cover the gap.",
                "Your savings buy less every year. This is already happening.",
                "Your kids graduate into an economy that literally cannot see what they do.",
                "The spiral has no exit within the current system.",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-ae-teal/10 border border-ae-teal/20 rounded-2xl p-8">
            <h3 className="font-heading text-xl font-bold text-ae-teal mb-6">If we do:</h3>
            <ul className="space-y-4">
              {[
                "A mother's work counts for the first time in the history of money.",
                "A chair built to last 20 years earns more than one designed to break.",
                "A city that works earns more than one that doesn't.",
                "Your purchasing power is stable because math protects it, not politicians.",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <svg className="w-5 h-5 text-ae-teal shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-center text-xl md:text-2xl font-bold text-ae-gold font-heading max-w-3xl mx-auto leading-relaxed">
          Every generation assumes their currency is permanent. None have been
          right. The question isn't whether money gets rebuilt. It's whether it
          gets rebuilt well.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 8: BUILD THE BRIDGE WITH US
   ══════════════════════════════════════════════════════ */
function BuildWithUs() {
  const ref = useFadeIn();

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Thanks for subscribing! We'll be in touch.");
        form.reset();
      } else {
        alert(data.error || "Something went wrong.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <section id="build-with-us" className="py-20 md:py-28 px-6 bg-ae-warm">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-ae-navy mb-14 text-center leading-tight">
          Build the Bridge With Us
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-14">
          <Link href="/fund" className="bg-white rounded-2xl p-8 card-hover text-center block">
            <div className="w-14 h-14 rounded-full bg-ae-gold/10 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-ae-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-3">Fund</h3>
            <p className="text-ae-slate text-sm leading-relaxed mb-4">
              Fund the build. 501(c)(3). Tax-deductible. No token sales, no equity, no ICO.
            </p>
            <span className="inline-block bg-ae-gold text-ae-navy px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-ae-gold-light transition-colors">
              Donate →
            </span>
          </Link>
          <Link href="/get-involved" className="bg-white rounded-2xl p-8 card-hover text-center block">
            <div className="w-14 h-14 rounded-full bg-ae-teal/10 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-3">Build</h3>
            <p className="text-ae-slate text-sm leading-relaxed mb-4">
              Engineers, cryptographers, economists, storytelling, and marketers who want to build something that matters.
            </p>
            <span className="inline-block bg-ae-teal text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-ae-teal-light transition-colors">
              Get in Touch →
            </span>
          </Link>
          <Link href="/get-involved" className="bg-white rounded-2xl p-8 card-hover text-center block">
            <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-3">Connect</h3>
            <p className="text-ae-slate text-sm leading-relaxed mb-4">
              If this isn't for you, tell us who it is for. The right collaboration is as valuable as a check.
            </p>
            <span className="inline-block border-2 border-ae-navy text-ae-navy px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-ae-navy hover:text-white transition-colors">
              Share →
            </span>
          </Link>
        </div>

        {/* Document links */}
        <div className="flex flex-wrap gap-4 justify-center mb-14">
          <Link href="/white-paper" className="bg-white border border-gray-200 text-ae-navy px-6 py-3 rounded-full font-medium text-sm hover:shadow-md transition-shadow">
            White Paper
          </Link>
          <Link href="/bridge" className="bg-white border border-gray-200 text-ae-navy px-6 py-3 rounded-full font-medium text-sm hover:shadow-md transition-shadow">
            The Bridge (Story)
          </Link>
          <a href="/AE_Presentation_Deck.pdf" className="bg-white border border-gray-200 text-ae-navy px-6 py-3 rounded-full font-medium text-sm hover:shadow-md transition-shadow">
            Presentation Deck
          </a>
        </div>

        {/* Contact email */}
        <p className="text-center text-ae-slate text-sm mb-14">
          Questions? Reach out at{" "}
          <a href="mailto:info@alignmenteconomy.org" className="text-ae-teal font-medium hover:text-ae-teal-light transition-colors">
            info@alignmenteconomy.org
          </a>
        </p>

        {/* Newsletter */}
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-8 text-center">
          <h3 className="font-heading text-xl font-bold text-ae-navy mb-2">Stay in the loop</h3>
          <p className="text-ae-slate text-sm mb-6">
            Progress updates, early access, and ways to contribute.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3 rounded-full border border-gray-200 text-ae-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal"
            />
            <button type="submit" className="bg-ae-teal text-white px-7 py-3 rounded-full font-medium hover:bg-ae-teal-light transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </form>
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
          <div className="flex items-center gap-2.5">
            <span className="text-ae-teal"><ALogo className="w-8 h-8" /></span>
            <div>
              <span className="text-white font-semibold block">Alignment Economy</span>
              <span className="text-gray-500 text-sm">&copy; 2026 Alignment Economy</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-400">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/white-paper" className="hover:text-white transition-colors">White Paper</Link>
            <Link href="/bridge" className="hover:text-white transition-colors">The Bridge</Link>
            <Link href="/fund" className="hover:text-white transition-colors">Donate</Link>
            <Link href="/get-involved" className="hover:text-white transition-colors">Get Involved</Link>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-white/5 text-gray-600 text-xs text-center">
          Human attention, made into money.
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
      <TheBridge />
      <Personas />
      <FiatIsFailing />
      <BitcoinCantFix />
      <DesignRequirements />
      <HowAEWorks />
      <WhyNow />
      <BuildWithUs />
      <Footer />
    </>
  );
}
