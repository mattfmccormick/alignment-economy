"use client";

import { useState } from "react";
import { SubpageNav, SubpageFooter } from "@/components/site-nav";
import { memes, stageColors } from "./meme-data";

export default function MemesPage() {
  const [selected, setSelected] = useState(0);
  const [stageFilter, setStageFilter] = useState<number | "hearts" | null>(null);
  const [hearts, setHearts] = useState<Record<string, boolean>>({});

  const heartCount = Object.values(hearts).filter(Boolean).length;
  const showHearted = stageFilter === "hearts";
  const filtered = typeof stageFilter === "number" ? memes.filter(m => m.stage === stageFilter) : memes;
  const displayMemes = showHearted ? memes.filter(m => hearts[m.id]) : filtered;
  const displayCurrent = displayMemes[selected] || displayMemes[0];
  const displaySc = displayCurrent ? stageColors[displayCurrent.stage] : stageColors[1];

  const toggleHeart = () => {
    const m = displayMemes[selected];
    if (m) setHearts(h => ({ ...h, [m.id]: !h[m.id] }));
  };

  return (
    <>
      <SubpageNav />
      <main className="min-h-screen bg-[#080808]">
        {/* Hero */}
        <section className="py-12 md:py-16 px-6 bg-ae-navy text-white text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-ae-gold text-sm font-medium tracking-wide uppercase mb-4">64 Memes Across 3 Stages</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">The Alignment Economy in Memes</h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              The problem, the failed fixes, and the path forward. One meme at a time.
            </p>
          </div>
        </section>

        {/* Filter tabs */}
        <div className="px-6 py-4 border-b border-white/5">
          <div className="max-w-xl mx-auto flex flex-wrap gap-2 justify-center">
            {([
              { val: null, label: "All" },
              { val: 1, label: "Awakening" },
              { val: 2, label: "Crypto Curious" },
              { val: 3, label: "First Step" },
              { val: "hearts" as const, label: `Saved ${heartCount}` },
            ]).map(f => (
              <button
                key={f.label}
                onClick={() => { setStageFilter(f.val); setSelected(0); }}
                className="px-4 py-1.5 rounded-full text-xs tracking-wide transition-colors"
                style={{
                  border: "1px solid",
                  borderColor: stageFilter === f.val
                    ? (f.val === "hearts" ? "#ff4444" : stageColors[typeof f.val === "number" ? f.val : 1]?.accent || "#222")
                    : "#222",
                  background: stageFilter === f.val ? "rgba(255,255,255,0.05)" : "transparent",
                  color: stageFilter === f.val ? "#fff" : "#555",
                  fontFamily: "'Courier New',monospace",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Meme viewer */}
        {displayMemes.length === 0 ? (
          <div className="py-20 text-center text-gray-600 text-sm">
            No saved memes yet. Browse and tap the heart on the ones that hit.
          </div>
        ) : (
          <div className="px-6 py-8 max-w-[500px] mx-auto">
            {/* Stage label */}
            <div
              className="text-[10px] tracking-widest mb-3 opacity-70"
              style={{ color: displaySc?.accent }}
            >
              {displaySc?.label}
            </div>

            {/* Meme card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                border: "1px solid #1a1a1a",
                boxShadow: `0 0 60px ${displaySc?.accent}08`,
              }}
            >
              {displayCurrent && displayCurrent.render()}
            </div>

            {/* Heart + Nav row */}
            <div className="flex justify-between items-center mt-5 px-1">
              <button
                onClick={() => setSelected(Math.max(0, selected - 1))}
                disabled={selected === 0}
                className="px-4 py-2 rounded-lg border text-xs transition-colors"
                style={{
                  background: selected === 0 ? "#111" : "#1a1a1a",
                  borderColor: "#222",
                  color: selected === 0 ? "#333" : "#888",
                  cursor: selected === 0 ? "default" : "pointer",
                  fontFamily: "'Courier New',monospace",
                }}
              >
                &larr;
              </button>

              <button
                onClick={toggleHeart}
                className="px-6 py-2.5 rounded-full text-lg transition-all"
                style={{
                  background: hearts[displayCurrent?.id] ? "rgba(255,68,68,0.15)" : "rgba(255,255,255,0.03)",
                  border: hearts[displayCurrent?.id] ? "1px solid #ff4444" : "1px solid #222",
                }}
              >
                {hearts[displayCurrent?.id] ? "❤️" : "🤍"}
              </button>

              <div className="text-xs text-gray-600 min-w-[50px] text-center" style={{ fontFamily: "'Courier New',monospace" }}>
                {selected + 1}/{displayMemes.length}
              </div>

              <button
                onClick={() => setSelected(Math.min(displayMemes.length - 1, selected + 1))}
                disabled={selected === displayMemes.length - 1}
                className="px-4 py-2 rounded-lg border text-xs transition-colors"
                style={{
                  background: selected === displayMemes.length - 1 ? "#111" : "#1a1a1a",
                  borderColor: "#222",
                  color: selected === displayMemes.length - 1 ? "#333" : "#888",
                  cursor: selected === displayMemes.length - 1 ? "default" : "pointer",
                  fontFamily: "'Courier New',monospace",
                }}
              >
                &rarr;
              </button>
            </div>

            {/* Thumbnail grid */}
            <div className="grid grid-cols-4 gap-1.5 mt-5">
              {displayMemes.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => setSelected(i)}
                  className="aspect-square rounded-lg overflow-hidden relative flex flex-col items-center justify-center gap-1 p-1.5"
                  style={{
                    border: selected === i ? `2px solid ${stageColors[m.stage].accent}` : "2px solid #1a1a1a",
                    background: "#111",
                  }}
                >
                  {hearts[m.id] && <div className="absolute top-1 right-1 text-[8px]">❤️</div>}
                  <div className="text-[7px] tracking-wide" style={{ color: stageColors[m.stage].accent }}>S{m.stage}</div>
                  <div className="text-[7px] text-gray-500 text-center leading-tight" style={{ fontFamily: "'Courier New',monospace" }}>
                    {m.id.replace(/-/g, " ")}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
      <SubpageFooter />
    </>
  );
}
