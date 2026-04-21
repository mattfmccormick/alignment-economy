"use client";

import { useMemo, useState } from "react";
import {
  verificationQueue,
  minerStats,
  networkStats,
  minerJurySummons,
  minerBountyHistory,
  protocolParams,
  currentBalances,
} from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";

// Tier is a classification hint, not an enforced cap. Per white paper 6:
// "game theory would determine the best method and weighting of evidence."
// The miner sets the weight on each accepted item. Total is capped at 100%.
function tierColor(tier: "A" | "B" | "C") {
  if (tier === "A") return "bg-gray-100 text-gray-700 border-gray-200";
  if (tier === "B") return "bg-blue-100 text-blue-700 border-blue-200";
  return "bg-emerald-100 text-emerald-700 border-emerald-200";
}

function tierLabel(tier: "A" | "B" | "C") {
  if (tier === "A") return "self-attestation";
  if (tier === "B") return "hard to fake";
  return "social";
}

type ItemState = { accepted: boolean; weight: number };

export default function MinerPage() {
  const [queue, setQueue] = useState(verificationQueue);
  // Per-item state: accepted + miner-assigned weight (default = suggested contribution)
  const [itemState, setItemState] = useState<Record<string, ItemState>>({});
  const [flagOpen, setFlagOpen] = useState(false);
  const [flagStake, setFlagStake] = useState(600);

  // FIFO: the one and only "active" assignment is the first pending item.
  // Everything else is locked until this one is closed.
  const activeReq = useMemo(
    () => queue.find((r) => r.status === "pending") ?? null,
    [queue]
  );

  const itemsForActive = activeReq?.tieredEvidence ?? [];

  // Hydrate default state on the active request
  function keyOf(idx: number) {
    return `${activeReq?.id}::${idx}`;
  }
  function getItem(idx: number): ItemState {
    const k = keyOf(idx);
    if (itemState[k]) return itemState[k];
    const suggested = itemsForActive[idx]?.contribution ?? 0;
    return { accepted: true, weight: suggested };
  }

  const scoring = useMemo(() => {
    let totalA = 0, totalB = 0, totalC = 0;
    itemsForActive.forEach((it, i) => {
      const s = getItem(i);
      if (!s.accepted) return;
      if (it.tier === "A") totalA += s.weight;
      else if (it.tier === "B") totalB += s.weight;
      else totalC += s.weight;
    });
    const raw = totalA + totalB + totalC;
    return {
      byTier: { A: totalA, B: totalB, C: totalC },
      raw,
      total: Math.min(100, Math.max(0, raw)),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemState, itemsForActive]);

  function toggleEvidence(idx: number) {
    if (!activeReq) return;
    const k = keyOf(idx);
    const cur = getItem(idx);
    setItemState((prev) => ({ ...prev, [k]: { ...cur, accepted: !cur.accepted } }));
  }

  function setWeight(idx: number, weight: number) {
    if (!activeReq) return;
    const k = keyOf(idx);
    const cur = getItem(idx);
    const clamped = Math.max(0, Math.min(100, weight));
    setItemState((prev) => ({ ...prev, [k]: { ...cur, weight: clamped } }));
  }

  function submitVerification() {
    if (!activeReq) return;
    setQueue((prev) =>
      prev.map((r) =>
        r.id === activeReq.id
          ? { ...r, status: scoring.total === 0 ? ("rejected" as const) : ("approved" as const) }
          : r
      )
    );
    setItemState({});
  }

  function flagForArbitration() {
    if (!activeReq) return;
    alert(
      `Case opened against ${activeReq.applicantHandle}. You staked ${flagStake} Earned points.\n\nThe defendant now has 7 days to respond with additional evidence. If they cannot clear the bar, the case escalates to court and a jury of 11 Tier-2 miners is drafted.`
    );
    setQueue((prev) =>
      prev.map((r) =>
        r.id === activeReq.id ? { ...r, status: "rejected" as const } : r
      )
    );
    setFlagOpen(false);
    setItemState({});
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ae-navy">Mining Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Verify humans. Earn fees. Maintain the ledger.
        </p>
      </div>

      {/* Tier + accuracy + earnings strip */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-ae-navy rounded-2xl p-5 text-white md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-300 uppercase tracking-wider">Your Tier</span>
            <span className="bg-ae-teal/20 text-ae-teal text-xs px-2 py-0.5 rounded-full font-medium">
              Validator
            </span>
          </div>
          <p className="text-xl font-bold mb-4">{minerStats.tierLabel}</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-gray-400">Verification</p>
              <p className="text-lg font-bold font-mono">{minerStats.verificationAccuracy}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Jury</p>
              <p className="text-lg font-bold font-mono">{minerStats.juryAccuracy}%</p>
            </div>
            <div className="bg-white/10 rounded-lg py-1">
              <p className="text-xs text-gray-400">Composite</p>
              <p className="text-lg font-bold font-mono text-ae-teal">{minerStats.compositeAccuracy}%</p>
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Drop below {minerStats.accuracyThreshold}% composite over a 30-day window and you return to Tier 1 (Node Operator only, no verification or jury income).
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs text-gray-500 mb-1">Fee + Bounty Earnings (30d)</p>
          <p className="text-2xl font-bold text-ae-navy font-mono">
            {(minerStats.rewardsEarned + minerStats.bountyEarned).toLocaleString()}
          </p>
          <div className="mt-3 space-y-1 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>Tier-2 fee share</span>
              <span className="font-medium text-ae-navy">{minerStats.rewardsEarned.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Bounties</span>
              <span className="font-medium text-amber-700">{minerStats.bountyEarned.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Lottery wins</span>
              <span className="font-medium text-ae-navy">{minerStats.lotteryWins}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-xs text-gray-500 mb-1">Rank</p>
          <p className="text-2xl font-bold text-ae-navy font-mono">#{minerStats.rank}</p>
          <p className="text-xs text-gray-500 mt-1">of {minerStats.totalMiners.toLocaleString()} miners</p>
          <div className="mt-3 text-xs">
            <div className="flex justify-between text-gray-500">
              <span>Total verified</span>
              <span className="font-medium text-ae-navy">{minerStats.totalVerified}</span>
            </div>
            <div className="flex justify-between text-gray-500 mt-1">
              <span>Avg review time</span>
              <span className="font-medium text-ae-navy">{minerStats.avgReviewTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Jury summons - show if any */}
      {minerJurySummons.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-orange-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0m6 0H9" />
            </svg>
            <div className="flex-1">
              <h3 className="font-semibold text-orange-900">Jury Summons ({minerJurySummons.length})</h3>
              <p className="text-sm text-orange-800 mt-0.5">
                You&apos;ve been drafted as a juror. Each seat requires a {protocolParams.jurorStakePct}% Earned-points stake. Wrong-side votes are burned.
              </p>
              <div className="mt-3 space-y-2">
                {minerJurySummons.map((s) => (
                  <div key={s.caseId} className="bg-white rounded-xl p-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-ae-navy truncate">{s.caseTitle}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Stage: <span className="capitalize font-medium">{s.stage.replace("_", " ")}</span> · Stake {s.stakeRequired.toLocaleString()} pts · Deadline {s.deadline}
                      </p>
                    </div>
                    <a
                      href={`/court?case=${s.caseId}`}
                      className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                        s.canVote
                          ? "bg-orange-600 text-white hover:bg-orange-700"
                          : "bg-white border border-orange-300 text-orange-700 hover:bg-orange-100"
                      }`}
                    >
                      {s.canVote ? "Cast Vote →" : "Review Case →"}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Network Status (compact) */}
      <div className="bg-ae-navy rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Network Status</h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-green-400">Mining Active</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-400">Block Height</p>
            <p className="text-xl font-bold font-mono">{networkStats.blockHeight.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Network TPS</p>
            <p className="text-xl font-bold font-mono">{networkStats.tps.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Avg Block Time</p>
            <p className="text-xl font-bold font-mono">{networkStats.avgBlockTime}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Next Rebase</p>
            <p className="text-xl font-bold font-mono">{networkStats.nextRebaseIn}</p>
          </div>
        </div>
      </div>

      {/* FIFO Queue + Scoring */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Queue (FIFO) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="font-semibold text-ae-navy">FIFO Assignment Queue</h2>
            <span className="text-xs text-gray-500">
              {queue.filter((r) => r.status === "pending").length} pending
            </span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Cases are dealt in strict FIFO order. You cannot skip. This prevents miners from cherry-picking easy approvals (white paper 7.1).
          </p>
          {queue.map((req) => {
            const isActive = activeReq?.id === req.id;
            const isLocked = !isActive && req.status === "pending";
            return (
              <div
                key={req.id}
                className={`bg-white rounded-xl border p-4 transition-colors ${
                  isActive
                    ? "border-ae-teal ring-2 ring-ae-teal/20"
                    : isLocked
                    ? "border-gray-100 opacity-50"
                    : "border-gray-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-xs font-mono font-semibold shrink-0 ${isActive ? "text-ae-teal" : "text-gray-400"}`}>
                      #{req.fifoPosition}
                    </span>
                    <p className="font-medium text-ae-navy text-sm truncate">{req.applicant}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {isLocked && (
                      <svg className="w-3.5 h-3.5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    )}
                    <StatusBadge status={req.status} />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="capitalize">{req.type.replace("_", " ")}</span>
                  <span>·</span>
                  <span>{req.vouchers} vouchers</span>
                  <span>·</span>
                  <span>{req.tieredEvidence.length} evidence items</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active case detail */}
        <div className="lg:col-span-3">
          {activeReq ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6 sticky top-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-ae-navy">{activeReq.applicant}</h2>
                  <StatusBadge status={activeReq.status} />
                </div>
                <p className="text-sm text-gray-400">
                  {activeReq.applicantHandle} · Submitted {new Date(activeReq.submittedAt).toLocaleDateString()}
                </p>
              </div>

              {/* Evidence review with miner-set weights */}
              <div>
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="font-semibold text-ae-navy">Evidence Review</h3>
                  <span className="text-xs text-gray-500">Accept or reject · set the weight</span>
                </div>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  You decide the weight of each piece. Tiers are a classification, not a cap. Per the white paper, game theory determines norms across the network over time. Vouches alone can reach 100% if they carry enough backing.
                </p>
                <div className="space-y-2">
                  {activeReq.tieredEvidence.map((ev, i) => {
                    const s = getItem(i);
                    const isAccepted = s.accepted;
                    return (
                      <div
                        key={i}
                        className={`rounded-xl border transition-colors ${
                          isAccepted ? tierColor(ev.tier) : "bg-gray-50 border-gray-200 opacity-60"
                        }`}
                      >
                        <button
                          onClick={() => toggleEvidence(i)}
                          className="w-full flex items-start gap-3 p-3 text-left"
                        >
                          <div className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                            isAccepted
                              ? ev.tier === "A" ? "bg-gray-200 text-gray-700"
                                : ev.tier === "B" ? "bg-blue-200 text-blue-800"
                                : "bg-emerald-200 text-emerald-800"
                              : "bg-gray-200 text-gray-400"
                          }`}>
                            {ev.tier}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-sm font-medium text-ae-navy">{ev.label}</p>
                              <span className="text-[10px] uppercase tracking-wider text-gray-500 shrink-0">
                                {tierLabel(ev.tier)}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{ev.description}</p>
                            {ev.voucher && (
                              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-gray-600">
                                <span>
                                  {ev.voucher.handle} · <span className="font-mono text-ae-navy">{ev.voucher.percentHuman}% human</span>
                                </span>
                                <span>
                                  stake <span className="font-mono text-ae-navy">{ev.voucher.stakeAmount.toLocaleString()}</span> pts ({ev.voucher.stakePct}% earned)
                                </span>
                              </div>
                            )}
                          </div>
                        </button>

                        {/* Weight slider — active only when accepted */}
                        {isAccepted && (
                          <div className="px-3 pb-3 pt-0 -mt-1">
                            <div className="flex items-center gap-3">
                              <input
                                type="range"
                                min={0}
                                max={100}
                                value={s.weight}
                                onChange={(e) => setWeight(i, parseInt(e.target.value))}
                                className="flex-1"
                              />
                              <div className="flex items-center gap-1 bg-white rounded-md px-2 py-1 border border-gray-200 w-20 shrink-0">
                                <input
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={s.weight}
                                  onChange={(e) => setWeight(i, parseInt(e.target.value || "0"))}
                                  className="w-10 text-sm font-mono text-right bg-transparent focus:outline-none"
                                />
                                <span className="text-xs text-gray-400">%</span>
                              </div>
                            </div>
                            {ev.contribution !== s.weight && (
                              <p className="text-[11px] text-gray-500 mt-1">
                                Suggested starting weight: {ev.contribution}%
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Score summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Score Build</p>
                {(["A", "B", "C"] as const).map((t) => (
                  <div key={t} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                        t === "A" ? "bg-gray-200 text-gray-700" : t === "B" ? "bg-blue-200 text-blue-800" : "bg-emerald-200 text-emerald-800"
                      }`}>
                        {t}
                      </span>
                      <span className="text-gray-600">
                        Tier {t}
                        <span className="text-gray-400 ml-2">({tierLabel(t)})</span>
                      </span>
                    </div>
                    <div className="font-mono text-sm text-ae-navy">
                      +{scoring.byTier[t]}%
                    </div>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-ae-navy">Proposed % Human</span>
                    {scoring.raw > 100 && (
                      <p className="text-[11px] text-gray-500 mt-0.5">Raw sum {scoring.raw}%, capped at 100</p>
                    )}
                  </div>
                  <span className="text-2xl font-bold font-mono text-ae-teal">{scoring.total}%</span>
                </div>
              </div>

              {/* On-chain details */}
              <div>
                <h3 className="font-semibold text-ae-navy mb-3 text-sm">On-Chain Record</h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account ID</span>
                    <span className="text-ae-navy">0x7a3f...e8b2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Evidence Hash</span>
                    <span className="text-ae-navy">0xb8e1...7c3d</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">FIFO Assignment</span>
                    <span className="text-ae-navy">Block #{(networkStats.blockHeight - 4).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                {flagOpen ? (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-3">
                    <div>
                      <p className="font-semibold text-red-900 text-sm">Flag for Arbitration</p>
                      <p className="text-xs text-red-700 mt-1">
                        You&apos;re claiming this account is not human. Stake a percentage of your Earned balance as confidence. If the court finds the account human, your stake is burned.
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-red-900 mb-1">
                        Stake (Earned balance: {currentBalances.earned.toLocaleString()})
                      </label>
                      <input
                        type="range"
                        min={100}
                        max={Math.floor(currentBalances.earned / 4)}
                        step={100}
                        value={flagStake}
                        onChange={(e) => setFlagStake(parseInt(e.target.value))}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-red-700 mt-1">
                        <span>100</span>
                        <span className="font-mono font-semibold">{flagStake.toLocaleString()} pts</span>
                        <span>{Math.floor(currentBalances.earned / 4).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Potential bounty if case wins</span>
                        <span className="font-mono font-semibold text-emerald-700">
                          ~20% of defendant&apos;s Earned
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Your stake if case loses</span>
                        <span className="font-mono font-semibold text-red-700">burned</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={flagForArbitration}
                        className="flex-1 bg-red-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-red-700 transition-colors"
                      >
                        Open Arbitration + Stake {flagStake.toLocaleString()}
                      </button>
                      <button
                        onClick={() => setFlagOpen(false)}
                        className="px-4 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={submitVerification}
                      className="w-full bg-ae-teal text-white py-3 rounded-xl font-medium hover:bg-ae-teal-light transition-colors"
                    >
                      Submit {scoring.total}% Human Score
                    </button>
                    <button
                      onClick={() => setFlagOpen(true)}
                      className="w-full bg-white border border-red-200 text-red-600 py-2.5 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors"
                    >
                      Flag for Arbitration (non-human / duplicate)
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-gray-400">
              <svg className="w-12 h-12 mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p>Queue is clear. New assignments are dealt in FIFO order.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bounty history */}
      {minerBountyHistory.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="font-semibold text-ae-navy">Recent Bounties</h2>
            <span className="text-xs text-gray-500">
              Challenger receives {protocolParams.bountyPct}% of condemned Earned balance (white paper 8.4)
            </span>
          </div>
          <div className="space-y-2">
            {minerBountyHistory.map((b) => (
              <div key={b.caseId} className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-ae-navy">
                    {b.defendantHandle} <span className="text-emerald-700 text-xs ml-2">· ruled non-human</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Defendant Earned: {b.defendantEarned.toLocaleString()} · Stake returned: {b.challengerStakeReturned.toLocaleString()} · Resolved {b.resolvedAt}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold font-mono text-emerald-700">
                    +{b.bountyAwarded.toLocaleString()}
                  </p>
                  <p className="text-xs text-emerald-600">bounty</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
