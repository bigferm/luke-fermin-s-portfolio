import { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp, Circle } from 'lucide-react';
import { STAR_PROMPTS, TECHNICAL_QUESTIONS } from '../data/prepData';
import { TechnicalTrack } from '../types/editorial';

export interface StarDraft {
  situation: string;
  task: string;
  action: string;
  result: string;
}

interface InterviewPrepSectionProps {
  starDrafts: Record<string, StarDraft>;
  onUpdateStarDraft: (promptId: string, field: keyof StarDraft, value: string) => void;
  masteredTechIds: string[];
  onToggleMasteredTech: (id: string) => void;
}

type PrepTab = 'star' | 'technicals';

const TRACK_FILTERS: { id: 'all' | TechnicalTrack; label: string }[] = [
  { id: 'all', label: 'All Tracks' },
  { id: 'finance', label: 'Finance & IB' },
  { id: 'accounting', label: 'Accounting & Audit' },
  { id: 'consulting', label: 'Consulting Cases' },
];

function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

export function InterviewPrepSection({
  starDrafts,
  onUpdateStarDraft,
  masteredTechIds,
  onToggleMasteredTech,
}: InterviewPrepSectionProps) {
  const [activeTab, setActiveTab] = useState<PrepTab>('star');
  const [selectedPromptId, setSelectedPromptId] = useState<string>(STAR_PROMPTS[0].id);
  const [showModelStar, setShowModelStar] = useState(true);

  const [techTrack, setTechTrack] = useState<'all' | TechnicalTrack>('all');
  const [revealedTechIds, setRevealedTechIds] = useState<string[]>([
    TECHNICAL_QUESTIONS[0].id,
  ]);

  const activePrompt =
    STAR_PROMPTS.find((p) => p.id === selectedPromptId) ?? STAR_PROMPTS[0];

  const currentDraft: StarDraft = starDrafts[activePrompt.id] ?? {
    situation: '',
    task: '',
    action: '',
    result: '',
  };

  const sWords = countWords(currentDraft.situation);
  const tWords = countWords(currentDraft.task);
  const aWords = countWords(currentDraft.action);
  const rWords = countWords(currentDraft.result);
  const totalWords = sWords + tWords + aWords + rWords;
  const actionShare = totalWords > 0 ? Math.round((aWords / totalWords) * 100) : 0;

  const filteredTechs = TECHNICAL_QUESTIONS.filter(
    (q) => techTrack === 'all' || q.track === techTrack
  );

  const toggleRevealTech = (id: string) => {
    setRevealedTechIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="interviews" className="border-b border-[#26312D] py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-[#26312D] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#34D399]">
              03. Recruiting & Superday Readiness
            </p>
            <h2 className="mt-1.5 font-serif text-3xl font-bold tracking-tight text-[#F3F1EC]">
              STAR Method Workshop & Technical Interview Vault
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9A958C]">
              Practice structured behavioral storytelling for internship superdays and drill the core technicals tested in investment banking, Big 4 audit/tax, and management consulting interviews.
            </p>
          </div>

          {/* Primary Mode Switch */}
          <div
            role="tablist"
            aria-label="Interview preparation modules"
            className="flex items-center gap-1 rounded-lg border border-[#26312D] bg-[#131917] p-1 self-start lg:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'star'}
              onClick={() => setActiveTab('star')}
              className={`rounded-md px-4 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${
                activeTab === 'star'
                  ? 'bg-[#1D2623] text-[#F3F1EC]'
                  : 'text-[#9A958C] hover:text-[#F3F1EC]'
              }`}
            >
              STAR Behavioral Prep
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'technicals'}
              onClick={() => setActiveTab('technicals')}
              className={`rounded-md px-4 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${
                activeTab === 'technicals'
                  ? 'bg-[#1D2623] text-[#F3F1EC]'
                  : 'text-[#9A958C] hover:text-[#F3F1EC]'
              }`}
            >
              Technical Vault ({masteredTechIds.length}/{TECHNICAL_QUESTIONS.length})
            </button>
          </div>
        </div>

        {/* TAB 1: STAR METHOD WORKSHOP */}
        {activeTab === 'star' && (
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Sidebar: Prompt Selector & Pacing Rule */}
            <div className="space-y-5 lg:col-span-4">
              <div className="rounded-lg border border-[#26312D] bg-[#131917]/92 p-5 backdrop-blur-[2px]">
                <p className="text-xs font-semibold text-[#34D399]">
                  Target Time & Word Pacing
                </p>
                <p className="mt-1.5 text-sm font-medium text-[#F3F1EC]">
                  15% Situation · 20% Task · 50% Action · 15% Result
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#9A958C]">
                  Aim for 90–120 seconds total (~180–240 words). Most students lose offers by spending half their answer on backstory instead of concrete analytical actions.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-[#9A958C]">
                  Select Behavioral Prompt
                </p>
                {STAR_PROMPTS.map((prompt) => {
                  const active = prompt.id === activePrompt.id;
                  const draft = starDrafts[prompt.id];
                  const hasDraft =
                    draft &&
                    (draft.situation.trim() ||
                      draft.task.trim() ||
                      draft.action.trim() ||
                      draft.result.trim());

                  return (
                    <button
                      key={prompt.id}
                      type="button"
                      onClick={() => setSelectedPromptId(prompt.id)}
                      className={`w-full rounded-lg border p-4 text-left backdrop-blur-[2px] transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${
                        active
                          ? 'border-[#34D399] bg-[#18201D]/95'
                          : 'border-[#26312D] bg-[#131917]/88 hover:bg-[#18201D]/95'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-semibold text-[#34D399]">
                          {prompt.roleTrack}
                        </span>
                        {hasDraft && (
                          <span className="font-mono text-[11px] text-[#9A958C]">
                            Draft saved
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm font-medium leading-snug text-[#F3F1EC]">
                        {prompt.question}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Workspace: Model STAR Breakdown & Live Scratchpad */}
            <div className="space-y-6 lg:col-span-8">
              <div className="rounded-lg border border-[#26312D] bg-[#131917]/92 p-6 backdrop-blur-[2px] sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#26312D] pb-5">
                  <div>
                    <p className="text-xs font-semibold text-[#34D399]">
                      {activePrompt.roleTrack}
                    </p>
                    <h3 className="mt-1 font-serif text-xl font-bold text-[#F3F1EC] sm:text-2xl">
                      {activePrompt.question}
                    </h3>
                    <p className="mt-2 text-xs text-[#9A958C]">
                      <span className="font-semibold text-[#F3F1EC]">What interviewers test: </span>
                      {activePrompt.whatInterviewersTest}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowModelStar((prev) => !prev)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[#26312D] bg-[#18201D] px-3 py-1.5 text-xs font-semibold text-[#F3F1EC] hover:bg-[#1F2925] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {showModelStar ? 'Hide Model Breakdown' : 'Show Model Breakdown'}
                  </button>
                </div>

                {showModelStar && (
                  <div className="mt-5 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="rounded-md border border-[#26312D] bg-[#18201D] p-4">
                        <p className="font-mono text-xs font-semibold text-[#34D399]">
                          S · SITUATION (15%)
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#D2CEC5]">
                          {activePrompt.modelStar.situation}
                        </p>
                      </div>
                      <div className="rounded-md border border-[#26312D] bg-[#18201D] p-4">
                        <p className="font-mono text-xs font-semibold text-[#34D399]">
                          T · TASK (20%)
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#D2CEC5]">
                          {activePrompt.modelStar.task}
                        </p>
                      </div>
                      <div className="rounded-md border border-[#26312D] bg-[#18201D] p-4 sm:col-span-2">
                        <p className="font-mono text-xs font-semibold text-[#34D399]">
                          A · ACTION — YOUR OWNERSHIP & ANALYSIS (50%)
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#D2CEC5]">
                          {activePrompt.modelStar.action}
                        </p>
                      </div>
                      <div className="rounded-md border border-[#26312D] bg-[#18201D] p-4 sm:col-span-2">
                        <p className="font-mono text-xs font-semibold text-[#34D399]">
                          R · QUANTIFIED RESULT (15%)
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed text-[#D2CEC5]">
                          {activePrompt.modelStar.result}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-[#FBBF24]">
                      <span className="font-semibold">Common Trap to Avoid: </span>
                      <span className="text-[#D2CEC5]">{activePrompt.redFlag}</span>
                    </p>
                  </div>
                )}

                {/* Interactive Student Draft Builder */}
                <div className="mt-6 border-t border-[#26312D] pt-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-[#F3F1EC]">
                        Draft Your Own STAR Story
                      </h4>
                      <p className="text-xs text-[#9A958C]">
                        Drafts save automatically in your browser. Aim for Action ≥ 45% of total words.
                      </p>
                    </div>
                    <div className="font-mono text-xs text-[#F3F1EC] tabular-nums">
                      Total: {totalWords} words · Action share:{' '}
                      <span
                        className={
                          actionShare >= 45
                            ? 'font-semibold text-[#34D399]'
                            : 'font-semibold text-[#FBBF24]'
                        }
                      >
                        {actionShare}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="star-situation"
                        className="flex items-center justify-between text-xs font-semibold text-[#F3F1EC]"
                      >
                        <span>Situation</span>
                        <span className="font-mono font-normal text-[#9A958C] tabular-nums">
                          {sWords} words
                        </span>
                      </label>
                      <textarea
                        id="star-situation"
                        rows={3}
                        value={currentDraft.situation}
                        onChange={(e) =>
                          onUpdateStarDraft(activePrompt.id, 'situation', e.target.value)
                        }
                        placeholder="Club, internship, or class context in 1–2 crisp sentences..."
                        className="mt-1.5 w-full rounded-md border border-[#26312D] bg-[#0F1412] p-3 text-sm text-[#F3F1EC] placeholder:text-[#78716C] focus:border-[#34D399] focus:bg-[#18201D] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="star-task"
                        className="flex items-center justify-between text-xs font-semibold text-[#F3F1EC]"
                      >
                        <span>Task</span>
                        <span className="font-mono font-normal text-[#9A958C] tabular-nums">
                          {tWords} words
                        </span>
                      </label>
                      <textarea
                        id="star-task"
                        rows={3}
                        value={currentDraft.task}
                        onChange={(e) =>
                          onUpdateStarDraft(activePrompt.id, 'task', e.target.value)
                        }
                        placeholder="Your specific responsibility, deadline, or constraint..."
                        className="mt-1.5 w-full rounded-md border border-[#26312D] bg-[#0F1412] p-3 text-sm text-[#F3F1EC] placeholder:text-[#78716C] focus:border-[#34D399] focus:bg-[#18201D] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="star-action"
                        className="flex items-center justify-between text-xs font-semibold text-[#F3F1EC]"
                      >
                        <span>Action (Use "I", not "We")</span>
                        <span className="font-mono font-normal text-[#9A958C] tabular-nums">
                          {aWords} words
                        </span>
                      </label>
                      <textarea
                        id="star-action"
                        rows={3}
                        value={currentDraft.action}
                        onChange={(e) =>
                          onUpdateStarDraft(activePrompt.id, 'action', e.target.value)
                        }
                        placeholder="Step-by-step analysis, spreadsheet/audit check, or stakeholder conversation you led..."
                        className="mt-1.5 w-full rounded-md border border-[#26312D] bg-[#0F1412] p-3 text-sm text-[#F3F1EC] placeholder:text-[#78716C] focus:border-[#34D399] focus:bg-[#18201D] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="star-result"
                        className="flex items-center justify-between text-xs font-semibold text-[#F3F1EC]"
                      >
                        <span>Result (Quantified Outcome)</span>
                        <span className="font-mono font-normal text-[#9A958C] tabular-nums">
                          {rWords} words
                        </span>
                      </label>
                      <textarea
                        id="star-result"
                        rows={2}
                        value={currentDraft.result}
                        onChange={(e) =>
                          onUpdateStarDraft(activePrompt.id, 'result', e.target.value)
                        }
                        placeholder="Hours saved, % error reduced, deal recommendation outcome, or repeatable template created..."
                        className="mt-1.5 w-full rounded-md border border-[#26312D] bg-[#0F1412] p-3 text-sm text-[#F3F1EC] placeholder:text-[#78716C] focus:border-[#34D399] focus:bg-[#18201D] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TECHNICAL INTERVIEW VAULT */}
        {activeTab === 'technicals' && (
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div
                role="tablist"
                aria-label="Filter technical questions by track"
                className="flex flex-wrap items-center gap-1 rounded-lg border border-[#26312D] bg-[#131917] p-1"
              >
                {TRACK_FILTERS.map((tf) => {
                  const active = techTrack === tf.id;
                  return (
                    <button
                      key={tf.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTechTrack(tf.id)}
                      className={`rounded-md px-3.5 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${
                        active
                          ? 'bg-[#1D2623] text-[#F3F1EC]'
                          : 'text-[#9A958C] hover:text-[#F3F1EC]'
                      }`}
                    >
                      {tf.label}
                    </button>
                  );
                })}
              </div>

              <span className="font-mono text-xs text-[#9A958C] tabular-nums">
                {masteredTechIds.length} of {TECHNICAL_QUESTIONS.length} technicals mastered
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
              {filteredTechs.map((item) => {
                const isRevealed = revealedTechIds.includes(item.id);
                const isMastered = masteredTechIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-lg border border-[#26312D] bg-[#131917]/92 p-6 backdrop-blur-[2px]"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 text-[#9A958C]">
                          <span className="font-semibold text-[#34D399]">
                            {item.trackLabel}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{item.difficulty}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onToggleMasteredTech(item.id)}
                          className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                            isMastered
                              ? 'border-[#34D399]/60 bg-[#34D399]/12 text-[#6EE7B7]'
                              : 'border-[#26312D] bg-[#18201D] text-[#9A958C] hover:text-[#F3F1EC]'
                          }`}
                        >
                          {isMastered ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Mastered</span>
                            </>
                          ) : (
                            <>
                              <Circle className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Mark Mastered</span>
                            </>
                          )}
                        </button>
                      </div>

                      <h3 className="mt-3 font-serif text-lg font-bold leading-snug text-[#F3F1EC]">
                        {item.question}
                      </h3>

                      {isRevealed && (
                        <div className="mt-4 space-y-3 border-t border-[#26312D] pt-4">
                          <p className="text-sm leading-relaxed text-[#D2CEC5]">
                            {item.answer}
                          </p>
                          <div className="rounded-md border border-[#26312D] bg-[#18201D] px-3.5 py-2.5 font-mono text-xs font-medium text-[#6EE7B7]">
                            {item.keyFormulaOrRule}
                          </div>
                          <p className="text-xs leading-relaxed text-[#D2CEC5]">
                            <span className="font-semibold text-[#FBBF24]">Follow-Up Trap: </span>
                            {item.followUpTrap}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 pt-2">
                      <button
                        type="button"
                        onClick={() => toggleRevealTech(item.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#34D399] hover:text-[#6EE7B7] hover:underline hover:underline-offset-4 cursor-pointer"
                      >
                        {isRevealed ? (
                          <>
                            <span>Hide Model Answer</span>
                            <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                          </>
                        ) : (
                          <>
                            <span>Reveal Model Answer & Formula</span>
                            <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
