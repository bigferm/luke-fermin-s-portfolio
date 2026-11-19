import { CpaSectionInfo, StarPrompt, TechnicalQuestion } from '../types/editorial';

export const STAR_PROMPTS: StarPrompt[] = [
  {
    id: 'star-discrepancy-deadline',
    roleTrack: 'Big 4 Audit & Corporate Accounting',
    question:
      'Tell me about a time you caught a data error or discrepancy while working under a tight deadline.',
    whatInterviewersTest:
      'Attention to detail, ownership without blaming teammates, and calm escalation.',
    modelStar: {
      situation:
        'During my sophomore-year student investment fund pitch, our team was finalizing a 3-statement retail model four hours before presenting to alumni judges.',
      task:
        'As the accounting lead, I was responsible for verifying that historical working capital ties matched the company’s Form 10-K before locking our DCF valuation.',
      action:
        'While running a balance sheet check, I noticed Cash Flow from Operations didn’t tie to the change in Accounts Payable by $42M. Instead of forcing a plug, I traced the 10-K lease footnote and discovered my teammate had included Finance Lease liabilities inside operating working capital. I separated the debt-like lease line, updated the WACC debt weighting, and walked the team through the corrected bridge in 20 minutes.',
      result:
        'Our revised implied share price moved by 6%, our model passed the alumni Q&A with zero technical errors, and the club adopted my balance-sheet tie-out checklist for all 12 sector teams.',
    },
    redFlag:
      'Avoid saying "I fixed my teammate’s dumb mistake." Frame errors around process checks and collaborative verification.',
  },
  {
    id: 'star-disagreement-analysis',
    roleTrack: 'Investment Banking & Equity Research',
    question:
      'Describe a time you disagreed with a teammate or manager on an analytical approach. How did you resolve it?',
    whatInterviewersTest:
      'Intellectual humility, data-driven persuasion, and ability to preserve team momentum.',
    modelStar: {
      situation:
        'In my corporate finance capstone case competition, our 4-person group had to recommend whether a regional grocer should fund expansion via debt or equity.',
      task:
        'My co-analyst wanted to use a static 10-year historical average EBITDA margin, which ignored recent wage inflation and pushed our model toward aggressive leverage.',
      action:
        'Rather than debating in the abstract, I built a two-tab sensitivity comparison: one using his historical margin and another using trailing-12-month store-level unit economics with a 150 bps labor sensitivity. I walked him through the interest coverage breach under a mild recession scenario and proposed blending a 60% term loan / 40% retained cash structure.',
      result:
        'He agreed once he saw the fixed-charge coverage ratio drop below 1.5x in the downside case. Our balanced financing structure won 2nd place out of 28 teams, and judges praised our downside stress test.',
    },
    redFlag:
      'Never tell a story where you "won" simply because you pulled rank or stayed silent to avoid conflict.',
  },
  {
    id: 'star-leadership-ambiguity',
    roleTrack: 'Management Consulting & Advisory',
    question:
      'Tell me about a time you stepped up to lead a team or project without having formal authority.',
    whatInterviewersTest:
      'Structured problem-solving, stakeholder alignment, and initiative under ambiguity.',
    modelStar: {
      situation:
        'Two weeks into a pro-bono consulting engagement for a local nonprofit theater, our project stalled because the client’s board had three conflicting goals and no assigned project lead on our student team.',
      task:
        'I needed to create structure so our 5-person team could deliver actionable pricing and donor-retention recommendations in six weeks.',
      action:
        'I drafted a one-page issue tree breaking the nonprofit’s shortfall into Ticket Yield, Utilization, and Recurring Donors, then scheduled a 20-minute alignment call with the Executive Director. Once she prioritized donor retention and off-peak pricing, I assigned clear workstreams with Friday 15-minute check-ins.',
      result:
        'We delivered a 14-page deck on schedule; the theater implemented our tiered Tuesday pricing pilot, raising off-peak seat occupancy by 19% over the next quarter.',
    },
    redFlag:
      'Don’t spend 70% of your answer describing the organization’s backstory—dedicate half your words to your concrete Actions.',
  },
  {
    id: 'star-rapid-learning',
    roleTrack: 'FP&A, Tax & Advisory Internships',
    question:
      'Give an example of when you had to learn a complex technical tool or standard quickly to deliver results.',
    whatInterviewersTest:
      'Coachability, resourcefulness, and speed-to-competence on unfamiliar software or rules.',
    modelStar: {
      situation:
        'In week two of my summer accounting internship at a mid-sized manufacturing firm, the senior tax accountant went on unexpected medical leave right before quarterly state sales-tax filings.',
      task:
        'My controller asked me to reconcile nexus thresholds across 14 states using an unfamiliar Power Query + NetSuite export workflow within 48 hours.',
      action:
        'I spent the first evening reading the prior quarter’s audit trail notes and practicing Power Query unpivot joins on a sandbox copy. To avoid silent errors, I built cross-footing checks against the Trial Balance revenue accounts and scheduled a 10-minute midpoint check-in with the controller to validate my state-by-state apportionment logic.',
      result:
        'All 14 state reconciliations cleared review with zero adjustments three hours before the filing deadline, and my documented Power Query guide became the onboarding template for fall co-ops.',
    },
    redFlag:
      'Saying "I just Googled it and figured it out" misses the opportunity to highlight validation checks and smart mentor check-ins.',
  },
];

export const TECHNICAL_QUESTIONS: TechnicalQuestion[] = [
  {
    id: 'tech-fin-3stmt-depr',
    track: 'finance',
    trackLabel: 'Finance & IB',
    difficulty: 'Core',
    question:
      'Walk me through the three financial statements if Depreciation increases by $10 (assume a 25% tax rate).',
    answer:
      'Income Statement: Operating Income (EBIT) decreases by $10. At a 25% tax rate, Taxes drop by $2.50, so Net Income falls by $7.50. Cash Flow Statement: Start with Net Income (-$7.50), add back non-cash Depreciation (+$10.00), leaving Cash Flow from Operations up +$2.50 (the tax shield). Ending Cash increases by +$2.50. Balance Sheet: Cash is up +$2.50, Net PP&E is down -$10.00 (total Assets down -$7.50); Retained Earnings is down -$7.50 via Net Income. Both sides balance at -$7.50.',
    keyFormulaOrRule: 'Tax Shield = ΔDepreciation × Tax Rate = $10 × 25% = +$2.50 Cash',
    followUpTrap:
      'Interviewer follow-up: "What happens if it’s Amortization of an intangible asset instead?" Identical mechanics if tax-deductible; if non-tax-deductible (like book-only amortization in some M&A deals), there is no cash tax shield unless a DTL reverses.',
  },
  {
    id: 'tech-fin-ev-bridge',
    track: 'finance',
    trackLabel: 'Finance & IB',
    difficulty: 'Core',
    question:
      'How do you bridge from Equity Value to Enterprise Value, and why do you subtract Cash?',
    answer:
      'Enterprise Value = Equity Value + Total Debt + Preferred Stock + Noncontrolling (Minority) Interest - Cash & Marketable Securities. You subtract Cash because if an acquirer buys 100% of a company’s equity and assumes its debt, the target’s existing cash sits inside the business and effectively reduces the net purchase price of the core operating assets.',
    keyFormulaOrRule: 'EV = Equity Value + Debt + Preferred + NCI - Cash',
    followUpTrap:
      'Why do we ADD Noncontrolling Interest? Because consolidated EBITDA/Revenue includes 100% of a majority-owned subsidiary, so the numerator (EV) must also reflect 100% of the subsidiary’s value for an apples-to-apples multiple.',
  },
  {
    id: 'tech-fin-wacc-leverage',
    track: 'finance',
    trackLabel: 'Finance & IB',
    difficulty: 'Advanced',
    question:
      'In a DCF, why do we unlever and relever peer Betas, and what happens to WACC as a company adds moderate debt?',
    answer:
      'Peer companies have different capital structures, and financial leverage amplifies equity volatility. We unlever each peer’s observed equity beta to isolate pure business/operating risk, take the peer median unlevered beta, and relever it to our target company’s debt-to-equity ratio. Adding moderate debt generally lowers WACC because debt is cheaper than equity (senior claim) and interest is tax-deductible—up to the point where financial distress costs raise both Kd and Ke.',
    keyFormulaOrRule: 'β_U = β_L / [1 + (1 - T) × (D/E)]',
    followUpTrap:
      'Never use Book Value of Debt/Equity if Market Value is available—and remember that WACC uses target capital structure weights, not arbitrary historical book weights.',
  },
  {
    id: 'tech-fin-accretion-dilution',
    track: 'finance',
    trackLabel: 'Finance & IB',
    difficulty: 'Advanced',
    question:
      'In an all-stock M&A acquisition, how can you tell immediately whether the deal is accretive or dilutive to EPS?',
    answer:
      'Compare the acquirer’s P/E multiple to the target’s Purchase P/E multiple (assuming no synergies or transaction adjustments). If the acquirer’s P/E is HIGHER than the target’s Purchase P/E, the deal is accretive—because the acquirer is effectively issuing expensive stock (lower earnings yield) to buy cheaper earnings (higher earnings yield).',
    keyFormulaOrRule: 'All-Stock Rule: Buyer P/E > Target Purchase P/E → Accretive (before synergies)',
    followUpTrap:
      'In an all-cash deal, compare the after-tax cost of debt (or foregone after-tax interest on cash) against the target’s Earnings Yield (E/P).',
  },
  {
    id: 'tech-acct-asc606',
    track: 'accounting',
    trackLabel: 'Accounting & Audit',
    difficulty: 'Core',
    question: 'Walk me through the 5-step revenue recognition model under ASC 606.',
    answer:
      '1) Identify the contract(s) with a customer. 2) Identify the separate performance obligations in the contract. 3) Determine the transaction price (including variable consideration). 4) Allocate the transaction price to each performance obligation based on standalone selling prices (SSP). 5) Recognize revenue when (point in time) or as (over time) the entity satisfies each performance obligation by transferring control.',
    keyFormulaOrRule: 'Contract → Obligations → Price → Allocate (SSP) → Recognize on Control Transfer',
    followUpTrap:
      'For SaaS bundles (software license + 24-month customer support), you cannot dump 100% of revenue on Day 1 unless the license has standalone functionality and SSP is properly allocated between upfront license and ratable support.',
  },
  {
    id: 'tech-acct-dta-dtl',
    track: 'accounting',
    trackLabel: 'Accounting & Audit',
    difficulty: 'Core',
    question:
      'What creates a Deferred Tax Liability (DTL) versus a Deferred Tax Asset (DTA), and give one real-world example of each.',
    answer:
      'Deferred taxes arise from temporary differences between GAAP book income and IRS taxable income. A DTL occurs when GAAP income exceeds taxable income today—meaning you pay less tax now and owe more later (classic example: MACRS accelerated tax depreciation vs. GAAP straight-line depreciation). A DTA occurs when taxable income exceeds GAAP income today—you prepay tax now and receive future tax relief (examples: warranty accruals, bad debt allowance, or Net Operating Losses).',
    keyFormulaOrRule: 'Book Expense < Tax Deduction → DTL | Book Expense > Tax Deduction → DTA',
    followUpTrap:
      'Permanent differences—such as municipal bond interest or nondeductible executive compensation/penalties—affect the Effective Tax Rate but NEVER create DTAs or DTLs.',
  },
  {
    id: 'tech-acct-audit-risk',
    track: 'accounting',
    trackLabel: 'Accounting & Audit',
    difficulty: 'Core',
    question:
      'Explain the Audit Risk Model and how an auditor responds if Control Risk is assessed at Maximum.',
    answer:
      'Audit Risk = Inherent Risk × Control Risk × Detection Risk (AR = IR × CR × DR). Audit Risk is the risk of issuing an unmodified opinion on materially misstated financial statements. Because IR and CR exist independently of the auditor, if Control Risk is assessed as high (or maximum, meaning controls aren’t relied upon), the auditor must lower acceptable Detection Risk by expanding substantive testing—larger sample sizes, testing closer to year-end, and using more reliable external evidence.',
    keyFormulaOrRule: 'AR = IR × CR × DR  ⇒  High CR requires Lower DR (More Substantive Testing)',
    followUpTrap:
      'Know the difference between tests of controls (determining whether a control operated effectively) and substantive tests of details (verifying dollar balances).',
  },
  {
    id: 'tech-cons-profitability',
    track: 'consulting',
    trackLabel: 'Consulting Cases',
    difficulty: 'Core',
    question:
      'A mid-market client’s revenue grew 14% year-over-year, yet net margins fell from 12% to 7%. How do you structure your case diagnosis?',
    answer:
      'Decompose Profit = Revenue (Price × Volume × Product Mix) - Costs (Fixed + Variable). Because top-line grew 14%, immediately test two hypotheses: (1) Mix Shift—did growth come from a lower-margin product line or discounted enterprise tier? (2) Cost Inflation—did Variable COGS per unit (freight, raw materials, returns) or Fixed Overhead (headcount, facility leases, customer acquisition cost) outpace revenue growth? Ask for segmented margin by product and customer cohort.',
    keyFormulaOrRule: 'Profit = Σ(P_i - VC_i) × Q_i - Fixed Costs',
    followUpTrap:
      'Never jump straight to "cut headcount." Check whether gross margin declined first (COGS/pricing issue) or operating margin declined while gross margin held steady (SG&A/fixed overhead issue).',
  },
  {
    id: 'tech-cons-market-sizing',
    track: 'consulting',
    trackLabel: 'Consulting Cases',
    difficulty: 'Core',
    question:
      'What is the cleanest way to structure a Bottom-Up Market Sizing question and avoid a 10x error?',
    answer:
      'Start from the smallest observable demand unit (households, commuters, small businesses, or hospital beds) rather than broad top-down GDP percentages. Segment the population into 2–3 logical behavioral tiers (e.g., heavy/medium/light users), apply frequency and average ticket price, and ALWAYS run a quick sanity check (e.g., implied market share per store or annual spend per capita) before stating your final figure.',
    keyFormulaOrRule: 'Market Size = Target Units × Adoption % × Annual Frequency × Avg Price',
    followUpTrap:
      'Don’t forget replacement cycles for durable goods (e.g., replacing a laptop every 4 years means annual unit demand is Installed Base ÷ 4, not 100% of owners buying yearly).',
  },
  {
    id: 'tech-cons-unit-economics',
    track: 'consulting',
    trackLabel: 'Consulting Cases',
    difficulty: 'Advanced',
    question:
      'How do you evaluate whether a subscription business is ready to scale paid acquisition using LTV:CAC and Payback Period?',
    answer:
      'Compute Customer Lifetime Value using Gross Margin—never raw revenue: LTV = (ARPU × Gross Margin %) ÷ Monthly Churn Rate. Compare LTV against fully loaded Customer Acquisition Cost (Sales + Marketing spend ÷ New Customers). Healthy benchmarks target LTV:CAC ≥ 3.0x and a CAC Payback Period under 12–18 months so growth doesn’t starve working capital.',
    keyFormulaOrRule: 'LTV = (ARPU × Gross Margin %) / Churn Rate',
    followUpTrap:
      'Forgetting Gross Margin in LTV is the #1 consulting/growth-equity blunder—a company with 40% gross margins cannot spend revenue-equivalent LTV on ads.',
  },
];

export const CPA_SECTIONS: CpaSectionInfo[] = [
  {
    code: 'FAR',
    group: 'Core',
    title: 'Financial Accounting & Reporting',
    recommendedHours: 130,
    passRateContext: 'Core Section · Historically lowest pass rate (~40–44%); master journal entries first.',
    blueprintAreas: [
      { name: 'Financial Reporting & Disclosures (IFRS/US GAAP, NFP, Gov)', weight: '30–40%' },
      { name: 'Select Balance Sheet Accounts (AR, Inventory, PP&E, Leases, Bonds)', weight: '30–40%' },
      { name: 'Select Transactions (ASC 606, Income Taxes, Consolidations, Cash Flows)', weight: '25–35%' },
    ],
    mnemonics: [
      {
        title: 'CAR IN BIG',
        rule: 'Consolidation Eliminating Entry',
        detail:
          'Debit Common Stock, APIC, Retained Earnings of Sub + Investment Differential (Identifiable assets + Goodwill); Credit Investment in Sub & Noncontrolling Interest.',
      },
      {
        title: 'GRaSPP SE CIPPOE',
        rule: 'Governmental Fund Accounting',
        detail:
          'Governmental (Modified Accrual): General, Special Revenue, Debt Service, Capital Projects, Permanent. Proprietary & Fiduciary (Full Accrual): Internal Service, Enterprise / Custodial, Investment Trust, Private-Purpose, Pension.',
      },
      {
        title: 'PUFE',
        rule: 'Other Comprehensive Income (OCI) Items',
        detail:
          'Pension adjustments, Unrealized gains/losses on Available-for-Sale debt securities, Foreign currency translation adjustments, Effective portion of cash flow hedges.',
      },
    ],
    tbsStrategy:
      'Read the exhibits in reverse order of length: open the instruction prompt first, map out the T-account or amortization schedule on scratch paper, and watch signs (negative vs. positive) carefully in Cash Flow simulations.',
    checklistTopics: [
      'ASC 606 5-Step Revenue & Contract Assets/Liabilities',
      'ASC 842 Operating vs. Finance Lease Amortization',
      'Effective-Interest Bond Premium / Discount Amortization',
      'Statement of Cash Flows (Indirect & Direct Methods)',
      'Consolidations & Intercompany Profit Eliminations',
      'Governmental Modified Accrual vs. Government-Wide Reconciliation',
    ],
  },
  {
    code: 'AUD',
    group: 'Core',
    title: 'Auditing & Attestation',
    recommendedHours: 95,
    passRateContext: 'Core Section · Requires reading every modifier ("most likely", "least likely", "except").',
    blueprintAreas: [
      { name: 'Ethics, Independence & General Principles', weight: '15–25%' },
      { name: 'Assessing Risk & Developing a Planned Response', weight: '25–35%' },
      { name: 'Performing Further Procedures & Obtaining Evidence', weight: '30–40%' },
      { name: 'Forming Conclusions & Reporting (Issuers vs. Nonissuers)', weight: '15–25%' },
    ],
    mnemonics: [
      {
        title: 'COVERU',
        rule: 'Balance & Transaction Assertions',
        detail:
          'Completeness, Cutoff, Valuation/Allocation, Existence/Occurrence, Rights & Obligations, Understandability/Classification.',
      },
      {
        title: 'Trace vs. Vouch',
        rule: 'Direction of Audit Testing',
        detail:
          'Trace Forward (Source Document → Ledger) tests COMPLETENESS (understatement). Vouch Backward (Ledger → Source Document) tests EXISTENCE / OCCURRENCE (overstatement).',
      },
      {
        title: 'SSARS vs. SSAE',
        rule: 'Non-Audit Engagements',
        detail:
          'SSARS covers historical financial statements (Preparation, Compilation, Review). SSAE covers everything else (Examination, Review, Agreed-Upon Procedures on prospective or sustainability info).',
      },
    ],
    tbsStrategy:
      'For Risk & Control TBS problems, always map the specific assertion at risk (e.g., Existence of Revenue) directly to the matching substantive procedure before picking an answer.',
    checklistTopics: [
      'AICPA Code of Professional Conduct & PCAOB Independence',
      'Audit Risk Model & Materiality Allocation',
      'Transaction Cycles (Revenue/AR, Expenditure/AP, Inventory)',
      'Sampling (Attribute vs. Monetary Unit Sampling / Variables)',
      'Audit Report Modifications (Qualified, Adverse, Disclaimer)',
      'SSARS Compilation & Review vs. PCAOB Integrated Audits',
    ],
  },
  {
    code: 'REG',
    group: 'Core',
    title: 'Taxation & Regulation',
    recommendedHours: 100,
    passRateContext: 'Core Section · Basis rules across S-Corps, Partnerships, and C-Corps decide most TBS.',
    blueprintAreas: [
      { name: 'Ethics, Professional Responsibilities & Federal Tax Procedures', weight: '10–20%' },
      { name: 'Business Law (Contracts, Agency, Debtor-Creditor)', weight: '15–25%' },
      { name: 'Federal Taxation of Property Transactions', weight: '5–15%' },
      { name: 'Federal Taxation of Individuals & Entities', weight: '50–65%' },
    ],
    mnemonics: [
      {
        title: 'D-E-B-T Basis Rule',
        rule: 'Partnership vs. S-Corp Debt Basis',
        detail:
          'Partners get outside basis for their share of partnership recourse and nonrecourse debt. S-Corp shareholders ONLY get debt basis for direct loans made personally by the shareholder to the S-Corp—NOT third-party bank loans.',
      },
      {
        title: 'WRAPS',
        rule: 'Circular 230 & Preparer Penalties',
        detail:
          'Watch substantial authority (>40%) vs. reasonable basis (>20% with Form 8275 disclosure) when advising on uncertain tax positions.',
      },
      {
        title: 'MACRS Conventions',
        rule: 'Mid-Year, Mid-Quarter & Mid-Month',
        detail:
          'Personalty defaults to Mid-Year unless >40% of depreciable personalty is placed in service in Q4 (triggers Mid-Quarter). Real property always uses Mid-Month.',
      },
    ],
    tbsStrategy:
      'Build a standard 4-column basis tracker (Beg Basis + Income/Contributions - Distributions - Losses = End Basis) on every entity TBS; remember distributions reduce basis BEFORE losses.',
    checklistTopics: [
      'Individual Gross Income, Adjustments & Itemized Limits',
      'Section 179, Bonus Depreciation & MACRS Conventions',
      'Like-Kind Exchanges (§1031) & Related-Party Loss Rules',
      'C-Corp Formation (§351), Dividends Received Deduction & M-1',
      'Partnership Inside vs. Outside Basis & Nonliquidating Distributions',
      'Business Law: UCC Sales, Agency Authority & Bankruptcy Priority',
    ],
  },
  {
    code: 'BAR',
    group: 'Discipline',
    title: 'Business Analysis & Reporting',
    recommendedHours: 85,
    passRateContext: 'Discipline · Best for future Big 4 Assurance, Technical Accounting, and Finance/IB tracks.',
    blueprintAreas: [
      { name: 'Business Analysis (Cost, Financial Ratios, FP&A)', weight: '40–50%' },
      { name: 'Technical Accounting & Reporting (Derivatives, R&D, Govt)', weight: '35–45%' },
      { name: 'State & Local Governments (CAFR / ACFR)', weight: '10–20%' },
    ],
    mnemonics: [
      {
        title: 'WACC & CAPM',
        rule: 'Corporate Valuation Core',
        detail:
          'Cost of Equity = Rf + β(Rm - Rf). Always weight Debt and Equity using Market Values and multiply Cost of Debt by (1 - Tax Rate).',
      },
      {
        title: 'PURE Variance Grid',
        rule: 'Direct Material & Labor Variances',
        detail:
          'Price Variance = (Actual Price - Standard Price) × Actual Qty. Usage/Efficiency Variance = (Actual Qty - Standard Qty Allowed) × Standard Price.',
      },
    ],
    tbsStrategy:
      'Expect multi-exhibit variance analysis and technical lease/hedge accounting simulations—set up clean Excel formulas inside the exam spreadsheet tool rather than manual calculator entry.',
    checklistTopics: [
      'Prospective Financial Statements & Sensitivity Modeling',
      'Cost Accounting Variances & Contribution Margin',
      'Derivatives, Fair Value vs. Cash Flow Hedges',
      'Business Combinations & Pushdown Accounting',
      'State & Local Government ACFR Preparation',
    ],
  },
  {
    code: 'ISC',
    group: 'Discipline',
    title: 'Information Systems & Controls',
    recommendedHours: 80,
    passRateContext: 'Discipline · Highest pass rate among Disciplines; ideal for Risk Advisory & IT Audit.',
    blueprintAreas: [
      { name: 'Information Systems & Data Management', weight: '35–45%' },
      { name: 'Security, Confidentiality & Privacy (SOC 1 / SOC 2)', weight: '35–45%' },
      { name: 'Considerations for SOC Engagements', weight: '15–25%' },
    ],
    mnemonics: [
      {
        title: 'SOC 1 vs. SOC 2',
        rule: 'Service Organization Controls',
        detail:
          'SOC 1 covers controls relevant to user entities’ ICFR (financial reporting); restricted to user entities & their auditors. SOC 2 covers AICPA Trust Services Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy).',
      },
      {
        title: 'Type 1 vs. Type 2',
        rule: 'Point-in-Time vs. Period of Time',
        detail:
          'Type 1 reports on design & implementation at a specific date. Type 2 reports on design AND operating effectiveness over a period of time (typically 6–12 months).',
      },
    ],
    tbsStrategy:
      'Focus on SQL query logic (SELECT, JOIN, GROUP BY), primary/foreign key normalization, and identifying missing IT General Controls (change management vs. logical access).',
    checklistTopics: [
      'COSO & COBIT Governance Frameworks',
      'Relational Database Normalization & SQL Joins',
      'IT General Controls (Logical Access, Change Mgmt, Backups)',
      'SOC 1 vs. SOC 2 (Type 1 & Type 2) Reporting',
      'Cybersecurity Incident Response & Encryption Basics',
    ],
  },
  {
    code: 'TCP',
    group: 'Discipline',
    title: 'Tax Compliance & Planning',
    recommendedHours: 85,
    passRateContext: 'Discipline · Natural follow-up right after passing REG Core.',
    blueprintAreas: [
      { name: 'Tax Compliance & Planning for Individuals & Personal Financial Planning', weight: '30–40%' },
      { name: 'Entity Tax Compliance (S-Corp, Partnership, C-Corp)', weight: '30–40%' },
      { name: 'Entity Tax Planning & Property Transactions', weight: '25–35%' },
    ],
    mnemonics: [
      {
        title: 'Liquidating vs. Nonliquidating',
        rule: 'Partnership Property Distributions',
        detail:
          'Nonliquidating distribution: partner takes carryover basis (limited to outside basis). Liquidating distribution: partner’s ending outside basis is allocated across distributed assets so outside basis zeroes out.',
      },
      {
        title: '§1231 Lookback Rule',
        rule: '5-Year Non-Recaptured Losses',
        detail:
          'Net §1231 gains are normally taxed at favorable LTCG rates—EXCEPT to the extent of unrecaptured net §1231 losses from the prior 5 tax years (which recharacterize gain as ordinary).',
      },
    ],
    tbsStrategy:
      'Pair TCP directly after REG while entity basis, §1245/§1250 depreciation recapture, and gift/estate annual exclusion rules are fresh.',
    checklistTopics: [
      'Tax Loss Harvesting, Wash Sales & QSBS (§1202)',
      'Retirement Plan Limits (401k, SEP, Solo, Roth Conversions)',
      'Entity Choice Optimization (QBI §199A & SE Tax)',
      'S-Corp Built-In Gains Tax & Excess Passive Income',
      'Gift & Estate Valuation, Annual Exclusion & Basis Step-Up',
    ],
  },
];
