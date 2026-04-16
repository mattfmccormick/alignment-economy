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
  {
    stage: 1,
    id: "brain-inflation",
    render: () => <ImgMeme src="/memes/brain_sleep_inflation.png" alt="Inflation sure is high these days. Why did a Coke cost 5 cents in 1912 but $2 today?" />,
  },
  {
    stage: 1,
    id: "trolly",
    render: () => <ImgMeme src="/memes/trolly.webp" alt="Trolley problem meme" />,
  },
  {
    stage: 1,
    id: "sahm1",
    render: () => <ImgMeme src="/memes/sahm1.jpg" alt="Stay-at-home mom contribution is invisible in the economy" />,
  },
  {
    stage: 1,
    id: "dollar-losing-value",
    render: () => <ImgMeme src="/memes/dollar-losing-value.jpg" alt="The dollar is losing value every year" />,
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
