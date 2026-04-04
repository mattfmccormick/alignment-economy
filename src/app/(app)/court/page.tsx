"use client";

import { useState } from "react";
import { disputes, courtStats } from "@/lib/mock-data";

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
  arbitration: "Each side has 7 days to respond",
  open: "Jury of 11 assigned, 7 days to submit evidence",
  evidence_review: "7 days for both sides to review evidence",
  voting: "7 days for all jury members to vote",
  ruling: "Issued once all 11 jury votes are in",
  appeal: "New jury of 11, same process restarts",
  resolved: "Final ruling, recorded on-chain",
};

export default function CourtPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [stageFilter, setStageFilter] = useState<string>("all");
  const [showFileCase, setShowFileCase] = useState(false);

  const filtered =
    stageFilter === "all" ? disputes : disputes.filter((d) => d.stage === stageFilter);
  const selectedDispute = disputes.find((d) => d.id === selected);

  function setFilterAndClear(f: string) {
    setStageFilter(f);
    setSelected(null);
  }

  // Check if all jury votes are in
  function allVotesIn(jury: typeof disputes[0]["jury"]) {
    return jury.length > 0 && jury.every((j) => j.vote !== "pending");
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
          <h2 className="font-semibold text-ae-navy">File a New Case</h2>
          <p className="text-sm text-gray-500">
            Cases start in arbitration. Each side has 7 days to respond before a jury of 11 is assigned.
          </p>
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
          <div className="flex gap-3">
            <button className="bg-ae-teal text-white px-6 py-3 rounded-xl font-medium hover:bg-ae-teal-light transition-colors">Submit to Arbitration</button>
            <button onClick={() => setShowFileCase(false)} className="px-6 py-3 rounded-xl font-medium text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Case stage flow */}
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
                <span className="text-[10px] opacity-70 mt-0.5 font-normal">7 days</span>
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

      {/* Stats by stage */}
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

      {/* Filter reset */}
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
                  <span>{dispute.evidenceCount} evidence</span>
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

              {/* Stage timeline indicator */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Current Stage</p>
                </div>
                <p className="text-sm text-ae-navy font-medium">{stageLabels[selectedDispute.stage]}</p>
                <p className="text-xs text-gray-500 mt-1">{stageTimelines[selectedDispute.stage]}</p>
                {selectedDispute.rulingDue && (
                  <p className="text-xs text-ae-teal mt-1 font-medium">Deadline: {selectedDispute.rulingDue}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Type</p>
                  <p className="font-medium text-ae-navy capitalize">{selectedDispute.type.replace("_", " ")}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">Jury Size</p>
                  <p className="font-medium text-ae-navy">{selectedDispute.jury.length > 0 ? `${selectedDispute.jury.length} members` : "Not yet assigned"}</p>
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

              {/* Jury - votes hidden until all are in */}
              {selectedDispute.jury.length > 0 && (
                <div>
                  <h3 className="font-semibold text-ae-navy mb-3">
                    Jury ({selectedDispute.jury.length} members)
                  </h3>
                  {allVotesIn(selectedDispute.jury) ? (
                    <>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {selectedDispute.jury.map((j, i) => (
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

              {/* Ruling */}
              {selectedDispute.ruling && (
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-green-800 mb-1">Ruling</p>
                  <p className="text-sm text-green-700">{selectedDispute.ruling}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{selectedDispute.evidenceCount} evidence items</span>
                {selectedDispute.rulingDue && <span className="text-gray-500">Due: {selectedDispute.rulingDue}</span>}
              </div>

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
