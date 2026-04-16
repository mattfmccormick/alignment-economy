"use client";

import { SubpageNav, SubpageFooter } from "@/components/site-nav";

export default function WhitePaperPage() {
  return (
    <>
      <SubpageNav />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="py-16 md:py-24 px-6 bg-ae-navy text-white text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-ae-teal text-sm font-medium tracking-wide uppercase mb-4">White Paper</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">The Alignment Economy</h1>
            <p className="text-gray-300 text-lg italic">A Usable Peer-to-Peer Electronic Cash System</p>
            <p className="text-gray-500 text-xs mt-4 italic">Purpose of this paper: to make the Alignment Economy clear enough for critique and to attract builders who can strengthen it, bring it into the world, and tell the stories required for adoption.</p>
          </div>
        </section>

        {/* Content */}
        <article className="py-12 md:py-20 px-6">
          <div className="max-w-2xl mx-auto prose-ae">
            <h2>Abstract</h2>
            <p>A peer-to-peer electronic cash system can be built on a blockchain where the base unit of currency is human attention rather than computational work or staked capital. Each verified human participant receives a fixed daily allocation of points that expire if unspent, reducing first-mover advantage. A daily rebasing mechanism adjusts all saved balances to support stable purchasing power as the network grows, minimizing deflation/inflation. A percent-human verification system, maintained by a decentralized network of miners focused on proof of human, inhibits bot and duplicate accounts. Miners are compensated through a hardcoded 0.5% transaction fee. An arbitration and court system resolves disputes over whether an account belongs to a real, unique human. The result is a currency designed for daily transactions, not speculation, one that compensates previously invisible contributions such as caregiving, mentorship, and the maintenance of physical spaces.</p>

            <h2>1. Introduction</h2>
            <p>The understood universe is built on four foundational pillars: time, space, matter, and energy. A fifth, often overlooked, is essential to understanding the first four: attention. All we know, have, and do stems from attention&apos;s actions with and within the first four. Humans are, in economic terms, units of attention. Each human being has exactly 1,440 minutes of attention per day. That number, the same for every person alive regardless of wealth, birth, or when they joined the network, is the foundation of everything that follows.</p>
            <p>In our current economic system, value (the organization of matter and energy within space and time that benefits attention) is primarily measured and transferred through fiat currency. Fiat systems, including stablecoins, (they are just electronic fiat) are centrally controlled, inflationary by design, and structurally disconnected from actual human contribution. A mother raising children, a neighbor maintaining a community garden, a mentor guiding a young person toward their calling, none of these contributions register in the ledger of fiat economics. In addition, AI and robotic systems now generate economically meaningful output at near-zero marginal cost, further eroding the connection between human labor and economic reward. Fiat increasingly fails to signal who created value and how much value was created. A new monetary system must evolve if society is to remain coherent.</p>
            <p>Bitcoin has been a vital stepping stone, pioneering decentralized consensus (i.e., blockchain). But Bitcoin and its derivatives have encountered two paradoxes that prevent them from functioning as daily currency:</p>
            <p><strong>First-Mover Advantage Paradox.</strong> Early participants acquired a disproportionate share of the supply when Bitcoin was cheap and easy to mine. New entrants must pay dramatically higher prices or compete in capital-intensive mining. For many, this resembles a pyramid scheme more than a new economic system, psychologically discouraging adoption.</p>
            <p><strong>Deflation Paradox.</strong> As Bitcoin&apos;s price has risen relative to fiat, holders are incentivized to hoard rather than spend. Having learned the lesson of the infamous Bitcoin pizza transaction, nearly everyone in the space treats the currency as a speculative asset, buying and holding rather than using it for daily purchases. This directly contradicts Bitcoin&apos;s stated purpose of creating &ldquo;a peer-to-peer version of electronic cash.&rdquo;</p>
            <p>Therefore, a new system is needed, one built from the start to solve both paradoxes while addressing the deeper problem underneath: the structural invisibility of the human contributions that hold society together. That system is the Alignment Economy.</p>
            <p>It is not communism; wealth differences persist based on the value each person contributes. It is not capitalism as currently practiced; a daily allocation ensures a floor of economic participation for every verified human. It is something new; a coordination framework designed for an era in which the tools of production are increasingly automated, and the most essential human contributions are those that hold society together.</p>
            <p>The sections that follow explain how it works.</p>

            <h2>2. Design Requirements</h2>
            <p>The two Bitcoin paradoxes, and the deeper invisibility problem underneath them, point to what any replacement system must do. A universal value exchange system for daily transactions between persons, companies, countries, and even AI/Bots must satisfy five requirements:</p>
            <ol>
              <li><strong>Decentralized control.</strong> No central authority may manipulate the money supply, interest rates, or transaction rules.</li>
              <li><strong>Minimized first-mover advantage.</strong> Late adopters must not be structurally disadvantaged relative to early adopters.</li>
              <li><strong>Stable purchasing power.</strong> Neither inflation nor deflation should erode or artificially increase the value of holdings over time.</li>
              <li><strong>Incentive to transact.</strong> The system must encourage participants to buy and sell goods and services rather than hold the currency hoping its price will rise relative to fiat.</li>
              <li><strong>Visibility of contribution.</strong> The system must make economically visible those contributions (child-rearing, elder care, the creation and maintenance of physical spaces and durable goods, etc.) that fiat currently ignores.</li>
            </ol>
            <p>Every design decision in the sections that follow traces back to one of these five.</p>

            <h2>3. Daily Point Allocations</h2>
            <p>Each person has 1,440 minutes of attention per day; this attention can be used to consume or contribute value to others. In the Alignment Economy, attention is a quantifiable, tradable asset. Only individuals can receive a daily allocation, not groups such as families, companies, governments, or AI/Bots. These groups (including AI/Bots) may earn and pool points, but only through voluntary transactions with human individuals.</p>
            <p>Points have four categories, each reflecting a different way attention creates and absorbs value.</p>

            <h3>3.1 Active Points</h3>
            <p>Each person receives 1,440 Active points per day. They may be spent however the individual chooses: purchasing goods and services, paying another person for labor, or gifting them to family members. Any unspent Active points expire at the end of the day and are burned by the protocol.</p>
            <p>Point expiration is a mechanism that distinguishes the Alignment Economy from other existing currencies. A billionaire and a minimum-wage worker wake up each morning with the same 1,440 Active points. Accumulated wealth still exists in the form of Earned points, but every participant has a guaranteed daily flow of new purchasing power. Because unspent points vanish, there is no incentive to hoard them. They must be used.</p>
            <p>In practice, most participants will direct their daily Active points toward family/friends, goods, or services. A spouse who sends their 1,440 Active points to a stay-at-home partner has made that partner&apos;s caregiving contribution economically visible.</p>

            <h3>3.2 Supportive Points</h3>
            <p>Each person receives 144 Supportive points per day, allocated at a rate of 0.1 points per minute to the durable goods currently in active use: desks, computers, shoes, vehicles, tools. Supportive points expire if untagged by end of day.</p>
            <p>Only durable goods earn Supportive points, creating an economic incentive for quality and longevity rather than planned obsolescence. A chair that is used for twenty years earns twenty years of Supportive income for its manufacturer. A product that breaks in six months earns almost nothing. When a person uses multiple items simultaneously, the 144 daily points are split by time-weighted allocation across active items. Manufacturers are responsible for collecting these points via smart contracts activated at point of sale or through ongoing use detection; individuals retain the right to override allocations.</p>
            <p>When a company receives Supportive points and pays them out to individuals (through wages, ownership distributions, etc.), those points convert into Earned points, which may be saved.</p>

            <h3>3.3 Ambient Points</h3>
            <p>Each person receives 14.4 Ambient points per day, allocated at a rate of 0.01 points per minute to the physical spaces occupied: buildings, parks, roads, transit systems, towns, states, and nations. Ambient points expire if untagged by end of day.</p>
            <p>The more time people collectively spend in a place, the more that place earns. Entities responsible for maintaining these environments collect Ambient points to fund maintenance, operations, or new infrastructure. This functions as a usage-based alternative to traditional taxation: a city that attracts people earns more than one people avoid.</p>
            <p>When a person occupies nested locations simultaneously (a room within a building within a city within a state), their Ambient allocation flows to the immediate space. Each higher-level entity collects its share from the level below, setting its own collection rate. As with Supportive points, Ambient points paid out to individuals convert into Earned points.</p>

            <h3>3.4 Earned Points</h3>
            <p>Earned points are any points an individual receives from another person, organization, or governing entity through transactions. Unlike Active, Supportive, and Ambient points, Earned points may be saved without limit. They represent accumulated purchasing power from prior contributions of value.</p>
            <p>Earned points are the only category subject to daily rebasing (see Section 4). They are the savings layer of the Alignment Economy, the mechanism through which a person who contributes more value than they consume can accumulate wealth over time.</p>

            <h2>4. Rebasing</h2>
            <p>If every participant receives points each day the total supply of points will grow continuously, causing inflation. To counteract this, the system applies a daily rebase: an adjustment that changes the absolute number of Earned points each person holds while preserving their ratio relative to all other participants.</p>
            <p>The rebasing formula is:</p>
            <div className="bg-ae-warm rounded-xl p-4 my-4 text-center font-mono text-sm">
              Rebase Multiplier = Target Total / Pre-Rebase Total<br />
              Where:<br />
              Target Total = Number of participants x 14,400<br />
              Pre-Rebase Total = Sum of all Earned point balances before the day&apos;s rebase
            </div>
            <p>The rebase multiplier will briefly exceed 1 during the network&apos;s early growth phase, when the Earned pool has not yet reached the target. Once the system reaches even modest scale, the multiplier will consistently fall below 1. From that point forward, the rebase compresses all balances downward each day. The number of points in your account gets smaller, but what those points can buy stays the same. Your share of the total Earned pool, your percentage relative to all other accounts, does not change. If you held 1% of all Earned points before the rebase, you hold 1% after it. Only the absolute number adjusts.</p>
            <p>This mechanism preserves each participant&apos;s proportional share of the Earned pool as the network grows, creating structural pressure toward price stability without relying on central control. A loaf of bread that costs 20 points on Day 1 should cost approximately 20 points on Day 10,000, regardless of how many people have joined the system.</p>
            <p>Active, Supportive, and Ambient points are not rebased because they do not persist between days. They are minted fresh each day and expire 24 hours later. Only the Earned pool (the accumulated savings of the economy) is subject to rebasing.</p>

            <h2>5. Tagging and Automation</h2>
            <p>In the early Alignment Economy, participants will log their point allocations manually, using QR codes or in-app tagging when purchasing items, entering or leaving locations, or interacting with products. Participants may also set automatic allocations: for example, directing all daily Active points to a spouse, or committing Ambient points to a workplace building via a standing agreement.</p>
            <p>Over time, AI, and Internet-of-Things devices will automate the tagging process, using cues from calendars, sensors, geolocation, and device usage to infer which products are in active use and which spaces are occupied. Smart contracts between participants and entities (buildings, transit systems, product manufacturers, etc.) will handle the allocation of Supportive and Ambient points without requiring daily manual intervention.</p>
            <p>The onus for collecting Supportive and Ambient points rests on the entities that receive them (manufacturers, building owners, municipalities, etc.), not on the individual. However, individuals retain the right to override automatic allocations and redirect their points as they see fit.</p>

            <h2>6. Proof of Human</h2>
            <p>Any payment system that issues daily point allocations must distinguish humans from bots and duplicate accounts. This is a challenging problem that may not be fully solvable, but a range can be utilized to help mitigate fraud. To do this, the Alignment Economy utilizes a non-binary gate, to be eligible for daily point allocations each account carries a percent-human score ranging from 0% to 100%. This score acts as a multiplier on the account&apos;s purchasing power. When spending points, the transaction value is discounted by the sender&apos;s percent-human score. If a loaf of bread costs 20 points and the buyer is 90% human, they must pay approximately 22.2 points (20 / 0.9) to deliver 20 points of value to the seller. The result is a self-enforcing network: participants are incentivized to verify their own humanity and to transact with others who have done the same.</p>
            <p>The verification system must answer two questions about accounts that are eligible for daily points: (1) is this a real human? and (2) does this person have only one account? Different types of evidence answer these questions with different levels of confidence. While game theory would determine the best method and weighting of evidence, the system could start by organizing evidence into three tiers based on how difficult it is to fake, illustrated below.</p>

            <h3>6.1 Verification Evidence Tiers</h3>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-ae-warm"><th className="p-3 text-left border border-gray-200 font-semibold">Tier</th><th className="p-3 text-left border border-gray-200 font-semibold">Max Score</th><th className="p-3 text-left border border-gray-200 font-semibold">Evidence &amp; Values</th></tr></thead>
                <tbody>
                  <tr><td className="p-3 border border-gray-200 font-medium">Tier A: Easy to fake</td><td className="p-3 border border-gray-200">30%</td><td className="p-3 border border-gray-200">Documents, photos, video, and voice can all be stolen, forged, or AI-generated. Government-issued ID: 15%. Photo/video matched to ID: 10%. Voice print: 5%. CAPTCHA/behavioral analysis: 5%. In-person transaction confirmation: a verified point-of-sale terminal records that a living human initiated the transaction. Each confirmed in-person transaction: +2.5%, up to a maximum of 10% from this source per 30-day window.</td></tr>
                  <tr><td className="p-3 border border-gray-200 font-medium">Tier B: Hard to fake</td><td className="p-3 border border-gray-200">80%</td><td className="p-3 border border-gray-200">Biometric data (Fingerprint scan / Iris scan / Facial geometry scan, etc.): 60% for the first biometric, +15% second, +5% third.</td></tr>
                  <tr><td className="p-3 border border-gray-200 font-medium">Tier C: Gameable but socially grounded</td><td className="p-3 border border-gray-200">No cap</td><td className="p-3 border border-gray-200">Other verified humans attest to an account&apos;s legitimacy by locking their own Earned points as collateral. Susceptible to collusion, which is why each vouch requires staking at least 5% of the voucher&apos;s Earned holdings. Each vouch: +10% human.</td></tr>
                </tbody>
              </table>
            </div>

            <h3>6.2 Paths to 100%</h3>
            <p>The less hard-to-fake evidence a participant provides, the more social proof is required to compensate. The table below shows three possible paths to full verification. Any combination that sums to 100% is valid.</p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-ae-warm"><th className="p-3 text-left border border-gray-200 font-semibold">Path</th><th className="p-3 text-left border border-gray-200 font-semibold">Evidence Combination</th><th className="p-3 text-left border border-gray-200 font-semibold">Who it suits</th></tr></thead>
                <tbody>
                  <tr><td className="p-3 border border-gray-200">Biometrics + institutional + light social</td><td className="p-3 border border-gray-200">1 biometric (60%) + Gov ID (15%) + photo (10%) + 2 vouches (20%) = 105%, capped at 100%</td><td className="p-3 border border-gray-200">Least social effort required</td></tr>
                  <tr><td className="p-3 border border-gray-200">Institutional + heavy social (no biometrics)</td><td className="p-3 border border-gray-200">Gov ID (15%) + photo (10%) + voice (5%) + 7 vouches (70%) = 100%</td><td className="p-3 border border-gray-200">Avoids biometrics</td></tr>
                  <tr><td className="p-3 border border-gray-200">Fully social</td><td className="p-3 border border-gray-200">10 vouches (100%) = 100%</td><td className="p-3 border border-gray-200">Maximum privacy; maximum social effort</td></tr>
                </tbody>
              </table>
            </div>

            <h3>6.3 Score Decay and Re-Verification</h3>
            <p>The percent-human score decays by 10% per month if no re-verification activity occurs. The goal is that maintaining a high score should be a natural byproduct of participating in the economy, not a separate administrative burden. Every confirmed in-person transaction contributes 2.5% back to a participant&apos;s score, fully offsetting the monthly decay after five such interactions. A person who transacts in person regularly will never experience meaningful score loss. There is also the option of uploading a renewed government ID when the old one expires or completing a periodic biometric check. All of these activities feed verification data back into the system without requiring dedicated effort from the participant.</p>

            <h3>6.4 Vouching as Percentage of Holdings</h3>
            <p>When one account vouches for another, the voucher locks a portion of their Earned points as a stake that the vouched account is a real, unique human with one account. The weight of a vouch is determined not by the absolute number of points locked, but by the percentage of the voucher&apos;s total holdings. A person willing to stake 10% of their 1,400 points (140 points) is making a proportionally larger commitment than a wealthy account staking 140,000 points that represent only 0.003% of their holdings. This percentage-based weighting ensures that vouching is egalitarian: a poor person&apos;s friends can vouch just as effectively as a rich person&apos;s.</p>
            <p>A vouching stake remains locked for as long as the vouched account relies on that vouch to maintain their percent-human score. If the vouched account later achieves verification sufficient to maintain their score without the vouch, the stake can be released. If the vouched account is found fraudulent by the court system, the stake is burned. Vouchers may withdraw a vouch at any time, but doing so immediately reduces the vouched account&apos;s percent-human score by the corresponding amount.</p>

            <h3>6.5 Data Storage and Privacy</h3>
            <p>No identity document, biometric scan, photograph, or personal record is stored on the Alignment Economy blockchain. When a miner evaluates verification evidence, they record only a cryptographic hash: a one-way mathematical fingerprint of the evidence that confirms a review occurred without revealing the underlying data. Because each new account is independently reviewed by three miners (see Section 7.1), the blockchain stores three separate hashes per initial verification event, each tied to a different miner&apos;s account and timestamp. This creates a redundant, auditable record of verification without exposing what was verified.</p>
            <p>Raw biometric and identity data is handled at the wallet or terminal level and never transmitted to the protocol. Participants retain full control over their underlying evidence. The blockchain knows only that miners of given reputations reviewed evidence of a given type at a given time and assigned resulting scores.</p>

            <h2>7. Miners</h2>
            <p>In the Alignment Economy, miners perform proof of human: the ongoing work of verifying that accounts belong to real, unique humans, operating one account, and maintaining the integrity of the blockchain. Miners are compensated from the 0.5% fee applied to every transaction on the network. Because miner income is derived entirely from network activity, miner incentives are aligned with the health and volume of the economy.</p>

            <h3>7.1 Miner Responsibilities</h3>
            <p>Miners have four core responsibilities:</p>
            <ol>
              <li><strong>Transaction processing.</strong> Facilitate all Alignment Economy transactions by maintaining the blockchain ledger.</li>
              <li><strong>Account verification.</strong> Evaluate new accounts at creation and assign an initial percent-human score. Every new account is independently reviewed by a panel of three miners. The protocol assigns reviewers using a first-in, first-out (FIFO) queue: each miner receives the next account in line, ensuring roughly equal workload and preventing cherry-picking. Miners cannot see the account&apos;s evidence before accepting the assignment. Each of the three miners independently evaluates the evidence and submits a score; the account&apos;s initial percent-human score is the median of the three.</li>
              <li><strong>Ongoing audits to source cases.</strong> Monitor accounts for signals of non-human or duplicate behavior, including unusual transaction patterns, volume beyond human capacity, and behavioral anomalies visible on the blockchain. When a miner identifies a suspicious account, they may open a formal challenge (see Section 8). A successful challenge earns the miner a bounty from the fraudulent account&apos;s burned Earned balance, creating a direct financial incentive for enforcement.</li>
              <li><strong>Judicial service.</strong> Serve as jurors in formal cases brought against suspected non-human or duplicate accounts.</li>
            </ol>

            <h3>7.2 Tier Structure</h3>
            <p>The fee pool is divided across two tiers. Validators receive a larger share than node operators, rewarding active participation in verification and enforcement.</p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-ae-warm"><th className="p-3 text-left border border-gray-200 font-semibold">Tier</th><th className="p-3 text-left border border-gray-200 font-semibold">Fee Share</th><th className="p-3 text-left border border-gray-200 font-semibold">Requirements</th><th className="p-3 text-left border border-gray-200 font-semibold">Design Rationale</th></tr></thead>
                <tbody>
                  <tr><td className="p-3 border border-gray-200 font-medium">Tier 1: Node Operators</td><td className="p-3 border border-gray-200">20%</td><td className="p-3 border border-gray-200">Operate a node with 90% uptime during the 30-day rolling window. No verification or jury activity required.</td><td className="p-3 border border-gray-200">Low barrier to entry. Anyone can join by running a node. No capital requirement or approval process. Maintains a wide, decentralized infrastructure base.</td></tr>
                  <tr><td className="p-3 border border-gray-200 font-medium">Tier 2: Validators</td><td className="p-3 border border-gray-200">80%</td><td className="p-3 border border-gray-200">All Tier 1 requirements, plus: 100% jury attendance when called, completion of assigned account verifications via the FIFO queue, active participation in ongoing audits, and a composite accuracy score at or above 80% over the 30-day rolling window.</td><td className="p-3 border border-gray-200">Requires active participation across all miner functions. Missing jury duty or falling below 80% accuracy disqualifies a miner from this tier. The bounty system (Section 8.4) provides additional income for miners who successfully identify fraudulent accounts.</td></tr>
                </tbody>
              </table>
            </div>

            <h3>7.3 The 30-Day Rolling Window</h3>
            <p>All tier evaluations are based on a 30-day rolling window of performance. A miner&apos;s tier is determined by their activity and accuracy within this window, not by lifetime statistics. This ensures that incumbency confers no structural advantage: a veteran miner who becomes less accurate will drop from Tier 2 to Tier 1, while a newcomer who performs with precision can reach Tier 2 within their first 30 days of operation.</p>
            <p><strong>Early-network conditions.</strong> During the network&apos;s initial ramp-up period, the rolling window and tier thresholds will take time to become meaningful. With fewer miners and no 30-day history yet accumulated, the system will operate with reduced statistical confidence. This is expected and manageable. Once the network reaches a minimum of eleven active miners (the number required to seat a jury), the protocol will conduct a formal review of all accounts verified during the ramp-up period, re-evaluating early verifications under the standard three-miner process. Any early accounts that do not survive this review are closed.</p>

            <h3>7.4 Accuracy Measurement</h3>
            <p>Tier placement is determined by accuracy percentage, not by total volume of activity. A miner who verified 20 accounts at 97% accuracy holds the same standing as a miner who verified 200 at 97%. This design eliminates any advantage from scale alone and ensures that a single careful operator competes on equal footing with large operations. Because verifications are assigned via FIFO queue rather than chosen by the miner, accuracy reflects genuine judgment, not case selection.</p>
            <p>Accuracy is measured across two metrics:</p>
            <p><strong>Verification accuracy:</strong> Of all the accounts a miner has reviewed through the FIFO queue, what percentage remain in good standing? Calculated as: (verifications not overturned) divided by (total verifications signed), measured within the 30-day rolling window. If an account a miner verified is later found fraudulent through the court system, that outcome counts against all three miners who signed it. Because miners cannot choose which accounts they review, a low accuracy score reflects poor judgment, not bad luck in case selection. A miner whose panel colleagues are less careful is not penalized for their votes; accuracy is based solely on the miner&apos;s own median contribution. If a miner scored an account low and the other two scored it high, the high median stands, but when the account is later found fraudulent, the dissenting miner&apos;s individual record reflects that they scored it correctly.</p>
            <p><strong>Jury accuracy:</strong> Of all jury cases in which a miner has voted, what percentage of their votes aligned with the final verdict? Calculated as: (votes matching outcome) divided by (total votes cast), within the rolling window.</p>
            <p>A miner&apos;s composite accuracy is the average of these two ratios. Both are tracked on-chain and can be independently verified by any participant. Falling below the 80% composite threshold removes a miner from Tier 2, returning them to Tier 1 status (node operation only, no verification or jury income).</p>

            <h3>7.5 Reward Distribution</h3>
            <p>The 0.5% transaction fee collected on every block is split between the two tiers: 20% to Tier 1 (Node Operators) and 80% to Tier 2 (Validators). The Tier 1 pool is divided equally among all active node operators. The Tier 2 pool is further split on every block: 60% is awarded to a single lottery winner and 40% is divided equally among all Tier 2 miners as a baseline.</p>
            <p><strong>How the lottery works.</strong> Each block, every Tier 2 miner generates a cryptographic proof derived from their private key and a public seed (the hash of the previous block). This is a verifiable random function (VRF): the network selects the miner whose proof output wins the lottery for that block. The winner changes every block, is unpredictable in advance, and is independently verifiable by any participant after the fact by rerunning the same computation. The lottery makes solo mining psychologically and economically viable: on any given block, a single-node operator can win a meaningful payout.</p>
            <p><strong>Example.</strong> Assume the 0.5% transaction fee generates 100 points on a given block and there are 50 Tier 1 miners and 20 Tier 2 miners. The 20-point Tier 1 pool is split equally: each node operator receives 0.4 points. The 80-point Tier 2 pool splits into 48 points (60%) for the lottery winner and 32 points (40%) divided equally among all 20 validators as baseline (1.6 points each). The lottery winner receives 48 + 1.6 = 49.6 points on that block. A non-winning validator receives 1.6 points. The baseline ensures that every active validator earns something on every block, covering operational costs regardless of whether they win the lottery. Validators who successfully challenge fraudulent accounts also receive bounties (see Section 8.4), which can substantially exceed their baseline block income.</p>

            <h2>8. Arbitration and Court System</h2>
            <p>When miner audits surface strong signals that an account is non-human or that a person is operating multiple accounts, the system provides a formal dispute resolution process. There are two types of cases: (1) an account is not human, and (2) a person is operating more than one account. To ensure that miners are actively incentivized to bring cases, a successful challenge earns the challenger a bounty (see Section 8.4).</p>

            <h3>8.1 Arbitration</h3>
            <p>To open a challenge, a miner must flag the account and stake a percentage of their own Earned points. The size of the stake reflects the miner&apos;s confidence in the claim. The defendant account is notified and given a 7-day window to respond.</p>
            <p>The defendant may submit additional verification evidence or bring in other accounts willing to vouch by locking points. If the new evidence is sufficient, the challenger may withdraw without penalty: the defendant&apos;s percent-human score is increased based on the strength of the new evidence, and the challenger&apos;s stake is unlocked. No court is formed.</p>

            <h3>8.2 Court Proceedings</h3>
            <p>If the challenger is unconvinced after arbitration, the case escalates to court. At this point, the challenger&apos;s stake is placed at risk. The defendant does not stake points directly (their entire account is already on the line) but may continue to recruit vouchers willing to lock capital on their behalf.</p>
            <p>A jury of 11 miners is selected at random from the pool of Tier 2 miners. The odd number prevents ties. Jurors cannot have direct transaction history with either the challenger or the defendant, reducing risk of coordinated behavior. Each juror must stake 5% of their own Earned points to participate, ensuring they have skin in the game. Jurors who vote with the majority have their stakes returned; jurors who vote against the final verdict lose their stakes, which are burned.</p>
            <p>The court follows a standardized case format: unique case ID, court level, date opened, evidence submission deadline, voting deadline, and current status. Jurors review the defendant&apos;s account history, verification evidence, the challenger&apos;s explanation and staked amount, and any evidence submitted during arbitration or court.</p>
            <p>Voting is time-boxed (7 days) and asynchronous. Each juror votes &ldquo;human / one account&rdquo; or &ldquo;not human / duplicate accounts.&rdquo; Votes are recorded on-chain with staked amounts and timestamps.</p>

            <h3>8.3 Outcomes</h3>
            <p><strong>If the account is found non-human or duplicate:</strong> The account is closed. A percentage of the account&apos;s Earned balance is awarded to the challenger as a bounty (see Section 8.4). The remainder, along with points staked by vouchers, is burned. The challenger&apos;s original stake is returned. Jurors who voted correctly have their stakes returned.</p>
            <p><strong>If the account is found human:</strong> The challenger loses their staked points, which are burned. Jurors who voted correctly have their stakes released.</p>

            <h3>8.4 Bounty</h3>
            <p>When a court finds an account to be non-human or duplicate, the challenger receives 20% of the condemned account&apos;s Earned balance as a bounty. The remaining 80% is burned. This bounty creates a direct financial incentive for miners to actively seek out and challenge fraudulent accounts, solving the enforcement problem that would otherwise leave the system dependent on altruistic policing.</p>
            <p>The bounty is resistant to the &ldquo;cobra farming&rdquo; problem (manufacturing fraud in order to collect the reward for finding it). To plant a fake account and later collect the bounty on it, an attacker would need the fake to pass three independent miners assigned via the FIFO queue, none of whom the attacker can choose.</p>

            <h3>8.5 Appeals and Protections</h3>
            <p>If desired either side may file one appeal. The appeal convenes a new jury of eleven miners with no overlap from the original jury. The appeal verdict is final; no further appeals are permitted. Only one active case may be brought against an account at a time; multiple miners cannot pile simultaneous challenges against the same defendant. After a case is resolved, whether at arbitration, in court, or on appeal, the account enters a six-month protection window during which it cannot be challenged again, to prevent harassment. If a miner observes new suspicious behavior during this window, they document it and wait. Once the window expires, they may bring a new case with whatever evidence they have accumulated. In all cases, the burden of proof rests on the challenger. All proceedings are publicly visible on the blockchain. Anyone may observe the process and outcomes, but only those willing to stake points may participate.</p>

            <h2>9. Sample Transactions</h2>
            <p>The following example traces 12 participants over 11 days, each joining at different times and transacting at different rates. To keep the math readable, only Active points are modeled; Supportive and Ambient flows are omitted. Each person receives 1,440 Active points per day. The target Earned balance per person is 14,400.</p>
            <p><strong>Day 1.</strong> Participants A and B join and pay each other their full daily allocation. Each holds 1,440 Earned points. The pre-rebase total is 2,880, but the target (2 x 14,400) is 28,800, so the rebase multiplier is 10. Both balances scale up to 14,400. The multiplier above 1 is expected and temporary.</p>
            <p><strong>Days 2-6.</strong> Participants C through J join gradually. Each new entrant starts with zero Earned points and begins transacting. On Day 6, four participants join in a single day, jumping the count from 6 to 10. The multiplier is 1.43.</p>
            <p><strong>Day 7.</strong> One more participant joins, bringing the total to 11. This is the critical moment: the Earned pool (159,840) has finally grown large enough to exceed the new target (158,400). The multiplier drops below 1 for the first time, to 0.991. From this point forward, the rebase compresses balances downward on every block. This is the system&apos;s steady state: the number in your account shrinks daily, but so does everyone else&apos;s by the same proportion. Your share of the total pool, and therefore your purchasing power, remains constant.</p>
            <p><strong>Day 11.</strong> All 12 participants are now active and transacting. The multiplier is 0.909. Note that Person L, who joined on Day 8 with nothing, already holds 23,215 points and is accumulating rapidly, while early joiners A and B are declining from their Day 8 peaks as the rebase does its work.</p>
            <p>The table below summarizes rebase calculations at key intervals:</p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-ae-warm"><th className="p-3 text-left border border-gray-200 font-semibold">Day</th><th className="p-3 text-left border border-gray-200 font-semibold"># People</th><th className="p-3 text-left border border-gray-200 font-semibold">Total Pre-Rebase</th><th className="p-3 text-left border border-gray-200 font-semibold">Target Total</th><th className="p-3 text-left border border-gray-200 font-semibold">Rebase Multiplier</th></tr></thead>
                <tbody>
                  <tr><td className="p-3 border border-gray-200">1</td><td className="p-3 border border-gray-200">2</td><td className="p-3 border border-gray-200">2,880</td><td className="p-3 border border-gray-200">28,800</td><td className="p-3 border border-gray-200">10.00</td></tr>
                  <tr><td className="p-3 border border-gray-200">6</td><td className="p-3 border border-gray-200">10</td><td className="p-3 border border-gray-200">100,800</td><td className="p-3 border border-gray-200">144,000</td><td className="p-3 border border-gray-200">1.43</td></tr>
                  <tr><td className="p-3 border border-gray-200">7</td><td className="p-3 border border-gray-200">11</td><td className="p-3 border border-gray-200">159,840</td><td className="p-3 border border-gray-200">158,400</td><td className="p-3 border border-gray-200">0.99</td></tr>
                  <tr><td className="p-3 border border-gray-200">11</td><td className="p-3 border border-gray-200">12</td><td className="p-3 border border-gray-200">190,080</td><td className="p-3 border border-gray-200">172,800</td><td className="p-3 border border-gray-200">0.91</td></tr>
                </tbody>
              </table>
            </div>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-ae-warm"><th className="p-3 text-left border border-gray-200 font-semibold">Participant</th><th className="p-3 text-left border border-gray-200 font-semibold">Day 1</th><th className="p-3 text-left border border-gray-200 font-semibold">Day 6</th><th className="p-3 text-left border border-gray-200 font-semibold">Day 7</th><th className="p-3 text-left border border-gray-200 font-semibold">Day 11</th></tr></thead>
                <tbody>
                  <tr><td className="p-3 border border-gray-200">A (joined Day 1)</td><td className="p-3 border border-gray-200">14,400</td><td className="p-3 border border-gray-200">55,568</td><td className="p-3 border border-gray-200">57,921</td><td className="p-3 border border-gray-200">49,462</td></tr>
                  <tr><td className="p-3 border border-gray-200">B (joined Day 1)</td><td className="p-3 border border-gray-200">14,400</td><td className="p-3 border border-gray-200">49,508</td><td className="p-3 border border-gray-200">49,498</td><td className="p-3 border border-gray-200">38,737</td></tr>
                  <tr><td className="p-3 border border-gray-200">C (joined Day 2)</td><td className="p-3 border border-gray-200">--</td><td className="p-3 border border-gray-200">10,265</td><td className="p-3 border border-gray-200">11,599</td><td className="p-3 border border-gray-200">11,827</td></tr>
                  <tr><td className="p-3 border border-gray-200">L (joined Day 8)</td><td className="p-3 border border-gray-200">--</td><td className="p-3 border border-gray-200">--</td><td className="p-3 border border-gray-200">--</td><td className="p-3 border border-gray-200">23,215</td></tr>
                </tbody>
              </table>
            </div>
            <p>Person L joined on Day 8 with zero Earned points. By Day 11, L has accumulated 23,215 Earned points, exceeding early joiners like C. This is because other participants sent L points in exchange for value contributed. Purchasing power accrues to those who provide value, regardless of when they joined. A complete transaction-by-transaction model with all 12 participants across 15 days, including daily rebase calculations, is available in the appendix.</p>

            <h2>10. Attack Vectors and Limitations</h2>
            <p><strong>Sybil attacks.</strong> A single person creating many accounts to harvest multiple daily allocations. The percent-human system mitigates this by requiring each account to independently establish a verification score through three independent miner reviews (see Section 7.1), and the court system provides a mechanism to challenge and close fraudulent accounts. Perfect prevention is unlikely; the goal is to make attacks expensive enough to be unprofitable.</p>
            <p><strong>Miner collusion.</strong> A group of miners conspiring to control jury pools or manipulate verification scores. The random selection of 11 jurors from the full eligible pool makes this expensive: controlling a majority of any given jury requires controlling a significant fraction of all active miners. As the network grows, this attack becomes exponentially more difficult.</p>
            <p><strong>Vouching rings.</strong> Groups of accounts vouching for each other to inflate percent-human scores. Because vouching requires staking a percentage of holdings (not an absolute amount), and because voucher stakes are burned if the vouched account is found fraudulent, the cost of participating in a vouching ring scales with the number of fraudulent accounts being supported.</p>
            <p><strong>Tagging fraud.</strong> Falsely claiming to use products or occupy spaces to redirect Supportive or Ambient points. As IoT and sensor networks mature, automated verification will reduce this vector. In the early system, manual tagging is susceptible to fraud, but participants retain the right to allocate their points as they see fit.</p>
            <p><strong>Death and lost access.</strong> If a participant loses access to their account or dies, their Earned points are effectively removed from circulation. The protocol does not rescue lost accounts. Participants are encouraged to configure inheritance mechanisms such as multi-signature wallets or dead-man switches.</p>

            <h2>11. Conclusion</h2>
            <p>The Alignment Economy is a peer-to-peer electronic cash system built on a blockchain, designed for daily transactions rather than speculation. It uses daily point allocations tied to human attention to reduce first-mover advantage, daily rebasing to support stable purchasing power, and a proof-of-human mining model to uphold network integrity. A hardcoded 0.5% transaction fee funds the miner ecosystem. A court and arbitration system, in which all participants stake capital on their claims, defends the integrity of human verification transparently.</p>
            <p>Beyond solving the Bitcoin paradoxes, the Alignment Economy makes three things visible that every previous monetary system has ignored. First, historically uncompensated work becomes economically visible: for example, a stay-at-home parent receives their own daily Active allocation, generating measurable economic activity. Second, Supportive points reward durability over disposability, creating a structural advantage for manufacturers who optimize for longevity and repairability over replacement cycles. Third, Ambient points can replace traditional taxation with a usage-based model: a city that attracts residents because its infrastructure works earns more than one that does not, creating a direct feedback loop between governance quality and funding.</p>
            <p>Large transitions in how the world works happen slowly, then all at once. For centuries, horses were humanity&apos;s primary engine of distance. The automobile didn&apos;t replace them overnight. It took decades of iteration, infrastructure, and cultural shift before the advantages became undeniable. And then there was no going back, not because anyone mandated it, but because a better system had arrived.</p>
            <p>Our economic system is at a similar inflection point. For most of recorded history, societies have relied on centralized currencies, systems that always, eventually, lost their value. Bitcoin proved that decentralized value transfer is possible. The Alignment Economy is the next step: a system built from the start for daily human transactions, one that measures what actually matters. Once the advantages become undeniable, there will be no return. The structural case for change is clear, the tools to build it now exist, and global circumstances require it.</p>
          </div>
        </article>

        {/* Download CTA */}
        <section className="py-12 px-6 bg-ae-warm">
          <div className="max-w-2xl mx-auto text-center">
            <a href="/Alignment_Economy_White_Paper.docx" download className="inline-block bg-ae-teal text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-ae-teal-light transition-colors">
              Download White Paper (.docx)
            </a>
            <div className="mt-4">
              <a href="/AE_Math_Model.xlsx" download className="inline-block border-2 border-ae-teal text-ae-teal px-6 py-3 rounded-full text-sm font-medium hover:bg-ae-teal hover:text-white transition-colors">
                Download Math Model (.xlsx)
              </a>
            </div>
          </div>
        </section>
      </main>
      <SubpageFooter />

      <style jsx>{`
        .prose-ae h2 { font-family: Georgia, serif; font-size: 1.75rem; font-weight: 700; color: #1b2a4a; margin-top: 2.5rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #f0f0f0; }
        .prose-ae h3 { font-family: Georgia, serif; font-size: 1.25rem; font-weight: 700; color: #1b2a4a; margin-top: 2rem; margin-bottom: 0.75rem; }
        .prose-ae p { color: #2d3748; line-height: 1.8; margin-bottom: 1rem; font-size: 0.95rem; }
        .prose-ae ol { color: #2d3748; line-height: 1.8; margin-bottom: 1rem; padding-left: 1.5rem; font-size: 0.95rem; }
        .prose-ae li { margin-bottom: 0.5rem; }
        .prose-ae strong { color: #1b2a4a; }
      `}</style>
    </>
  );
}
