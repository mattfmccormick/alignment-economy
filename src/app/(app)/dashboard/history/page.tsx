"use client";

import { useState } from "react";
import { recentTransactions } from "@/lib/mock-data";

type SortKey = "timestamp" | "type" | "pointType" | "amount" | "counterparty";

export default function HistoryPage() {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [pointTypeFilter, setPointTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = recentTransactions
    .filter((tx) => {
      if (typeFilter !== "all" && tx.type !== typeFilter) return false;
      if (pointTypeFilter !== "all" && tx.pointType !== pointTypeFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          tx.description.toLowerCase().includes(q) ||
          tx.counterparty.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      const dir = sortAsc ? 1 : -1;
      if (sortKey === "timestamp") return dir * (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      if (sortKey === "amount") return dir * (a.amount - b.amount);
      if (sortKey === "type") return dir * a.type.localeCompare(b.type);
      if (sortKey === "pointType") return dir * a.pointType.localeCompare(b.pointType);
      if (sortKey === "counterparty") return dir * a.counterparty.localeCompare(b.counterparty);
      return 0;
    });

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(false);
    }
  }

  function SortArrow({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return <span className="ml-1">{sortAsc ? "\u2191" : "\u2193"}</span>;
  }

  function formatDate(ts: string) {
    const d = new Date(ts);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  function formatTime(ts: string) {
    const d = new Date(ts);
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ae-navy">Transaction History</h1>
        <p className="text-gray-500 text-sm mt-1">
          Every point you&apos;ve sent or received
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search description or counterparty..."
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal flex-1 min-w-[200px]"
        />
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal bg-white"
        >
          <option value="all">All Types</option>
          <option value="sent">Sent</option>
          <option value="received">Received</option>
        </select>
        <select
          value={pointTypeFilter}
          onChange={(e) => setPointTypeFilter(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal bg-white"
        >
          <option value="all">All Point Types</option>
          <option value="active">Active</option>
          <option value="earned">Earned</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Sortable table header */}
        <div className="hidden sm:grid grid-cols-6 gap-4 px-6 py-3 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <button onClick={() => toggleSort("timestamp")} className="text-left hover:text-ae-teal transition-colors flex items-center">
            Date <SortArrow col="timestamp" />
          </button>
          <button onClick={() => toggleSort("type")} className="text-left hover:text-ae-teal transition-colors flex items-center">
            Type <SortArrow col="type" />
          </button>
          <span>Description</span>
          <button onClick={() => toggleSort("counterparty")} className="text-left hover:text-ae-teal transition-colors flex items-center">
            Counterparty <SortArrow col="counterparty" />
          </button>
          <button onClick={() => toggleSort("pointType")} className="text-left hover:text-ae-teal transition-colors flex items-center">
            Point Type <SortArrow col="pointType" />
          </button>
          <button onClick={() => toggleSort("amount")} className="text-right hover:text-ae-teal transition-colors flex items-center justify-end">
            Amount <SortArrow col="amount" />
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-400 text-sm">
            No transactions match your filters.
          </div>
        ) : (
          filtered.map((tx) => (
            <div
              key={tx.id}
              className="grid sm:grid-cols-6 gap-2 sm:gap-4 px-6 py-4 border-b border-gray-50 last:border-0 items-center"
            >
              <div>
                <p className="text-sm text-ae-navy font-medium">{formatDate(tx.timestamp)}</p>
                <p className="text-xs text-gray-400">{formatTime(tx.timestamp)}</p>
              </div>
              <div>
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    tx.type === "received"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {tx.type}
                </span>
              </div>
              <p className="text-sm text-ae-navy font-medium">{tx.description}</p>
              <p className="text-sm text-gray-500">{tx.counterparty}</p>
              <p className="text-sm text-gray-400 capitalize">{tx.pointType}</p>
              <p
                className={`text-sm font-semibold text-right ${
                  tx.type === "received" ? "text-green-600" : "text-red-500"
                }`}
              >
                {tx.type === "received" ? "+" : "-"}
                {tx.amount.toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>

      <p className="text-xs text-gray-400 text-center">
        Showing {filtered.length} of {recentTransactions.length} transactions
      </p>
    </div>
  );
}
