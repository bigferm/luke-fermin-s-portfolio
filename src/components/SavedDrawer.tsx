import { X, Trash2 } from 'lucide-react';
import { REGULATORY_QUIZ } from '../data/quizData';
import { TECHNICAL_QUESTIONS } from '../data/prepData';
import { BriefingArticle } from '../types/editorial';
import { StarDraft } from './InterviewPrepSection';

interface SavedDrawerProps {
  open: boolean;
  onClose: () => void;
  allArticles: BriefingArticle[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  quizAnswers: Record<string, number>;
  starDrafts: Record<string, StarDraft>;
  masteredTechIds: string[];
  cpaCheckedTopics: string[];
}

export function SavedDrawer({
  open,
  onClose,
  allArticles,
  savedIds,
  onToggleSave,
  quizAnswers,
  starDrafts,
  masteredTechIds,
  cpaCheckedTopics,
}: SavedDrawerProps) {
  if (!open) return null;

  const savedArticles = allArticles.filter((a) => savedIds.includes(a.id));

  const quizCorrect = REGULATORY_QUIZ.filter(
    (q) => quizAnswers[q.id] === q.correctIndex
  ).length;

  const draftsCount = Object.values(starDrafts).filter(
    (d) =>
      d.situation.trim() ||
      d.task.trim() ||
      d.action.trim() ||
      d.result.trim()
  ).length;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-label="Saved Briefs and Study Progress"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full w-full max-w-md flex-col border-l border-[#26312D] bg-[#0F1412] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#26312D] px-6 py-4">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#F3F1EC]">
              Saved Briefs & Study Log
            </h2>
            <p className="text-xs text-[#9A958C]">
              Stored locally in your browser
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close saved briefs drawer"
            className="rounded-md p-2 text-[#9A958C] hover:bg-[#18201D] hover:text-[#F3F1EC] cursor-pointer"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {/* Study Progress Summary */}
          <div>
            <p className="text-xs font-semibold text-[#34D399]">
              Active Study Progress
            </p>
            <dl className="mt-2.5 grid grid-cols-2 gap-3">
              <div className="rounded-md border border-[#26312D] bg-[#131917] p-3">
                <dt className="text-xs text-[#9A958C]">Regulatory Quiz</dt>
                <dd className="mt-1 font-mono text-base font-semibold text-[#F3F1EC] tabular-nums">
                  {quizCorrect} / {REGULATORY_QUIZ.length}
                </dd>
              </div>
              <div className="rounded-md border border-[#26312D] bg-[#131917] p-3">
                <dt className="text-xs text-[#9A958C]">Technicals Mastered</dt>
                <dd className="mt-1 font-mono text-base font-semibold text-[#F3F1EC] tabular-nums">
                  {masteredTechIds.length} / {TECHNICAL_QUESTIONS.length}
                </dd>
              </div>
              <div className="rounded-md border border-[#26312D] bg-[#131917] p-3">
                <dt className="text-xs text-[#9A958C]">STAR Stories Drafted</dt>
                <dd className="mt-1 font-mono text-base font-semibold text-[#F3F1EC] tabular-nums">
                  {draftsCount}
                </dd>
              </div>
              <div className="rounded-md border border-[#26312D] bg-[#131917] p-3">
                <dt className="text-xs text-[#9A958C]">CPA Topics Checked</dt>
                <dd className="mt-1 font-mono text-base font-semibold text-[#F3F1EC] tabular-nums">
                  {cpaCheckedTopics.length}
                </dd>
              </div>
            </dl>
          </div>

          {/* Saved Articles */}
          <div className="border-t border-[#26312D] pt-5">
            <p className="text-xs font-semibold text-[#34D399]">
              Bookmarked Dispatches ({savedArticles.length})
            </p>

            {savedArticles.length === 0 ? (
              <div className="mt-3 rounded-lg border border-[#26312D] bg-[#131917] p-5 text-sm text-[#9A958C]">
                No dispatches bookmarked yet. Click <span className="font-semibold text-[#F3F1EC]">Save</span> on any story in the daily stream to keep it here for interview review.
              </div>
            ) : (
              <div className="mt-3 space-y-3">
                {savedArticles.map((art) => (
                  <div
                    key={art.id}
                    className="rounded-lg border border-[#26312D] bg-[#131917] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium text-[#34D399]">
                          {art.categoryLabel}
                          {art.standardRef ? ` · ${art.standardRef}` : ''}
                        </p>
                        <h3 className="mt-1 font-serif text-base font-semibold leading-snug text-[#F3F1EC]">
                          {art.headline}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => onToggleSave(art.id)}
                        aria-label={`Remove ${art.headline}`}
                        className="rounded-md p-1.5 text-[#9A958C] hover:bg-[#18201D] hover:text-[#FBBF24] cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-[#9A958C]">
                      {art.interviewAngle}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
