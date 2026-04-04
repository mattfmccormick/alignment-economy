// ============================================================
// API Abstraction Layer
//
// This is the single point where the frontend talks to data.
// Right now it returns mock data. When the blockchain is ready,
// swap these implementations to RPC calls without touching any
// UI components.
//
// Every function here maps to a blockchain operation:
//   - Reads  → chain state queries (RPC)
//   - Writes → signed extrinsics (transactions)
// ============================================================

import {
  currentUser,
  currentBalances,
  recentTransactions,
  durableGoods,
  spaces,
  vouches,
  verificationQueue,
  minerStats,
  disputes,
  courtStats,
  networkStats,
  defenseSummons,
  type User,
  type PointBalances,
  type Transaction,
  type DurableGood,
  type Space,
  type VouchRecord,
  type VerificationRequest,
  type Dispute,
} from "./mock-data";

// ---- User / Account ----

export async function getCurrentUser(): Promise<User> {
  // TODO: Replace with wallet connection + chain identity lookup
  return currentUser;
}

export async function getPointBalances(): Promise<PointBalances> {
  // TODO: Replace with chain state query for account balances
  return currentBalances;
}

export async function getTransactionHistory(): Promise<Transaction[]> {
  // TODO: Replace with indexed chain events for this account
  return recentTransactions;
}

// ---- Points ----

export async function sendPoints(params: {
  to: string;
  amount: number;
  pointType: "active" | "earned";
  note: string;
}): Promise<{ success: boolean; txHash: string }> {
  // TODO: Replace with signed extrinsic: balances.transfer
  console.log("MOCK: Sending points", params);
  return { success: true, txHash: "0x" + Math.random().toString(16).slice(2) };
}

// ---- Goods ----

export async function getDurableGoods(): Promise<DurableGood[]> {
  // TODO: Replace with chain state query: objectRegistry.goodsByOwner
  return durableGoods;
}

export async function registerGood(params: {
  name: string;
  category: string;
  maker: string;
}): Promise<{ success: boolean; id: string }> {
  // TODO: Replace with signed extrinsic: objectRegistry.register
  console.log("MOCK: Registering good", params);
  return { success: true, id: "g_" + Math.random().toString(36).slice(2, 5) };
}

// ---- Spaces ----

export async function getSpaces(): Promise<Space[]> {
  // TODO: Replace with chain state query: spaceRegistry.spacesByOccupant
  return spaces;
}

export async function addSpace(params: {
  name: string;
  type: string;
  allocation: number;
}): Promise<{ success: boolean; id: string }> {
  // TODO: Replace with signed extrinsic: spaceRegistry.register
  console.log("MOCK: Adding space", params);
  return { success: true, id: "s_" + Math.random().toString(36).slice(2, 5) };
}

// ---- Vouching ----

export async function getVouches(): Promise<VouchRecord[]> {
  // TODO: Replace with chain state query: vouching.vouchesByAccount
  return vouches;
}

export async function submitVouch(params: {
  handle: string;
  stake: number;
}): Promise<{ success: boolean; txHash: string }> {
  // TODO: Replace with signed extrinsic: vouching.vouch
  console.log("MOCK: Vouching", params);
  return { success: true, txHash: "0x" + Math.random().toString(16).slice(2) };
}

// ---- Mining / Verification ----

export async function getVerificationQueue(): Promise<VerificationRequest[]> {
  // TODO: Replace with chain state query: mining.pendingVerifications
  return verificationQueue;
}

export async function getMinerStats() {
  // TODO: Replace with chain state query: mining.minerStats(account)
  return minerStats;
}

export async function submitVerification(params: {
  requestId: string;
  score: number;
}): Promise<{ success: boolean; txHash: string }> {
  // TODO: Replace with signed extrinsic: mining.submitVerification
  console.log("MOCK: Submitting verification", params);
  return { success: true, txHash: "0x" + Math.random().toString(16).slice(2) };
}

// ---- Court / Disputes ----

export async function getDisputes(): Promise<Dispute[]> {
  // TODO: Replace with chain state query: court.allDisputes
  return disputes;
}

export async function getCourtStats() {
  // TODO: Replace with chain state query: court.stats
  return courtStats;
}

export async function fileDispute(params: {
  type: string;
  against: string;
  description: string;
}): Promise<{ success: boolean; caseId: string }> {
  // TODO: Replace with signed extrinsic: court.fileDispute
  console.log("MOCK: Filing dispute", params);
  return { success: true, caseId: "d_" + Math.random().toString(36).slice(2, 5) };
}

export async function getDefenseSummons() {
  // TODO: Replace with chain state query: court.defenseSummons(account)
  // Participants can be called to defend max once per 6 months
  return defenseSummons;
}

export async function submitDefenseEvidence(params: {
  caseId: string;
  evidence: string[];
}): Promise<{ success: boolean; txHash: string }> {
  // TODO: Replace with signed extrinsic: court.submitDefense
  console.log("MOCK: Defense evidence submitted", params);
  return { success: true, txHash: "0x" + Math.random().toString(16).slice(2) };
}

// ---- Network / Chain ----

export async function getNetworkStats() {
  // TODO: Replace with RPC calls: system.health, chain.getHeader, etc.
  return networkStats;
}

export async function getRecentBlocks() {
  // TODO: Replace with chain.getBlock for recent block headers
  return [
    { height: 1_284_901, txs: 142, time: "2.3s", miner: "Miner_042", verified: 3 },
    { height: 1_284_900, txs: 98, time: "2.1s", miner: "Miner_188", verified: 1 },
    { height: 1_284_899, txs: 201, time: "2.8s", miner: "Miner_012", verified: 5 },
    { height: 1_284_898, txs: 167, time: "2.4s", miner: "Miner_099", verified: 2 },
    { height: 1_284_897, txs: 89, time: "1.9s", miner: "You", verified: 4 },
  ];
}
