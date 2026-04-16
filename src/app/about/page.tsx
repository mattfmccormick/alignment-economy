import Link from "next/link";
import { SubpageNav, SubpageFooter } from "@/components/site-nav";

export const metadata = {
  title: "About | The Alignment Economy",
  description: "Learn about the Alignment Economy, read the white paper, and explore The Bridge narrative.",
};

export default function AboutPage() {
  return (
    <>
      <SubpageNav />
      <main className="min-h-screen bg-ae-warm">
        {/* Hero */}
        <section className="py-20 md:py-28 px-6 bg-ae-navy text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">About the Alignment Economy</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              A nonprofit building a new way to measure and transfer value.
            </p>
          </div>
        </section>

        {/* Documents */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            {/* White Paper */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-ae-teal/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-ae-navy mb-3">White Paper</h3>
              <p className="text-ae-slate text-sm leading-relaxed mb-6">
                The full technical and economic argument for the Alignment Economy, laid out with rigor.
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/white-paper" className="bg-ae-teal text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-ae-teal-light transition-colors">
                  Read Online
                </Link>
                <a href="#" className="border border-gray-200 text-ae-navy px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors">
                  Download PDF
                </a>
              </div>
            </div>

            {/* The Bridge */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-ae-gold/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-ae-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-ae-navy mb-3">The Bridge</h3>
              <p className="text-ae-slate text-sm leading-relaxed mb-6">
                A short story that brings the Alignment Economy to life. A different way to understand why this matters.
              </p>
              <div className="flex flex-col gap-3">
                <Link href="/bridge" className="bg-ae-gold text-ae-navy px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-ae-gold-light transition-colors">
                  Read Online
                </Link>
                <a href="#" className="border border-gray-200 text-ae-navy px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors">
                  Download PDF
                </a>
              </div>
            </div>

            {/* Presentation Deck */}
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-ae-navy mb-3">Presentation Deck</h3>
              <p className="text-ae-slate text-sm leading-relaxed mb-6">
                A visual overview for sharing with potential funders, collaborators, and supporters.
              </p>
              <a href="#" className="inline-block border border-gray-200 text-ae-navy px-6 py-2.5 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors">
                Download PDF
              </a>
            </div>
          </div>
        </section>
      </main>
      <SubpageFooter />
    </>
  );
}
