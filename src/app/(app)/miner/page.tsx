"use client";

import { useState } from "react";
import { verificationQueue, minerStats, networkStats } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import { StatCard } from "@/components/stat-card";

export default function MinerPage() {
  const [queue, setQueue] = useState(verificationQueue);
  const [selected, setSelected] = useState<string | null>(null);
  const [assignedScore, setAssignedScore] = useState<string>("");

  const selectedReq = queue.find((r) => r.id === selected);

  function handleSubmitVerification(id: string) {
    if (!assignedScore) return;
    const score = parseInt(assignedScore);
    setQueue((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: score === 0 ? "rejected" as const : "approved" as const } : r
      )
    );
    setSelected(null);
    setAssignedScore("");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ae-navy">Mining Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Verify humans. Earn rewards. Secure the network.
        </p>
      </div>

      {/* Mining overview - blockchain-style */}
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
            <p className="text-xl font-bold font-mono">
              {networkStats.blockHeight.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Network TPS</p>
            <p className="text-xl font-bold font-mono">
              {networkStats.tps.toLocaleString()}
            </p>
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

      {/* Your mining stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Verifications" value={minerStats.totalVerified} color="text-ae-teal" />
        <StatCard label="Accuracy" value={`${minerStats.accuracy}%`} color="text-green-600" />
        <StatCard label="Rewards Earned" value={minerStats.rewardsEarned.toLocaleString()} color="text-ae-gold" />
        <StatCard
          label="Rank"
          value={`#${minerStats.rank}`}
          sub={`of ${minerStats.totalMiners.toLocaleString()} miners`}
        />
      </div>

      {/* Verification queue */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Queue list */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="font-semibold text-ae-navy">
            Verification Queue ({queue.filter((r) => r.status === "pending" || r.status === "in_review").length})
          </h2>
          {queue.map((req) => (
            <button
              key={req.id}
              onClick={() => { setSelected(req.id); setAssignedScore(""); }}
              className={`w-full text-left bg-white rounded-xl border p-4 transition-colors ${
                selected === req.id
                  ? "border-ae-teal ring-2 ring-ae-teal/20"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-ae-navy text-sm">
                  {req.applicant}
                </p>
                <StatusBadge status={req.status} />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="capitalize">{req.type.replace("_", " ")}</span>
                <span>·</span>
                <span>{req.vouchers} vouchers</span>
                <span>·</span>
                <span>{req.evidence.length} evidence items</span>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-3">
          {selectedReq ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6 sticky top-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-ae-navy">
                    {selectedReq.applicant}
                  </h2>
                  <StatusBadge status={selectedReq.status} />
                </div>
                <p className="text-sm text-gray-400">
                  {selectedReq.applicantHandle} · Submitted{" "}
                  {new Date(selectedReq.submittedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Verification Type</p>
                  <p className="font-medium text-ae-navy capitalize">
                    {selectedReq.type.replace("_", " ")}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Vouchers</p>
                  <p className="font-medium text-ae-navy">
                    {selectedReq.vouchers} people vouching
                  </p>
                </div>
              </div>

              {/* Evidence */}
              <div>
                <h3 className="font-semibold text-ae-navy mb-3">
                  Submitted Evidence
                </h3>
                {selectedReq.evidence.length > 0 ? (
                  <div className="space-y-2">
                    {selectedReq.evidence.map((e, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                      >
                        <div className="w-8 h-8 bg-ae-teal/10 rounded flex items-center justify-center">
                          <svg className="w-4 h-4 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                        <span className="text-sm text-ae-navy">{e}</span>
                        <button className="ml-auto text-xs text-ae-teal hover:underline">
                          Review
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">
                    No documents submitted. Relying on vouching chain ({selectedReq.vouchers} vouchers).
                  </p>
                )}
              </div>

              {/* Blockchain details */}
              <div>
                <h3 className="font-semibold text-ae-navy mb-3">
                  On-Chain Details
                </h3>
                <div className="bg-gray-50 rounded-xl p-4 space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account ID</span>
                    <span className="text-ae-navy">0x7a3f...e8b2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Registration Block</span>
                    <span className="text-ae-navy">#1,284,201</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Vouch TX Hash</span>
                    <span className="text-ae-navy">0x9c2d...4f1a</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Evidence Hash</span>
                    <span className="text-ae-navy">0xb8e1...7c3d</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Submission Block</span>
                    <span className="text-ae-navy">#1,284,855</span>
                  </div>
                </div>
              </div>

              {/* Miner assigns % human score - no flag as suspicious */}
              {(selectedReq.status === "pending" ||
                selectedReq.status === "in_review") && (
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-ae-navy mb-2">
                      Assign % Human Score
                    </label>
                    <p className="text-xs text-gray-400 mb-3">
                      Based on the evidence, what percent-human score would you assign? Set to 0 if you believe this is a bot.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={assignedScore}
                        onChange={(e) => setAssignedScore(e.target.value)}
                        placeholder="0-100"
                        min={0}
                        max={100}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal font-mono"
                      />
                      <span className="flex items-center text-gray-400 text-sm">%</span>
                    </div>
                    {assignedScore && parseInt(assignedScore) === 0 && (
                      <p className="text-xs text-red-500 mt-2">
                        Score of 0% will flag this account as a suspected bot and initiate an arbitration review.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleSubmitVerification(selectedReq.id)}
                    disabled={assignedScore === ""}
                    className="w-full bg-ae-teal text-white py-3 rounded-xl font-medium hover:bg-ae-teal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Submit Verification ({assignedScore || "?"}% Human)
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 flex flex-col items-center justify-center text-gray-400">
              <svg className="w-12 h-12 mb-3 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
              <p>Select a verification request to review</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
