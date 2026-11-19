import { useCallback, useEffect, useState } from 'react';
import {
  BRIEFING_ARTICLES,
  EDITION_META,
  LEAD_STORY,
  MARKET_METRICS,
} from './data/briefingData';
import { BriefingArticle, MarketMetric } from './types/editorial';
import { ScrollBackdrop } from './components/ScrollBackdrop';
import { TopNav } from './components/TopNav';
import { HeroLeadSection } from './components/HeroLeadSection';
import { NewsFeedSection } from './components/NewsFeedSection';
import { RegulatoryQuizSection } from './components/RegulatoryQuizSection';
import { InterviewPrepSection, StarDraft } from './components/InterviewPrepSection';
import { CpaStudySection } from './components/CpaStudySection';
import { SavedDrawer } from './components/SavedDrawer';

interface EditionResponse {
  editionDateKey: string;
  issueNumber: string;
  dateLabel: string;
  lastUpdatedIso: string;
  liveFeedCount: number;
  marketMetrics: MarketMetric[];
  leadStory: BriefingArticle;
  articles: BriefingArticle[];
}

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [edition, setEdition] = useState<EditionResponse>({
    editionDateKey: '',
    issueNumber: EDITION_META.issueNumber,
    dateLabel: EDITION_META.dateLabel,
    lastUpdatedIso: '',
    liveFeedCount: 0,
    marketMetrics: MARKET_METRICS,
    leadStory: LEAD_STORY,
    articles: BRIEFING_ARTICLES,
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [savedIds, setSavedIds] = useState<string[]>(() =>
    loadStorage<string[]>('ledgerbrew_saved_ids', ['lead-fasb-dise-2024-03'])
  );
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>(() =>
    loadStorage<Record<string, number>>('ledgerbrew_quiz_answers', {})
  );
  const [starDrafts, setStarDrafts] = useState<Record<string, StarDraft>>(() =>
    loadStorage<Record<string, StarDraft>>('ledgerbrew_star_drafts', {})
  );
  const [masteredTechIds, setMasteredTechIds] = useState<string[]>(() =>
    loadStorage<string[]>('ledgerbrew_mastered_tech', [])
  );
  const [cpaCheckedTopics, setCpaCheckedTopics] = useState<string[]>(() =>
    loadStorage<string[]>('ledgerbrew_cpa_checks', [])
  );

  const fetchDailyEdition = useCallback(async (forceRefresh = false) => {
    setIsRefreshing(true);
    try {
      const endpoint = forceRefresh ? '/api/edition?refresh=1' : '/api/edition';
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (!res.ok) return;
      const data = (await res.json()) as EditionResponse;
      if (data && data.leadStory && Array.isArray(data.articles)) {
        setEdition(data);
      }
    } catch {
      // Keep bundled fallback edition silently if network is unavailable
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDailyEdition(false);

    // Automatically check for a new day's edition when returning to the tab
    const onFocus = () => {
      const easternToday = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/New_York',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(new Date());
      if (edition.editionDateKey && edition.editionDateKey !== easternToday) {
        fetchDailyEdition(false);
      }
    };

    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [fetchDailyEdition, edition.editionDateKey]);

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setScrollProgress(0);
        return;
      }
      setScrollProgress(window.scrollY / scrollable);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('ledgerbrew_saved_ids', JSON.stringify(savedIds));
    } catch {
      // ignore storage quota errors
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('ledgerbrew_quiz_answers', JSON.stringify(quizAnswers));
    } catch {
      // ignore
    }
  }, [quizAnswers]);

  useEffect(() => {
    try {
      localStorage.setItem('ledgerbrew_star_drafts', JSON.stringify(starDrafts));
    } catch {
      // ignore
    }
  }, [starDrafts]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'ledgerbrew_mastered_tech',
        JSON.stringify(masteredTechIds)
      );
    } catch {
      // ignore
    }
  }, [masteredTechIds]);

  useEffect(() => {
    try {
      localStorage.setItem(
        'ledgerbrew_cpa_checks',
        JSON.stringify(cpaCheckedTopics)
      );
    } catch {
      // ignore
    }
  }, [cpaCheckedTopics]);

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectQuizAnswer = (questionId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
  };

  const handleUpdateStarDraft = (
    promptId: string,
    field: keyof StarDraft,
    value: string
  ) => {
    setStarDrafts((prev) => {
      const existing = prev[promptId] ?? {
        situation: '',
        task: '',
        action: '',
        result: '',
      };
      return {
        ...prev,
        [promptId]: {
          ...existing,
          [field]: value,
        },
      };
    });
  };

  const handleToggleMasteredTech = (id: string) => {
    setMasteredTechIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleCpaTopic = (topicKey: string) => {
    setCpaCheckedTopics((prev) =>
      prev.includes(topicKey)
        ? prev.filter((item) => item !== topicKey)
        : [...prev, topicKey]
    );
  };

  return (
    <div id="top" className="relative min-h-screen text-[#F3F1EC]">
      <ScrollBackdrop />

      <div className="relative z-10">
        <TopNav
          scrollProgress={scrollProgress}
          savedCount={savedIds.length}
          onOpenSaved={() => setDrawerOpen(true)}
        />

        <main>
          <HeroLeadSection
            issueNumber={edition.issueNumber}
            dateLabel={edition.dateLabel}
            leadStory={edition.leadStory}
            marketMetrics={edition.marketMetrics}
            isRefreshing={isRefreshing}
            onRefreshEdition={() => fetchDailyEdition(true)}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />

          <NewsFeedSection
            articles={edition.articles}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />

          <RegulatoryQuizSection
            answers={quizAnswers}
            onSelectAnswer={handleSelectQuizAnswer}
            onResetQuiz={handleResetQuiz}
          />

          <InterviewPrepSection
            starDrafts={starDrafts}
            onUpdateStarDraft={handleUpdateStarDraft}
            masteredTechIds={masteredTechIds}
            onToggleMasteredTech={handleToggleMasteredTech}
          />

          <CpaStudySection
            checkedTopics={cpaCheckedTopics}
            onToggleTopic={handleToggleCpaTopic}
          />
        </main>

        <footer className="bg-[#0B0F0E]/85 py-10 backdrop-blur-xs">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div>
              <p className="font-serif text-lg font-bold text-[#F3F1EC]">
                The Daily Debit
              </p>
              <p className="mt-1 max-w-lg text-xs leading-relaxed text-[#9A958C]">
                Daily student briefing for accounting, corporate finance, consulting recruiting, and CPA Evolution preparation. Verify official FASB ASC, PCAOB, and AICPA blueprint updates for formal coursework or practice.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-[#9A958C]">
              <a href="#briefing" className="hover:text-[#F3F1EC] hover:underline">
                Briefing
              </a>
              <a href="#dispatches" className="hover:text-[#F3F1EC] hover:underline">
                Dispatches
              </a>
              <a href="#reg-quiz" className="hover:text-[#F3F1EC] hover:underline">
                Reg Quiz
              </a>
              <a href="#interviews" className="hover:text-[#F3F1EC] hover:underline">
                Interviews
              </a>
              <a href="#cpa-prep" className="hover:text-[#F3F1EC] hover:underline">
                CPA Prep
              </a>
            </div>
          </div>
        </footer>
      </div>

      <SavedDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        allArticles={[edition.leadStory, ...edition.articles]}
        savedIds={savedIds}
        onToggleSave={handleToggleSave}
        quizAnswers={quizAnswers}
        starDrafts={starDrafts}
        masteredTechIds={masteredTechIds}
        cpaCheckedTopics={cpaCheckedTopics}
      />
    </div>
  );
}
