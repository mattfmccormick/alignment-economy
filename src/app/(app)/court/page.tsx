"use client";

import { useEffect, useMemo, useState } from "react";
import { disputes as baseDisputes, courtStats, protocolParams, currentBalances, type Dispute, type JuryMember } from "@/lib/mock-data";

const stageLabels: Record<string, string> = {
  arbitration: "Arbitration",
  open: "Open",
  evidence_review: "Evidence Review",
  voting: "Voting",
  ruling: "Ruling",
  appeal: "Appeal",
  resolved: "Resolved",
};

const stageColors: Record<string, string> = {
  arbitration: "bg-gray-100 text-gray-700",
  open: "bg-yellow-100 text-yellow-700",
  evidence_review: "bg-blue-100 text-blue-700",
  voting: "bg-purple-100 text-purple-700",
  ruling: "bg-orange-100 text-orange-700",
  appeal: "bg-red-100 text-red-700",
  resolved: "bg-green-100 text-green-700",
};

const stageDescriptions: Record<string, string> = {
  arbitration:
    "Defendant has 7 days to respond with evidence or additional vouchers. If the challenger is satisfied, the case closes with no penalty and no court (white paper 8.1).",
  open:
    "Case escalated. Challenger's stake is now at risk. A random jury of 11 Tier-2 miners is being drafted; jurors can't have transaction history with either party.",
  evidence_review:
    "Jurors review the defendant's account history, the challenger's claim and stake, and all evidence submitted during arbitration.",
  voting:
    "Each juror casts a sealed vote (\"human / one account\" or \"not human / duplicate\"). Votes are revealed only when all 11 are in.",
  ruling:
    "Majority verdict recorded on-chain. Bounty distributed; wrong-side juror stakes burned.",
  appeal:
    "A new jury of 11 is drafted. Same process. Appeal verdict is final (white paper 8.3).",
  resolved: "Final ruling on-chain. Case closed.",
};

// 7-day window per stage per white paper. Each active stage uses this to
// derive a countdown from dispute.stageStartedAt.
function useCountdown(startIso: string | undefined, stage: string) {
  const isActiveStage = stage !== "resolved" && !!startIso;
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!isActiveStage) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [isActiveStage]);

  if (!isActiveStage || !startIso) return null;

  const start = new Date(startIso).getTime();
  const deadline = start + protocolParams.stageWindowDays * 24 * 60 * 60 * 1000;
  const remainingMs = deadline - now;
  if (remainingMs <= 0) return { label: "Window closed", expired: true, pct: 100 };
  const totalMs = protocolParams.stageWindowDays * 24 * 60 * 60 * 1000;
  const pct = Math.max(0, Math.min(100, ((totalMs - remainingMs) / totalMs) * 100));
  const days = Math.floor(remainingMs / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remainingMs / (60 * 60 * 1000)) % 24);
  const minutes = Math.floor((remainingMs / (60 * 1000)) % 60);
  const seconds = Math.floor((remainingMs / 1000) % 60);
  return {
    label: days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m ${seconds}s`,
    expired: false,
    pct,
  };
}

function allVotesIn(jury: JuryMember[]) {
  return jury.length > 0 && jury.every((j) => j.vote !== "pending");
}

function computeBountyBreakdown(defendantEarned: number) {
  const bounty = Math.round(defendantEarned * (protocolParams.bountyPct / 100));
  const burned = defendantEarned - bounty;
  return { bounty, burned };
}

export default function CourtPage() {
  const [disputes, setDisputes] = useState<Dispute[]>(baseDisputes);
  const [selected, setSelected] = useState<string | null>(null);
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [showFileCase, setShowFileCase] = useState(false);
  const [filerStake, setFilerStake] = useState(600);

  // Preselect via ?case=d_003 from the miner page jury summons deep link
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search).get("case");
    if (p) setSelected(p);
  }, []);

  const filtered = stageFilter === "all" ? disputes : disputes.filter((d) => d.stage === stageFilter);
  const selectedDispute = disputes.find((d) => d.id === selected);
  const countdown = useCountdown(selectedDispute?.stageStartedAt, selectedDispute?.stage ?? "resolved");

  const yourSeat = useMemo(
    () => selectedDispute?.jury.find((j) => j.isYou),
    [selectedDispute]
  );

  function setFilterAndClear(f: string) {
    setStageFilter(f);
    setSelected(null);
  }

  function castVote(choice: "human" | "not_human") {
    if (!selectedDispute || !yourSeat) return;
    setDisputes((prev) =>
      prev.map((d) =>
        d.id !== selectedDispute.id
          ? d
          : {
              ...d,
              jury: d.jury.map((j) => (j.isYou ? { ...j, vote: choice } : j)),
            }
      )
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ae-navy">Court</h1>
          <p className="text-gray-500 text-sm mt-1">
            All network cases. File disputes, track proceedings, view rulings.
          </p>
        </div>
        <button
          onClick={() => setShowFileCase(!showFileCase)}
          className="bg-ae-teal text-white px-5 py-2.5 rounded-xl font-medium hover:bg-ae-teal-light transition-colors text-sm"
        >
          + Bring a Case
        </button>
      </div>

      {/* File a case form */}
      {showFileCase && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <div>
            <h2 className="font-semibold text-ae-navy">File a New Case</h2>
            <p className="text-sm text-gray-500 mt-1">
              Cases open in arbitration. The defendant has {protocolParams.stageWindowDays} days to respond. If they cannot clear the bar, the case escalates to court and your stake is placed at risk.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-ae-navy mb-1.5">Case Type</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal bg-white">
              <option value="">Select a type...</option>
              <option value="non_human">Non-Human Account (suspected bot or AI)</option>
              <option value="duplicate_account">Duplicate Account (same person, multiple accounts)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-ae-navy mb-1.5">Filed Against</label>
            <input type="text" placeholder="@handle or account ID" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ae-navy mb-1.5">Description</label>
            <textarea rows={4} placeholder="Describe the evidence and why you believe this case should be opened..." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ae-navy mb-1.5">Evidence</label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
              <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <p className="text-sm text-gray-400">Upload screenshots, documents, or other evidence</p>
            </div>
          </div>

          {/* Stake */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <label className="block text-sm font-medium text-amber-900 mb-1.5">
              Your Stake
            </label>
            <p className="text-xs text-amber-800 mb-3">
              Stake reflects your confidence. Arbitration does not put it at risk; court does. If the court finds the account human, your stake is burned.
            </p>
            <input
              type="range"
              min={100}
              max={Math.floor(currentBalances.earned / 4)}
              step={100}
              value={filerStake}
              onChange={(e) => setFilerStake(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-amber-800 mt-1">
              <span>100</span>
              <span className="font-mono font-semibold text-amber-900">
                {filerStake.toLocaleString()} pts ({((filerStake / currentBalances.earned) * 100).toFixed(1)}% of Earned)
              </span>
              <span>{Math.floor(currentBalances.earned / 4).toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="bg-ae-teal text-white px-6 py-3 rounded-xl font-medium hover:bg-ae-teal-light transition-colors">
              Submit to Arbitration + Stake {filerStake.toLocaleString()}
            </button>
            <button onClick={() => setShowFileCase(false)} className="px-6 py-3 rounded-xl font-medium text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Case flow */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Case Flow</p>
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {["arbitration", "open", "evidence_review", "voting", "ruling", "appeal", "resolved"].map((stage, i) => (
            <div key={stage} className="flex items-center">
              <button
                onClick={() => setFilterAndClear(stage)}
                className={`flex flex-col items-center px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                  stageFilter === stage ? stageColors[stage] + " ring-2 ring-offset-1 ring-gray-300" : stageColors[stage] + " opacity-50 hover:opacity-100"
                }`}
              >
                <span>{stageLabels[stage]}</span>
                <span className="text-[10px] opacity-70 mt-0.5 font-normal">
                  {stage === "ruling" ? "auto" : stage === "resolved" ? "final" : `${protocolParams.stageWindowDays}d window`}
                </span>
              </button>
              {i < 6 && (
                <svg className="w-4 h-4 text-gray-300 mx-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stage counts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { key: "arbitration", label: "Arbitration", count: courtStats.arbitration, color: "text-gray-600" },
          { key: "open", label: "Open", count: courtStats.open, color: "text-yellow-600" },
          { key: "evidence_review", label: "Evidence Review", count: courtStats.evidenceReview, color: "text-blue-600" },
          { key: "resolved", label: "Resolved", count: courtStats.resolved, color: "text-green-600" },
        ].map((s) => (
          <button
            key={s.key}
            onClick={() => setFilterAndClear(s.key)}
            className={`bg-white rounded-2xl border p-4 text-left transition-all ${stageFilter === s.key ? "border-ae-teal ring-2 ring-ae-teal/20" : "border-gray-100 hover:border-gray-200"}`}
          >
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setFilterAndClear("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${stageFilter === "all" ? "bg-ae-teal text-white" : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"}`}
        >
          All Cases ({disputes.length})
        </button>
      </div>

      {/* Case list + detail */}
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-gray-400">No cases at this stage</div>
          ) : (
            filtered.map((dispute) => (
              <button
                key={dispute.id}
                onClick={() => setSelected(dispute.id)}
                className={`w-full text-left bg-white rounded-xl border p-4 transition-colors ${selected === dispute.id ? "border-ae-teal ring-2 ring-ae-teal/20" : "border-gray-100 hover:border-gray-200"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-ae-navy text-sm pr-2">{dispute.title}</p>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap ${stageColors[dispute.stage]}`}>
                    {stageLabels[dispute.stage]}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="capitalize">{dispute.type.replace("_", " ")}</span>
                  <span>·</span>
                  <span>{dispute.filedAt.split("T")[0]}</span>
                  <span>·</span>
                  <span>Stake {dispute.filerStake.toLocaleString()}</span>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="lg:col-span-3">
          {selectedDispute ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6 sticky top-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-ae-navy">{selectedDispute.title}</h2>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${stageColors[selectedDispute.stage]}`}>
                    {stageLabels[selectedDispute.stage]}
                  </span>
                </div>
                <p className="text-sm text-gray-400">Case {selectedDispute.id}</p>
              </div>

              {/* Stage + countdown */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Stage</p>
                  {countdown && !countdown.expired && (
                    <span className="text-xs font-mono font-semibold text-ae-teal">
                      {countdown.label} left
                    </span>
                  )}
                  {countdown?.expired && (
                    <span className="text-xs font-mono font-semibold text-red-600">Window closed</span>
                  )}
                </div>
                <p className="text-sm text-ae-navy font-medium">{stageLabels[selectedDispute.stage]}</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{stageDescriptions[selectedDispute.stage]}</p>
                {countdown && (
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`rounded-full h-1.5 transition-all ${countdown.expired ? "bg-red-500" : "bg-ae-teal"}`}
                      style={{ width: `${countdown.pct}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Economics: filer stake + bounty preview */}
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-amber-900 uppercase tracking-wider mb-1">Challenger Stake</p>
                  <p className="text-2xl font-bold font-mono text-amber-900">
                    {selectedDispute.filerStake.toLocaleString()}
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    {selectedDispute.stage === "arbitration"
                      ? "Unlocked. Returned on withdrawal."
                      : selectedDispute.stage === "resolved" && selectedDispute.verdict === "human"
                      ? "Burned (account ruled human)"
                      : selectedDispute.stage === "resolved" && selectedDispute.verdict === "not_human"
                      ? "Returned (case won)"
                      : "At risk. Burned if case fails."}
                  </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                  <p className="text-xs font-semibold text-emerald-900 uppercase tracking-wider mb-1">Bounty Pool</p>
                  <p className="text-2xl font-bold font-mono text-emerald-900">
                    {computeBountyBreakdown(selectedDispute.defendantEarnedBalance).bounty.toLocaleString()}
                  </p>
                  <p className="text-xs text-emerald-700 mt-1">
                    {protocolParams.bountyPct}% of defendant&apos;s {selectedDispute.defendantEarnedBalance.toLocaleString()} Earned. Remaining {computeBountyBreakdown(selectedDispute.defendantEarnedBalance).burned.toLocaleString()} is burned.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <p className="font-medium text-ae-navy capitalize">{selectedDispute.type.replace("_", " ")}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Jury Size</p>
                  <p className="font-medium text-ae-navy">
                    {selectedDispute.jury.length > 0 ? `${selectedDispute.jury.length} members` : "Not yet assigned"}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Filed By</p>
                  <p className="font-medium text-ae-navy">{selectedDispute.filedBy}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Filed Against</p>
                  <p className="font-medium text-ae-navy">{selectedDispute.filedAgainst}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-ae-navy mb-2">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">{selectedDispute.description}</p>
              </div>

              {/* Vote UI if you are a juror and stage is voting */}
              {yourSeat && selectedDispute.stage === "voting" && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-orange-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0m6 0H9" />
                    </svg>
                    <div>
                      <p className="font-semibold text-orange-900">Your Jury Vote</p>
                      <p className="text-xs text-orange-700 mt-0.5">
                        You staked {yourSeat.stake.toLocaleString()} Earned points to sit on this jury ({protocolParams.jurorStakePct}% of your balance). Vote with the majority: stake returned. Vote against: stake burned. Votes are sealed until all {protocolParams.jurySize} are in.
                      </p>
                    </div>
                  </div>
                  {yourSeat.vote === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => castVote("human")}
                        className="flex-1 bg-white border-2 border-green-500 text-green-700 py-3 rounded-xl font-medium text-sm hover:bg-green-50 transition-colors"
                      >
                        Vote: Human / One account
                      </button>
                      <button
                        onClick={() => castVote("not_human")}
                        className="flex-1 bg-white border-2 border-red-500 text-red-700 py-3 rounded-xl font-medium text-sm hover:bg-red-50 transition-colors"
                      >
                        Vote: Not Human / Duplicate
                      </button>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl p-3 text-sm">
                      <span className="text-gray-500">Your sealed vote: </span>
                      <span className={`font-semibold ${yourSeat.vote === "human" ? "text-green-700" : "text-red-700"}`}>
                        {yourSeat.vote === "human" ? "Human" : "Not Human"}
                      </span>
                      <span className="text-gray-400 text-xs ml-2">(will be revealed when all {protocolParams.jurySize} have voted)</span>
                    </div>
                  )}
                </div>
              )}

              {/* Jury panel - votes hidden until all in */}
              {selectedDispute.jury.length > 0 && (
                <div>
                  <div className="flex items-baseline justify-between mb-3">
                    <h3 className="font-semibold text-ae-navy">
                      Jury ({selectedDispute.jury.length})
                    </h3>
                    <span className="text-xs text-gray-500">
                      Each juror staked {protocolParams.jurorStakePct}% of Earned
                    </span>
                  </div>
                  {allVotesIn(selectedDispute.jury) ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {selectedDispute.jury.map((j, i) => {
                          const won = selectedDispute.verdict
                            ? j.vote === selectedDispute.verdict
                            : null;
                          return (
                            <div key={i} className={`rounded-lg p-2.5 flex items-center gap-2 ${j.isYou ? "bg-orange-100 border border-orange-300" : "bg-gray-50"}`}>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                j.vote === "human" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                              }`}>
                                {j.vote === "human" ? "\u2713" : "\u2717"}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-medium text-ae-navy truncate">{j.name}</p>
                                <p className="text-xs text-gray-400 flex items-center gap-1">
                                  <span>{j.vote === "human" ? "Human" : "Not Human"}</span>
                                  {won === true && <span className="text-emerald-600" title="Stake returned">✓</span>}
                                  {won === false && <span className="text-red-500" title="Stake burned">✗</span>}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3 flex gap-4 text-xs text-gray-500">
                        <span>Human: {selectedDispute.jury.filter(j => j.vote === "human").length}</span>
                        <span>Not Human: {selectedDispute.jury.filter(j => j.vote === "not_human").length}</span>
                      </div>
                    </>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm text-gray-600">Voting in progress</p>
                        <p className="text-xs text-gray-400">
                          {selectedDispute.jury.filter(j => j.vote !== "pending").length} of {selectedDispute.jury.length} votes cast
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-ae-teal rounded-full h-2 transition-all"
                          style={{ width: `${(selectedDispute.jury.filter(j => j.vote !== "pending").length / selectedDispute.jury.length) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Individual votes are sealed until all jury members have voted.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Ruling + bounty payout breakdown */}
              {selectedDispute.stage === "resolved" && selectedDispute.ruling && (
                <div className={`rounded-xl p-4 ${selectedDispute.verdict === "not_human" ? "bg-green-50 border border-green-200" : "bg-blue-50 border border-blue-200"}`}>
                  <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${selectedDispute.verdict === "not_human" ? "text-green-800" : "text-blue-800"}`}>
                    Ruling
                  </p>
                  <p className={`text-sm ${selectedDispute.verdict === "not_human" ? "text-green-700" : "text-blue-700"} mb-3`}>
                    {selectedDispute.ruling}
                  </p>
                  {selectedDispute.verdict === "not_human" && (
                    <div className="bg-white rounded-lg p-3 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Bounty to challenger ({protocolParams.bountyPct}%)</span>
                        <span className="font-mono font-semibold text-emerald-700">
                          +{computeBountyBreakdown(selectedDispute.defendantEarnedBalance).bounty.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Burned ({protocolParams.burnPct}%)</span>
                        <span className="font-mono font-semibold text-red-700">
                          -{computeBountyBreakdown(selectedDispute.defendantEarnedBalance).burned.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-gray-100 pt-1">
                        <span className="text-gray-500">Challenger stake returned</span>
                        <span className="font-mono font-semibold text-ae-navy">
                          +{selectedDispute.filerStake.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                  {selectedDispute.verdict === "human" && (
                    <div className="bg-white rounded-lg p-3 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Challenger stake burned</span>
                        <span className="font-mono font-semibold text-red-700">
                          -{selectedDispute.filerStake.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* On-chain */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Case TX</span>
                  <span className="text-ae-navy">0x4e8a...c2f7</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Filed Block</span>
                  <span className="text-ae-navy">#1,283,401</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Stage Entered</span>
                  <span className="text-ae-navy">{new Date(selectedDispute.stageStartedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Actions */}
              {selectedDispute.stage !== "resolved" && (
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 bg-ae-teal text-white py-3 rounded-xl font-medium hover:bg-ae-teal-light transition-colors">
                    Submit Evidence
                  </button>
                  {selectedDispute.appealAvailable && selectedDispute.stage === "ruling" && allVotesIn(selectedDispute.jury) && (
                    <button className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-medium hover:bg-orange-600 transition-colors">
                      File Appeal
                    </button>
                  )}
                  {selectedDispute.stage === "arbitration" && (
                    <button className="flex-1 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors">
                      Escalate to Court
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 flex items-center justify-center text-gray-400">
              <p>Select a case to review</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
