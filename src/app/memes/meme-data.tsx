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
// TYPES
// ═══════════════════════════════════════════════════

export type MemeItem = {
  id: string;
  render: () => React.ReactElement;
};

export type MemeGroup = {
  heading: string;
  intro?: string;
  memes: MemeItem[];
};

export type MemeSection = {
  stage: 1 | 2 | 3;
  id: string;
  title: string;
  subtitle: string;
  groups: MemeGroup[];
};

// ═══════════════════════════════════════════════════
// SECTIONS WITH GROUPED MEMES
// ═══════════════════════════════════════════════════

export const memeSections: MemeSection[] = [
  // ───────────────────────────────────────
  // STAGE 1: FIAT IS FAILING
  // ───────────────────────────────────────
  {
    stage: 1,
    id: "fiat-failing",
    title: "The Problem: Fiat Is Failing",
    subtitle:
      "The measuring stick is broken. Every fiat currency in history has failed. Invisible labor, inflation by design, and AI accelerating the decline.",
    groups: [
      {
        heading: "All fiat has failed due to inflation or debasement",
        memes: [
          { id: "dollar-vs-monopoly", render: () => <ImgMeme src="/memes/dollar-vs-monopoly.jpeg" alt="The only difference between these two notes is your belief that one has more value than the other" /> },
          { id: "money-debasement", render: () => <ImgMeme src="/memes/money-debasement.png" alt="Money printer go brrr vs coin ridges: they're the same picture" /> },
        ],
      },
      {
        heading: "The dollar is failing",
        memes: [
          { id: "brain-inflation", render: () => <ImgMeme src="/memes/brain_sleep_inflation.png" alt="Inflation sure is high these days. Why did a Coke cost 5 cents in 1912 but $2 today?" /> },
          { id: "gold-bars-home", render: () => <ImgMeme src="/memes/gold-bars-home.jpeg" alt="10 gold bars bought a home in 1920. 10 gold bars still buy a home in 2023" /> },
          { id: "dollar-losing-value", render: () => <ImgMeme src="/memes/dollar-losing-value.jpg" alt="The dollar is losing value every year" /> },
        ],
      },
      {
        heading: "Voting won't change things",
        memes: [
          { id: "vote", render: () => <ImgMeme src="/memes/vote.png" alt="Voting can't fix a broken measuring stick" /> },
          { id: "trolly", render: () => <ImgMeme src="/memes/trolly.webp" alt="Trolley problem: voting doesn't change the track" /> },
        ],
      },
      {
        heading: "And fiat doesn't make all value visible",
        memes: [
          { id: "sahm1", render: () => <ImgMeme src="/memes/sahm1.jpg" alt="Stay-at-home mom contribution is invisible in the economy" /> },
          { id: "teacher-basketball", render: () => <ImgMeme src="/memes/teacher-basketball.jpeg" alt="In another universe, school teachers make $10 million a year" /> },
        ],
      },
    ],
  },

  // ───────────────────────────────────────
  // STAGE 2: WHY BITCOIN CAN'T FIX IT
  // ───────────────────────────────────────
  {
    stage: 2,
    id: "bitcoin-cant-fix",
    title: "The Attempt: Why Bitcoin Can't Fix It",
    subtitle:
      "Bitcoin proved decentralized value transfer works. But first-mover advantage and deflation mean it will never be daily money.",
    groups: [
      {
        heading: "While complex, blockchain is a powerful technology",
        memes: [
          { id: "talking-btc", render: () => <ImgMeme src="/memes/talking-btc.jpg" alt="Talking about Bitcoin" /> },
          { id: "jp", render: () => <ImgMeme src="/memes/jp.jpg" alt="JP Morgan and crypto" /> },
        ],
      },
      {
        heading: "But 90% of blockchain is a scam",
        memes: [
          { id: "then-and-now", render: () => <ImgMeme src="/memes/then-and-now.jpg" alt="Crypto Bros in 2017 vs 2025: from ideals to meme coins and ETFs" /> },
          { id: "scam1", render: () => <ImgMeme src="/memes/scam1.jpg" alt="Most of crypto is a scam" /> },
        ],
      },
      {
        heading: "And there are two paradoxes it hasn't overcome",
        intro:
          "(1) The people who showed up first got a huge share when it was cheap or easy to earn. New joiners get very little, so it feels unfair and discourages adoption. (2) If the currency keeps going up in value, people save it instead of using it. When nobody wants to spend, it stops behaving like money and acts more like gold or an investment.",
        memes: [
          { id: "first-meme", render: () => <ImgMeme src="/memes/first-meme.png" alt="First mover advantage: early holders dominate" /> },
          { id: "pizza-meme", render: () => <ImgMeme src="/memes/pizza-meme.webp" alt="The famous Bitcoin pizza transaction" /> },
        ],
      },
    ],
  },

  // ───────────────────────────────────────
  // STAGE 3: HOW THE ALIGNMENT ECONOMY WORKS
  // ───────────────────────────────────────
  {
    stage: 3,
    id: "alignment-economy",
    title: "The Solution: How the Alignment Economy Works",
    subtitle:
      "Daily point allocations, daily rebasing, proof of human. A system built for spending, not speculation, that finally sees invisible work.",
    groups: [
      {
        heading: "Giving each user a daily allocation of points reduces first-mover advantage",
        memes: [
          { id: "oprah", render: () => <ImgMeme src="/memes/you-get-money-meme-oprah.jpg" alt="You get points! And you get points! Everyone gets points!" /> },
        ],
      },
      {
        heading: "Wait a minute, if everyone gets points, won't that cause inflation?",
        memes: [
          { id: "skeptical-kid", render: () => <ImgMeme src="/memes/third-world-skeptical-kid-meme-template-thumbnail-12ccc16c.webp" alt="Skeptical kid: won't that cause inflation?" /> },
        ],
      },
      {
        heading: "Yes, that is why the system rebases each day. Rebasing (reducing the total number of points in the system while keeping each user's % the same) reduces inflation",
        memes: [
          { id: "rebase", render: () => <ImgMeme src="/memes/rebase.png" alt="Daily rebasing keeps purchasing power constant" /> },
        ],
      },
      {
        heading: "OK, but won't there be fake accounts and bots?",
        memes: [
          { id: "skeptical-baby", render: () => <ImgMeme src="/memes/skeptical_baby.jpg" alt="Skeptical baby: what about fake accounts?" /> },
        ],
      },
      {
        heading: "We use miners to verify which accounts are human, scoring each on a range from 0% human (known bot) to 100% human",
        memes: [
          { id: "proof-of-human", render: () => <ImgMeme src="/memes/1_rsTTSTcn6AoBdkz3Y9CzDw.jpg" alt="Proof of human verification" /> },
        ],
      },
      {
        heading: "Ok, fine",
        memes: [
          { id: "ok-fine", render: () => <ImgMeme src="/memes/0_haxFdKCmTM4cIl07.jpg" alt="Ok fine, I'm convinced" /> },
        ],
      },
      {
        heading: "But wait, there's more",
        memes: [
          { id: "but-wait", render: () => <ImgMeme src="/memes/but-wait.jpg" alt="But wait, there's more" /> },
        ],
      },
      {
        heading: "Daily point allocations make invisible labor (motherhood, mentoring, etc.) visible",
        memes: [
          { id: "value", render: () => <ImgMeme src="/memes/value.jpg" alt="Invisible labor made visible" /> },
          { id: "value-2", render: () => <ImgMeme src="/memes/value-2.jpg" alt="Invisible labor made visible, part two" /> },
        ],
      },
      {
        heading: "Helps with AI alignment? Bots can earn points, they just can't get daily allocations",
        memes: [
          { id: "ai", render: () => <ImgMeme src="/memes/ai.jpg" alt="AI aligned with human value" /> },
        ],
      },
      {
        heading: "Supportive points help put an end to planned obsolescence",
        memes: [
          { id: "fridge", render: () => <ImgMeme src="/memes/fridge.jpg" alt="Planned obsolescence: fridge" /> },
          { id: "better-product", render: () => <ImgMeme src="/memes/better-product.jpg" alt="Build a better product, earn longer" /> },
        ],
      },
      {
        heading: "Ambient points are a better way to do taxes",
        memes: [
          { id: "taxes", render: () => <ImgMeme src="/memes/taxes.jpg" alt="Taxes, but fairer" /> },
          { id: "taxes-theft", render: () => <ImgMeme src="/memes/taxes-theft.jpeg" alt="Why are we forced to pay taxes if they print all the money they want anyway?" /> },
        ],
      },
      {
        heading: "Which one are you?",
        memes: [
          { id: "over", render: () => <ImgMeme src="/memes/over.jpg" alt="This is over my head" /> },
          { id: "sign-up", render: () => <ImgMeme src="/memes/sign-up.jpg" alt="Where do I sign up?" /> },
        ],
      },
    ],
  },
];

// Back-compat export in case anything else imports curatedMemes by stage.
export const curatedMemes = memeSections.flatMap((s) =>
  s.groups.flatMap((g) => g.memes.map((m) => ({ ...m, stage: s.stage })))
);
