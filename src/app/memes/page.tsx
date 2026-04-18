"use client";

import { useCallback } from "react";
import { SubpageNav, SubpageFooter } from "@/components/site-nav";
import { memeSections } from "./meme-data";

export default function MemesPage() {
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <SubpageNav />
      <main className="min-h-screen bg-ae-warm">
        {/* Hero */}
        <section className="py-12 md:py-16 px-6 bg-ae-navy text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">The Alignment Economy in Memes</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              The problem, the failed fix, and the path forward.
            </p>
          </div>
        </section>

        {/* Sticky jump nav */}
        <div className="sticky top-0 z-40 bg-ae-navy/95 backdrop-blur-md border-b border-white/10 px-6 py-3">
          <div className="max-w-6xl mx-auto flex gap-2 justify-center overflow-x-auto">
            {memeSections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="px-4 py-1.5 rounded-full text-xs font-medium border border-white/20 text-gray-300 whitespace-nowrap transition-colors hover:bg-white/10 hover:text-white"
              >
                {s.title.split(": ")[1]}
              </button>
            ))}
          </div>
        </div>

        {/* Section + groups */}
        {memeSections.map((section) => (
          <section key={section.id} id={section.id} className="py-14 md:py-20 px-6">
            <div className="max-w-6xl mx-auto">
              {/* Section header */}
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-ae-navy mb-3">
                  {section.title}
                </h2>
                <p className="text-ae-slate text-base max-w-2xl mx-auto leading-relaxed">
                  {section.subtitle}
                </p>
              </div>

              {/* Groups */}
              {section.groups.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-gray-300 rounded-2xl bg-white/50">
                  <p className="text-ae-slate text-lg font-medium mb-2">Coming soon</p>
                  <p className="text-gray-400 text-sm">New memes for this section are on the way.</p>
                </div>
              ) : (
                <div className="space-y-12">
                  {section.groups.map((group, gi) => (
                    <div key={gi}>
                      {/* Group header */}
                      <div className="mb-5 max-w-3xl">
                        <div className="flex items-baseline gap-3">
                          <span className="text-ae-teal font-mono text-xs font-semibold tracking-wider">
                            {String(gi + 1).padStart(2, "0")}
                          </span>
                          <h3 className="font-heading text-xl md:text-2xl font-bold text-ae-navy leading-tight">
                            {group.heading}
                          </h3>
                        </div>
                        {group.intro && (
                          <p className="text-ae-slate text-sm mt-2 ml-8 leading-relaxed">
                            {group.intro}
                          </p>
                        )}
                      </div>

                      {/* Meme grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                        {group.memes.map((meme) => (
                          <div
                            key={meme.id}
                            className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                          >
                            {meme.render()}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section divider */}
            <div className="max-w-xs mx-auto mt-16 border-t border-gray-200" />
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="py-16 px-6 bg-ae-navy text-white text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Want the full picture?</h2>
            <p className="text-gray-400 mb-8">Read the white paper, the short story, or get involved.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/white-paper" className="bg-ae-teal text-white px-6 py-3 rounded-full font-medium hover:bg-ae-teal-light transition-colors">
                Read the White Paper
              </a>
              <a href="/bridge" className="border border-white/30 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors">
                Read the Short Story
              </a>
              <a href="/get-involved" className="border border-ae-gold/50 text-ae-gold px-6 py-3 rounded-full font-medium hover:bg-ae-gold/10 transition-colors">
                Get Involved
              </a>
            </div>
          </div>
        </section>
      </main>
      <SubpageFooter />
    </>
  );
}
