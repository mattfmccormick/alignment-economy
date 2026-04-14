"use client";

import React from "react";

// ═══════════════════════════════════════════════════
// IMAGE MEME WRAPPER
// ═══════════════════════════════════════════════════
function ImgMeme({ src, alt }: { src: string; alt: string }) {
  return (
    <div style={{ width: "100%", background: "#ffffff", display: "flex", flexDirection: "column" }}>
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "auto", display: "block" }}
      />
      <div style={{ padding: "6px 20px 10px", textAlign: "center", fontSize: "10px", letterSpacing: "1px", color: "#94a3b8", fontFamily: "'Courier New',monospace" }}>
        alignmenteconomy.org
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// MEME DATA
// ═══════════════════════════════════════════════════

type Meme = { stage: 1 | 2 | 3; id: string; render: () => React.ReactElement };

const memes: Meme[] = [
  // ───────────────────────────────────────
  // STAGE 1: FIAT IS FAILING
  // ───────────────────────────────────────
  {
    stage: 1,
    id: "dollar-vs-monopoly",
    render: () => <ImgMeme src="/memes/dollar-vs-monopoly.jpeg" alt="The only difference between these two notes is your belief that one has more value than the other" />,
  },
  {
    stage: 1,
    id: "gold-bars-home",
    render: () => <ImgMeme src="/memes/gold-bars-home.jpeg" alt="10 gold bars bought a home in 1920. 10 gold bars still buy a home in 2023" />,
  },
  {
    stage: 1,
    id: "teacher-basketball",
    render: () => <ImgMeme src="/memes/teacher-basketball.jpeg" alt="In another universe, school teachers make $10 million a year" />,
  },
  {
    stage: 1,
    id: "taxes-theft",
    render: () => <ImgMeme src="/memes/taxes-theft.jpeg" alt="Why are we forced to pay taxes if they print all the money they want anyway? It's theft, son." />,
  },
  {
    stage: 1,
    id: "money-debasement",
    render: () => <ImgMeme src="/memes/money-debasement.png" alt="Money printer go brrr vs coin ridges: they're the same picture" />,
  },

  // ───────────────────────────────────────
  // STAGE 2: WHY BITCOIN CAN'T FIX IT
  // (New memes coming)
  // ───────────────────────────────────────

  // ───────────────────────────────────────
  // STAGE 3: HOW THE ALIGNMENT ECONOMY WORKS
  // (New memes coming)
  // ───────────────────────────────────────
];

export const curatedMemes = memes;
export { memes };
