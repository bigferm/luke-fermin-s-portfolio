import { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import { CPA_SECTIONS } from '../data/prepData';
import { CpaSectionInfo } from '../types/editorial';
import { EditorialImage } from './EditorialImage';

interface CpaStudySectionProps {
  checkedTopics: string[];
  onToggleTopic: (topicKey: string) => void;
}

export function CpaStudySection({
  checkedTopics,
  onToggleTopic,
}: CpaStudySectionProps) {
  const [selectedCode, setSelectedCode] = useState<CpaSectionInfo['code']>('FAR');
  const [weeklyHours, setWeeklyHours] = useState<number>(18);

  const activeSection =
    CPA_SECTIONS.find((s) => s.code === selectedCode) ?? CPA_SECTIONS[0];

  const estimatedWeeks = Math.max(
    1,
    Math.ceil(activeSection.recommendedHours / weeklyHours)
  );
  const mcqHours = Math.round(weeklyHours * 0.6);
  const tbsHours = weeklyHours - mcqHours;

  const sectionCompletedCount = activeSection.checklistTopics.filter((topic) =>
    checkedTopics.includes(`${activeSection.code}::${topic}`)
  ).length;

  return (
    <section
      id="cpa-prep"
      className="border-b border-[#26312D] bg-[#0F1412]/70 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-[#26312D] pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-wide text-[#34D399]">
              04. CPA Evolution Study Desk
            </p>
            <h2 className="mt-1.5 font-serif text-3xl font-bold tracking-tight text-[#F3F1EC]">
              CPA Exam Blueprints, Mnemonics & Pace Planner
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9A958C]">
              Navigate the three Core sections (FAR, AUD, REG) and three Disciplines (BAR, ISC, TCP) with high-yield memory anchors, Task-Based Simulation strategy, and a realistic weekly study calendar.
            </p>
          </div>

          {/* Section Selector Buttons */}
          <div
            role="tablist"
            aria-label="CPA exam sections"
            className="flex flex-wrap items-center gap-1 rounded-lg border border-[#26312D] bg-[#131917] p-1 self-start lg:self-auto"
          >
            {CPA_SECTIONS.map((sec) => {
              const active = sec.code === activeSection.code;
              return (
                <button
                  key={sec.code}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCode(sec.code)}
                  className={`rounded-md px-3 py-1.5 font-mono text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${
                    active
                      ? 'bg-[#1D2623] text-[#F3F1EC]'
                      : 'text-[#9A958C] hover:text-[#F3F1EC]'
                  }`}
                >
                  {sec.code}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Column: Blueprint, Mnemonics & Checklist */}
          <div className="space-y-6 lg:col-span-7">
            <div className="rounded-lg border border-[#26312D] bg-[#131917]/92 p-6 backdrop-blur-[2px] sm:p-8">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#9A958C]">
                <span className="font-semibold text-[#34D399]">
                  {activeSection.group} Section
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-[#F3F1EC]">
                  Target ~{activeSection.recommendedHours} study hrs
                </span>
              </div>

              <h3 className="mt-2 font-serif text-2xl font-bold text-[#F3F1EC]">
                {activeSection.code}: {activeSection.title}
              </h3>
              <p className="mt-1.5 text-sm text-[#9A958C]">
                {activeSection.passRateContext}
              </p>

              {/* Blueprint Weights */}
              <div className="mt-6 border-t border-[#26312D] pt-5">
                <p className="text-xs font-semibold text-[#F3F1EC]">
                  AICPA Blueprint Content Weighting
                </p>
                <dl className="mt-3 divide-y divide-[#26312D] border-y border-[#26312D]">
                  {activeSection.blueprintAreas.map((area) => (
                    <div
                      key={area.name}
                      className="flex items-center justify-between gap-4 py-2.5 text-sm"
                    >
                      <dt className="text-[#D2CEC5]">{area.name}</dt>
                      <dd className="shrink-0 font-mono text-xs font-semibold text-[#34D399] tabular-nums">
                        {area.weight}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* High-Yield Mnemonics */}
              <div className="mt-6">
                <p className="text-xs font-semibold text-[#34D399]">
                  High-Yield Mnemonics & Rules
                </p>
                <div className="mt-3 space-y-3">
                  {activeSection.mnemonics.map((m) => (
                    <div
                      key={m.title}
                      className="rounded-md border border-[#26312D] bg-[#18201D] p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-sm font-semibold text-[#F3F1EC]">
                          {m.title}
                        </span>
                        <span className="text-xs font-medium text-[#9A958C]">
                          {m.rule}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#D2CEC5]">
                        {m.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* TBS Execution Strategy */}
              <div className="mt-6 border-t border-[#26312D] pt-5">
                <p className="text-xs font-semibold text-[#FBBF24]">
                  Task-Based Simulation (TBS) Strategy
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#D2CEC5]">
                  {activeSection.tbsStrategy}
                </p>
              </div>
            </div>

            {/* Interactive Topic Readiness Checklist */}
            <div className="rounded-lg border border-[#26312D] bg-[#131917]/92 p-6 backdrop-blur-[2px]">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-serif text-lg font-semibold text-[#F3F1EC]">
                  {activeSection.code} High-Yield Topic Checklist
                </h4>
                <span className="font-mono text-xs text-[#34D399] tabular-nums">
                  {sectionCompletedCount} / {activeSection.checklistTopics.length} covered
                </span>
              </div>

              <div className="mt-4 space-y-2">
                {activeSection.checklistTopics.map((topic) => {
                  const key = `${activeSection.code}::${topic}`;
                  const checked = checkedTopics.includes(key);

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => onToggleTopic(key)}
                      className={`flex w-full items-center gap-3 rounded-md border px-3.5 py-2.5 text-left text-sm transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] ${
                        checked
                          ? 'border-[#34D399]/50 bg-[#34D399]/10 text-[#F3F1EC]'
                          : 'border-[#26312D] bg-[#18201D] text-[#D2CEC5] hover:bg-[#1D2623]'
                      }`}
                    >
                      {checked ? (
                        <CheckSquare
                          className="h-4 w-4 shrink-0 text-[#34D399]"
                          aria-hidden="true"
                        />
                      ) : (
                        <Square
                          className="h-4 w-4 shrink-0 text-[#9A958C]"
                          aria-hidden="true"
                        />
                      )}
                      <span className={checked ? 'line-through decoration-[#34D399]/60' : ''}>
                        {topic}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Study Pace Calculator & Editorial Study Photo */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-lg border border-[#26312D] bg-[#131917]/92 p-6 backdrop-blur-[2px]">
              <p className="text-xs font-semibold text-[#34D399]">
                Study Pace Calculator
              </p>
              <h4 className="mt-1 font-serif text-xl font-bold text-[#F3F1EC]">
                Plan Your {activeSection.code} Exam Timeline
              </h4>

              <div className="mt-5">
                <div className="flex items-center justify-between text-sm">
                  <label htmlFor="cpa-hours-slider" className="font-medium text-[#F3F1EC]">
                    Weekly Study Commitment
                  </label>
                  <span className="font-mono font-semibold text-[#34D399] tabular-nums">
                    {weeklyHours} hrs / week
                  </span>
                </div>

                <input
                  id="cpa-hours-slider"
                  type="range"
                  min={10}
                  max={35}
                  step={1}
                  value={weeklyHours}
                  onChange={(e) => setWeeklyHours(Number(e.target.value))}
                  className="mt-3 w-full accent-[#34D399] cursor-pointer"
                />

                <div className="mt-1 flex justify-between font-mono text-[11px] text-[#9A958C] tabular-nums">
                  <span>10 hrs (Working)</span>
                  <span>20 hrs (Balanced)</span>
                  <span>35 hrs (Full-Time)</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#26312D] pt-5">
                <div className="rounded-md border border-[#26312D] bg-[#18201D] p-3.5">
                  <p className="text-xs text-[#9A958C]">Estimated Timeline</p>
                  <p className="mt-1 font-mono text-2xl font-semibold text-[#F3F1EC] tabular-nums">
                    {estimatedWeeks} wks
                  </p>
                </div>
                <div className="rounded-md border border-[#26312D] bg-[#18201D] p-3.5">
                  <p className="text-xs text-[#9A958C]">Recommended Split</p>
                  <p className="mt-1 font-mono text-sm font-semibold text-[#34D399] tabular-nums">
                    {mcqHours}h MCQ · {tbsHours}h TBS
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#9A958C]">
                    60% Concept Drills / 40% Sims
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#9A958C]">
                Reserve the final 10–14 days before your Prometric date strictly for cumulative mixed MCQ sets (30-question blocks) and timed full-length simulated exams.
              </p>
            </div>

            <EditorialImage
              src="/src/assets/images/cpa_interview_study_1795061943834.jpg"
              alt="Quiet library study desk with brass banker lamp, accounting textbook, financial calculator, and grid notebook"
              caption="Consistent 90-minute morning study blocks beat weekend cramming—especially when balancing campus recruiting and busy-season internships."
              aspectClass="aspect-[4/3]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
