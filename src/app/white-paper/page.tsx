"use client";

import { SubpageNav, SubpageFooter, NewsletterForm } from "@/components/site-nav";

export default function WhitePaperPage() {
  return (
    <>
      <SubpageNav cta={{ label: "Download PDF", href: "#" }} />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="py-16 md:py-24 px-6 bg-ae-navy text-white text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-ae-teal text-sm font-medium tracking-wide uppercase mb-4">White Paper</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">The Alignment Economy</h1>
            <p className="text-gray-300 text-lg">A new way to measure and transfer value</p>
          </div>
        </section>

        {/* Content placeholder */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-ae-warm rounded-2xl p-10 md:p-14 mb-12">
              <svg className="w-16 h-16 text-ae-teal/30 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <h2 className="font-heading text-2xl font-bold text-ae-navy mb-4">Coming Soon</h2>
              <p className="text-ae-slate text-lg leading-relaxed mb-6">
                The full white paper is being finalized. Check back soon or
                subscribe to our newsletter to be notified when it's published.
              </p>
              <a href="#" className="inline-block bg-ae-teal text-white px-7 py-3 rounded-full font-medium hover:bg-ae-teal-light transition-colors">
                Download Current Draft (PDF)
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
