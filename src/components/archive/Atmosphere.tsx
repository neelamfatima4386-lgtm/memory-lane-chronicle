import { motion } from "motion/react";

/** Huge blurred light orbs + grain. Sits behind everything. */
export function Atmosphere({ mood = "night" }: { mood?: "night" | "warm" | "deep" }) {
  const orbs =
    mood === "warm"
      ? ["var(--glow-gold)", "var(--glow-violet)", "var(--glow-blush)"]
      : mood === "deep"
        ? ["var(--glow-violet)", "var(--glow-blue)"]
        : ["var(--glow-blue)", "var(--glow-violet)", "var(--glow-blue)"];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[image:var(--gradient-night)]" />
      {orbs.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[120px]"
          style={{
            background: c,
            width: `${38 + i * 12}vmax`,
            height: `${38 + i * 12}vmax`,
            left: `${[-10, 55, 20][i % 3]}%`,
            top: `${[-15, 30, 70][i % 3]}%`,
            opacity: mood === "deep" ? 0.24 : 0.35,
          }}
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 25, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{ duration: 46 + i * 11, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-soft-light bg-[image:var(--grain)] bg-repeat" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,oklch(0.05_0.01_280/0.85)_100%)]" />
    </div>
  );
}

const SYMBOLS = ["🎂", "🎈", "✨", "🎁", "🎉", "⭐"];

/** Very faint drifting birthday symbols. Deliberately barely visible. */
export function FloatingBirthdayElements({ density = 7 }: { density?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 1 }}>
      {Array.from({ length: density }).map((_, i) => {
        const s = SYMBOLS[i % SYMBOLS.length];
        const left = (i * 13.7 + 6) % 92;
        return (
          <motion.span
            key={i}
            className="absolute select-none blur-[1px]"
            style={{ left: `${left}%`, fontSize: `${12 + (i % 3) * 6}px`, opacity: 0.14 }}
            initial={{ y: "110vh" }}
            animate={{ y: "-15vh", rotate: [0, i % 2 ? 18 : -18, 0] }}
            transition={{
              duration: 38 + (i % 5) * 9,
              repeat: Infinity,
              delay: i * 4,
              ease: "linear",
            }}
          >
            {s}
          </motion.span>
        );
      })}
    </div>
  );
}
