interface TopNavProps {
  scrollProgress: number;
  savedCount: number;
  onOpenSaved: () => void;
}

export function TopNav({ scrollProgress, savedCount, onOpenSaved }: TopNavProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#26312D] bg-[#0B0F0E]/88 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="font-serif text-xl font-bold tracking-tight text-[#F3F1EC] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34D399]"
        >
          The Daily Debit
        </a>

        <nav
          aria-label="Primary sections"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#9A958C]"
        >
          <a
            href="#briefing"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#F3F1EC] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34D399]"
          >
            Briefing
          </a>
          <a
            href="#dispatches"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#F3F1EC] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34D399]"
          >
            Dispatches
          </a>
          <a
            href="#reg-quiz"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#F3F1EC] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34D399]"
          >
            Reg Quiz
          </a>
          <a
            href="#interviews"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#F3F1EC] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34D399]"
          >
            Interviews
          </a>
          <a
            href="#cpa-prep"
            className="whitespace-nowrap shrink-0 py-1 transition-colors duration-150 hover:text-[#F3F1EC] hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#34D399]"
          >
            CPA Prep
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenSaved}
            className="inline-flex items-center justify-center rounded-md bg-[#10B981] px-4 py-2 text-xs font-semibold text-[#052E16] transition-colors duration-150 hover:bg-[#34D399] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399] cursor-pointer"
          >
            Saved Briefs (<span className="tabular-nums">{savedCount}</span>)
          </button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="h-[2px] w-full bg-[#1C2421]"
      >
        <div
          className="h-full origin-left bg-[#34D399] transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${Math.min(1, Math.max(0, scrollProgress))})` }}
        />
      </div>
    </header>
  );
}
