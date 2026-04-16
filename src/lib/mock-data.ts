// ============================================================
// Mock data for the AE platform prototype
// This will be replaced by real blockchain RPC calls later
// ============================================================

export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  percentHuman: number;
  joinedAt: string;
  isHuman: boolean; // true = human account, false = business/non-human
}

export interface PointBalances {
  active: number;
  activeMax: number;
  activeExpiresIn: string;
  supportive: number;
  supportiveMax: number;
  ambient: number;
  ambientMax: number;
  earned: number;
}

export interface Transaction {
  id: string;
  type: "sent" | "received";
  amount: number;
  pointType: "active" | "earned";
  counterparty: string;
  description: string;
  timestamp: string;
}

export interface DurableGood {
  id: string;
  name: string;
  category: string;
  registeredAt: string;
  supportiveEarned: number;
  maker: string;
  status: "active" | "inactive";
  ratePerMin: number; // points per minute of use
  dailyAllocation: number; // current daily points flowing
}

export interface Space {
  id: string;
  name: string;
  type: string;
  ambientFlow: number;
  occupants: number;
}

export interface VouchRecord {
  id: string;
  vouchedFor: string;
  vouchedForHandle: string;
  pointsStaked: number;
  stakedAt: string;
  status: "active" | "revoked";
}

export type EvidenceTier = "A" | "B" | "C";

export interface TieredEvidenceItem {
  label: string;
  tier: EvidenceTier;
  // the % contribution the miner would assign when accepted. Tier A caps at 30% total,
  // Tier B caps at 80% total, Tier C is uncapped.
  contribution: number;
  description: string;
}

export interface VerificationRequest {
  id: string;
  applicant: string;
  applicantHandle: string;
  submittedAt: string;
  type: "biometric" | "government_id" | "vouch_review";
  currentScore: number;
  evidence: string[];
  tieredEvidence: TieredEvidenceItem[];
  vouchers: number;
  status: "pending" | "in_review" | "approved" | "rejected";
  assignedTo?: string;
  priority: "low" | "medium" | "high";
  // FIFO position in the miner's assignment queue
  fifoPosition: number;
}

export interface JuryMember {
  name: string;
  handle: string;
  vote?: "human" | "not_human" | "pending";
  // Points staked by this juror (5% of their Earned balance, per white paper 8.3)
  stake: number;
  // If true, this is the current user's seat on the jury (demo only)
  isYou?: boolean;
}

export interface Dispute {
  id: string;
  title: string;
  type: "non_human" | "duplicate_account";
  stage: "arbitration" | "open" | "evidence_review" | "voting" | "ruling" | "appeal" | "resolved";
  filedBy: string;
  filedAgainst: string;
  filedAt: string;
  // When the current stage began — used to compute live countdowns
  stageStartedAt: string;
  description: string;
  evidenceCount: number;
  jury: JuryMember[];
  rulingDue?: string;
  ruling?: string;
  appealAvailable: boolean;
  // Points the challenger staked to open the case (at risk if case fails)
  filerStake: number;
  // Defendant's Earned balance at filing — the pool the bounty is drawn from if they lose
  defendantEarnedBalance: number;
  // When resolved, the side the jury landed on
  verdict?: "human" | "not_human";
}

// ---- Current user ----

export const currentUser: User = {
  id: "u_001",
  name: "Matt Franklin",
  handle: "@matt",
  avatar: "MF",
  percentHuman: 87,
  joinedAt: "2026-01-15",
  isHuman: true,
};

export const currentBalances: PointBalances = {
  active: 892,
  activeMax: 1440,
  activeExpiresIn: "14h 23m",
  supportive: 144,
  supportiveMax: 144,
  ambient: 14.4,
  ambientMax: 14.4,
  earned: 24_350,
};

export const recentTransactions: Transaction[] = [
  {
    id: "t_001",
    type: "sent",
    amount: 200,
    pointType: "active",
    counterparty: "Sarah Chen",
    description: "Tutoring session",
    timestamp: "2026-04-02T10:30:00",
  },
  {
    id: "t_002",
    type: "received",
    amount: 150,
    pointType: "earned",
    counterparty: "James Rivera",
    description: "Garden help",
    timestamp: "2026-04-02T09:15:00",
  },
  {
    id: "t_003",
    type: "sent",
    amount: 50,
    pointType: "active",
    counterparty: "Local Co-op",
    description: "Weekly groceries",
    timestamp: "2026-04-01T18:45:00",
  },
  {
    id: "t_004",
    type: "received",
    amount: 300,
    pointType: "earned",
    counterparty: "Community Center",
    description: "Workshop facilitation",
    timestamp: "2026-04-01T14:00:00",
  },
  {
    id: "t_005",
    type: "sent",
    amount: 75,
    pointType: "active",
    counterparty: "Maria Gonzalez",
    description: "Childcare",
    timestamp: "2026-04-01T08:00:00",
  },
  {
    id: "t_006",
    type: "received",
    amount: 500,
    pointType: "earned",
    counterparty: "Neighborhood Assoc.",
    description: "Monthly coordination",
    timestamp: "2026-03-31T16:00:00",
  },
];

export const durableGoods: DurableGood[] = [
  {
    id: "g_001",
    name: 'MacBook Pro 14"',
    category: "Electronics",
    registeredAt: "2026-01-20",
    supportiveEarned: 1_240,
    maker: "Apple Inc.",
    status: "active",
    ratePerMin: 0.005,
    dailyAllocation: 48,
  },
  {
    id: "g_002",
    name: "Herman Miller Aeron Chair",
    category: "Furniture",
    registeredAt: "2026-01-20",
    supportiveEarned: 1_180,
    maker: "Herman Miller",
    status: "active",
    ratePerMin: 0.003,
    dailyAllocation: 36,
  },
  {
    id: "g_003",
    name: "Red Wing Iron Rangers",
    category: "Footwear",
    registeredAt: "2026-02-10",
    supportiveEarned: 680,
    maker: "Red Wing Shoes",
    status: "active",
    ratePerMin: 0.002,
    dailyAllocation: 24,
  },
  {
    id: "g_004",
    name: "Cast Iron Skillet",
    category: "Kitchenware",
    registeredAt: "2026-01-15",
    supportiveEarned: 1_440,
    maker: "Lodge Cast Iron",
    status: "active",
    ratePerMin: 0.004,
    dailyAllocation: 36,
  },
];

export const spaces: Space[] = [
  { id: "s_001", name: "Home (Main St)", type: "Residential", ambientFlow: 8.2, occupants: 3 },
  { id: "s_002", name: "Riverside Park", type: "Public Park", ambientFlow: 45.6, occupants: 127 },
  { id: "s_003", name: "Community Library", type: "Public Building", ambientFlow: 22.1, occupants: 48 },
];

export const vouches: VouchRecord[] = [
  {
    id: "v_001",
    vouchedFor: "Elena Torres",
    vouchedForHandle: "@elena",
    pointsStaked: 500,
    stakedAt: "2026-02-01",
    status: "active",
  },
  {
    id: "v_002",
    vouchedFor: "David Kim",
    vouchedForHandle: "@dkim",
    pointsStaked: 300,
    stakedAt: "2026-03-10",
    status: "active",
  },
];

// ---- Miner data ----

export const verificationQueue: VerificationRequest[] = [
  {
    id: "vr_001",
    applicant: "Aisha Mohammed",
    applicantHandle: "@aisha_m",
    submittedAt: "2026-04-02T08:00:00",
    type: "biometric",
    currentScore: 32,
    evidence: ["Facial scan", "Voice print"],
    tieredEvidence: [
      { label: "Selfie", tier: "A", contribution: 20, description: "Easy to fake. Capped as Tier A." },
      { label: "Facial geometry scan", tier: "B", contribution: 60, description: "First biometric. Per white paper 6.1." },
      { label: "Voice print (liveness check)", tier: "B", contribution: 15, description: "Second biometric. +15%." },
      { label: "Vouch from @elena (staked 5% earned)", tier: "C", contribution: 10, description: "Tier C: +10% per vouch, no cap." },
      { label: "Vouch from @jmartinez (staked 5% earned)", tier: "C", contribution: 10, description: "Tier C: +10% per vouch, no cap." },
    ],
    vouchers: 2,
    status: "pending",
    priority: "high",
    fifoPosition: 1,
  },
  {
    id: "vr_002",
    applicant: "Tom Brennan",
    applicantHandle: "@tbrennan",
    submittedAt: "2026-04-02T06:30:00",
    type: "government_id",
    currentScore: 55,
    evidence: ["Passport scan", "Utility bill"],
    tieredEvidence: [
      { label: "Stated name & DOB", tier: "A", contribution: 10, description: "Self-attestation." },
      { label: "Passport scan (gov ID)", tier: "B", contribution: 60, description: "Primary Tier B evidence." },
      { label: "Utility bill (address match)", tier: "B", contribution: 15, description: "Corroborating Tier B." },
      { label: "Vouch from @sarah_c", tier: "C", contribution: 10, description: "Tier C vouch: +10%." },
      { label: "Vouch from @jkim", tier: "C", contribution: 10, description: "Tier C vouch: +10%." },
      { label: "Vouch from @mrivera", tier: "C", contribution: 10, description: "Tier C vouch: +10%." },
      { label: "Vouch from @localcoop", tier: "C", contribution: 10, description: "Tier C vouch: +10%." },
    ],
    vouchers: 4,
    status: "pending",
    priority: "medium",
    fifoPosition: 2,
  },
  {
    id: "vr_003",
    applicant: "Yuki Tanaka",
    applicantHandle: "@yuki",
    submittedAt: "2026-04-01T22:00:00",
    type: "vouch_review",
    currentScore: 78,
    evidence: [],
    tieredEvidence: [
      { label: "Selfie", tier: "A", contribution: 15, description: "Tier A only." },
      { label: "Vouch from @elena", tier: "C", contribution: 10, description: "+10%." },
      { label: "Vouch from @dkim", tier: "C", contribution: 10, description: "+10%." },
      { label: "Vouch from @matt", tier: "C", contribution: 10, description: "+10%." },
      { label: "Vouch from @sarah_c", tier: "C", contribution: 10, description: "+10%." },
      { label: "Vouch from @jkim", tier: "C", contribution: 10, description: "+10%." },
      { label: "Vouch from @mrivera", tier: "C", contribution: 10, description: "+10%." },
      { label: "Vouch from @localcoop", tier: "C", contribution: 10, description: "+10%." },
      { label: "Vouch from @community", tier: "C", contribution: 10, description: "+10%." },
    ],
    vouchers: 8,
    status: "in_review",
    assignedTo: "Miner_042",
    priority: "low",
    fifoPosition: 3,
  },
  {
    id: "vr_004",
    applicant: "Carlos Vega",
    applicantHandle: "@cvega",
    submittedAt: "2026-04-01T19:45:00",
    type: "biometric",
    currentScore: 10,
    evidence: ["Facial scan"],
    tieredEvidence: [
      { label: "Facial scan (partial, no liveness)", tier: "B", contribution: 10, description: "Incomplete. Liveness check missing." },
    ],
    vouchers: 0,
    status: "pending",
    priority: "high",
    fifoPosition: 4,
  },
  {
    id: "vr_005",
    applicant: "Priya Sharma",
    applicantHandle: "@priya_s",
    submittedAt: "2026-04-01T15:00:00",
    type: "government_id",
    currentScore: 45,
    evidence: ["National ID", "Address proof"],
    tieredEvidence: [
      { label: "Stated name & address", tier: "A", contribution: 10, description: "Self-attestation." },
      { label: "National ID (Aadhaar)", tier: "B", contribution: 60, description: "Primary Tier B." },
      { label: "Address proof", tier: "B", contribution: 5, description: "Corroborating Tier B." },
      { label: "Vouch from @rsharma", tier: "C", contribution: 10, description: "+10%." },
      { label: "Vouch from @auntie_k", tier: "C", contribution: 10, description: "+10%." },
      { label: "Vouch from @tech_meetup", tier: "C", contribution: 10, description: "+10%." },
    ],
    vouchers: 3,
    status: "pending",
    priority: "medium",
    fifoPosition: 5,
  },
];

export const minerStats = {
  // White paper 7.2: Node Operator (Tier 1) or Validator (Tier 2).
  tier: "validator" as "node_operator" | "validator",
  tierLabel: "Tier 2: Validator",
  // Composite accuracy = average of verification accuracy and jury accuracy (white paper 7.3)
  verificationAccuracy: 98.5, // % of scores not overturned, 30-day rolling
  juryAccuracy: 96.2,          // % of juror votes matching final verdict, 30-day rolling
  compositeAccuracy: 97.35,
  accuracyThreshold: 80,       // 80% composite threshold per white paper 7.3
  totalVerified: 342,
  rewardsEarned: 15_200,
  bountyEarned: 8_400,         // from successful challenges (white paper 8.4)
  lotteryWins: 3,              // Tier 2 lottery wins this window (white paper 7.4)
  rank: 12,
  totalMiners: 1_847,
  pendingInQueue: verificationQueue.filter((v) => v.status === "pending").length,
  avgReviewTime: "4m 32s",
  rollingWindowDays: 30,
};

// ---- Miner: jury summons (drafted as juror on live cases) ----
export interface JurySummons {
  caseId: string;
  caseTitle: string;
  stage: "evidence_review" | "voting";
  stakeRequired: number;       // 5% of your Earned points per white paper 8.3
  deadline: string;            // When the voting window closes
  canVote: boolean;            // Only true when stage === "voting"
}

export const minerJurySummons: JurySummons[] = [
  {
    caseId: "d_002",
    caseTitle: "Duplicate account: user_2190 and user_4821",
    stage: "evidence_review",
    stakeRequired: 1_217, // 5% of 24,350
    deadline: "2026-04-09",
    canVote: false,
  },
  {
    caseId: "d_003",
    caseTitle: "Suspected bot ring: 23 coordinated accounts",
    stage: "voting",
    stakeRequired: 1_217,
    deadline: "2026-04-07",
    canVote: true,
  },
];

// ---- Miner: recent bounty history (successful challenges) ----
export interface BountyRecord {
  caseId: string;
  resolvedAt: string;
  defendantHandle: string;
  defendantEarned: number;
  bountyAwarded: number;       // 20% of defendant's Earned (white paper 8.4)
  challengerStakeReturned: number;
}

export const minerBountyHistory: BountyRecord[] = [
  {
    caseId: "d_100",
    resolvedAt: "2026-03-28",
    defendantHandle: "@tradebot_x",
    defendantEarned: 42_000,
    bountyAwarded: 8_400,
    challengerStakeReturned: 500,
  },
];

// ---- Court data ----
// Case types: non_human, duplicate_account
// Stages: arbitration → open (jury assigned, 11 members) → evidence_review → voting → ruling → appeal (new jury)

// Each juror stakes 5% of their own Earned points (white paper 8.3).
const juryPool: JuryMember[] = [
  { name: "Miner_042", handle: "@miner042", vote: "not_human", stake: 1_580 },
  { name: "Miner_188", handle: "@miner188", vote: "not_human", stake: 940 },
  { name: "Miner_012", handle: "@miner012", vote: "human", stake: 2_310 },
  { name: "Miner_099", handle: "@miner099", vote: "not_human", stake: 1_120 },
  { name: "Miner_077", handle: "@miner077", vote: "pending", stake: 1_450 },
  { name: "Miner_231", handle: "@miner231", vote: "not_human", stake: 860 },
  { name: "Miner_155", handle: "@miner155", vote: "human", stake: 2_005 },
  { name: "Miner_304", handle: "@miner304", vote: "pending", stake: 710 },
  { name: "Miner_089", handle: "@miner089", vote: "not_human", stake: 1_305 },
  { name: "Miner_201", handle: "@miner201", vote: "human", stake: 1_775 },
  { name: "Miner_167", handle: "@miner167", vote: "pending", stake: 895 },
];

// The juror slate for case d_003 — places the current user in seat #11 so the
// Vote UI can render. Stake = 5% of currentBalances.earned (1,217).
const botRingJury: JuryMember[] = [
  { name: "Miner_042", handle: "@miner042", vote: "not_human", stake: 1_580 },
  { name: "Miner_188", handle: "@miner188", vote: "not_human", stake: 940 },
  { name: "Miner_012", handle: "@miner012", vote: "not_human", stake: 2_310 },
  { name: "Miner_099", handle: "@miner099", vote: "not_human", stake: 1_120 },
  { name: "Miner_077", handle: "@miner077", vote: "not_human", stake: 1_450 },
  { name: "Miner_231", handle: "@miner231", vote: "pending", stake: 860 },
  { name: "Miner_155", handle: "@miner155", vote: "not_human", stake: 2_005 },
  { name: "Miner_304", handle: "@miner304", vote: "pending", stake: 710 },
  { name: "Miner_089", handle: "@miner089", vote: "not_human", stake: 1_305 },
  { name: "Miner_201", handle: "@miner201", vote: "pending", stake: 1_775 },
  { name: "You (Matt Franklin)", handle: "@matt", vote: "pending", stake: 1_217, isYou: true },
];

export const disputes: Dispute[] = [
  {
    id: "d_001",
    title: "Suspected non-human account: user_4821",
    type: "non_human",
    stage: "open",
    filedBy: "Miner_088",
    filedAgainst: "user_4821",
    filedAt: "2026-04-01T12:00:00",
    stageStartedAt: "2026-04-01T12:00:00",
    description:
      "Miner_088 assigned a 0% human score during verification. Behavioral analysis shows automated response patterns and no biometric variation. Account escalated from arbitration to court after miner confirmed suspicion.",
    evidenceCount: 3,
    jury: juryPool.slice(0, 11),
    rulingDue: "2026-04-22",
    appealAvailable: true,
    filerStake: 1_200,
    defendantEarnedBalance: 18_500,
  },
  {
    id: "d_002",
    title: "Duplicate account: user_2190 and user_4821",
    type: "duplicate_account",
    stage: "evidence_review",
    filedBy: "Miner_012",
    filedAgainst: "user_2190",
    filedAt: "2026-03-28T09:00:00",
    stageStartedAt: "2026-04-04T09:00:00",
    description:
      "Biometric data for user_2190 has a 94% match with user_4821. Requesting identity review to determine if these are the same person operating two accounts to receive double daily airdrop.",
    evidenceCount: 7,
    jury: [...juryPool.slice(3, 11), juryPool[0], juryPool[1], juryPool[2]],
    rulingDue: "2026-04-18",
    appealAvailable: true,
    filerStake: 2_300,
    defendantEarnedBalance: 31_200,
  },
  {
    id: "d_003",
    title: "Suspected bot ring: 23 coordinated accounts",
    type: "non_human",
    stage: "voting",
    filedBy: "Miner_012",
    filedAgainst: "Multiple accounts",
    filedAt: "2026-03-20T14:30:00",
    stageStartedAt: "2026-04-11T14:30:00",
    description:
      "Investigation flagged 23 accounts created within 48 hours, all vouching for each other in a circular pattern. Suspected coordinated Sybil attack to gain fraudulent point allocations.",
    evidenceCount: 31,
    jury: botRingJury,
    rulingDue: "2026-04-18",
    appealAvailable: true,
    filerStake: 4_500,
    defendantEarnedBalance: 87_400,
  },
  {
    id: "d_004",
    title: "Non-human account: automated trading pattern",
    type: "non_human",
    stage: "ruling",
    filedBy: "Miner_099",
    filedAgainst: "@tradebot_x",
    filedAt: "2026-03-15T08:00:00",
    stageStartedAt: "2026-04-12T08:00:00",
    description:
      "Account @tradebot_x shows no biometric data, sends points in exact intervals every 60 seconds, and has never submitted any identity verification evidence.",
    evidenceCount: 12,
    jury: juryPool,
    ruling: "Account confirmed as non-human. Daily airdrop suspended. Account converted to business type.",
    verdict: "not_human",
    appealAvailable: true,
    filerStake: 2_000,
    defendantEarnedBalance: 42_000,
  },
  {
    id: "d_005",
    title: "Duplicate account cleared: riverside_park",
    type: "duplicate_account",
    stage: "resolved",
    filedBy: "Miner_042",
    filedAgainst: "@riverside_park",
    filedAt: "2026-03-10T11:00:00",
    stageStartedAt: "2026-04-01T11:00:00",
    description:
      "Riverside Park was suspected of operating a duplicate account. Investigation revealed it was a legitimate non-human (business) account that had been miscategorized.",
    evidenceCount: 5,
    jury: juryPool.slice(0, 11),
    ruling: "Case dismissed. Account confirmed as legitimate non-human (space) registration.",
    verdict: "human",
    appealAvailable: false,
    filerStake: 1_500,
    defendantEarnedBalance: 9_200,
  },
  {
    id: "d_006",
    title: "Identity challenge: arbitration pending",
    type: "non_human",
    stage: "arbitration",
    filedBy: "Miner_231",
    filedAgainst: "@newuser_99",
    filedAt: "2026-04-02T16:00:00",
    stageStartedAt: "2026-04-02T16:00:00",
    description:
      "Miner assigned 5% human score. Account has minimal evidence and only 1 voucher. The defendant now has 7 days to respond with additional evidence or gather vouchers; if the challenger remains unconvinced, the case escalates to court.",
    evidenceCount: 1,
    jury: [],
    appealAvailable: true,
    filerStake: 600,
    defendantEarnedBalance: 1_100,
  },
];

// Protocol parameters as of the current block (mirrors white paper defaults).
export const protocolParams = {
  transactionFeeBps: 50,          // 0.5% fee on every transaction (white paper 7)
  tier1FeeSharePct: 20,           // Node Operators
  tier2FeeSharePct: 80,           // Validators
  tier2LotteryPct: 60,            // Of Tier 2 pool: 60% to lottery winner
  tier2BaselinePct: 40,           // Of Tier 2 pool: 40% split evenly among Tier 2
  jurySize: 11,
  jurorStakePct: 5,               // Each juror stakes 5% of their Earned (white paper 8.3)
  stageWindowDays: 7,             // Every stage has a 7-day window
  bountyPct: 20,                  // Winning challenger gets 20% of defendant's Earned (8.4)
  burnPct: 80,                    // Remaining 80% of defendant's Earned is burned
  tier2AccuracyThreshold: 80,     // Composite accuracy floor to hold Tier 2 (7.3)
  rollingWindowDays: 30,
};

export const courtStats = {
  arbitration: disputes.filter((d) => d.stage === "arbitration").length,
  open: disputes.filter((d) => d.stage === "open").length,
  evidenceReview: disputes.filter((d) => d.stage === "evidence_review").length,
  voting: disputes.filter((d) => d.stage === "voting").length,
  ruling: disputes.filter((d) => d.stage === "ruling").length,
  resolved: disputes.filter((d) => d.stage === "resolved").length,
  appealed: disputes.filter((d) => d.stage === "appeal").length,
  totalCases: disputes.length,
};

// ---- Network stats ----

export const networkStats = {
  totalParticipants: 48_291,
  verifiedHumans: 41_003,
  totalPointsCirculating: 69_540_000,
  dailyTransactions: 284_100,
  activeMiners: 1_847,
  avgPercentHuman: 82,
  medianPercentHuman: 89,
  modePercentHuman: 95,
  lastRebaseMultiplier: 1.000312,
  nextRebaseIn: "6h 42m",
  yourShareOfTotal: 0.00035,
  uptime: "99.97%",
  blockHeight: 1_284_901,
  avgBlockTime: "2.4s",
  tps: 1_842,
  peakTps: 12_400,
  dailyAirdropTime: "4:00 AM ET",
};

// ---- Court summons (defense, not jury) ----
// Participants can be called to defend themselves up to 1 time in 6 months
// by miners who flag them as potentially not human.

export const defenseSummons = {
  active: true,
  caseId: "d_006",
  caseTitle: "Identity verification challenge",
  filedBy: "Miner_088",
  respondBy: "2026-04-08",
  description: "A miner has flagged your account for additional identity review. You have 7 days to submit evidence defending your human status.",
  lastCalledDate: "2025-10-15",
  nextEligibleDate: "2026-10-02",
};
