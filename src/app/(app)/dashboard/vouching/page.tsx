"use client";

import { useState } from "react";
import { vouches } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";

const contacts = [
  { name: "Sarah Chen", handle: "@sarah" },
  { name: "James Rivera", handle: "@james" },
  { name: "Maria Gonzalez", handle: "@maria" },
  { name: "Priya Sharma", handle: "@priya_s" },
  { name: "Carlos Vega", handle: "@cvega" },
];

export default function VouchingPage() {
  const [vouchList, setVouchList] = useState(vouches);
  const [handle, setHandle] = useState("");
  const [stake, setStake] = useState("");
  const [revokeConfirm, setRevokeConfirm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const totalStaked = vouchList
    .filter((v) => v.status === "active")
    .reduce((sum, v) => sum + v.pointsStaked, 0);

  const activeVouches = vouchList.filter((v) => v.status === "active");
  const revokedVouches = vouchList.filter((v) => v.status === "revoked");

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleRevoke(id: string) {
    setVouchList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "revoked" as const } : v))
    );
    setRevokeConfirm(null);
  }

  function handleVouch(selectedHandle?: string) {
    const h = selectedHandle || handle;
    if (!h || !stake) return;
    const contact = contacts.find((c) => c.handle === h);
    const newVouch = {
      id: `v_${Date.now()}`,
      vouchedFor: contact?.name || h,
      vouchedForHandle: h,
      pointsStaked: parseInt(stake),
      stakedAt: "2026-04-03",
      status: "active" as const,
    };
    setVouchList((prev) => [...prev, newVouch]);
    setHandle("");
    setStake("");
    setSearchQuery("");
  }

  function daysSince(dateStr: string) {
    const then = new Date(dateStr);
    const now = new Date("2026-04-03");
    return Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24));
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-ae-navy">Vouching</h1>
        <p className="text-gray-500 text-sm mt-1">
          Stake your Earned points to vouch that someone is a real human. If they turn out to be fake, you lose your stake.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-1">Active Vouches</p>
          <p className="text-3xl font-bold text-ae-navy">{activeVouches.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-1">Total Points Staked</p>
          <p className="text-3xl font-bold text-ae-teal">{totalStaked.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">At risk if they&apos;re not real</p>
        </div>
      </div>

      {/* ===== SECTION 1: Vouch for Someone ===== */}
      <div id="vouch-for-someone" className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-ae-navy mb-2">Vouch for Someone</h2>
        <p className="text-sm text-gray-500 mb-5">
          Ten people vouching can bring someone to full participation without any documents. But if they&apos;re fake, you lose your stake. Skin in the game.
        </p>

        {/* Person picker */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ae-navy mb-1.5">Find a person</label>
            <input
              type="text"
              value={searchQuery || handle}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setHandle(e.target.value);
              }}
              placeholder="Search by name or @handle..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal"
            />
            {searchQuery && (
              <div className="mt-2 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((c) => (
                    <button
                      key={c.handle}
                      onClick={() => {
                        setHandle(c.handle);
                        setSearchQuery("");
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center justify-between border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-ae-teal/10 flex items-center justify-center text-ae-teal text-xs font-bold">
                          {c.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ae-navy">{c.name}</p>
                          <p className="text-xs text-gray-400">{c.handle}</p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="px-4 py-3 text-sm text-gray-400">No matches. You can still type a handle directly.</p>
                )}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-ae-navy mb-1.5">Points to stake</label>
            <input
              type="number"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              placeholder="How many Earned points to stake"
              min={1}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-ae-teal/30 focus:border-ae-teal"
            />
          </div>

          <button
            onClick={() => handleVouch()}
            disabled={!handle || !stake}
            className="bg-ae-teal text-white px-6 py-3 rounded-xl font-medium hover:bg-ae-teal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Vouch for {handle || "..."}
          </button>
        </div>
      </div>

      {/* ===== SECTION 2: My Vouches ===== */}
      <div>
        <h2 className="text-lg font-semibold text-ae-navy mb-4">My Vouches</h2>

        {activeVouches.length > 0 && (
          <div className="space-y-3 mb-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active</p>
            {activeVouches.map((v) => (
              <div key={v.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-ae-navy">{v.vouchedFor}</p>
                    <p className="text-sm text-gray-400">{v.vouchedForHandle}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Vouched since {v.stakedAt} ({daysSince(v.stakedAt)} days)
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-ae-navy">{v.pointsStaked.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">staked</p>
                    </div>
                    <StatusBadge status={v.status} />
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50">
                  {revokeConfirm === v.id ? (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-red-600">
                        Revoke this vouch? Your {v.pointsStaked} staked points will be returned.
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRevoke(v.id)}
                          className="text-xs bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Yes, Revoke
                        </button>
                        <button
                          onClick={() => setRevokeConfirm(null)}
                          className="text-xs text-gray-400 hover:text-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setRevokeConfirm(v.id)}
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Revoke Vouch
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {revokedVouches.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Revoked</p>
            {revokedVouches.map((v) => (
              <div key={v.id} className="bg-white rounded-2xl border border-gray-100 p-5 opacity-60">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-ae-navy">{v.vouchedFor}</p>
                    <p className="text-sm text-gray-400">{v.vouchedForHandle}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Vouched from {v.stakedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold text-gray-400">{v.pointsStaked.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">returned</p>
                    </div>
                    <StatusBadge status={v.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {vouchList.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-400">
            <p>You haven&apos;t vouched for anyone yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
