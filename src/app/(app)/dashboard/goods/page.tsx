"use client";

import { useState } from "react";

const MAX_SUPPORTIVE_PER_DAY = 144;

// Mock: today's actual usage (only when items are used)
const todayUsage = [
  { id: "g_001", name: 'MacBook Pro 14"', maker: "Apple Inc.", ratePerMin: 0.005, minsUsed: 247, spent: 1.235, category: "Electronics" },
  { id: "g_002", name: "Herman Miller Aeron Chair", maker: "Herman Miller", ratePerMin: 0.003, minsUsed: 310, spent: 0.93, category: "Furniture" },
  { id: "g_003", name: "Red Wing Iron Rangers", maker: "Red Wing Shoes", ratePerMin: 0.002, minsUsed: 120, spent: 0.24, category: "Footwear" },
  { id: "g_004", name: "Cast Iron Skillet", maker: "Lodge Cast Iron", ratePerMin: 0.004, minsUsed: 10, spent: 0.04, category: "Kitchenware" },
];

// Mock: products requesting your points
const requesting = [
  { id: "req_1", name: "Patagonia Down Jacket", maker: "Patagonia", ratePerMin: 0.002, category: "Clothing" },
  { id: "req_2", name: "Leatherman Wave+", maker: "Leatherman", ratePerMin: 0.003, category: "Tools" },
];

// Mock: pre-approved auto-tags
const autoApproved = [
  { id: "g_001", name: 'MacBook Pro 14"', maker: "Apple Inc.", ratePerMin: 0.005 },
  { id: "g_002", name: "Herman Miller Aeron Chair", maker: "Herman Miller", ratePerMin: 0.003 },
];

// Mock: past daily breakdowns
const dailyHistory = [
  { date: "2026-04-01", items: [
    { name: 'MacBook Pro 14"', minsUsed: 480, spent: 2.4 },
    { name: "Aeron Chair", minsUsed: 480, spent: 1.44 },
    { name: "Iron Rangers", minsUsed: 600, spent: 1.2 },
    { name: "Cast Iron Skillet", minsUsed: 25, spent: 0.1 },
  ]},
  { date: "2026-03-31", items: [
    { name: 'MacBook Pro 14"', minsUsed: 320, spent: 1.6 },
    { name: "Aeron Chair", minsUsed: 320, spent: 0.96 },
    { name: "Iron Rangers", minsUsed: 0, spent: 0 },
    { name: "Cast Iron Skillet", minsUsed: 45, spent: 0.18 },
  ]},
];

export default function SupportivePage() {
  const [showHistory, setShowHistory] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [registerMode, setRegisterMode] = useState<"choose" | "scan" | "manual">("choose");

  const totalSpentToday = todayUsage.reduce((sum, g) => sum + g.spent, 0);
  const totalAllocated = todayUsage.length * 36; // rough max if used all day

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ae-navy">Supportive Point Allocations</h1>
        <p className="text-gray-500 text-sm mt-1">
          Points flow to makers of things you use, only while you're using them. Rate is per minute of active use.
        </p>
      </div>

      {/* Budget overview */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-1">Daily Budget</p>
          <p className="text-3xl font-bold text-ae-navy">{MAX_SUPPORTIVE_PER_DAY}</p>
          <p className="text-xs text-gray-400 mt-1">Max pts/day</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-1">Allocated Items</p>
          <p className="text-3xl font-bold text-ae-navy">{todayUsage.length}</p>
          <p className="text-xs text-gray-400 mt-1">Active contracts</p>
        </div>
        <button onClick={() => setShowHistory(!showHistory)} className="bg-white rounded-2xl border border-gray-100 p-6 text-left hover:border-ae-teal transition-colors">
          <p className="text-sm text-gray-500 mb-1">Spent Today</p>
          <p className="text-3xl font-bold text-ae-gold">{totalSpentToday.toFixed(3)}</p>
          <p className="text-xs text-ae-teal mt-1">Click for daily breakdown</p>
        </button>
      </div>

      {/* Budget bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Points spent today (usage-based)</span>
          <span>{totalSpentToday.toFixed(3)} / {MAX_SUPPORTIVE_PER_DAY}</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-ae-gold transition-all duration-500" style={{ width: `${Math.min((totalSpentToday / MAX_SUPPORTIVE_PER_DAY) * 100, 100)}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-1">Points only flow while you actively use an item</p>
      </div>

      {/* Daily breakdown history */}
      {showHistory && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-ae-navy">Daily Breakdown</h2>
          {/* Today */}
          <div>
            <p className="text-sm font-medium text-ae-navy mb-2">Today (2026-04-02)</p>
            <div className="space-y-2">
              {todayUsage.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium text-ae-navy">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.minsUsed} mins used at {item.ratePerMin} pts/min</p>
                  </div>
                  <p className="text-sm font-bold text-ae-gold">{item.spent.toFixed(3)} pts</p>
                </div>
              ))}
            </div>
          </div>
          {/* Past days */}
          {dailyHistory.map(day => (
            <div key={day.date}>
              <p className="text-sm font-medium text-ae-navy mb-2">{day.date}</p>
              <div className="space-y-2">
                {day.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div>
                      <p className="text-sm font-medium text-ae-navy">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.minsUsed} mins used</p>
                    </div>
                    <p className={`text-sm font-bold ${item.spent > 0 ? "text-ae-gold" : "text-gray-300"}`}>{item.spent.toFixed(3)} pts</p>
                  </div>
                ))}
                <p className="text-xs text-gray-400 text-right">
                  Day total: {day.items.reduce((s, i) => s + i.spent, 0).toFixed(3)} pts
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section 1: Products Requesting */}
      {requesting.length > 0 && (
        <div>
          <h2 className="font-semibold text-ae-navy mb-3">Products Requesting Your Points</h2>
          <div className="space-y-3">
            {requesting.map(req => (
              <div key={req.id} className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-ae-navy">{req.name}</p>
                  <p className="text-xs text-gray-500">{req.category} by {req.maker} · {req.ratePerMin} pts/min</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs bg-ae-teal text-white px-3 py-1.5 rounded-lg hover:bg-ae-teal-light transition-colors">Accept</button>
                  <button className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Manual Tags for Today */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-ae-navy">Today's Active Items</h2>
          <button onClick={() => { setShowManual(true); setRegisterMode("choose"); }} className="text-xs font-medium text-ae-teal bg-ae-teal/10 px-3 py-1.5 rounded-full hover:bg-ae-teal/20 transition-colors">+ Add Item</button>
        </div>
        <div className="space-y-3">
          {todayUsage.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-ae-navy">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.category} by {item.maker}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-ae-gold">{item.spent.toFixed(3)}</p>
                  <p className="text-xs text-gray-400">pts today</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                  <span className="text-xs text-gray-500">Rate: </span>
                  <span className="text-xs font-medium text-ae-navy">{item.ratePerMin} pts/min</span>
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                  <span className="text-xs text-gray-500">Used: </span>
                  <span className="text-xs font-medium text-ae-navy">{item.minsUsed} min today</span>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="text-xs text-yellow-600 bg-yellow-50 px-3 py-1.5 rounded-lg hover:bg-yellow-100 transition-colors">Dispute</button>
                <button className="text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Auto-Approved (pre-approved tags) */}
      <div>
        <h2 className="font-semibold text-ae-navy mb-3">Pre-Approved (Auto-Tag)</h2>
        <p className="text-xs text-gray-500 mb-3">Items that automatically track usage without daily approval.</p>
        <div className="space-y-2">
          {autoApproved.map(item => (
            <div key={item.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
              <div>
                <p className="text-sm font-medium text-ae-navy">{item.name}</p>
                <p className="text-xs text-gray-400">by {item.maker} · {item.ratePerMin} pts/min</p>
              </div>
              <button className="text-xs text-red-500 hover:text-red-700">Remove auto-tag</button>
            </div>
          ))}
        </div>
      </div>

      {/* Manual add */}
      {showManual && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-ae-navy">Add an Item</h2>
            <button onClick={() => setShowManual(false)} className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          {registerMode === "choose" && (
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => setRegisterMode("scan")} className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-ae-teal hover:bg-ae-teal/5 transition-all">
                <p className="font-semibold text-ae-navy">Scan QR Code</p>
                <p className="text-xs text-gray-400 mt-1">Product's AE code</p>
              </button>
              <button onClick={() => setRegisterMode("manual")} className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-ae-teal hover:bg-ae-teal/5 transition-all">
                <p className="font-semibold text-ae-navy">Manual Entry</p>
                <p className="text-xs text-gray-400 mt-1">Enter details</p>
              </button>
            </div>
          )}
          {registerMode === "scan" && (
            <div className="text-center space-y-4">
              <div className="w-48 h-48 mx-auto bg-gray-900 rounded-2xl flex items-center justify-center"><p className="text-white/50 text-sm">Camera</p></div>
              <button onClick={() => setRegisterMode("choose")} className="text-sm text-ae-teal hover:underline">Back</button>
            </div>
          )}
          {registerMode === "manual" && (
            <form className="space-y-4">
              <input type="text" placeholder="Item name" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Maker / brand" className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal" />
                <input type="number" step="0.001" min="0" placeholder="Rate (pts/min)" className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal" />
              </div>
              <div className="flex gap-3">
                <button type="button" className="bg-ae-teal text-white px-6 py-3 rounded-xl font-medium hover:bg-ae-teal-light transition-colors">Add</button>
                <button type="button" onClick={() => setRegisterMode("choose")} className="text-sm text-gray-500">Back</button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
