"use client";

import { useState } from "react";

const MAX_AMBIENT_PER_DAY = 14.4;

// Mock: today's actual usage (only while you're there)
const todayUsage = [
  { id: "s_001", name: "Home (Main St)", type: "Residential", minsPresent: 480, ratePerMin: 0.001, spent: 0.48 },
  { id: "s_002", name: "Downtown Coffee Shop", type: "Commercial", minsPresent: 60, ratePerMin: 0.01, spent: 0.60 },
  { id: "s_003", name: "Community Library", type: "Public Building", minsPresent: 90, ratePerMin: 0.005, spent: 0.45 },
];

// Mock: spaces requesting
const requesting = [
  { id: "req_1", name: "Riverside Park", type: "Public Park", ratePerMin: 0.008 },
  { id: "req_2", name: "City Gym", type: "Commercial", ratePerMin: 0.006 },
];

// Auto-approved spaces
const autoApproved = [
  { id: "s_001", name: "Home (Main St)", type: "Residential", ratePerMin: 0.001 },
];

// Past days
const dailyHistory = [
  { date: "2026-04-01", items: [
    { name: "Home (Main St)", minsPresent: 720, spent: 0.72 },
    { name: "Office", minsPresent: 480, spent: 2.4 },
    { name: "Riverside Park", minsPresent: 45, spent: 0.36 },
  ]},
];

export default function AmbientPage() {
  const [showHistory, setShowHistory] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [addMode, setAddMode] = useState<"choose" | "scan" | "geo" | "manual">("choose");

  const totalSpentToday = todayUsage.reduce((sum, s) => sum + s.spent, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ae-navy">Ambient Point Allocations</h1>
        <p className="text-gray-500 text-sm mt-1">
          Points flow to spaces you occupy, only while you're there. Replaces taxation with presence-based funding.
        </p>
      </div>

      {/* Budget overview */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-1">Daily Budget</p>
          <p className="text-3xl font-bold text-ae-navy">{MAX_AMBIENT_PER_DAY}</p>
          <p className="text-xs text-gray-400 mt-1">Max pts/day</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-1">Active Spaces</p>
          <p className="text-3xl font-bold text-ae-navy">{todayUsage.length}</p>
          <p className="text-xs text-gray-400 mt-1">Tagged today</p>
        </div>
        <button onClick={() => setShowHistory(!showHistory)} className="bg-white rounded-2xl border border-gray-100 p-6 text-left hover:border-ae-teal transition-colors">
          <p className="text-sm text-gray-500 mb-1">Spent Today</p>
          <p className="text-3xl font-bold text-emerald-600">{totalSpentToday.toFixed(3)}</p>
          <p className="text-xs text-ae-teal mt-1">Click for daily breakdown</p>
        </button>
      </div>

      {/* Budget bar */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Points spent today (presence-based)</span>
          <span>{totalSpentToday.toFixed(3)} / {MAX_AMBIENT_PER_DAY}</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${Math.min((totalSpentToday / MAX_AMBIENT_PER_DAY) * 100, 100)}%` }} />
        </div>
        <p className="text-xs text-gray-400 mt-1">Points only flow while you're physically present</p>
      </div>

      {/* Daily history */}
      {showHistory && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-semibold text-ae-navy">Daily Breakdown</h2>
          <div>
            <p className="text-sm font-medium text-ae-navy mb-2">Today (2026-04-02)</p>
            <div className="space-y-2">
              {todayUsage.map(s => (
                <div key={s.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium text-ae-navy">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.minsPresent} mins at {s.ratePerMin} pts/min</p>
                  </div>
                  <p className="text-sm font-bold text-emerald-600">{s.spent.toFixed(3)} pts</p>
                </div>
              ))}
            </div>
          </div>
          {dailyHistory.map(day => (
            <div key={day.date}>
              <p className="text-sm font-medium text-ae-navy mb-2">{day.date}</p>
              <div className="space-y-2">
                {day.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div>
                      <p className="text-sm font-medium text-ae-navy">{item.name}</p>
                      <p className="text-xs text-gray-400">{item.minsPresent} mins</p>
                    </div>
                    <p className={`text-sm font-bold ${item.spent > 0 ? "text-emerald-600" : "text-gray-300"}`}>{item.spent.toFixed(3)} pts</p>
                  </div>
                ))}
                <p className="text-xs text-gray-400 text-right">Day total: {day.items.reduce((s, i) => s + i.spent, 0).toFixed(3)} pts</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section 1: Spaces Requesting */}
      {requesting.length > 0 && (
        <div>
          <h2 className="font-semibold text-ae-navy mb-3">Spaces Requesting Your Points</h2>
          <div className="space-y-3">
            {requesting.map(req => (
              <div key={req.id} className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-ae-navy">{req.name}</p>
                  <p className="text-xs text-gray-500">{req.type} · {req.ratePerMin} pts/min</p>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors">Accept</button>
                  <button className="text-xs text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">Decline</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Manual tags for today */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-ae-navy">Today's Active Spaces</h2>
          <button onClick={() => { setShowAdd(true); setAddMode("choose"); }} className="text-xs font-medium text-ae-teal bg-ae-teal/10 px-3 py-1.5 rounded-full hover:bg-ae-teal/20 transition-colors">+ Add Space</button>
        </div>
        <div className="space-y-3">
          {todayUsage.map(s => (
            <div key={s.id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-ae-navy">{s.name}</p>
                  <p className="text-sm text-gray-500">{s.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-emerald-600">{s.spent.toFixed(3)}</p>
                  <p className="text-xs text-gray-400">pts today</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-3">
                <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                  <span className="text-xs text-gray-500">Rate: </span>
                  <span className="text-xs font-medium text-ae-navy">{s.ratePerMin} pts/min</span>
                </div>
                <div className="bg-gray-50 rounded-lg px-3 py-1.5">
                  <span className="text-xs text-gray-500">Present: </span>
                  <span className="text-xs font-medium text-ae-navy">{s.minsPresent} min</span>
                </div>
              </div>
              <div className="mt-3">
                <button className="text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Pre-approved auto-tags */}
      <div>
        <h2 className="font-semibold text-ae-navy mb-3">Pre-Approved (Auto-Tag)</h2>
        <p className="text-xs text-gray-500 mb-3">Spaces that automatically track your presence via geo-location.</p>
        <div className="space-y-2">
          {autoApproved.map(s => (
            <div key={s.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
              <div>
                <p className="text-sm font-medium text-ae-navy">{s.name}</p>
                <p className="text-xs text-gray-400">{s.type} · {s.ratePerMin} pts/min</p>
              </div>
              <button className="text-xs text-red-500 hover:text-red-700">Remove auto-tag</button>
            </div>
          ))}
        </div>
      </div>

      {/* Add space modal */}
      {showAdd && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-ae-navy">Add a Space</h2>
            <button onClick={() => setShowAdd(false)} className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          {addMode === "choose" && (
            <div className="grid grid-cols-3 gap-4">
              <button onClick={() => setAddMode("scan")} className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-ae-teal hover:bg-ae-teal/5 transition-all">
                <p className="font-semibold text-ae-navy text-sm">Scan QR</p>
                <p className="text-xs text-gray-400 mt-1">Building code</p>
              </button>
              <button onClick={() => setAddMode("geo")} className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-ae-teal hover:bg-ae-teal/5 transition-all">
                <p className="font-semibold text-ae-navy text-sm">Geo-Location</p>
                <p className="text-xs text-gray-400 mt-1">Auto-detect</p>
              </button>
              <button onClick={() => setAddMode("manual")} className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-ae-teal hover:bg-ae-teal/5 transition-all">
                <p className="font-semibold text-ae-navy text-sm">Manual</p>
                <p className="text-xs text-gray-400 mt-1">Enter details</p>
              </button>
            </div>
          )}
          {addMode === "scan" && (<div className="text-center space-y-4"><div className="w-48 h-48 mx-auto bg-gray-900 rounded-2xl flex items-center justify-center"><p className="text-white/50 text-sm">Camera</p></div><button onClick={() => setAddMode("choose")} className="text-sm text-ae-teal hover:underline">Back</button></div>)}
          {addMode === "geo" && (<div className="text-center space-y-4"><div className="w-48 h-48 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center"><p className="text-gray-400 text-sm animate-pulse">Detecting location...</p></div><button onClick={() => setAddMode("choose")} className="text-sm text-ae-teal hover:underline">Back</button></div>)}
          {addMode === "manual" && (
            <form className="space-y-4">
              <input type="text" placeholder="Space name" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal" />
              <div className="grid grid-cols-2 gap-4">
                <select className="px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-ae-teal/30"><option>Residential</option><option>Public Park</option><option>Public Building</option><option>Workplace</option><option>Commercial</option><option>Community</option></select>
                <input type="number" step="0.001" min="0" placeholder="Rate (pts/min)" className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal" />
              </div>
              <div className="flex gap-3">
                <button type="button" className="bg-ae-teal text-white px-6 py-3 rounded-xl font-medium hover:bg-ae-teal-light transition-colors">Add</button>
                <button type="button" onClick={() => setAddMode("choose")} className="text-sm text-gray-500">Back</button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
