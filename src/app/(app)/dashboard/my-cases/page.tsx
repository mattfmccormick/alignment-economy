"use client";

import { useState } from "react";
import { defenseSummons, disputes } from "@/lib/mock-data";

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

// Deadlines per stage
const stageDeadlines: Record<string, string> = {
  arbitration: "7 days for each side to respond",
  open: "Jury of 11 assigned, 7 days to add evidence",
  evidence_review: "7 days for both sides to review",
  voting: "7 days for jury to vote",
  ruling: "Issued once all jury votes are in",
  appeal: "Same process, new jury of 11",
  resolved: "Final, on-chain record",
};

export default function MyCasesPage() {
  const [showDefensePanel, setShowDefensePanel] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([]);

  // Cases where current user is the defendant
  const myCases = disputes.filter(
    (d) => d.filedAgainst === "@matt" || d.filedAgainst === "user_001"
  );

  function toggleEvidence(type: string) {
    setSelectedEvidence((prev) =>
      prev.includes(type) ? prev.filter((e) => e !== type) : [...prev, type]
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ae-navy">My Cases</h1>
        <p className="text-gray-500 text-sm mt-1">
          Identity challenges filed against you. You can be called to defend at most once every 6 months.
        </p>
      </div>

      {/* Active defense summons */}
      {defenseSummons.active && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-red-800">
                Your identity has been challenged
              </h2>
              <p className="text-sm text-red-600 mt-1">
                {defenseSummons.description}
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-red-500">
                <span>Case: {defenseSummons.caseId}</span>
                <span>Filed by: {defenseSummons.filedBy}</span>
                <span>Respond by: {defenseSummons.respondBy}</span>
              </div>
              <p className="text-xs text-red-400 mt-2">
                Last called: {defenseSummons.lastCalledDate} · Next eligible: {defenseSummons.nextEligibleDate}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <button
              onClick={() => setShowDefensePanel(!showDefensePanel)}
              className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 transition-colors"
            >
              {showDefensePanel ? "Close" : "Submit Defense Evidence"}
            </button>
          </div>

          {/* Defense evidence submission */}
          {showDefensePanel && (
            <div className="mt-5 bg-white rounded-xl border border-red-100 p-6 space-y-5">
              <div>
                <h3 className="font-semibold text-ae-navy mb-1">Prove You&apos;re Human</h3>
                <p className="text-sm text-gray-500">
                  Upload evidence to defend your identity. Select the types of evidence you want to submit. The more you provide, the stronger your defense.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { type: "Face Scan", desc: "Live facial recognition" },
                  { type: "Fingerprint", desc: "Biometric fingerprint" },
                  { type: "Government ID", desc: "Passport, driver license, etc." },
                  { type: "Photo", desc: "Selfie holding today's date" },
                  { type: "Voice Recording", desc: "Read a verification phrase" },
                ].map((item) => (
                  <button
                    key={item.type}
                    onClick={() => toggleEvidence(item.type)}
                    className={`flex items-center gap-3 rounded-xl p-4 text-left transition-all border ${
                      selectedEvidence.includes(item.type)
                        ? "border-ae-teal bg-ae-teal/5 ring-1 ring-ae-teal/20"
                        : "border-gray-200 hover:border-gray-300 bg-gray-50"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedEvidence.includes(item.type) ? "bg-ae-teal/20" : "bg-gray-200"
                    }`}>
                      {selectedEvidence.includes(item.type) ? (
                        <svg className="w-5 h-5 text-ae-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ae-navy">{item.type}</p>
                      <p className="text-xs text-gray-400">{item.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-ae-navy mb-1.5">Written Statement (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Explain why this challenge is invalid..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  {selectedEvidence.length} evidence type{selectedEvidence.length !== 1 ? "s" : ""} selected
                </p>
                <button
                  disabled={selectedEvidence.length === 0}
                  className="bg-ae-teal text-white px-6 py-3 rounded-xl font-medium hover:bg-ae-teal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Submit Defense
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* How the process works */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-ae-navy mb-4">How Identity Challenges Work</h2>
        <div className="space-y-3">
          {Object.entries(stageLabels).map(([stage, label], i) => (
            <div key={stage} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${stageColors[stage]}`}>
                  {i + 1}
                </div>
                {i < Object.keys(stageLabels).length - 1 && (
                  <div className="w-px h-4 bg-gray-200 mt-1" />
                )}
              </div>
              <div className="pb-2">
                <p className="text-sm font-medium text-ae-navy">{label}</p>
                <p className="text-xs text-gray-500">{stageDeadlines[stage]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past cases */}
      {myCases.length > 0 ? (
        <div>
          <h2 className="font-semibold text-ae-navy mb-4">Past Cases Involving You</h2>
          <div className="space-y-3">
            {myCases.map((c) => (
              <div key={c.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-ae-navy">{c.title}</p>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${stageColors[c.stage]}`}>
                    {stageLabels[c.stage]}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{c.description}</p>
                <div className="flex gap-4 text-xs text-gray-400">
                  <span>Filed: {c.filedAt.split("T")[0]}</span>
                  <span>By: {c.filedBy}</span>
                  <span>{c.evidenceCount} evidence items</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="font-medium text-ae-navy">No past cases</p>
          <p className="text-sm text-gray-400 mt-1">Your identity has not been challenged before (aside from the current one above).</p>
        </div>
      )}
    </div>
  );
}
