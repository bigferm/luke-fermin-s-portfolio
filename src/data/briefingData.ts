import { BriefingArticle, MarketMetric } from '../types/editorial';

export const EDITION_META = {
  issueNumber: 'Vol. IV · No. 214',
  dateLabel: 'Wednesday, November 18, 2026',
  readTime: '6 min daily scroll',
  editorNote:
    'Built for accounting, finance, and consulting students prepping for campus recruiting and the CPA exam.',
};

export const MARKET_METRICS: MarketMetric[] = [
  {
    id: 'sp500',
    label: 'S&P 500 Index',
    value: '5,982.40',
    delta: '+0.64%',
    direction: 'up',
    context: 'Equal-weight breadth widens',
    interviewNote:
      'Valuation Check: With the S&P 500 trading around 21.4x forward P/E, equity research interviewers expect you to distinguish multiple expansion from real EPS margin growth.',
  },
  {
    id: 'us10y',
    label: '10Y US Treasury',
    value: '4.28%',
    delta: '-4 bps',
    direction: 'down',
    context: 'Risk-free rate anchor',
    interviewNote:
      'DCF & WACC Anchor: A 50 bps move in the 10-year Treasury directly shifts your CAPM cost of equity and compresses or expands terminal value in every banking case.',
  },
  {
    id: 'sofr',
    label: 'SOFR Overnight',
    value: '4.58%',
    delta: 'Unchanged',
    direction: 'neutral',
    context: 'Floating debt benchmark',
    interviewNote:
      'Leveraged Finance: Leveraged loans and revolving credit facilities price off Term SOFR plus a spread (e.g., SOFR + 325 bps), making interest coverage ratios critical.',
  },
  {
    id: 'hysa',
    label: 'Top HYSA Yield',
    value: '4.35%',
    delta: 'APY',
    direction: 'up',
    context: 'Student cash wellness',
    interviewNote:
      'Personal Liquidity Math: Parking a 3-month post-grad emergency fund in a 4.35% FDIC-insured HYSA beats a 0.01% checking account while keeping cash liquid before signing bonuses settle.',
  },
];

export const LEAD_STORY: BriefingArticle = {
  id: 'lead-fasb-dise-2024-03',
  category: 'standards',
  categoryLabel: 'GAAP & FASB Spotlight',
  standardRef: 'FASB ASU 2024-03 · ASC 220-40',
  headline: 'Inside FASB’s Expense Disaggregation Rule: No More Hiding Inside SG&A',
  deck: 'Public companies must now peel back the curtain on Cost of Sales and SG&A footnotes—giving equity analysts, auditors, and finance interns unprecedented visibility into labor, depreciation, and inventory spend.',
  readTime: '4 min read',
  publishedDate: 'Nov 18, 2026',
  image: '/src/assets/images/hero_ledger_editorial_1795061943843.jpg',
  imageCaption:
    'Morning briefing desk: institutional investors have spent years requesting granular SG&A breakdowns inside Form 10-K footnotes.',
  summaryPoints: [
    'FASB Accounting Standards Update 2024-03 (Disaggregation of Income Statement Expenses, or DISE) requires tabular footnote disclosures breaking down five specific natural expense categories.',
    'Companies must separately disclose inventory purchases, employee compensation, depreciation, intangible asset amortization, and depletion embedded in relevant income statement lines.',
    'Auditors face expanded substantive testing over payroll and inventory cost-allocation mappings between COGS and SG&A.',
  ],
  fullBody: [
    'For decades, reading a public company’s income statement felt a bit like ordering a mystery bento box: you saw massive top-line buckets like "Cost of Goods Sold" and "Selling, General & Administrative," but rarely saw how much of SG&A was payroll versus software amortization versus warehouse rent.',
    'Under FASB ASU 2024-03 (codified in ASC 220-40), public business entities must now publish a standardized tabular footnote reconciling major income statement expense captions to five underlying natural costs: purchases of inventory, employee compensation, depreciation, intangible asset amortization, and depletion. Entities must also qualitatively describe any remaining unallocated amounts and disclose total selling expenses.',
    'Why now? Buy-side analysts repeatedly told the Board that without consistent footnote disaggregation, building clean EBITDA bridges or forecasting operating leverage across peers in retail, manufacturing, and SaaS required guesswork. For accounting students, this marks one of the biggest presentation overhauls since ASC 842 leases.',
  ],
  accountingOrMarketImpact:
    'No change to total Net Income or EPS, but financial statement footnotes expand significantly. Analysts gain cleaner inputs for Operating Cash Flow modeling, EBITDA add-backs (D&A), and fixed-vs-variable labor cost sensitivity.',
  interviewAngle:
    'If an equity research or Big 4 audit interviewer asks about recent GAAP updates, cite ASU 2024-03 (DISE): explain that it leaves GAAP bottom-line net income untouched while forcing footnote transparency on employee compensation and D&A inside COGS and SG&A.',
};

export const BRIEFING_ARTICLES: BriefingArticle[] = [
  {
    id: 'crypto-fair-value-asu-2023-08',
    category: 'standards',
    categoryLabel: 'GAAP · FASB',
    standardRef: 'ASU 2023-08 · ASC 350-60',
    headline: 'Crypto Assets on Corporate Balance Sheets Finally Move to Fair Value',
    deck: 'Farewell to the asymmetric impairment headache: qualifying digital assets under ASC 350-60 now mark up and down through net income every quarter.',
    readTime: '3 min read',
    publishedDate: 'Nov 18, 2026',
    image: '/src/assets/images/fasb_standards_brief_1795061943762.jpg',
    imageCaption:
      'Codification ASC 350-60 replaces indefinite-lived intangible impairment testing with fair value measurement for in-scope digital assets.',
    summaryPoints: [
      'Previously, companies treated Bitcoin and Ether as indefinite-lived intangibles—forcing impairment write-downs on dips without allowing markups on recoveries.',
      'ASU 2023-08 mandates fair value measurement each reporting period, with unrealized gains and losses flowing directly through Net Income.',
      'Excludes NFTs, wrapped tokens, and issuer-created tokens; requires separate balance sheet line-item presentation.',
    ],
    fullBody: [
      'Before ASU 2023-08, corporate treasurers holding Bitcoin lived under an accounting one-way ratchet. If the price fell for a single afternoon during the quarter, GAAP required an impairment write-down—and even if the token doubled the next week, the carrying value stayed frozen until sold.',
      'Under ASC 350-60, entities now measure qualifying fungible, cryptographically secured assets at fair value under Topic 820 each period. Changes in fair value are recognized directly in Net Income, and crypto assets must be presented separately from other intangible assets on the balance sheet.',
      'On the statement of cash flows, crypto assets received as noncash consideration in the ordinary course of business and converted nearly immediately into cash are classified as operating cash inflows.',
    ],
    accountingOrMarketImpact:
      'Journal Entry Shift: Dr. Crypto Assets / Cr. Unrealized Gain on Crypto Assets (Income Statement) when market price rises—eliminating the permanent downward basis trap.',
    interviewAngle:
      'Great FAR CPA & Corporate Accounting talking point: contrast ASC 350-60 fair value through Net Income (like equity securities under ASC 321) against Available-for-Sale debt securities (unrealized gains/losses in OCI).',
  },
  {
    id: 'pcaob-qc-1000-overhaul',
    category: 'standards',
    categoryLabel: 'PCAOB Audit',
    standardRef: 'PCAOB QC 1000',
    headline: 'PCAOB QC 1000 Raises the Bar on Audit Firm Quality Control & EQCR',
    deck: 'The audit watchdog replaced decades-old quality standards with a risk-based framework demanding formal governance, root-cause remediation, and external accountability.',
    readTime: '4 min read',
    publishedDate: 'Nov 18, 2026',
    summaryPoints: [
      'QC 1000 requires registered accounting firms to design, implement, and annually evaluate a tailored risk-based Quality Control system.',
      'Firms auditing more than 100 issuers annually must establish an independent external oversight function (EQCF) within their governance structure.',
      'Engagement Quality Reviews (AS 1220) gain sharper documentation expectations before audit opinions are released.',
    ],
    fullBody: [
      'Audit deficiencies flagged during annual PCAOB inspection cycles often trace back not to one missed spreadsheet formula, but to firm-wide tone, workload compression, and inconsistent coaching. Enter PCAOB QC 1000.',
      'Replacing legacy AICPA-derived standards adopted back in 2003, QC 1000 mandates continuous risk assessment across ethics, independence, client acceptance, engagement performance, and technology tools (including automated audit analytics).',
      'For incoming campus hires at Big 4 and national firms, this translates into stricter workpaper sign-off timelines, mandatory independence confirmations on personal brokerage accounts, and heightened scrutiny on how AI-assisted sampling tools are validated.',
    ],
    accountingOrMarketImpact:
      'Increases compliance documentation and Engagement Quality Control Review (EQCR) rigor across public company audits; elevates internal inspection testing of firm-wide independence controls.',
    interviewAngle:
      'In Big 4 Audit interviews, referencing PCAOB QC 1000 shows you understand why independence portals and timely workpaper documentation matter from week one as an associate.',
  },
  {
    id: 'fasb-tax-reconciliation-2023-09',
    category: 'standards',
    categoryLabel: 'GAAP · Tax',
    standardRef: 'ASU 2023-09 · ASC 740',
    headline: 'Tax Footnotes Get Sharper: Eight Mandatory Rate Reconciliation Buckets',
    deck: 'Investors no longer have to squint at vague "Other" lines in effective tax rate tables—ASU 2023-09 forces granular state, foreign, and cash-tax disclosures.',
    readTime: '3 min read',
    publishedDate: 'Nov 17, 2026',
    summaryPoints: [
      'Public business entities must present an annual tabular rate reconciliation using both percentages and dollar amounts across eight specific categories.',
      'Any reconciling item equal to or exceeding 5% of statutory expected tax (pre-tax income multiplied by the federal statutory rate) must be separately broken out.',
      'Entities must disaggregate income taxes paid (net of refunds) by federal, state, and foreign jurisdictions.',
    ],
    fullBody: [
      'Understanding why a tech giant pays a 14% effective tax rate when the US federal statutory rate is 21% used to require detective work across dense, inconsistent footnotes.',
      'ASU 2023-09 standardizes the ASC 740 rate reconciliation into eight mandatory buckets—including state and local taxes, foreign tax effects, tax credits, changes in valuation allowances, and nontaxable/nondeductible items—with a strict 5% quantitative threshold for further disaggregation.',
      'In addition, companies must disclose cash income taxes paid broken down by federal, state, and foreign jurisdictions, plus individual jurisdictions exceeding 5% of total cash taxes paid.',
    ],
    accountingOrMarketImpact:
      'Improves forecasting accuracy for effective tax rates (ETR) and cash tax modeling in DCF valuations, especially for multinational corporations exposed to OECD Pillar Two minimum taxes.',
    interviewAngle:
      'Tax & Valuation Tie-In: Explain the difference between book Effective Tax Rate (Income Tax Expense / Pre-Tax Income) and Cash Taxes Paid—and why Deferred Tax Assets/Liabilities bridge the two.',
  },
  {
    id: 'big4-pe-capital-audit-ai',
    category: 'accounting',
    categoryLabel: 'Accounting World',
    headline: 'Private Equity Stakes & Automated Vouching Reshape Entry-Level CPA Careers',
    deck: 'As outside capital flows into top-25 CPA firms and AI tools handle routine invoice matching, junior associates are spending less time ticking PDFs and more time reviewing anomalies.',
    readTime: '4 min read',
    publishedDate: 'Nov 17, 2026',
    summaryPoints: [
      'Alternative practice structures allow PE-backed advisory arms to fund cloud audit platforms while keeping attest services inside CPA-owned partnerships.',
      'Automated transaction matching flags outlier journal entries across 100% of a general ledger rather than relying solely on 25-item judgmental samples.',
      'Entry-level demand is shifting toward students fluent in SQL, Excel Power Query, and control-design skepticism.',
    ],
    fullBody: [
      'Walk into an audit room this busy season and the stereotype of first-year associates manually tying 300 PDF shipping receipts to Excel rows is fading fast. Over the past three years, major accounting firms—fueled in part by private equity investments in mid-tier firms and massive internal tech budgets at the Big 4—have automated bulk vouching and bank confirmation matching.',
      'That does not shrink the need for human judgment; it compresses the routine grunt work and moves new associates straight into exception investigation. Why did revenue spike 18% in the final 48 hours of Q4? Why was a manual top-side journal entry posted on a Sunday?',
      'Meanwhile, alternative practice structures split non-attest tax and consulting units from licensed CPA audit partnerships to comply with state accountancy independence rules—a structural debate every CPA candidate should follow.',
    ],
    accountingOrMarketImpact:
      'Shifts audit risk focus from sample arithmetic errors to IT General Controls (ITGCs) and Information Produced by the Entity (IPE) completeness testing.',
    interviewAngle:
      'Mentioning IPE (completeness and accuracy of client data reports) alongside automated audit analytics immediately signals practical audit readiness in campus interviews.',
  },
  {
    id: 'stocks-capex-vs-fcf',
    category: 'markets-wellness',
    categoryLabel: 'Stocks & Valuation',
    headline: 'Market Watch: Why Analysts Are Obsessing Over CapEx Intensity vs. Free Cash Flow',
    deck: 'Headline GAAP earnings look pristine across mega-cap tech, but surging data-center capital expenditures are compressing Free Cash Flow yields and changing valuation multiples.',
    readTime: '4 min read',
    publishedDate: 'Nov 17, 2026',
    image: '/src/assets/images/markets_wellness_desk_1795061943858.jpg',
    imageCaption:
      'Equity markets increasingly reward Free Cash Flow conversion over pure GAAP net income growth during heavy CapEx cycles.',
    summaryPoints: [
      'Capital expenditures hit the Cash Flow Statement immediately as cash outflows, whereas GAAP Net Income only reflects gradual Depreciation over 4–6 years.',
      'Extending server useful-life assumptions from 4 to 6 years boosts GAAP Operating Income without adding a single dollar of cash.',
      'Quality-of-earnings analysts track FCF Conversion (Free Cash Flow / Net Income) to spot divergence between reported earnings and cash generation.',
    ],
    fullBody: [
      'If you ever needed proof that GAAP Net Income and Free Cash Flow tell two different stories, look at this quarter’s corporate earnings calls. Across hyperscale cloud and industrial automation leaders, revenue and operating margins beat consensus—yet several stocks sold off on CapEx guidance.',
      'Here is the accounting mechanics behind the market reaction: spending $15 billion on servers or manufacturing equipment leaves the bank account immediately under Cash Flows from Investing. On the Income Statement, however, that $15 billion is capitalized on the Balance Sheet and expensed slowly via Depreciation.',
      'Smart equity analysts watch two ratios closely: CapEx as a percentage of Revenue, and Free Cash Flow Conversion (FCF / Net Income). When CapEx surges far ahead of Depreciation, Net Income temporarily outpaces cash reality—making Return on Invested Capital (ROIC) the ultimate scorecard.',
    ],
    accountingOrMarketImpact:
      'FCF = Cash Flow from Operations - CapEx. Stretching asset useful life lowers annual Depreciation Expense and raises GAAP EBIT, while leaving true cash flows unchanged (aside from tax timing).',
    interviewAngle:
      'Classic IB / Equity Research interview question: "If a company extends the useful life of its equipment from 5 to 7 years, what happens to the 3 financial statements?" Answer cleanly and connect it to ROIC.',
  },
  {
    id: 'financial-wellness-grad-liquidity',
    category: 'markets-wellness',
    categoryLabel: 'Financial Wellness',
    headline: 'The New-Grad Liquidity Playbook: 401(k) Match Math, HYSA Buffers & Roth Arbitrage',
    deck: 'Before you buy index funds or aggressively prepay low-rate student loans, lock in the highest-return risk-free moves available to interns and first-year analysts.',
    readTime: '4 min read',
    publishedDate: 'Nov 16, 2026',
    summaryPoints: [
      'Capturing a 100% employer 401(k) match delivers an immediate 100% return on contributed dollars—beating any stock market expectation or debt payoff.',
      'With High-Yield Savings Accounts paying ~4.35% APY, holding 3–6 months of core living expenses earns meaningful risk-free yield before tackling <5% fixed student loans.',
      'Students working summer internships in low marginal tax brackets can compound decades of tax-free growth by funding a Roth IRA with earned income.',
    ],
    fullBody: [
      'Accounting and finance majors spend four years modeling corporate WACC—yet surprisingly few apply capital allocation math to their own first paycheck. Financial wellness in your early twenties boils down to sequencing capital by after-tax risk-adjusted return.',
      'Step 1 is building a starter liquidity buffer ($1,500–$2,500 while in school, scaling to 3–6 months of rent and essentials post-graduation) inside an FDIC-insured High-Yield Savings Account yielding ~4.35% APY. That keeps you from putting car repairs on a 24% APR credit card.',
      'Step 2 is capturing every dollar of an employer 401(k) match. A dollar-for-dollar match up to 4% or 6% of salary is an instant 100% guaranteed return before market compounding even starts. Step 3: weigh high-interest debt (>7% APR) against Roth IRA contributions. When your internship or first-year marginal tax bracket is low, paying tax today on Roth dollars buys decades of tax-free compounding.',
    ],
    accountingOrMarketImpact:
      'Compare after-tax HYSA yield [4.35% x (1 - marginal tax rate)] against fixed student loan interest rates after the student loan interest deduction to optimize cash deployment.',
    interviewAngle:
      'Wealth management and personal financial planning (PFP) interviewers love candidates who frame personal budgeting around opportunity cost, liquidity buffers, and tax-location efficiency.',
  },
  {
    id: 'saas-asc-606-gross-vs-net',
    category: 'accounting',
    categoryLabel: 'Accounting World',
    standardRef: 'ASC 606 · Principal vs. Agent',
    headline: 'SEC Comment Letters Put SaaS Marketplaces on Notice Over Gross vs. Net Revenue',
    deck: 'Reporting $100M in gross platform bookings looks much flashier on an S-1 than $15M in net take-rate fees—unless the SEC asks whether you actually control the service.',
    readTime: '3 min read',
    publishedDate: 'Nov 16, 2026',
    summaryPoints: [
      'Under ASC 606-10-55, a Principal controls the specified good or service before transfer and records Gross revenue; an Agent arranges the transaction and records only Net commission.',
      'SEC staff continue challenging tech platforms that claim Principal status when third-party vendors set pricing and carry fulfillment risk.',
      'Switching from Gross to Net drops top-line revenue dramatically without altering gross profit dollars—sending gross margin percentages soaring.',
    ],
    fullBody: [
      'In venture-backed software and B2B marketplaces, valuation multiples often hinge on Price-to-Sales (EV/Revenue). That creates intense pressure for CFOs to present gross transaction value as GAAP revenue rather than just the platform’s 15% take-rate.',
      'Under ASC 606, the test hinges on control before transfer to the customer—evaluated through three indicators: (1) primary responsibility for fulfilling the promise, (2) inventory risk before or after transfer, and (3) discretion in establishing pricing.',
      'When SEC comment letters force a restatement from Principal (Gross) to Agent (Net), gross profit dollars stay identical—because both Revenue and Cost of Revenue drop by the vendor payout—but top-line revenue shrinks and Gross Margin percentage jumps mathematically.',
    ],
    accountingOrMarketImpact:
      'Gross presentation: $100 Revenue, $85 COGS, $15 Gross Profit (15% margin). Net presentation: $15 Revenue, $0 COGS, $15 Gross Profit (100% margin).',
    interviewAngle:
      'Favorite Big 4 Advisory / Equity Research curveball: "Why would a marketplace switching from gross to net revenue see its gross margin percentage jump from 15% to 100% while EBITDA stays flat?"',
  },
];
