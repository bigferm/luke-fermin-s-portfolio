import { useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  RefreshCw,
} from 'lucide-react';
import { EDITION_META } from '../data/briefingData';
import { BriefingArticle, MarketMetric } from '../types/editorial';
import { EditorialImage } from './EditorialImage';

interface HeroLeadSectionProps {
  issueNumber: string;
  dateLabel: string;
  leadStory: BriefingArticle;
  marketMetrics: MarketMetric[];
  isRefreshing: boolean;
  onRefreshEdition: () => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
}

export function HeroLeadSection({
  issueNumber,
  dateLabel,
  leadStory,
  marketMetrics,
  isRefreshing,
  onRefreshEdition,
  savedIds,
  onToggleSave,
}: HeroLeadSectionProps) {
  const [leadExpanded, setLeadExpanded] = useState(false);
  const [selectedMetricId, setSelectedMetricId] = useState<string>('us10y');

  const isSaved = savedIds.includes(leadStory.id);
  const activeMetric =
    marketMetrics.find((m) => m.id === selectedMetricId) ?? marketMetrics[0];

  return (
    <section id="briefing" className="border-b border-[#26312D] pt-6 pb-12 sm:pt-8 sm:pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Masthead Edition Strip - Unboxed Editorial Metadata + Refresh Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#26312D] pb-4 text-xs font-medium text-[#9A958C]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[#F3F1EC]">{issueNumber}</span>
            <span aria-hidden="true">·</span>
            <span>{dateLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{EDITION_META.readTime}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <p className="hidden text-xs text-[#9A958C] lg:block">
              {EDITION_META.editorNote}
            </p>
            <button
              type="button"
              onClick={onRefreshEdition}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#26312D] bg-[#131917] px-2.5 py-1 text-xs font-semibold text-[#D2CEC5] transition-colors duration-150 hover:border-[#34D399]/60 hover:text-[#F3F1EC] disabled:opacity-60 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 text-[#34D399] ${isRefreshing ? 'animate-spin' : ''}`}
                aria-hidden="true"
              />
              <span>{isRefreshing ? 'Updating...' : 'Refresh Edition'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Quick Section Jump Links (Non-Sticky to preserve 15% sticky cap) */}
        <nav
          aria-label="Quick section links"
          className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-[#26312D] pb-3 text-xs font-semibold text-[#34D399] md:hidden"
        >
          <a href="#dispatches" className="whitespace-nowrap hover:underline">Dispatches</a>
          <a href="#reg-quiz" className="whitespace-nowrap hover:underline">Reg Quiz</a>
          <a href="#interviews" className="whitespace-nowrap hover:underline">Interviews</a>
          <a href="#cpa-prep" className="whitespace-nowrap hover:underline">CPA Prep</a>
        </nav>

        {/* Lead Story Split Grid (items-stretch for balanced height) */}
        <div className="mt-8 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col justify-between lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#9A958C]">
                <span className="font-semibold text-[#34D399]">{leadStory.categoryLabel}</span>
                {leadStory.standardRef && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-[#F3F1EC]">{leadStory.standardRef}</span>
                  </>
                )}
                <span aria-hidden="true">·</span>
                <span>{leadStory.readTime}</span>
              </div>

              <h1 className="mt-3 font-serif text-3xl font-bold leading-[1.14] tracking-tight text-[#F3F1EC] sm:text-4xl lg:text-[2.65rem]">
                {leadStory.headline}
              </h1>

              <p className="editorial-dropcap mt-5 max-w-2xl text-base leading-relaxed text-[#D2CEC5] sm:text-[17px]">
                {leadStory.deck}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-[#26312D] pt-4 text-sm leading-relaxed text-[#D2CEC5]">
                {leadStory.summaryPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-1 font-mono text-xs font-semibold text-[#34D399]">
                      0{idx + 1}.
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setLeadExpanded((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-md bg-[#10B981] px-4 py-2.5 text-sm font-semibold text-[#052E16] transition-colors duration-150 hover:bg-[#34D399] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
              >
                {leadExpanded ? (
                  <>
                    <span>Close Full Dispatch</span>
                    <ChevronUp className="h-4 w-4" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    <span>Read Full Dispatch</span>
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onToggleSave(leadStory.id)}
                className={`inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${
                  isSaved
                    ? 'border-[#34D399]/60 bg-[#34D399]/12 text-[#6EE7B7]'
                    : 'border-[#26312D] bg-[#131917]/90 text-[#F3F1EC] hover:bg-[#18201D]'
                }`}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="h-4 w-4" aria-hidden="true" />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" aria-hidden="true" />
                    <span>Save Dispatch</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:col-span-5">
            <EditorialImage
              src={leadStory.image ?? '/src/assets/images/hero_ledger_editorial_1795061943843.jpg'}
              alt={leadStory.headline}
              caption={leadStory.imageCaption}
              aspectClass="aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[340px]"
              className="h-full"
            />
          </div>
        </div>

        {/* Expandable Lead Deep Dive */}
        {leadExpanded && (
          <div className="mt-8 rounded-lg border border-[#26312D] bg-[#131917]/92 p-6 backdrop-blur-[2px] sm:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="space-y-4 text-[15px] leading-relaxed text-[#D2CEC5] lg:col-span-7">
                <h2 className="font-serif text-xl font-semibold text-[#F3F1EC]">
                  The Full Morning Breakdown
                </h2>
                {leadStory.fullBody.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="space-y-5 border-t border-[#26312D] pt-5 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
                <div>
                  <p className="text-xs font-semibold tracking-wide text-[#34D399]">
                    Financial Statement Impact
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#D2CEC5]">
                    {leadStory.accountingOrMarketImpact}
                  </p>
                </div>
                <div className="border-t border-[#26312D] pt-4">
                  <p className="text-xs font-semibold tracking-wide text-[#FBBF24]">
                    How This Comes Up in Interviews
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#D2CEC5]">
                    {leadStory.interviewAngle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4-Column Markets & Student Wellness Snapshot Strip (below hero split) */}
        {activeMetric && (
          <div className="mt-10">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-serif text-lg font-semibold text-[#F3F1EC]">
                Morning Markets & Rate Benchmarks
              </h2>
              <span className="text-xs text-[#9A958C]">
                Select any benchmark below for valuation and personal finance context
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {marketMetrics.map((metric) => {
                const isSelected = metric.id === activeMetric.id;
                return (
                  <button
                    key={metric.id}
                    type="button"
                    onClick={() => setSelectedMetricId(metric.id)}
                    className={`flex flex-col items-start rounded-lg border p-4 text-left backdrop-blur-[2px] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${
                      isSelected
                        ? 'border-[#34D399] bg-[#18201D]/95'
                        : 'border-[#26312D] bg-[#131917]/88 hover:bg-[#18201D]/95'
                    }`}
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-[#9A958C]">
                        {metric.label}
                      </span>
                      <span
                        className={`inline-flex items-center gap-0.5 font-mono text-xs font-medium tabular-nums ${
                          metric.direction === 'up'
                            ? 'text-[#34D399]'
                            : metric.direction === 'down'
                            ? 'text-[#FBBF24]'
                            : 'text-[#9A958C]'
                        }`}
                      >
                        {metric.direction === 'up' && (
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        {metric.direction === 'down' && (
                          <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        {metric.direction === 'neutral' && (
                          <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        <span>{metric.delta}</span>
                      </span>
                    </div>
                    <div className="mt-1.5 font-mono text-2xl font-semibold tracking-tight text-[#F3F1EC] tabular-nums">
                      {metric.value}
                    </div>
                    <div className="mt-1 text-xs text-[#9A958C]">{metric.context}</div>
                  </button>
                );
              })}
            </div>

            <div className="mt-3 rounded-lg border border-[#26312D] bg-[#131917]/92 px-4 py-3 text-sm leading-relaxed text-[#D2CEC5] backdrop-blur-[2px]">
              <span className="font-semibold text-[#34D399]">{activeMetric.label}: </span>
              {activeMetric.interviewNote}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
