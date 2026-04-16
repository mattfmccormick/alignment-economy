"use client";

import { useState } from "react";
import { disputes } from "@/lib/mock-data";

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

const stageTimelines: Record<string, string> = {
  arbitration: "Defendant has 7 days to respond; challenger may withdraw without penalty.",
  open: "Jury of 11 Tier-2 miners drafted; challenger's stake is now at risk.",
  evidence_review: "7-day window for jurors to review on-chain evidence.",
  voting: "7 days for sealed votes. Jurors stake 5% of their Earned balance.",
  ruling: "Verdict on-chain. Bounty (20% of defendant's Earned) paid to challenger if they won.",
  appeal: "New jury of 11. Verdict is final.",
  resolved: "Final ruling, recorded on-chain.",
};

export default function CaseHistoryPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedCase = disputes.find((d) => d.id === selected);

  function allVotesIn(jury: typeof disputes[0]["jury"]) {
    return jury.length > 0 && jury.every((j) => j.vote !== "pending");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ae-navy">Case History</h1>
        <p className="text-gray-500 text-sm mt-1">
          Complete record of all cases. Click any case to see full details. Jury votes are revealed once all members have voted.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Case list */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="hidden sm:grid grid-cols-3 gap-4 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            <span>Case</span>
            <span>Filed</span>
            <span>Stage</span>
          </div>
          {disputes.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelected(d.id)}
              className={`w-full grid sm:grid-cols-3 gap-2 sm:gap-4 px-6 py-4 border-b border-gray-50 last:border-0 items-center text-left hover:bg-gray-50 transition-colors ${
                selected === d.id ? "bg-ae-teal/5" : ""
              }`}
            >
              <div>
                <p className="text-sm font-medium text-ae-navy">{d.title}</p>
                <p className="text-xs text-gray-400 capitalize">{d.type.replace("_", " ")}</p>
              </div>
              <p className="text-sm text-gray-500">{d.filedAt.split("T")[0]}</p>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium w-fit ${stageColors[d.stage]}`}>
                {stageLabels[d.stage]}
              </span>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-3">
          {selectedCase ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6 sticky top-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-ae-navy">{selectedCase.title}</h2>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${stageColors[selectedCase.stage]}`}>
                    {stageLabels[selectedCase.stage]}
                  </span>
                </div>
                <p className="text-sm text-gray-400">Case {selectedCase.id}</p>
              </div>

              {/* Stage timeline */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Stage: {stageLabels[selectedCase.stage]}</p>
                <p className="text-xs text-gray-500">{stageTimelines[selectedCase.stage]}</p>
                {selectedCase.rulingDue && (
                  <p className="text-xs text-ae-teal mt-1 font-medium">Deadline: {selectedCase.rulingDue}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <p className="font-medium text-ae-navy capitalize">{selectedCase.type.replace("_", " ")}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Jury</p>
                  <p className="font-medium text-ae-navy">{selectedCase.jury.length > 0 ? `${selectedCase.jury.length} members` : "Not assigned"}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Filed By</p>
                  <p className="font-medium text-ae-navy">{selectedCase.filedBy}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Filed Against</p>
                  <p className="font-medium text-ae-navy">{selectedCase.filedAgainst}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-ae-navy mb-2">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 rounded-xl p-4">{selectedCase.description}</p>
              </div>

              {/* Jury - votes hidden until all in */}
              {selectedCase.jury.length > 0 && (
                <div>
                  <h3 className="font-semibold text-ae-navy mb-3">
                    Jury ({selectedCase.jury.length} members)
                  </h3>
                  {allVotesIn(selectedCase.jury) ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {selectedCase.jury.map((j, i) => (
                          <div key={i} className="bg-gray-50 rounded-lg p-2.5 flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              j.vote === "human" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}>
                              {j.vote === "human" ? "\u2713" : "\u2717"}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-ae-navy">{j.name}</p>
                              <p className="text-xs text-gray-400">{j.vote === "human" ? "Human" : "Not Human"}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-4 text-xs text-gray-500">
                        <span>Human: {selectedCase.jury.filter(j => j.vote === "human").length}</span>
                        <span>Not Human: {selectedCase.jury.filter(j => j.vote === "not_human").length}</span>
                      </div>
                    </>
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm text-gray-600">Voting in progress</p>
                        <p className="text-xs text-gray-400">
                          {selectedCase.jury.filter(j => j.vote !== "pending").length} of {selectedCase.jury.length} votes cast
                        </p>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-ae-teal rounded-full h-2 transition-all"
                          style={{ width: `${(selectedCase.jury.filter(j => j.vote !== "pending").length / selectedCase.jury.length) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Individual votes are sealed until all jury members have voted.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Ruling */}
              {selectedCase.ruling && (
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-green-800 mb-1">Ruling</p>
                  <p className="text-sm text-green-700">{selectedCase.ruling}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{selectedCase.evidenceCount} evidence items</span>
                {selectedCase.rulingDue && <span className="text-gray-500">Due: {selectedCase.rulingDue}</span>}
              </div>

              {/* On-chain */}
              <div>
                <h3 className="font-semibold text-ae-navy mb-2">On-Chain Record</h3>
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
                    <span className="text-gray-500">Evidence Hash</span>
                    <span className="text-ae-navy">0xb8e1...7c3d</span>
                  </div>
                  {selectedCase.stage === "resolved" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Ruling TX</span>
                        <span className="text-ae-navy">0xf1c3...8a7b</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Ruling Block</span>
                        <span className="text-ae-navy">#1,284,102</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 flex items-center justify-center text-gray-400">
              <p>Click a case to see full details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
