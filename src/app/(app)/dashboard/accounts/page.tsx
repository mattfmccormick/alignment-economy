"use client";

import { useState } from "react";
import { currentUser, networkStats } from "@/lib/mock-data";

interface BusinessAccount {
  id: string;
  name: string;
  type: string;
  handle: string;
  createdAt: string;
  earnedBalance: number;
}

const mockBusinessAccounts: BusinessAccount[] = [
  {
    id: "b_001",
    name: "Matt's Consulting LLC",
    type: "Business",
    handle: "@matts_consulting",
    createdAt: "2026-02-15",
    earnedBalance: 3_200,
  },
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState(mockBusinessAccounts);
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({ name: "", type: "Business", handle: "" });

  function handleCreate() {
    if (!formData.name || !formData.handle) return;
    const newAccount: BusinessAccount = {
      id: `b_${Date.now()}`,
      name: formData.name,
      type: formData.type,
      handle: formData.handle.startsWith("@") ? formData.handle : `@${formData.handle}`,
      createdAt: "2026-04-03",
      earnedBalance: 0,
    };
    setAccounts((prev) => [...prev, newAccount]);
    setFormData({ name: "", type: "Business", handle: "" });
    setShowCreate(false);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ae-navy">Accounts</h1>
          <p className="text-gray-500 text-sm mt-1">
            Your personal account and any business (non-human) accounts you manage.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="bg-purple-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition-colors text-sm"
        >
          + New Business Account
        </button>
      </div>

      {/* Personal account */}
      <div className="bg-white rounded-2xl border-2 border-ae-teal/30 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-ae-teal/20 flex items-center justify-center text-ae-teal text-lg font-bold">
            {currentUser.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-ae-navy">{currentUser.name}</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-ae-teal/10 text-ae-teal font-medium">Human</span>
            </div>
            <p className="text-sm text-gray-400">{currentUser.handle}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">% Human</p>
            <p className="text-lg font-bold text-ae-teal">{currentUser.percentHuman}%</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">Daily Airdrop</p>
            <p className="text-lg font-bold text-green-600">Yes</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">Next Airdrop</p>
            <p className="text-lg font-bold text-ae-navy">{networkStats.dailyAirdropTime}</p>
          </div>
        </div>
      </div>

      {/* Create business account form */}
      {showCreate && (
        <div className="bg-white rounded-2xl border border-purple-200 p-6 space-y-4">
          <h2 className="font-semibold text-ae-navy">Create Business Account</h2>
          <p className="text-sm text-gray-500">
            Business accounts can send and receive points but do not get the daily airdrop. Use this for businesses, organizations, spaces, or any non-human entity.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-ae-navy mb-1.5">Account Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Riverside Coffee Shop"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-ae-navy mb-1.5">Handle</label>
              <input
                type="text"
                value={formData.handle}
                onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                placeholder="@riverside_coffee"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ae-navy mb-1.5">Account Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400 bg-white"
            >
              <option value="Business">Business</option>
              <option value="Organization">Organization / Nonprofit</option>
              <option value="Space">Space / Venue</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-sm text-purple-700">
              <strong>Note:</strong> Business accounts cannot receive the daily point airdrop (Active, Supportive, Ambient). They can only accumulate Earned points through transactions with other users.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              disabled={!formData.name || !formData.handle}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Create Account
            </button>
            <button
              onClick={() => setShowCreate(false)}
              className="px-6 py-3 rounded-xl font-medium text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Business accounts list */}
      <div>
        <h2 className="font-semibold text-ae-navy mb-4">Business Accounts</h2>
        {accounts.length > 0 ? (
          <div className="space-y-3">
            {accounts.map((acct) => (
              <div key={acct.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-sm font-bold">
                      {acct.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-ae-navy">{acct.name}</p>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-600 font-medium">{acct.type}</span>
                      </div>
                      <p className="text-sm text-gray-400">{acct.handle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-ae-navy">{acct.earnedBalance.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">earned pts</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                  <span>Created {acct.createdAt}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-300 rounded-full" />
                    <span>No daily airdrop</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400">
            <p>No business accounts yet. Create one to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
