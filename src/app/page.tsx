"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ── Logo: Stylized "A" mark ── */
function ALogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-label="Alignment Economy logo">
      <path d="M20 4L6 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 4L34 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M11 24H29" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
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
    { label: "Fiat Is Failing", href: "#fiat-is-failing" },
    { label: "Bitcoin Can't Fix This", href: "#bitcoin-cant-fix-this" },
    { label: "How AE Works", href: "#how-ae-works" },
    { label: "Why Now", href: "#why-now" },
    { label: "Build With Us", href: "#build-with-us" },
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
            <a
              key={l.href}
              href={l.href}
              className={`nav-link transition-colors ${active === l.href.slice(1) ? "text-ae-teal active" : scrolled ? "text-gray-300 hover:text-white" : "text-white/70 hover:text-white"}`}
            >
              {l.label}
            </a>
          ))}
          <a href="#" target="_blank" rel="noopener noreferrer" className="bg-ae-teal text-white px-5 py-2 rounded-full hover:bg-ae-teal-light transition-colors text-sm font-medium">
            White Paper
          </a>
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
            <a key={l.href} href={l.href} className="block py-3 text-gray-300 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#" target="_blank" rel="noopener noreferrer" className="block mt-3 text-center bg-ae-teal text-white px-5 py-3 rounded-full hover:bg-ae-teal-light transition-colors font-medium" onClick={() => setMenuOpen(false)}>
            White Paper
          </a>
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
    <section className="hero-gradient relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
          The dollar buys less each year.
          <br />
          AI is coming for your job.
          <br />
          <span className="text-ae-gold">Your mom's contribution has never been valued economically.</span>
        </h1>

        {/* Subheader dividers */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 mb-8">
          <span className="text-red-400 font-medium text-sm sm:text-base">Fiat is failing</span>
          <span className="hidden sm:inline text-white/30 mx-4">|</span>
          <span className="text-yellow-400 font-medium text-sm sm:text-base">Bitcoin can't fix this</span>
          <span className="hidden sm:inline text-white/30 mx-4">|</span>
          <span className="text-ae-teal font-medium text-sm sm:text-base">The Alignment Economy is a viable path forward</span>
        </div>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          The left wants to redistribute. The right wants to deregulate. Both
          are missing the point. The measuring stick is broken. This is a new
          way to measure and transfer value.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#the-bridge" className="bg-ae-teal text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-ae-teal-light transition-colors">
            Show Me What You Mean ↓
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors">
            Read the White Paper →
          </a>
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
   SECTION 2: THE BRIDGE BETWEEN TWO WORLDS
   ══════════════════════════════════════════════════════ */
function TheBridge() {
  const ref = useFadeIn();

  return (
    <section id="the-bridge" className="py-24 md:py-36 px-6 bg-ae-warm">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-ae-navy mb-16 text-center leading-tight">
          Every breakthrough follows the same pattern
        </h2>

        {/* Horse → Car → Model T */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-8 text-center card-hover">
            <div className="text-4xl mb-4">🐴</div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-2">Horses <span className="text-ae-slate/50 font-normal text-sm">(Pre-1886)</span></h3>
            <p className="text-ae-slate text-sm leading-relaxed">100% of transport. Slow, limited, familiar.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center card-hover">
            <div className="text-4xl mb-4">🚗</div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-2">Early Cars <span className="text-ae-slate/50 font-normal text-sm">(1886-1908)</span></h3>
            <p className="text-ae-slate text-sm leading-relaxed">Loud, broke down, odd. Only enthusiasts used them.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center card-hover ring-2 ring-ae-teal/20">
            <div className="text-4xl mb-4">🏭</div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-2">Model T <span className="text-ae-teal font-normal text-sm">(1908+)</span></h3>
            <p className="text-ae-slate text-sm leading-relaxed">Affordable, reliable, practical. The bridge to mass adoption.</p>
          </div>
        </div>

        {/* Connector */}
        <p className="text-center text-ae-navy font-heading text-xl font-semibold my-12">
          The same pattern is happening with money.
        </p>

        {/* Fiat → BTC → AE */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white rounded-2xl p-8 text-center card-hover border-2 border-red-100">
            <div className="text-red-400 font-bold text-sm tracking-wide uppercase mb-3">The Horse</div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-2">Fiat ($)</h3>
            <p className="text-ae-slate text-sm leading-relaxed">Familiar, but losing value every year.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center card-hover border-2 border-yellow-100">
            <div className="text-yellow-600 font-bold text-sm tracking-wide uppercase mb-3">The Early Car</div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-2">Bitcoin / Crypto</h3>
            <p className="text-ae-slate text-sm leading-relaxed">Revolutionary, but unusable as daily money.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center card-hover border-2 border-ae-teal/30 ring-2 ring-ae-teal/20">
            <div className="text-ae-teal font-bold text-sm tracking-wide uppercase mb-3">The Model T</div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-2">Alignment Economy</h3>
            <p className="text-ae-teal text-sm font-medium leading-relaxed">The Model T of money.</p>
          </div>
        </div>

        {/* The Bigger Pattern */}
        <div className="bg-ae-navy rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
          <h3 className="font-heading text-xl font-bold text-white mb-4">The Bigger Pattern</h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            This pattern is bigger than money. Humanity has only ever had two
            strategies for getting what it needs.{" "}
            <strong className="text-white">Take it by force</strong> (swords,
            armies, empires) or{" "}
            <strong className="text-white">take it by persuasion</strong>{" "}
            (advertising, media, algorithms). Force broke when weapons got too
            powerful. Persuasion is breaking now, as AI makes truth
            indistinguishable from fiction.
          </p>
          <p className="text-gray-300 leading-relaxed mb-6">
            The Alignment Economy is built on a third strategy:{" "}
            <strong className="text-ae-teal">coordinate</strong>. Not because
            people are virtuous, but because the system makes cooperation the
            winning move.
          </p>
          <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-ae-gold font-medium hover:text-ae-gold-light transition-colors">
            The Bridge tells the full story →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 3: PERSONAS
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
    <section className="py-24 md:py-36 px-6 bg-white">
      <div ref={ref} className="fade-in-section max-w-6xl mx-auto">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-ae-navy mb-4 text-center leading-tight">
          Where are you in the conversation?
        </h2>
        <p className="text-ae-slate text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">
          Everyone enters at a different door. Find yours, then jump to the
          section that will move you forward.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personas.map((p, i) => (
            <button
              key={p.title}
              onClick={() => scrollToSection(p.target)}
              className={`persona-card text-left rounded-2xl border-2 ${p.color} bg-white p-6 flex flex-col`}
            >
              <div className={`font-bold text-xs tracking-wide uppercase mb-3 ${p.accent}`}>
                {p.title}
              </div>
              <p className="text-ae-navy font-semibold text-sm mb-4 italic">
                &ldquo;{p.quote}&rdquo;
              </p>
              <div className="text-xs text-ae-slate/70 font-medium uppercase tracking-wide mb-2">We'd start here:</div>
              <ul className="text-ae-slate text-sm leading-relaxed space-y-2 mb-auto">
                {p.points.map((pt, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-ae-teal mt-0.5 shrink-0">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className={`mt-5 font-semibold text-sm ${p.accent}`}>
                {p.cta}
              </div>
              {/* Arrow between cards on large screens */}
              {i < personas.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-gray-300 z-10">
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   SECTION 4: FIAT IS FAILING
   ══════════════════════════════════════════════════════ */
function FiatIsFailing() {
  const ref = useFadeIn();
  const spiralRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spiralRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("spiral-visible"); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="fiat-is-failing" className="py-24 md:py-36 px-6 bg-ae-navy text-white">
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
          <p className="text-gray-400 text-lg mt-2">purchasing power lost since 1913</p>
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

        <p className="text-center text-2xl font-bold text-red-400 font-heading mb-20">
          It is being done to you.
        </p>

        {/* Invisible labor */}
        <div className="max-w-3xl mx-auto mb-20">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            And what about the value it has never measured?
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

        {/* AI Spiral */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 text-center">
            A spiral with no clear exit
          </h3>
          <p className="text-gray-400 text-center mb-12">
            AI is about to make the situation much worse.
          </p>

          <div ref={spiralRef} className="space-y-4">
            {[
              { step: "1", title: "AI gets more capable", desc: "Machines produce real output at near-zero cost. Writing, designing, assembling, delivering. Every cycle, AI handles more complex work for less money." },
              { step: "2", title: "Jobs are displaced", desc: "White collar first, then blue collar. Each role AI can do cheaper is a role that disappears. The people displaced don't own the machines that replaced them." },
              { step: "3", title: "Government prints more", desc: "Stimulus, handouts, bailouts to cover the displacement. But there's no limit. Each round debases the currency further." },
              { step: "4", title: "Asset prices inflate", desc: "Asset owners get richer automatically. Stocks, real estate, businesses inflate. The people without assets are priced out further." },
              { step: "5", title: "Workers get squeezed", desc: "Cost of living rises. Workers demand higher wages. But businesses won't pay it because AI is good enough, better, and cheaper. Back to step 1." },
            ].map((s) => (
              <div key={s.step} className="spiral-step flex gap-5 items-start bg-white/5 rounded-2xl p-6">
                <div className="shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold">
                  {s.step}
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">{s.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
            {/* Loop arrow */}
            <div className="text-center pt-2">
              <svg className="w-8 h-8 mx-auto text-red-400/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
              <p className="text-red-400/70 text-sm mt-2">Repeat forever</p>
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
    <section id="bitcoin-cant-fix-this" className="py-24 md:py-36 px-6 bg-ae-navy text-white border-t border-white/5">
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

        {/* Two Paradoxes */}
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

        {/* Stablecoins */}
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
    <section id="how-ae-works" className="py-24 md:py-36 px-6 bg-ae-warm">
      <div ref={ref} className="fade-in-section max-w-6xl mx-auto">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-ae-navy mb-4 text-center leading-tight">
          A new way to measure and transfer value
        </h2>
        <p className="text-ae-slate text-lg text-center max-w-3xl mx-auto mb-20 leading-relaxed">
          Built from scratch for an economy where AI does the production and
          humans do what matters.
        </p>

        {/* Three Core Mechanics */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
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
              court system with bounties supports quality. Each participant
              determines what information to disclose.
            </p>
          </div>
        </div>

        {/* Four Point Types */}
        <h3 className="font-heading text-2xl font-bold text-ae-navy mb-8 text-center">The Four Point Types</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-7 card-hover border-t-4 border-ae-teal">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-ae-navy">Active</h4>
              <span className="text-ae-teal font-bold text-xs bg-ae-teal/10 px-2 py-1 rounded-full">1,440/day</span>
            </div>
            <p className="text-ae-slate text-sm leading-relaxed">
              Spend however you choose. Unspent points expire every 24 hours. A
              billionaire and a minimum-wage worker wake up with the same 1,440.
              A spouse sending points to a stay-at-home partner makes caregiving
              visible.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-7 card-hover border-t-4 border-ae-gold">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-ae-navy">Supportive</h4>
              <span className="text-ae-gold font-bold text-xs bg-ae-gold/10 px-2 py-1 rounded-full">144/day</span>
            </div>
            <p className="text-ae-slate text-sm leading-relaxed">
              Flows to durable goods in active use. A chair used 20 years earns
              20 years of income for its maker. Planned obsolescence becomes
              economically irrational.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-7 card-hover border-t-4 border-emerald-500">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-ae-navy">Ambient</h4>
              <span className="text-emerald-600 font-bold text-xs bg-emerald-500/10 px-2 py-1 rounded-full">14.4/day</span>
            </div>
            <p className="text-ae-slate text-sm leading-relaxed">
              Flows to physical spaces occupied. Cascades up: room, building,
              city, state, nation. A city people move to earns more than one
              people flee. Usage-based alternative to taxation.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-7 card-hover border-t-4 border-purple-500">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-ae-navy">Earned</h4>
              <span className="text-purple-600 font-bold text-xs bg-purple-500/10 px-2 py-1 rounded-full">Saveable</span>
            </div>
            <p className="text-ae-slate text-sm leading-relaxed">
              Points received from others through transactions. The savings
              layer. Saveable without limit. Only category subject to daily
              rebasing. Wealth differences persist based on contribution.
            </p>
          </div>
        </div>
        <p className="text-center text-ae-slate/70 text-sm mb-20 italic">
          Only individuals receive daily allocations. Not companies, governments, or AI. Those entities earn points through voluntary transactions with humans.
        </p>

        {/* Paradox Solutions */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
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
              power stable (no &ldquo;number go up&rdquo; dynamic). Built for spending, not speculation.
            </p>
          </div>
        </div>

        {/* Design Requirements Checklist */}
        <div className="max-w-3xl mx-auto">
          <h3 className="font-heading text-2xl font-bold text-ae-navy mb-4 text-center">Design Requirements</h3>
          <p className="text-ae-slate text-center mb-10 leading-relaxed">
            Any replacement system must satisfy five requirements. Every design
            decision in the Alignment Economy traces back to one of these.
          </p>
          <div className="space-y-4">
            {[
              { n: "1", title: "Decentralized control", desc: "No central authority may manipulate the money supply, interest rates, or transaction rules." },
              { n: "2", title: "Minimized first-mover advantage", desc: "Late adopters must not be structurally disadvantaged relative to early adopters." },
              { n: "3", title: "Stable purchasing power", desc: "Neither inflation nor deflation should erode or artificially increase the value of holdings." },
              { n: "4", title: "Incentive to transact", desc: "The system must encourage buying and selling, not holding and hoping." },
              { n: "5", title: "Visibility of contribution", desc: "Caregiving, mentorship, maintenance of spaces and durable goods must become economically visible." },
            ].map((r) => (
              <div key={r.n} className="flex gap-4 items-start bg-white rounded-xl p-5">
                <div className="shrink-0 w-8 h-8 rounded-full bg-ae-teal/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-ae-navy font-semibold mb-1">{r.title}</h4>
                  <p className="text-ae-slate text-sm">{r.desc}</p>
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
   SECTION 7: WHY NOW / URGENCY
   ══════════════════════════════════════════════════════ */
function WhyNow() {
  const ref = useFadeIn();

  return (
    <section id="why-now" className="py-24 md:py-36 px-6 bg-ae-navy text-white">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-16 text-center leading-tight">
          Why The Alignment Economy. Why Now.
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* If we don't */}
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

          {/* If we do */}
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

  return (
    <section id="build-with-us" className="py-24 md:py-36 px-6 bg-ae-warm">
      <div ref={ref} className="fade-in-section max-w-5xl mx-auto">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-ae-navy mb-16 text-center leading-tight">
          Build the Bridge With Us
        </h2>

        {/* Three cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 card-hover text-center">
            <div className="w-14 h-14 rounded-full bg-ae-gold/10 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-ae-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-3">Fund</h3>
            <p className="text-ae-slate text-sm leading-relaxed">
              Fund the build. We need capital to bring the protocol from white
              paper to working network. This is a 501(c)(3). Contributions are
              tax-deductible. No token sales, no equity, no ICO.
            </p>
            <a href="#" className="inline-block mt-5 bg-ae-gold text-ae-navy px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-ae-gold-light transition-colors">
              Donate
            </a>
          </div>
          <div className="bg-white rounded-2xl p-8 card-hover text-center">
            <div className="w-14 h-14 rounded-full bg-ae-teal/10 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384 3.173A2.25 2.25 0 013 16.25V8.25a2.25 2.25 0 013.036-2.093l5.384 3.173a2.25 2.25 0 010 3.84zM20.25 8.25v7.5" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-3">Build</h3>
            <p className="text-ae-slate text-sm leading-relaxed">
              Join the team. Engineers, cryptographers, economists, and marketers
              who want to build something that matters.
            </p>
            <a href="mailto:mattfmccormick@gmail.com" className="inline-block mt-5 bg-ae-teal text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-ae-teal-light transition-colors">
              Get in Touch
            </a>
          </div>
          <div className="bg-white rounded-2xl p-8 card-hover text-center">
            <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-ae-navy mb-3">Connect</h3>
            <p className="text-ae-slate text-sm leading-relaxed">
              If this isn't for you, tell us who it is for. The right
              introduction is as valuable as a check.
            </p>
            <a href="mailto:mattfmccormick@gmail.com" className="inline-block mt-5 border-2 border-ae-navy text-ae-navy px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-ae-navy hover:text-white transition-colors">
              Share
            </a>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mb-16">
          <p className="text-ae-navy font-semibold text-lg">Matt McCormick</p>
          <a href="mailto:mattfmccormick@gmail.com" className="text-ae-teal hover:text-ae-teal-light transition-colors">
            mattfmccormick@gmail.com
          </a>
        </div>

        {/* Document links */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 text-ae-navy px-6 py-3 rounded-full font-medium text-sm hover:shadow-md transition-shadow">
            White Paper
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 text-ae-navy px-6 py-3 rounded-full font-medium text-sm hover:shadow-md transition-shadow">
            The Bridge (Story)
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 text-ae-navy px-6 py-3 rounded-full font-medium text-sm hover:shadow-md transition-shadow">
            Presentation Deck
          </a>
        </div>

        {/* Newsletter */}
        <div className="max-w-lg mx-auto bg-white rounded-2xl p-8 text-center">
          <h3 className="font-heading text-xl font-bold text-ae-navy mb-2">Stay in the loop</h3>
          <p className="text-ae-slate text-sm mb-6">
            Progress updates, early access, and ways to contribute.
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
              <span className="text-gray-500 text-sm">A 501(c)(3) nonprofit</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">White Paper</a>
            <a href="#" className="hover:text-white transition-colors">The Bridge</a>
            <a href="#build-with-us" className="hover:text-white transition-colors">Newsletter</a>
            <a href="#build-with-us" className="hover:text-white transition-colors">Donate</a>
            <a href="mailto:mattfmccormick@gmail.com" className="hover:text-white transition-colors">Contact</a>
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
      <TheBridge />
      <Personas />
      <FiatIsFailing />
      <BitcoinCantFix />
      <HowAEWorks />
      <WhyNow />
      <BuildWithUs />
      <Footer />
    </>
  );
}
