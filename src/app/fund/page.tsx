"use client";

import { SubpageNav, SubpageFooter } from "@/components/site-nav";

export default function FundPage() {
  return (
    <>
      <SubpageNav />
      <main className="min-h-screen bg-ae-warm">
        {/* Hero */}
        <section className="py-16 md:py-24 px-6 bg-ae-navy text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Fund a Public Good</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              The Alignment Economy is a 501(c)(3) nonprofit. No equity, no
              token sale, no ICO. Contributions are tax-deductible.
            </p>
          </div>
        </section>

        {/* Donation section */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-10 md:p-14 text-center mb-12 shadow-sm">
              <svg className="w-16 h-16 text-ae-gold/40 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              <h2 className="font-heading text-2xl font-bold text-ae-navy mb-4">Support the Build</h2>
              <p className="text-ae-slate text-lg leading-relaxed mb-4">
                Funds go directly to research,
                engineering, and building in the open.
              </p>
              <p className="text-ae-slate/70 text-sm mb-8">
                Donation integration coming soon. For now, reach out directly
                to discuss how you can support the project.
              </p>
              <a
                href="mailto:info@alignmenteconomy.org?subject=I%20want%20to%20fund%20the%20Alignment%20Economy"
                className="inline-block bg-ae-gold text-ae-navy px-8 py-4 rounded-full text-lg font-semibold hover:bg-ae-gold-light transition-colors mb-4"
              >
                Reach Out to Donate
              </a>
              <p className="text-ae-slate/50 text-xs">
                We accept fiat and crypto. All contributions are tax-deductible.
              </p>
            </div>

          </div>
        </section>
      </main>
      <SubpageFooter />
    </>
  );
}
