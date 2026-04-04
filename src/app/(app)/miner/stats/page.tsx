"use client";

import { useState } from "react";
import { networkStats } from "@/lib/mock-data";
import { StatCard } from "@/components/stat-card";

const recentBlocks = [
  {
    height: 1_284_901, txs: 142, time: "2.3s", miner: "Miner_042", verified: 3,
    transactions: [
      { hash: "0x7a3f...e8b2", type: "transfer", from: "@sarah", to: "@james", amount: 120, pointType: "active" },
      { hash: "0x9c2d...4f1a", type: "verification", from: "Miner_042", to: "@aisha_m", amount: 0, pointType: "n/a" },
      { hash: "0xb8e1...7c3d", type: "vouch", from: "@elena", to: "@newuser1", amount: 500, pointType: "earned" },
      { hash: "0xd4a9...2e5f", type: "transfer", from: "@matt", to: "@localcoop", amount: 50, pointType: "active" },
      { hash: "0xf1c3...8a7b", type: "good_register", from: "@craftworks", to: "Protocol", amount: 0, pointType: "n/a" },
    ],
  },
  {
    height: 1_284_900, txs: 98, time: "2.1s", miner: "Miner_188", verified: 1,
    transactions: [
      { hash: "0xa2b4...c1d3", type: "transfer", from: "@priya", to: "@yuki", amount: 75, pointType: "active" },
      { hash: "0xe5f6...7890", type: "dispute_filed", from: "Miner_088", to: "Court", amount: 0, pointType: "n/a" },
      { hash: "0x1234...abcd", type: "rebase", from: "Protocol", to: "All accounts", amount: 0, pointType: "n/a" },
    ],
  },
  {
    height: 1_284_899, txs: 201, time: "2.8s", miner: "Miner_012", verified: 5,
    transactions: [
      { hash: "0xbeef...cafe", type: "verification", from: "Miner_012", to: "@carlos_v", amount: 0, pointType: "n/a" },
      { hash: "0xdead...f00d", type: "transfer", from: "@community", to: "@matt", amount: 300, pointType: "earned" },
      { hash: "0xface...b00k", type: "space_register", from: "@riverside", to: "Protocol", amount: 0, pointType: "n/a" },
    ],
  },
  { height: 1_284_898, txs: 167, time: "2.4s", miner: "Miner_099", verified: 2, transactions: [] },
  { height: 1_284_897, txs: 89, time: "1.9s", miner: "Miner_042", verified: 4, transactions: [] },
  { height: 1_284_896, txs: 134, time: "2.6s", miner: "Miner_231", verified: 0, transactions: [] },
  { height: 1_284_895, txs: 112, time: "2.2s", miner: "Miner_077", verified: 2, transactions: [] },
  { height: 1_284_894, txs: 178, time: "2.5s", miner: "Miner_012", verified: 3, transactions: [] },
];

const txTypeColors: Record<string, string> = {
  transfer: "bg-blue-100 text-blue-700",
  verification: "bg-green-100 text-green-700",
  vouch: "bg-purple-100 text-purple-700",
  good_register: "bg-ae-gold/20 text-yellow-800",
  space_register: "bg-emerald-100 text-emerald-700",
  dispute_filed: "bg-red-100 text-red-700",
  rebase: "bg-gray-100 text-gray-700",
};

export default function MinerStatsPage() {
  const [expandedBlock, setExpandedBlock] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ae-navy">Blockchain Explorer</h1>
        <p className="text-gray-500 text-sm mt-1">
          Full chain details and network health. Click any block to see its transactions.
        </p>
      </div>

      {/* Network Health - at top per user request */}
      <div className="bg-ae-navy rounded-2xl p-6 text-white">
        <h2 className="font-semibold mb-4">Network Health</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-400">Total Participants</p>
            <p className="text-xl font-bold font-mono">{networkStats.totalParticipants.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Active Miners</p>
            <p className="text-xl font-bold font-mono">{networkStats.activeMiners.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Points Circulating</p>
            <p className="text-xl font-bold font-mono">{(networkStats.totalPointsCirculating / 1_000_000).toFixed(1)}M</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Uptime</p>
            <p className="text-xl font-bold font-mono">{networkStats.uptime}</p>
          </div>
        </div>

        {/* Verified Humans section with mean/median/mode */}
        <div className="border-t border-white/10 pt-4">
          <p className="text-xs text-gray-400 mb-3">Verified Humans: {networkStats.verifiedHumans.toLocaleString()}</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400">Mean % Human</p>
              <p className="text-lg font-bold font-mono">{networkStats.avgPercentHuman}%</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400">Median % Human</p>
              <p className="text-lg font-bold font-mono">{networkStats.medianPercentHuman}%</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-400">Mode % Human</p>
              <p className="text-lg font-bold font-mono">{networkStats.modePercentHuman}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chain overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Block Height" value={networkStats.blockHeight.toLocaleString()} />
        <StatCard label="Current TPS" value={networkStats.tps.toLocaleString()} color="text-ae-teal" />
        <StatCard label="Peak TPS" value={networkStats.peakTps.toLocaleString()} />
        <StatCard label="Avg Block Time" value={networkStats.avgBlockTime} />
      </div>

      {/* Recent blocks - clickable */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="p-6 pb-3">
          <h2 className="font-semibold text-ae-navy">Recent Blocks</h2>
          <p className="text-xs text-gray-400 mt-1">Click a block to view its transactions</p>
        </div>
        <div className="hidden sm:grid grid-cols-5 gap-4 px-6 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <span>Block</span>
          <span>Transactions</span>
          <span>Block Time</span>
          <span>Verifications</span>
          <span>Miner</span>
        </div>
        {recentBlocks.map((block) => (
          <div key={block.height}>
            <button
              onClick={() => setExpandedBlock(expandedBlock === block.height ? null : block.height)}
              className={`w-full grid sm:grid-cols-5 gap-2 sm:gap-4 px-6 py-3 border-b border-gray-50 items-center text-left hover:bg-gray-50 transition-colors ${
                expandedBlock === block.height ? "bg-gray-50" : ""
              }`}
            >
              <p className="text-sm font-mono font-medium text-ae-teal flex items-center gap-1">
                #{block.height.toLocaleString()}
                <svg className={`w-3 h-3 text-gray-400 transition-transform ${expandedBlock === block.height ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </p>
              <p className="text-sm text-ae-navy">{block.txs} txs</p>
              <p className="text-sm text-gray-500">{block.time}</p>
              <p className="text-sm text-gray-500">{block.verified > 0 ? `${block.verified} humans` : "-"}</p>
              <p className="text-sm font-medium text-gray-500">{block.miner}</p>
            </button>

            {/* Expanded transaction list */}
            {expandedBlock === block.height && (
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                {block.transactions.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                      Transactions in Block #{block.height.toLocaleString()}
                    </p>
                    {block.transactions.map((tx, i) => (
                      <div key={i} className="bg-white rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${txTypeColors[tx.type] || "bg-gray-100 text-gray-600"}`}>
                            {tx.type.replace("_", " ")}
                          </span>
                          <span className="font-mono text-xs text-gray-500">{tx.hash}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="font-medium text-ae-navy">{tx.from}</span>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                          <span className="font-medium text-ae-navy">{tx.to}</span>
                          {tx.amount > 0 && (
                            <span className="ml-2 font-semibold text-ae-teal">{tx.amount} {tx.pointType}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 text-center py-2">
                    Transaction details loading... (full data available on-chain)
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
