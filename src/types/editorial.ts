export type NewsCategory =
  | 'all'
  | 'accounting'
  | 'standards'
  | 'markets-wellness';

export interface MarketMetric {
  id: string;
  label: string;
  value: string;
  delta: string;
  direction: 'up' | 'down' | 'neutral';
  context: string;
  interviewNote: string;
}

export interface BriefingArticle {
  id: string;
  category: Exclude<NewsCategory, 'all'>;
  categoryLabel: string;
  standardRef?: string;
  headline: string;
  deck: string;
  readTime: string;
  publishedDate: string;
  image?: string;
  imageCaption?: string;
  summaryPoints: string[];
  fullBody: string[];
  accountingOrMarketImpact: string;
  interviewAngle: string;
}

export type QuizCategory = 'all' | 'fasb-gaap' | 'pcaob';

export interface RegulatoryQuestion {
  id: string;
  category: Exclude<QuizCategory, 'all'>;
  categoryLabel: string;
  standardCode: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  practicalTakeaway: string;
}

export interface StarPrompt {
  id: string;
  roleTrack: string;
  question: string;
  whatInterviewersTest: string;
  modelStar: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  redFlag: string;
}

export type TechnicalTrack = 'finance' | 'accounting' | 'consulting';

export interface TechnicalQuestion {
  id: string;
  track: TechnicalTrack;
  trackLabel: string;
  difficulty: 'Core' | 'Advanced';
  question: string;
  answer: string;
  keyFormulaOrRule: string;
  followUpTrap: string;
}

export interface CpaSectionInfo {
  code: 'FAR' | 'AUD' | 'REG' | 'BAR' | 'ISC' | 'TCP';
  group: 'Core' | 'Discipline';
  title: string;
  recommendedHours: number;
  passRateContext: string;
  blueprintAreas: { name: string; weight: string }[];
  mnemonics: { title: string; rule: string; detail: string }[];
  tbsStrategy: string;
  checklistTopics: string[];
}
