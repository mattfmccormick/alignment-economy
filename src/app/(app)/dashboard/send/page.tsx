"use client";

import { useState } from "react";
import { currentBalances } from "@/lib/mock-data";

export default function SendReceivePage() {
  const [tab, setTab] = useState<"send" | "receive">("send");
  const [pointType, setPointType] = useState<"active" | "earned">("active");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const available = pointType === "active" ? currentBalances.active : currentBalances.earned;

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setRecipient(""); setAmount(""); setNote(""); }, 3000);
  }

  return (
    <div className="max-w-lg space-y-6">
      {/* Tab toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setTab("send")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === "send" ? "bg-white text-ae-navy shadow-sm" : "text-gray-500"}`}
        >
          Send Points
        </button>
        <button
          onClick={() => setTab("receive")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === "receive" ? "bg-white text-ae-navy shadow-sm" : "text-gray-500"}`}
        >
          Receive Points
        </button>
      </div>

      {tab === "receive" ? (
        /* Receive - show QR */
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          <div className="w-48 h-48 mx-auto bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center mb-6">
            <div className="text-center">
              <svg className="w-12 h-12 text-gray-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
              </svg>
              <p className="text-xs text-gray-400">QR Code</p>
            </div>
          </div>
          <p className="font-semibold text-ae-navy text-lg">@matt</p>
          <p className="text-sm text-gray-400 mt-1">Matt Franklin</p>
          <p className="text-xs text-gray-400 mt-4">The sender scans this code to send you points instantly.</p>
        </div>
      ) : (
        /* Send form - immediate */
        <>
          {/* Point type selector */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPointType("active")}
              className={`rounded-xl p-4 text-left transition-all ${pointType === "active" ? "bg-ae-teal/10 border-2 border-ae-teal" : "bg-white border-2 border-gray-100 hover:border-gray-200"}`}
            >
              <p className="font-semibold text-ae-navy text-sm">Active Points</p>
              <p className="text-xl font-bold text-ae-teal mt-1">{currentBalances.active.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Expires in {currentBalances.activeExpiresIn}</p>
            </button>
            <button
              onClick={() => setPointType("earned")}
              className={`rounded-xl p-4 text-left transition-all ${pointType === "earned" ? "bg-purple-50 border-2 border-purple-500" : "bg-white border-2 border-gray-100 hover:border-gray-200"}`}
            >
              <p className="font-semibold text-ae-navy text-sm">Earned Points</p>
              <p className="text-xl font-bold text-purple-600 mt-1">{currentBalances.earned.toLocaleString()}</p>
              <p className="text-xs text-gray-400 mt-1">Never expire</p>
            </button>
          </div>

          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <p className="text-green-800 font-semibold text-lg">Points sent!</p>
              <p className="text-green-600 text-sm mt-1">{amount} {pointType} points sent to {recipient}</p>
            </div>
          ) : (
            <form onSubmit={handleSend} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-ae-navy mb-1.5">Recipient</label>
                <div className="flex gap-2">
                  <input type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="@handle or name" required className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal" />
                  <button type="button" className="px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors" title="Scan QR code">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-ae-navy mb-1.5">Amount</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" min={1} max={available} required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal" />
                <p className="text-xs text-gray-400 mt-1">Max: {available.toLocaleString()} {pointType} points</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-ae-navy mb-1.5">
                  What's it for? <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Tutoring, groceries, childcare..." className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal" />
              </div>
              <button type="submit" className={`w-full py-3 rounded-xl font-medium transition-colors text-white ${pointType === "active" ? "bg-ae-teal hover:bg-ae-teal-light" : "bg-purple-600 hover:bg-purple-700"}`}>
                Send {pointType === "active" ? "Active" : "Earned"} Points
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
