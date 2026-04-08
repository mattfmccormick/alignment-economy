"use client";

import { useCallback } from "react";
import { SubpageNav, SubpageFooter } from "@/components/site-nav";
import { curatedMemes } from "./meme-data";

const sections = [
  {
    id: "fiat-failing",
    stage: 1,
    title: "The Problem: Fiat Is Failing",
    subtitle: "The measuring stick is broken. Every fiat currency in history has failed. Invisible labor, inflation by design, and AI accelerating the decline.",
  },
  {
    id: "bitcoin-cant-fix",
    stage: 2,
    title: "The Attempt: Why Bitcoin Can't Fix It",
    subtitle: "Bitcoin proved decentralized value transfer works. But first-mover advantage and deflation mean it will never be daily money.",
  },
  {
    id: "alignment-economy",
    stage: 3,
    title: "The Solution: How the Alignment Economy Works",
    subtitle: "Daily point allocations, daily rebasing, proof of human. A system built for spending, not speculation, that finally sees invisible work.",
  },
];

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
        <div className="sticky top-16 z-40 bg-ae-navy/95 backdrop-blur-md border-b border-white/10 px-6 py-3">
          <div className="max-w-6xl mx-auto flex gap-2 justify-center overflow-x-auto">
            {sections.map((s) => (
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

        {/* Meme sections */}
        {sections.map((section) => {
          const sectionMemes = curatedMemes.filter(m => m.stage === section.stage);
          return (
            <section key={section.id} id={section.id} className="py-16 md:py-20 px-6">
              <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <div className="text-center mb-12">
                  <h2 className="font-heading text-3xl md:text-4xl font-bold text-ae-navy mb-3">
                    {section.title}
                  </h2>
                  <p className="text-ae-slate text-base max-w-2xl mx-auto leading-relaxed">
                    {section.subtitle}
                  </p>
                </div>

                {/* Meme grid: 1 col mobile, 2 col tablet, 3 col desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sectionMemes.map((meme) => (
                    <div
                      key={meme.id}
                      className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="meme-card-inner">
                        {meme.render()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider between sections */}
              <div className="max-w-xs mx-auto mt-16 border-t border-gray-200" />
            </section>
          );
        })}

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
