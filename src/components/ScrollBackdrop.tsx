import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';

export function ScrollBackdrop() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Parallax transforms driven purely by compositor properties (transform & opacity)
  const gridY = useTransform(smoothProgress, [0, 1], ['0%', '-10%']);
  const primaryGlowX = useTransform(smoothProgress, [0, 0.5, 1], ['-12%', '28%', '-6%']);
  const primaryGlowY = useTransform(smoothProgress, [0, 0.5, 1], ['-8%', '34%', '68%']);
  const secondaryGlowX = useTransform(smoothProgress, [0, 0.5, 1], ['64%', '16%', '58%']);
  const secondaryGlowY = useTransform(smoothProgress, [0, 0.5, 1], ['18%', '56%', '12%']);

  const curveShiftX = useTransform(smoothProgress, [0, 1], ['0%', '-14%']);
  const curveShiftY = useTransform(smoothProgress, [0, 1], ['0%', '8%']);
  const ringRotate = useTransform(smoothProgress, [0, 1], [0, 52]);
  const ringScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.12, 0.96]);
  const arcPathProgress = useTransform(smoothProgress, [0, 1], [0.22, 1]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0B0F0E]"
    >
      {/* 1. Architectural Ledger Grid drifting softly with scroll */}
      <motion.div
        style={prefersReduced ? undefined : { y: gridY }}
        className="absolute -inset-x-0 -top-[12%] h-[128%] opacity-100 will-change-transform"
      >
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(52, 211, 153, 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(52, 211, 153, 0.04) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </motion.div>

      {/* 2. Dynamic Atmospheric Blooms (Emerald Ledger & Warm Amber) */}
      <motion.div
        style={
          prefersReduced
            ? { x: '0%', y: '0%' }
            : { x: primaryGlowX, y: primaryGlowY }
        }
        className="absolute top-0 left-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.16)_0%,rgba(16,185,129,0.04)_45%,transparent_72%)] blur-2xl will-change-transform"
      />

      <motion.div
        style={
          prefersReduced
            ? { x: '55%', y: '25%' }
            : { x: secondaryGlowX, y: secondaryGlowY }
        }
        className="absolute top-0 left-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,rgba(245,158,11,0.03)_45%,transparent_72%)] blur-2xl will-change-transform"
      />

      {/* 3. Scroll-Reactive Financial Curves & Compass Ring Geometry */}
      <motion.svg
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        style={
          prefersReduced
            ? undefined
            : { x: curveShiftX, y: curveShiftY }
        }
        className="absolute -left-[8%] top-0 h-[112%] w-[124%] will-change-transform"
      >
        {/* Subtle horizontal reference baselines */}
        <line
          x1="0"
          y1="260"
          x2="1600"
          y2="260"
          stroke="rgba(243, 241, 236, 0.04)"
          strokeDasharray="4 8"
        />
        <line
          x1="0"
          y1="560"
          x2="1600"
          y2="560"
          stroke="rgba(243, 241, 236, 0.04)"
          strokeDasharray="4 8"
        />

        {/* Primary Yield-Curve Trajectory */}
        <motion.path
          d="M -60 660 C 180 610, 320 430, 560 465 C 790 498, 920 270, 1180 295 C 1340 310, 1490 190, 1660 155"
          stroke="rgba(52, 211, 153, 0.22)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={prefersReduced ? undefined : { pathLength: arcPathProgress }}
        />

        {/* Secondary Benchmark Spread Curve */}
        <motion.path
          d="M -40 735 C 230 715, 380 560, 650 580 C 890 598, 1060 410, 1310 425 C 1460 435, 1570 330, 1680 305"
          stroke="rgba(245, 158, 11, 0.14)"
          strokeWidth="1.25"
          strokeDasharray="6 6"
        />

        {/* Tertiary Lower Envelope */}
        <path
          d="M -80 420 C 180 370, 440 390, 690 290 C 920 198, 1160 220, 1560 110"
          stroke="rgba(243, 241, 236, 0.06)"
          strokeWidth="1"
        />
      </motion.svg>

      {/* 4. Rotating Architectural Compass Accent in Upper-Right Margin */}
      <motion.div
        style={
          prefersReduced
            ? undefined
            : { rotate: ringRotate, scale: ringScale }
        }
        className="absolute -top-24 -right-24 h-[460px] w-[460px] will-change-transform"
      >
        <svg viewBox="0 0 400 400" fill="none" className="h-full w-full">
          <circle
            cx="200"
            cy="200"
            r="175"
            stroke="rgba(52, 211, 153, 0.10)"
            strokeWidth="1"
            strokeDasharray="3 7"
          />
          <circle
            cx="200"
            cy="200"
            r="128"
            stroke="rgba(243, 241, 236, 0.06)"
            strokeWidth="1"
          />
          <line
            x1="200"
            y1="14"
            x2="200"
            y2="386"
            stroke="rgba(52, 211, 153, 0.06)"
            strokeWidth="1"
          />
          <line
            x1="14"
            y1="200"
            x2="386"
            y2="200"
            stroke="rgba(52, 211, 153, 0.06)"
            strokeWidth="1"
          />
        </svg>
      </motion.div>
    </div>
  );
}
