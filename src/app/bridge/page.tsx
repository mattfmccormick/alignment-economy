"use client";

import { SubpageNav, SubpageFooter, NewsletterForm } from "@/components/site-nav";

export default function BridgePage() {
  return (
    <>
      <SubpageNav cta={{ label: "Download .docx", href: "/The_Bridge.docx" }} />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="py-16 md:py-24 px-6 bg-ae-navy text-white text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-ae-gold text-sm font-medium tracking-wide uppercase mb-4">A Short Story</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">The Bridge</h1>
            <p className="text-gray-300 text-lg">A short story about the future of money</p>
          </div>
        </section>

        {/* Content placeholder */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-ae-warm rounded-2xl p-10 md:p-14 mb-12">
              <svg className="w-16 h-16 text-ae-gold/30 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <h2 className="font-heading text-2xl font-bold text-ae-navy mb-4">Coming Soon</h2>
              <p className="text-ae-slate text-lg leading-relaxed mb-4">
                The Bridge is a fictional narrative that walks through the
                history of human exchange and the vision for what comes next.
                It's designed to make you feel the problem before you see the solution.
              </p>
              <p className="text-ae-slate leading-relaxed mb-6">
                The full story is coming soon. Subscribe to be the first to read it.
              </p>
              <a href="/The_Bridge.docx" className="inline-block bg-ae-gold text-ae-navy px-7 py-3 rounded-full font-semibold hover:bg-ae-gold-light transition-colors">
                Download The Bridge (.docx)
              </a>
            </div>

            <NewsletterForm />

            <div className="mt-10">
              <a href="/about" className="text-ae-teal hover:text-ae-teal-light transition-colors text-sm font-medium">
                ← Back to About
              </a>
            </div>
          </div>
        </section>
      </main>
      <SubpageFooter />
    </>
  );
}
