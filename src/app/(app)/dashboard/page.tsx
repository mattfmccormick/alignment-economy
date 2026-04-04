"use client";

import Link from "next/link";
import { useState } from "react";
import {
  currentUser,
  currentBalances,
  recentTransactions,
  networkStats,
  defenseSummons,
} from "@/lib/mock-data";
import { PointBar } from "@/components/point-bar";
import { HumanScore } from "@/components/human-score";

export default function DashboardPage() {
  const [showNetwork, setShowNetwork] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-ae-navy">
          Welcome back, {currentUser.name.split(" ")[0]}
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Here&apos;s your daily point summary
        </p>
      </div>

      {/* Defense Summons Alert - links to My Cases (participant view) */}
      {defenseSummons.active && (
        <Link
          href="/dashboard/my-cases"
          className="block bg-red-50 border border-red-200 rounded-2xl p-5 hover:bg-red-100 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-red-800">
                You&apos;ve been called to defend your identity
              </p>
              <p className="text-sm text-red-600">
                Filed by {defenseSummons.filedBy} · Respond by{" "}
                {defenseSummons.respondBy}
              </p>
            </div>
            <svg className="w-5 h-5 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </Link>
      )}

      {/* Quick actions: Send / Receive */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/dashboard/send"
          className="bg-ae-teal text-white rounded-2xl p-5 hover:bg-ae-teal-light transition-colors flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </div>
          <div>
            <p className="font-semibold">Send Points</p>
            <p className="text-sm text-white/70">Pay or gift someone</p>
          </div>
        </Link>
        <Link
          href="/dashboard/send"
          className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg transition-all flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-ae-navy">Receive Points</p>
            <p className="text-sm text-gray-400">Show your QR code</p>
          </div>
        </Link>
      </div>

      {/* Top row: Human Score + Earned Points */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <HumanScore score={currentUser.percentHuman} interactive />
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <p className="text-sm text-gray-500 mb-1">Earned Points (savings)</p>
          <p className="text-3xl font-bold text-ae-teal">
            {currentBalances.earned.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {(networkStats.yourShareOfTotal * 100).toFixed(4)}% of total economy
          </p>
          <p className="text-xs text-gray-400">
            These never expire. Your store of value.
          </p>
        </div>
      </div>

      {/* Daily Points */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-ae-navy">Today&apos;s Points</h2>
          <p className="text-xs text-gray-400">Next airdrop: {networkStats.dailyAirdropTime}</p>
        </div>
        <PointBar
          label="Active Points"
          current={currentBalances.active}
          max={currentBalances.activeMax}
          color="bg-ae-teal"
          sub={`Expires in ${currentBalances.activeExpiresIn}`}
        />
        <PointBar
          label="Supportive Points"
          current={currentBalances.supportive}
          max={currentBalances.supportiveMax}
          color="bg-ae-gold"
          sub="Flowing to your registered goods"
        />
        <PointBar
          label="Ambient Points"
          current={currentBalances.ambient}
          max={currentBalances.ambientMax}
          color="bg-emerald-500"
          sub="Flowing to your current spaces"
        />
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-ae-navy">Recent Activity</h2>
          <Link
            href="/dashboard/history"
            className="text-sm text-ae-teal hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {recentTransactions.slice(0, 5).map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    tx.type === "received"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {tx.type === "received" ? "+" : "-"}
                </div>
                <div>
                  <p className="text-sm font-medium text-ae-navy">
                    {tx.description}
                  </p>
                  <p className="text-xs text-gray-400">{tx.counterparty}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-sm font-semibold ${
                    tx.type === "received" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {tx.type === "received" ? "+" : "-"}
                  {tx.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">{tx.pointType}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Network stats - collapsible */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <button
          onClick={() => setShowNetwork(!showNetwork)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors rounded-2xl"
        >
          <div className="flex items-center gap-3">
            <h2 className="font-semibold text-ae-navy">Network</h2>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>Rebase in {networkStats.nextRebaseIn}</span>
              <span>·</span>
              <span>{networkStats.tps.toLocaleString()} tps</span>
              <span>·</span>
              <span>Block #{networkStats.blockHeight.toLocaleString()}</span>
            </div>
          </div>
          <svg className={`w-5 h-5 text-gray-400 transition-transform ${showNetwork ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {showNetwork && (
          <div className="px-6 pb-6 pt-0 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Next Rebase</p>
              <p className="text-lg font-bold text-ae-teal">{networkStats.nextRebaseIn}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Last Multiplier</p>
              <p className="text-lg font-bold text-ae-navy">{networkStats.lastRebaseMultiplier}x</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Your Share</p>
              <p className="text-lg font-bold text-purple-600">{(networkStats.yourShareOfTotal * 100).toFixed(4)}%</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Participants</p>
              <p className="text-lg font-bold text-ae-navy">{networkStats.totalParticipants.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Throughput</p>
              <p className="text-lg font-bold text-ae-navy">{networkStats.tps.toLocaleString()} tps</p>
              <p className="text-xs text-gray-400">Peak: {networkStats.peakTps.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Block Height</p>
              <p className="text-lg font-bold text-ae-navy">{networkStats.blockHeight.toLocaleString()}</p>
              <p className="text-xs text-gray-400">Avg: {networkStats.avgBlockTime}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Active Miners</p>
              <p className="text-lg font-bold text-ae-navy">{networkStats.activeMiners.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Daily Transactions</p>
              <p className="text-lg font-bold text-ae-navy">{networkStats.dailyTransactions.toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
