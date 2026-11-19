import { RegulatoryQuestion } from '../types/editorial';

export const REGULATORY_QUIZ: RegulatoryQuestion[] = [
  {
    id: 'q-asu-2024-03-dise',
    category: 'fasb-gaap',
    categoryLabel: 'FASB · GAAP',
    standardCode: 'ASU 2024-03 (ASC 220-40)',
    question:
      'Under FASB ASU 2024-03 (Disaggregation of Income Statement Expenses), which five natural expense categories must public entities break out inside relevant income statement expense captions in the footnotes?',
    options: [
      'Inventory purchases, employee compensation, depreciation, intangible asset amortization, and depletion',
      'Research & development, share-based compensation, lease interest, advertising, and income taxes',
      'Direct materials, variable overhead, executive bonuses, bad debt expense, and restructuring charges',
      'Cost of revenue, SG&A, goodwill impairment, foreign currency losses, and debt issuance amortization',
    ],
    correctIndex: 0,
    explanation:
      'ASC 220-40 (ASU 2024-03) requires public business entities to disaggregate relevant expense captions (such as COGS and SG&A) in a tabular footnote into five specific categories: purchases of inventory, employee compensation, depreciation, intangible asset amortization, and depletion.',
    practicalTakeaway:
      'Bottom-line GAAP Net Income does not change—only footnote granularity improves so analysts can model labor and D&A accurately.',
  },
  {
    id: 'q-asu-2023-08-crypto',
    category: 'fasb-gaap',
    categoryLabel: 'FASB · GAAP',
    standardCode: 'ASU 2023-08 (ASC 350-60)',
    question:
      'How does an entity account for period-to-period changes in the fair value of in-scope crypto assets (such as Bitcoin) under FASB ASU 2023-08?',
    options: [
      'Impairment losses hit Net Income, while subsequent price recoveries are deferred until sale',
      'Unrealized gains and losses are recognized in Other Comprehensive Income (OCI) with no recycling',
      'Changes in fair value are recognized directly in Net Income each reporting period',
      'Crypto assets remain carried at historical cost less accumulated amortization over 5 years',
    ],
    correctIndex: 2,
    explanation:
      'ASU 2023-08 (ASC 350-60) moved qualifying crypto assets out of the indefinite-lived intangible impairment-only model and into fair value measurement under Topic 820, with gains and losses recognized in Net Income each period.',
    practicalTakeaway:
      'Entities must also present crypto assets separately from other intangible assets on the balance sheet and disclose significant holdings by asset.',
  },
  {
    id: 'q-pcaob-qc-1000',
    category: 'pcaob',
    categoryLabel: 'PCAOB Audit',
    standardCode: 'PCAOB QC 1000',
    question:
      'Which governance requirement is newly mandated under PCAOB QC 1000 for registered accounting firms that issue audit reports for more than 100 issuers annually?',
    options: [
      'Mandatory rotation of the entire audit firm every three fiscal years',
      'Establishment of an External Oversight Function for the Quality Control system (EQCF) with independent participation',
      'Elimination of Engagement Quality Reviews (AS 1220) for integrated ICFR audits',
      'Public release of individual staff associate performance ratings inside Form AP',
    ],
    correctIndex: 1,
    explanation:
      'PCAOB QC 1000 requires firms auditing more than 100 issuers per year to establish an External Oversight Function for Quality Control (EQCF) composed of one or more persons who can exercise independent judgment over the firm’s QC governance.',
    practicalTakeaway:
      'All registered firms—regardless of size—must design and annually evaluate a risk-based QC system under QC 1000.',
  },
  {
    id: 'q-asu-2023-09-tax',
    category: 'fasb-gaap',
    categoryLabel: 'FASB · GAAP',
    standardCode: 'ASU 2023-09 (ASC 740)',
    question:
      'Under FASB ASU 2023-09 (Improvements to Income Tax Disclosures), what quantitative threshold triggers separate disaggregation of reconciling items within the eight required rate reconciliation categories?',
    options: [
      'Items equal to or greater than 1% of total revenue',
      'Items equal to or greater than 10% of GAAP Net Income',
      'Items equal to or greater than 5% of the amount computed by multiplying pre-tax income by the applicable statutory federal tax rate',
      'Only items exceeding $50 million regardless of company size',
    ],
    correctIndex: 2,
    explanation:
      'ASU 2023-09 requires public business entities to disclose specific categories in the rate reconciliation (in both percentages and dollar amounts) and separately break out individual reconciling items meeting or exceeding a 5% threshold of expected statutory tax.',
    practicalTakeaway:
      'The standard also requires annual disaggregation of income taxes paid (net of refunds) across federal, state, and foreign jurisdictions.',
  },
  {
    id: 'q-asc-842-leases',
    category: 'fasb-gaap',
    categoryLabel: 'FASB · GAAP',
    standardCode: 'ASC 842 (Leases)',
    question:
      'Comparing an Operating Lease to a Finance Lease of identical terms under US GAAP (ASC 842), how does the Income Statement presentation differ?',
    options: [
      'Operating leases record a single straight-line Lease Expense above Operating Income; Finance leases split expense into Amortization and Interest',
      'Operating leases do not recognize a Right-of-Use (ROU) asset or lease liability on the balance sheet',
      'Finance leases record all cash rent payments as Financing Cash Outflows with zero effect on EBITDA',
      'Operating leases accelerate total expense into Year 1 using the effective-interest method',
    ],
    correctIndex: 0,
    explanation:
      'Under ASC 842, both Operating and Finance leases (>12 months) sit on the balance sheet as ROU Assets and Lease Liabilities. However, an Operating lease produces a single straight-line Lease Expense in operating costs, whereas a Finance lease splits expense into ROU Amortization (above EBIT) and Interest Expense (below EBIT), producing higher EBITDA.',
    practicalTakeaway:
      'Crucial interview bridge: switching from an Operating to a Finance lease under US GAAP raises EBITDA even though total cash outflow is identical.',
  },
  {
    id: 'q-pcaob-as-1000',
    category: 'pcaob',
    categoryLabel: 'PCAOB Audit',
    standardCode: 'PCAOB AS 1000',
    question:
      'PCAOB AS 1000 (General Responsibilities of the Auditor in Conducting an Audit) consolidated foundational audit standards and tightened documentation completion timelines. To how many days did AS 1000 shorten the audit documentation assembly window after report release?',
    options: [
      'Shortened from 60 days to 30 days',
      'Shortened from 45 days to 14 days',
      'Extended from 45 days to 60 days',
      'Shortened from 90 days to 45 days',
    ],
    correctIndex: 1,
    explanation:
      'AS 1000 modernized the general responsibilities of the auditor (replacing AS 1001–1015) and accelerated the maximum archive completion period for assembling a final set of audit documentation from 45 days down to 14 days after the report release date.',
    practicalTakeaway:
      'For audit interns and associates, "archiving" workpapers now happens within two weeks of filing the 10-K—meaning zero procrastinating on sign-offs.',
  },
  {
    id: 'q-asc-606-principal-agent',
    category: 'fasb-gaap',
    categoryLabel: 'FASB · GAAP',
    standardCode: 'ASC 606-10-55',
    question:
      'When determining whether a marketplace company should recognize Gross revenue (Principal) or Net commission revenue (Agent) under ASC 606, what is the decisive accounting principle?',
    options: [
      'Whether the company collects cash from the end customer before paying the vendor',
      'Whether the company controls the specified good or service before it is transferred to the customer',
      'Whether the transaction is settled via credit card versus ACH bank transfer',
      'Whether the vendor signs a multi-year exclusivity contract',
    ],
    correctIndex: 1,
    explanation:
      'Under ASC 606-10-55-36, an entity is a Principal if it controls the specified good or service before that good or service is transferred to a customer. Fulfillment responsibility, inventory risk, and pricing discretion are indicators of control—not mere payment processing.',
    practicalTakeaway:
      'Always evaluate control per distinct performance obligation; handling cash collection alone does not justify Gross revenue presentation.',
  },
  {
    id: 'q-pcaob-noclar-skepticism',
    category: 'pcaob',
    categoryLabel: 'PCAOB Audit',
    standardCode: 'PCAOB AS 1105 · Audit Evidence',
    question:
      'When an audit team relies on an electronic report generated from the client’s ERP system (Information Produced by the Entity, or IPE) for substantive testing, what must the auditor verify under PCAOB AS 1105?',
    options: [
      'Only that the PDF export carries the CFO’s digital signature',
      'Completeness and accuracy of the underlying data and parameters used to generate the report',
      'That the report was exported at least 30 days after year-end',
      'Only mathematical footing of the final page subtotal',
    ],
    correctIndex: 1,
    explanation:
      'PCAOB AS 1105 explicitly requires auditors using Information Produced by the Entity (IPE) to obtain audit evidence about the accuracy and completeness of the information—typically by testing report logic, parameters, and ITGCs or tying source inputs back to underlying records.',
    practicalTakeaway:
      'Testing IPE completeness and accuracy is one of the top PCAOB inspection findings—and a favorite Big 4 technical interview question.',
  },
];
