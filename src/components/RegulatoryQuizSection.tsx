import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { REGULATORY_QUIZ } from '../data/quizData';
import { QuizCategory } from '../types/editorial';

interface RegulatoryQuizSectionProps {
  answers: Record<string, number>;
  onSelectAnswer: (questionId: string, optionIndex: number) => void;
  onResetQuiz: () => void;
}

const QUIZ_FILTERS: { id: QuizCategory; label: string }[] = [
  { id: 'all', label: 'All Standards' },
  { id: 'fasb-gaap', label: 'FASB & GAAP' },
  { id: 'pcaob', label: 'PCAOB Audit' },
];

export function RegulatoryQuizSection({
  answers,
  onSelectAnswer,
  onResetQuiz,
}: RegulatoryQuizSectionProps) {
  const [filter, setFilter] = useState<QuizCategory>('all');
  const [activeIdx, setActiveIdx] = useState(0);

  const questions = REGULATORY_QUIZ.filter(
    (q) => filter === 'all' || q.category === filter
  );
  const safeIdx = Math.min(activeIdx, Math.max(0, questions.length - 1));
  const currentQ = questions[safeIdx];

  const handleFilterChange = (nextFilter: QuizCategory) => {
    setFilter(nextFilter);
    setActiveIdx(0);
  };

  const totalAnswered = REGULATORY_QUIZ.filter(
    (q) => answers[q.id] !== undefined
  ).length;
  const totalCorrect = REGULATORY_QUIZ.filter(
    (q) => answers[q.id] === q.correctIndex
  ).length;

  const selectedOption = currentQ ? answers[currentQ.id] : undefined;
  const isAnswered = selectedOption !== undefined;
  const isCorrect = isAnswered && selectedOption === currentQ.correctIndex;

  return (
    <section
      id="reg-quiz"
      className="border-b border-[#26312D] bg-[#0F1412]/70 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-[#26312D] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#34D399]">
              02. Interactive Regulatory Check
            </p>
            <h2 className="mt-1.5 font-serif text-3xl font-bold tracking-tight text-[#F3F1EC]">
              GAAP, FASB & PCAOB Rulemaking Quiz
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9A958C]">
              Test your retention of recent codification updates—from expense disaggregation and crypto fair value to PCAOB quality control and audit documentation deadlines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div
              role="tablist"
              aria-label="Filter quiz by standard body"
              className="flex items-center gap-1 rounded-lg border border-[#26312D] bg-[#131917] p-1"
            >
              {QUIZ_FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleFilterChange(f.id)}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${
                      active
                        ? 'bg-[#1D2623] text-[#F3F1EC]'
                        : 'text-[#9A958C] hover:text-[#F3F1EC]'
                    }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                onResetQuiz();
                setActiveIdx(0);
              }}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#26312D] bg-[#131917] px-3 py-2 text-xs font-semibold text-[#F3F1EC] transition-colors duration-150 hover:bg-[#18201D] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset Quiz</span>
            </button>
          </div>
        </div>

        {/* Two-Zone Educational Stage */}
        {currentQ && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Zone: Question & Answer Options */}
            <div className="rounded-lg border border-[#26312D] bg-[#131917]/92 p-6 backdrop-blur-[2px] sm:p-8 lg:col-span-7">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#26312D] pb-4 text-xs">
                <div className="flex flex-wrap items-center gap-2 text-[#9A958C]">
                  <span className="font-mono font-semibold text-[#F3F1EC] tabular-nums">
                    Question {safeIdx + 1} of {questions.length}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-semibold text-[#34D399]">
                    {currentQ.categoryLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-[#F3F1EC]">
                    {currentQ.standardCode}
                  </span>
                </div>
              </div>

              <h3 className="mt-5 font-serif text-xl font-semibold leading-snug text-[#F3F1EC] sm:text-2xl">
                {currentQ.question}
              </h3>

              <div className="mt-6 space-y-3" role="radiogroup" aria-label={currentQ.question}>
                {currentQ.options.map((opt, idx) => {
                  const isThisSelected = selectedOption === idx;
                  const isThisCorrect = idx === currentQ.correctIndex;

                  let stateClasses =
                    'border-[#26312D] bg-[#18201D] text-[#D2CEC5] hover:border-[#34D399]/70 hover:text-[#F3F1EC]';
                  if (isAnswered) {
                    if (isThisCorrect) {
                      stateClasses =
                        'border-[#34D399] bg-[#34D399]/12 text-[#F3F1EC]';
                    } else if (isThisSelected && !isThisCorrect) {
                      stateClasses =
                        'border-[#F59E0B] bg-[#F59E0B]/12 text-[#F3F1EC]';
                    } else {
                      stateClasses =
                        'border-[#26312D]/60 bg-[#131917]/60 text-[#78716C]';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswered}
                      onClick={() => onSelectAnswer(currentQ.id, idx)}
                      className={`flex w-full items-start justify-between gap-3 rounded-lg border p-4 text-left text-sm leading-relaxed transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${
                        isAnswered ? 'cursor-default' : 'cursor-pointer'
                      } ${stateClasses}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 font-mono text-xs font-semibold text-[#9A958C]">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span>{opt}</span>
                      </div>

                      {isAnswered && isThisCorrect && (
                        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#34D399]">
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          <span>Correct</span>
                        </span>
                      )}
                      {isAnswered && isThisSelected && !isThisCorrect && (
                        <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-[#FBBF24]">
                          <XCircle className="h-4 w-4" aria-hidden="true" />
                          <span>Incorrect</span>
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Footer */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#26312D] pt-5">
                <div className="flex flex-wrap items-center gap-1.5">
                  {questions.map((q, idx) => {
                    const ans = answers[q.id];
                    const qAnswered = ans !== undefined;
                    const qRight = ans === q.correctIndex;
                    const isCurrent = idx === safeIdx;

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setActiveIdx(idx)}
                        aria-label={`Jump to question ${idx + 1}`}
                        className={`h-8 min-w-8 rounded-md border px-2 font-mono text-xs font-semibold tabular-nums transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${
                          isCurrent
                            ? 'border-[#F3F1EC] bg-[#F3F1EC] text-[#0B0F0E]'
                            : qAnswered
                            ? qRight
                              ? 'border-[#34D399]/50 bg-[#34D399]/14 text-[#6EE7B7]'
                              : 'border-[#F59E0B]/50 bg-[#F59E0B]/14 text-[#FCD34D]'
                            : 'border-[#26312D] bg-[#18201D] text-[#9A958C] hover:text-[#F3F1EC]'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {safeIdx < questions.length - 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveIdx((i) => Math.min(questions.length - 1, i + 1))}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#10B981] px-4 py-2 text-xs font-semibold text-[#052E16] transition-colors duration-150 hover:bg-[#34D399] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Zone: Score Ledger & Authoritative Explanation Deck */}
            <div className="flex flex-col gap-5 lg:col-span-5">
              <div className="rounded-lg border border-[#26312D] bg-[#131917]/92 p-6 backdrop-blur-[2px]">
                <p className="text-xs font-semibold text-[#9A958C]">
                  Session Regulatory Score
                </p>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-mono text-3xl font-semibold text-[#F3F1EC] tabular-nums">
                    {totalCorrect} / {REGULATORY_QUIZ.length}
                  </span>
                  <span className="text-xs text-[#9A958C] tabular-nums">
                    {totalAnswered} of {REGULATORY_QUIZ.length} completed
                  </span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-sm bg-[#1D2623]">
                  <div
                    className="h-full bg-[#34D399] transition-all duration-300"
                    style={{
                      width: `${(totalAnswered / REGULATORY_QUIZ.length) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex-1 rounded-lg border border-[#26312D] bg-[#131917]/92 p-6 backdrop-blur-[2px]">
                <p className="text-xs font-semibold text-[#34D399]">
                  Authoritative Standard Breakdown
                </p>

                {!isAnswered ? (
                  <div className="mt-4 space-y-2 text-sm leading-relaxed text-[#9A958C]">
                    <p>
                      Select an answer option on the left to unlock the authoritative{' '}
                      <span className="font-mono text-[#F3F1EC]">
                        {currentQ.standardCode}
                      </span>{' '}
                      citation, rule explanation, and interview takeaway.
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 space-y-4">
                    <div
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
                        isCorrect ? 'text-[#34D399]' : 'text-[#FBBF24]'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                          <span>Verified Correct · {currentQ.standardCode}</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4" aria-hidden="true" />
                          <span>Review Standard · {currentQ.standardCode}</span>
                        </>
                      )}
                    </div>

                    <p className="text-sm leading-relaxed text-[#D2CEC5]">
                      {currentQ.explanation}
                    </p>

                    <div className="border-t border-[#26312D] pt-4">
                      <p className="text-xs font-semibold text-[#FBBF24]">
                        Practical & Exam Takeaway
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#D2CEC5]">
                        {currentQ.practicalTakeaway}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
