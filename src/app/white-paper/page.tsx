"use client";

import { SubpageNav, SubpageFooter } from "@/components/site-nav";

export default function WhitePaperPage() {
  return (
    <>
      <SubpageNav cta={{ label: "Download .docx", href: "/Alignment_Economy_White_Paper.docx" }} />
      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="py-16 md:py-24 px-6 bg-ae-navy text-white text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-ae-teal text-sm font-medium tracking-wide uppercase mb-4">White Paper</p>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">The Alignment Economy</h1>
            <p className="text-gray-300 text-lg italic">A Usable Peer-to-Peer Electronic Cash System</p>
            <p className="text-gray-400 text-sm mt-4">Matt McCormick</p>
            <p className="text-gray-500 text-xs mt-1 italic">Purpose of this paper: to make the Alignment Economy clear enough for critique and to attract builders who can strengthen it, bring it into the world, and tell the stories required for adoption.</p>
          </div>
        </section>

        {/* Content */}
        <article className="py-12 md:py-20 px-6">
          <div className="max-w-2xl mx-auto prose-ae">
            <h2>Abstract</h2>
            <p>A peer-to-peer electronic cash system can be built on a blockchain where the base unit of currency is human attention rather than computational work or staked capital. Each verified human participant receives a fixed daily allocation of points that expire if unspent, reducing first-mover advantage. A daily rebasing mechanism adjusts all saved balances to support stable purchasing power as the network grows, minimizing deflation/inflation. A percent-human verification system, maintained by a decentralized network of miners focused on proof of human, inhibits bot and duplicate accounts. Miners are compensated through a hardcoded 0.5% transaction fee. An arbitration and court system resolves disputes over whether an account belongs to a real, unique human. The result is a currency designed for daily transactions, not speculation, one that compensates previously invisible contributions such as caregiving, mentorship, and the maintenance of physical spaces.</p>

            <h2>1. Introduction</h2>
            <p>The understood universe is built on four foundational pillars: time, space, matter, and energy. A fifth, often overlooked, is essential to understanding the first four: attention. All we know, have, and do stems from attention's actions with and within the first four. Humans are, in economic terms, units of attention. Each human being has exactly 1,440 minutes of attention per day. That number, the same for every person alive regardless of wealth, birth, or when they joined the network, is the foundation of everything that follows.</p>
            <p>In our current economic system, value (the organization of matter and energy within space and time that benefits attention) is primarily measured and transferred through fiat currency. Fiat systems, including stablecoins, (they are just electronic fiat) are centrally controlled, inflationary by design, and structurally disconnected from actual human contribution. A mother raising children, a neighbor maintaining a community garden, a mentor guiding a young person toward their calling, none of these contributions register in the ledger of fiat economics. In addition, AI and robotic systems now generate economically meaningful output at near-zero marginal cost, further eroding the connection between human labor and economic reward. Fiat increasingly fails to signal who created value and how much value was created. A new monetary system must evolve if society is to remain coherent.</p>
            <p>Bitcoin has been a vital stepping stone, pioneering decentralized consensus (i.e., blockchain). But Bitcoin and its derivatives have encountered two paradoxes that prevent them from functioning as daily currency:</p>
            <p><strong>First-Mover Advantage Paradox.</strong> Early participants acquired a disproportionate share of the supply when Bitcoin was cheap and easy to mine. New entrants must pay dramatically higher prices or compete in capital-intensive mining. For many, this resembles a pyramid scheme more than a new economic system, psychologically discouraging adoption.</p>
            <p><strong>Deflation Paradox.</strong> As Bitcoin's price has risen relative to fiat, holders are incentivized to hoard rather than spend. Having learned the lesson of the infamous Bitcoin pizza transaction, nearly everyone in the space treats the currency as a speculative asset, buying and holding rather than using it for daily purchases. This directly contradicts Bitcoin's stated purpose of creating "a peer-to-peer version of electronic cash."</p>
            <p>Therefore, a new system is needed, one built from the start to solve both paradoxes while addressing the deeper problem underneath: the structural invisibility of the human contributions that hold society together. That system is the Alignment Economy.</p>
            <p>It is not communism; wealth differences persist based on the value each person contributes. It is not capitalism as currently practiced; a daily allocation ensures a floor of economic participation for every verified human. It is something new; a coordination framework designed for an era in which the tools of production are increasingly automated, and the most essential human contributions are those that hold society together.</p>

            <h2>2. Design Requirements</h2>
            <p>The two Bitcoin paradoxes, and the deeper invisibility problem underneath them, point to what any replacement system must do. A universal value exchange system for daily transactions between persons, companies, countries, and even AI/Bots must satisfy five requirements:</p>
            <ol>
              <li><strong>Decentralized control.</strong> No central authority may manipulate the money supply, interest rates, or transaction rules.</li>
              <li><strong>Minimized first-mover advantage.</strong> Late adopters must not be structurally disadvantaged relative to early adopters.</li>
              <li><strong>Stable purchasing power.</strong> Neither inflation nor deflation should erode or artificially increase the value of holdings over time.</li>
              <li><strong>Incentive to transact.</strong> The system must encourage participants to buy and sell goods and services rather than hold the currency hoping its price will rise relative to fiat.</li>
              <li><strong>Visibility of contribution.</strong> The system must make economically visible those contributions (child-rearing, elder care, the creation and maintenance of physical spaces and durable goods, etc.) that fiat currently ignores.</li>
            </ol>

            <h2>3. Daily Point Allocations</h2>
            <p>Each person has 1,440 minutes of attention per day; this attention can be used to consume or contribute value to others. In the Alignment Economy, attention is a quantifiable, tradable asset. Only individuals can receive a daily allocation, not groups such as families, companies, governments, or AI/Bots. These groups (including AI/Bots) may earn and pool points, but only through voluntary transactions with human individuals.</p>
            <p>Points have four categories, each reflecting a different way attention creates and absorbs value.</p>

            <h3>3.1 Active Points</h3>
            <p>Each person receives 1,440 Active points per day. They may be spent however the individual chooses: purchasing goods and services, paying another person for labor, or gifting them to family members. Any unspent Active points expire at the end of the day and are burned by the protocol.</p>
            <p>Point expiration is a mechanism that distinguishes the Alignment Economy from other existing currencies. A billionaire and a minimum-wage worker wake up each morning with the same 1,440 Active points. Accumulated wealth still exists in the form of Earned points, but every participant has a guaranteed daily flow of new purchasing power. Because unspent points vanish, there is no incentive to hoard them. They must be used.</p>
            <p>In practice, most participants will direct their daily Active points toward family/friends, goods, or services. A spouse who sends their 1,440 Active points to a stay-at-home partner has made that partner's caregiving contribution economically visible.</p>

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
              Where: Target Total = Number of participants x 14,400<br />
              Pre-Rebase Total = Sum of all Earned point balances before the day's rebase
            </div>
            <p>The rebase multiplier will briefly exceed 1 during the network's early growth phase, when the Earned pool has not yet reached the target. Once the system reaches even modest scale, the multiplier will consistently fall below 1. From that point forward, the rebase compresses all balances downward each day. The number of points in your account gets smaller, but what those points can buy stays the same. Your share of the total Earned pool, your percentage relative to all other accounts, does not change.</p>
            <p>This mechanism preserves each participant's proportional share of the Earned pool as the network grows, creating structural pressure toward price stability without relying on central control.</p>

            <h2>5. Tagging and Automation</h2>
            <p>In the early Alignment Economy, participants will log their point allocations manually, using QR codes or in-app tagging when purchasing items, entering or leaving locations, or interacting with products. Participants may also set automatic allocations.</p>
            <p>Over time, AI, and Internet-of-Things devices will automate the tagging process. Smart contracts between participants and entities will handle the allocation of Supportive and Ambient points without requiring daily manual intervention. Individuals retain the right to override automatic allocations and redirect their points as they see fit.</p>

            <h2>6. Proof of Human</h2>
            <p>Any payment system that issues daily point allocations must distinguish humans from bots and duplicate accounts. To do this, the Alignment Economy utilizes a non-binary gate: each account carries a percent-human score ranging from 0% to 100%. This score acts as a multiplier on the account's purchasing power. When spending points, the transaction value is discounted by the sender's percent-human score. If a loaf of bread costs 20 points and the buyer is 90% human, they must pay approximately 22.2 points (20 / 0.9) to deliver 20 points of value to the seller.</p>

            <h3>6.1 Verification Evidence Tiers</h3>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-ae-warm"><th className="p-3 text-left border border-gray-200 font-semibold">Tier</th><th className="p-3 text-left border border-gray-200 font-semibold">Max Score</th><th className="p-3 text-left border border-gray-200 font-semibold">Evidence</th></tr></thead>
                <tbody>
                  <tr><td className="p-3 border border-gray-200 font-medium">Tier A: Easy to fake</td><td className="p-3 border border-gray-200">30%</td><td className="p-3 border border-gray-200">Gov ID (15%), Photo/video (10%), Voice (5%), CAPTCHA/behavioral (5%), In-person transaction confirmation (+2.5% each, max 10% per 30-day window)</td></tr>
                  <tr><td className="p-3 border border-gray-200 font-medium">Tier B: Hard to fake</td><td className="p-3 border border-gray-200">80%</td><td className="p-3 border border-gray-200">Biometric data: 60% for first biometric, +15% second, +5% third</td></tr>
                  <tr><td className="p-3 border border-gray-200 font-medium">Tier C: Socially grounded</td><td className="p-3 border border-gray-200">No cap</td><td className="p-3 border border-gray-200">Other verified humans vouch by staking 5%+ of their Earned holdings. Each vouch: +10% human</td></tr>
                </tbody>
              </table>
            </div>

            <h3>6.2 Paths to 100%</h3>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-ae-warm"><th className="p-3 text-left border border-gray-200 font-semibold">Path</th><th className="p-3 text-left border border-gray-200 font-semibold">Combination</th><th className="p-3 text-left border border-gray-200 font-semibold">Who it suits</th></tr></thead>
                <tbody>
                  <tr><td className="p-3 border border-gray-200">Biometrics + institutional + light social</td><td className="p-3 border border-gray-200">1 biometric (60%) + Gov ID (15%) + photo (10%) + 2 vouches (20%) = 105%, capped at 100%</td><td className="p-3 border border-gray-200">Least social effort</td></tr>
                  <tr><td className="p-3 border border-gray-200">Institutional + heavy social</td><td className="p-3 border border-gray-200">Gov ID (15%) + photo (10%) + voice (5%) + 7 vouches (70%) = 100%</td><td className="p-3 border border-gray-200">Avoids biometrics</td></tr>
                  <tr><td className="p-3 border border-gray-200">Fully social</td><td className="p-3 border border-gray-200">10 vouches (100%)</td><td className="p-3 border border-gray-200">Maximum privacy</td></tr>
                </tbody>
              </table>
            </div>

            <h3>6.3 Score Decay and Re-Verification</h3>
            <p>The percent-human score decays by 10% per month if no re-verification activity occurs. Maintaining a high score should be a natural byproduct of participating in the economy. Every confirmed in-person transaction contributes 2.5% back to a participant's score, fully offsetting the monthly decay after five such interactions.</p>

            <h3>6.4 Vouching as Percentage of Holdings</h3>
            <p>When one account vouches for another, the voucher locks a portion of their Earned points. The weight of a vouch is determined by the percentage of the voucher's total holdings, not the absolute number. This ensures that vouching is egalitarian: a poor person's friends can vouch just as effectively as a rich person's.</p>

            <h3>6.5 Data Storage and Privacy</h3>
            <p>No identity document, biometric scan, photograph, or personal record is stored on the Alignment Economy blockchain. When a miner evaluates verification evidence, they record only a cryptographic hash. Raw biometric and identity data is handled at the wallet or terminal level and never transmitted to the protocol. Participants retain full control over their underlying evidence.</p>

            <h2>7. Miners</h2>
            <p>In the Alignment Economy, miners perform proof of human: the ongoing work of verifying that accounts belong to real, unique humans, operating one account, and maintaining the integrity of the blockchain. Miners are compensated from the 0.5% fee applied to every transaction on the network.</p>

            <h3>7.1 Miner Responsibilities</h3>
            <ol>
              <li><strong>Transaction processing.</strong> Facilitate all transactions by maintaining the blockchain ledger.</li>
              <li><strong>Account verification.</strong> Evaluate new accounts and assign an initial percent-human score. Every new account is independently reviewed by a panel of three miners assigned via FIFO queue.</li>
              <li><strong>Ongoing audits.</strong> Monitor accounts for signals of non-human or duplicate behavior. Successful challenges earn bounties.</li>
              <li><strong>Judicial service.</strong> Serve as jurors in formal cases.</li>
            </ol>

            <h3>7.2 Tier Structure</h3>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-ae-warm"><th className="p-3 text-left border border-gray-200 font-semibold">Tier</th><th className="p-3 text-left border border-gray-200 font-semibold">Fee Share</th><th className="p-3 text-left border border-gray-200 font-semibold">Requirements</th></tr></thead>
                <tbody>
                  <tr><td className="p-3 border border-gray-200 font-medium">Tier 1: Node Operators</td><td className="p-3 border border-gray-200">20%</td><td className="p-3 border border-gray-200">Operate a node with 90% uptime. No verification or jury activity required.</td></tr>
                  <tr><td className="p-3 border border-gray-200 font-medium">Tier 2: Validators</td><td className="p-3 border border-gray-200">80%</td><td className="p-3 border border-gray-200">All Tier 1 requirements, plus: 100% jury attendance, FIFO queue verifications, active audits, 80%+ composite accuracy.</td></tr>
                </tbody>
              </table>
            </div>

            <h3>7.3-7.5 Rolling Window, Accuracy, and Rewards</h3>
            <p>All tier evaluations use a 30-day rolling window. Accuracy is measured across verification accuracy (accounts not overturned / total signed) and jury accuracy (votes matching outcome / total votes). The 0.5% transaction fee splits 20% to Tier 1 (equal share) and 80% to Tier 2 (60% lottery winner per block + 40% equal baseline). The lottery uses a verifiable random function (VRF) making solo mining viable.</p>

            <h2>8. Arbitration and Court System</h2>
            <p>When miner audits surface strong signals of non-human or duplicate accounts, a formal dispute resolution process is triggered. Miners stake their own points to open challenges. Defendants have 7 days to respond with additional evidence. If unresolved, a jury of 11 randomly selected Tier 2 miners adjudicates. Successful challenges earn the miner 20% of the condemned account's Earned balance as a bounty. Either side may file one appeal with a new jury.</p>

            <h2>9. Sample Transactions</h2>
            <p>A 12-participant, 11-day simulation demonstrates the rebase in action:</p>
            <div className="overflow-x-auto my-6">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="bg-ae-warm"><th className="p-3 text-left border border-gray-200 font-semibold">Day</th><th className="p-3 text-left border border-gray-200 font-semibold"># People</th><th className="p-3 text-left border border-gray-200 font-semibold">Pre-Rebase Total</th><th className="p-3 text-left border border-gray-200 font-semibold">Target</th><th className="p-3 text-left border border-gray-200 font-semibold">Multiplier</th></tr></thead>
                <tbody>
                  <tr><td className="p-3 border border-gray-200">1</td><td className="p-3 border border-gray-200">2</td><td className="p-3 border border-gray-200">2,880</td><td className="p-3 border border-gray-200">28,800</td><td className="p-3 border border-gray-200">10.00</td></tr>
                  <tr><td className="p-3 border border-gray-200">6</td><td className="p-3 border border-gray-200">10</td><td className="p-3 border border-gray-200">100,800</td><td className="p-3 border border-gray-200">144,000</td><td className="p-3 border border-gray-200">1.43</td></tr>
                  <tr><td className="p-3 border border-gray-200">7</td><td className="p-3 border border-gray-200">11</td><td className="p-3 border border-gray-200">159,840</td><td className="p-3 border border-gray-200">158,400</td><td className="p-3 border border-gray-200">0.99</td></tr>
                  <tr><td className="p-3 border border-gray-200">11</td><td className="p-3 border border-gray-200">12</td><td className="p-3 border border-gray-200">190,080</td><td className="p-3 border border-gray-200">172,800</td><td className="p-3 border border-gray-200">0.91</td></tr>
                </tbody>
              </table>
            </div>
            <p>Person L, who joined on Day 8 with zero points, holds 23,215 Earned points by Day 11, exceeding early joiner C. Purchasing power accrues to those who provide value, regardless of when they joined.</p>

            <h2>10. Attack Vectors and Limitations</h2>
            <p><strong>Sybil attacks:</strong> Mitigated by three-miner review panels, percent-human scoring, and the court/bounty system. Perfect prevention is unlikely; the goal is to make attacks unprofitable.</p>
            <p><strong>Miner collusion:</strong> Random 11-juror selection makes controlling a majority exponentially harder as the network grows.</p>
            <p><strong>Vouching rings:</strong> Percentage-based staking (not absolute amounts) and stake-burning on fraud make collusion costly.</p>
            <p><strong>Tagging fraud:</strong> Will decrease as IoT/sensor automation matures. Individuals retain override rights.</p>
            <p><strong>Death and lost access:</strong> Lost Earned points are effectively removed from circulation. Participants are encouraged to use multi-signature wallets or dead-man switches.</p>

            <h2>11. Conclusion</h2>
            <p>The Alignment Economy is a peer-to-peer electronic cash system built on a blockchain, designed for daily transactions rather than speculation. It uses daily point allocations tied to human attention to reduce first-mover advantage, daily rebasing to support stable purchasing power, and a proof-of-human mining model to uphold network integrity.</p>
            <p>Beyond solving the Bitcoin paradoxes, the Alignment Economy makes three things visible that every previous monetary system has ignored. First, historically uncompensated work becomes economically visible. Second, Supportive points reward durability over disposability. Third, Ambient points can replace traditional taxation with a usage-based model.</p>
            <p>Large transitions in how the world works happen slowly, then all at once. For centuries, horses were humanity's primary engine of distance. The automobile didn't replace them overnight. Our economic system is at a similar inflection point. Bitcoin proved that decentralized value transfer is possible. The Alignment Economy is the next step: a system built from the start for daily human transactions, one that measures what actually matters.</p>
          </div>
        </article>

        {/* Download CTA */}
        <section className="py-12 px-6 bg-ae-warm">
          <div className="max-w-2xl mx-auto text-center">
            <a href="/Alignment_Economy_White_Paper.docx" download className="inline-block bg-ae-teal text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-ae-teal-light transition-colors">
              Download White Paper (.docx)
            </a>
            <div className="mt-6">
              <a href="/about" className="text-ae-teal hover:text-ae-teal-light transition-colors text-sm font-medium">
                ← Back to About
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
