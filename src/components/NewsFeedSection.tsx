import { useState } from 'react';
import { Bookmark, BookmarkCheck, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { BriefingArticle, NewsCategory } from '../types/editorial';
import { EditorialImage } from './EditorialImage';

interface NewsFeedSectionProps {
  articles: BriefingArticle[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

const FILTER_OPTIONS: { id: NewsCategory; label: string }[] = [
  { id: 'all', label: 'All Dispatches' },
  { id: 'standards', label: 'GAAP · FASB · PCAOB' },
  { id: 'accounting', label: 'Accounting World' },
  { id: 'markets-wellness', label: 'Stocks & Wellness' },
];

export function NewsFeedSection({
  articles,
  savedIds,
  onToggleSave,
}: NewsFeedSectionProps) {
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');
  const [query, setQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<string[]>(() =>
    articles[0] ? [articles[0].id] : []
  );

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredArticles = articles.filter((article) => {
    const matchesCat = activeCategory === 'all' || article.category === activeCategory;
    if (!matchesCat) return false;
    if (!normalizedQuery) return true;
    return (
      article.headline.toLowerCase().includes(normalizedQuery) ||
      article.deck.toLowerCase().includes(normalizedQuery) ||
      (article.standardRef?.toLowerCase().includes(normalizedQuery) ?? false) ||
      article.categoryLabel.toLowerCase().includes(normalizedQuery)
    );
  });

  return (
    <section id="dispatches" className="border-b border-[#26312D] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Controls */}
        <div className="flex flex-col gap-6 border-b border-[#26312D] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#34D399]">
              01. Daily Scroll Stream
            </p>
            <h2 className="mt-1.5 font-serif text-3xl font-bold tracking-tight text-[#F3F1EC]">
              Today’s Accounting, Standards & Market Dispatches
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9A958C]">
              Scroll through bite-sized briefs across GAAP/FASB/PCAOB rulemaking, corporate earnings quality, Big 4 industry shifts, and student cash-flow wellness.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#9A958C]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ASC, PCAOB, 401k..."
                aria-label="Search dispatches"
                className="w-full rounded-md border border-[#26312D] bg-[#131917] py-2 pr-3 pl-9 text-sm text-[#F3F1EC] placeholder:text-[#78716C] focus:border-[#34D399] focus:outline-none sm:w-56"
              />
            </div>
          </div>
        </div>

        {/* Interactive Category Segmented Filter Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter news dispatches"
            className="flex flex-wrap items-center gap-1.5 rounded-lg border border-[#26312D] bg-[#131917] p-1"
          >
            {FILTER_OPTIONS.map((opt) => {
              const active = activeCategory === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(opt.id)}
                  className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${
                    active
                      ? 'bg-[#1D2623] text-[#F3F1EC]'
                      : 'text-[#9A958C] hover:text-[#F3F1EC]'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <span className="font-mono text-xs text-[#9A958C] tabular-nums">
            Showing {filteredArticles.length} of {articles.length} dispatches
          </span>
        </div>

        {/* Scroll-Style Dispatch Feed */}
        {filteredArticles.length === 0 ? (
          <div className="mt-8 rounded-lg border border-[#26312D] bg-[#131917]/92 p-10 text-center backdrop-blur-[2px]">
            <p className="font-serif text-lg font-semibold text-[#F3F1EC]">
              No matching dispatches found
            </p>
            <p className="mt-1 text-sm text-[#9A958C]">
              Try clearing your search filter or switching back to All Dispatches.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setQuery('');
              }}
              className="mt-4 rounded-md bg-[#10B981] px-4 py-2 text-xs font-semibold text-[#052E16] hover:bg-[#34D399] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 space-y-6">
            {filteredArticles.map((article, index) => {
              const isExpanded = expandedIds.includes(article.id);
              const isSaved = savedIds.includes(article.id);

              return (
                <article
                  key={article.id}
                  className="rounded-lg border border-[#26312D] bg-[#131917]/92 p-6 backdrop-blur-[2px] transition-colors duration-150 sm:p-8"
                >
                  <div
                    className={`grid grid-cols-1 gap-6 ${
                      article.image ? 'lg:grid-cols-12 lg:gap-8' : ''
                    }`}
                  >
                    <div className={article.image ? 'lg:col-span-8' : ''}>
                      {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#9A958C]">
                          <span className="font-mono font-medium text-[#9A958C] tabular-nums">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span aria-hidden="true">/</span>
                          <span className="font-semibold text-[#34D399]">
                            {article.categoryLabel}
                          </span>
                          {article.standardRef && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono text-[#F3F1EC]">
                                {article.standardRef}
                              </span>
                            </>
                          )}
                          <span aria-hidden="true">·</span>
                          <span>{article.readTime}</span>
                          <span aria-hidden="true">·</span>
                          <span>{article.publishedDate}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onToggleSave(article.id)}
                          aria-label={isSaved ? `Remove ${article.headline} from saved` : `Save ${article.headline}`}
                          className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${
                            isSaved
                              ? 'border-[#34D399]/60 bg-[#34D399]/12 text-[#6EE7B7]'
                              : 'border-[#26312D] bg-[#18201D] text-[#D2CEC5] hover:text-[#F3F1EC]'
                          }`}
                        >
                          {isSaved ? (
                            <>
                              <BookmarkCheck className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Saved</span>
                            </>
                          ) : (
                            <>
                              <Bookmark className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Save</span>
                            </>
                          )}
                        </button>
                      </div>

                      <h3 className="mt-3 font-serif text-2xl font-bold leading-snug text-[#F3F1EC]">
                        {article.headline}
                      </h3>

                      <p className="mt-2.5 max-w-3xl text-[15px] leading-relaxed text-[#D2CEC5]">
                        {article.deck}
                      </p>

                      {/* Morning Brew style crisp bullet points */}
                      <ul className="mt-4 space-y-2 border-t border-[#26312D] pt-4 text-sm leading-relaxed text-[#D2CEC5]">
                        {article.summaryPoints.map((pt, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <span className="mt-2 h-1 w-1 shrink-0 bg-[#34D399]" aria-hidden="true" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5">
                        <button
                          type="button"
                          onClick={() => toggleExpand(article.id)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#34D399] transition-colors duration-150 hover:text-[#6EE7B7] hover:underline hover:underline-offset-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34D399]"
                        >
                          {isExpanded ? (
                            <>
                              <span>Hide Full Briefing & Journal Impact</span>
                              <ChevronUp className="h-4 w-4" aria-hidden="true" />
                            </>
                          ) : (
                            <>
                              <span>Expand Full Briefing & Journal Impact</span>
                              <ChevronDown className="h-4 w-4" aria-hidden="true" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {article.image && (
                      <div className="lg:col-span-4">
                        <EditorialImage
                          src={article.image}
                          alt={article.headline}
                          caption={article.imageCaption}
                          aspectClass="aspect-[4/3]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Expanded Full Reading View */}
                  {isExpanded && (
                    <div className="mt-6 border-t border-[#26312D] pt-6">
                      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        <div className="space-y-3.5 text-[15px] leading-relaxed text-[#D2CEC5] lg:col-span-7">
                          {article.fullBody.map((paragraph, pIdx) => (
                            <p key={pIdx}>{paragraph}</p>
                          ))}
                        </div>
                        <div className="space-y-4 rounded-lg border border-[#26312D] bg-[#18201D] p-5 lg:col-span-5">
                          <div>
                            <p className="text-xs font-semibold text-[#34D399]">
                              Accounting & Financial Mechanics
                            </p>
                            <p className="mt-1.5 font-mono text-xs leading-relaxed text-[#F3F1EC]">
                              {article.accountingOrMarketImpact}
                            </p>
                          </div>
                          <div className="border-t border-[#26312D] pt-3.5">
                            <p className="text-xs font-semibold text-[#FBBF24]">
                              Interview & Exam Takeaway
                            </p>
                            <p className="mt-1.5 text-sm leading-relaxed text-[#D2CEC5]">
                              {article.interviewAngle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
