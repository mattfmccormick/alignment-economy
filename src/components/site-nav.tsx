"use client";

import Link from "next/link";

export function ALogo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-label="Alignment Economy logo">
      <path d="M20 4L6 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 4L34 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M9 22H31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M7 28H33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function SubpageNav({ cta }: { cta?: { label: string; href: string } }) {
  return (
    <nav className="bg-ae-navy/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-ae-teal"><ALogo className="w-8 h-8" /></span>
          <span className="text-white font-semibold text-lg">Alignment Economy</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-4 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
            <Link href="/get-involved" className="text-gray-400 hover:text-white transition-colors">Get Involved</Link>
            <Link href="/fund" className="text-gray-400 hover:text-white transition-colors">Fund</Link>
          </div>
          <Link href="/" className="sm:hidden text-gray-400 hover:text-white text-sm transition-colors">
            ← Home
          </Link>
          {cta && (
            <a href={cta.href} className="bg-ae-teal text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-ae-teal-light transition-colors">
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

export function SubpageFooter() {
  return (
    <footer className="py-10 px-6 bg-ae-navy border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-ae-teal"><ALogo className="w-6 h-6" /></span>
          <span className="text-white font-semibold text-sm">Alignment Economy</span>
          <span className="text-gray-500 text-xs ml-2">&copy; 2026 Alignment Economy</span>
        </Link>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/fund" className="hover:text-white transition-colors">Fund</Link>
          <Link href="/get-involved" className="hover:text-white transition-colors">Get Involved</Link>
        </div>
      </div>
    </footer>
  );
}

export function NewsletterForm() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
    <div className="max-w-lg mx-auto bg-white rounded-2xl p-8 text-center">
      <h3 className="font-heading text-xl font-bold text-ae-navy mb-2">Stay in the loop</h3>
      <p className="text-ae-slate text-sm mb-6">Progress updates, early access, and ways to contribute.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
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
  );
}
