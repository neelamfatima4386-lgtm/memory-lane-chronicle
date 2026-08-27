import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { archive } from "@/config/archive";

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

function Digit({ char }: { char: string }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-top">
      <AnimatePresence initial={false}>
        <motion.span
          key={char}
          initial={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Panel({ value, label, frozen }: { value: number; label: string; frozen: boolean }) {
  const str = String(value).padStart(2, "0");
  return (
    <motion.div
      animate={frozen ? { scale: 0.97, opacity: 0.5, filter: "blur(3px)" } : {}}
      transition={{ duration: 1.2 }}
      className="glass relative flex flex-col items-center rounded-2xl px-3 py-5 sm:px-7 sm:py-8"
    >
      <div
        className="pointer-events-none absolute inset-x-6 -top-px h-px"
        style={{ background: "linear-gradient(90deg,transparent,var(--c-violet),transparent)", opacity: 0.5 }}
      />
      <div className="flex font-serif text-4xl tabular-nums leading-none sm:text-6xl md:text-7xl">
        {str.split("").map((c, i) => (
          <Digit key={i} char={c} />
        ))}
      </div>
      <p className="label-xs mt-4 text-[9px] sm:text-[10px]">{label}</p>
    </motion.div>
  );
}

interface Props {
  targetMs: number;
  onComplete: () => void;
  onIntensity: (v: number) => void;
}

export function MidnightCountdown({ targetMs, onComplete, onIntensity }: Props) {
  const [now, setNow] = useState(() => Date.now());
  const [stage, setStage] = useState<"tick" | "unlock">("tick");
  const done = useRef(false);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = targetMs - now;
  const t = useMemo(() => parts(remaining), [remaining]);

  useEffect(() => {
    if (remaining > 0 || done.current) return;
    done.current = true;
    setStage("unlock");
    onIntensity(4);
    const id = window.setTimeout(() => {
      onIntensity(1);
      onComplete();
    }, 5200);
    return () => window.clearTimeout(id);
  }, [remaining, onComplete, onIntensity]);

  const unlocking = stage === "unlock";

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center px-5 py-24">
      {/* darkening veil + expanding glow for the unlock sequence */}
      <AnimatePresence>
        {unlocking ? (
          <>
            <motion.div
              className="pointer-events-none fixed inset-0 bg-ink"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.92 }}
              transition={{ duration: 2, delay: 0.6 }}
              style={{ zIndex: 5 }}
            />
            <motion.div
              className="pointer-events-none fixed left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                zIndex: 6,
                background:
                  "radial-gradient(circle, oklch(1 0 0 / 0.9), var(--c-violet) 40%, transparent 70%)",
                filter: "blur(30px)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 26], opacity: [0, 0.9, 1] }}
              transition={{ duration: 4.4, delay: 1.4, ease: [0.7, 0, 0.3, 1] }}
            />
          </>
        ) : null}
      </AnimatePresence>

      <motion.div
        animate={unlocking ? { opacity: 0, filter: "blur(24px)", scale: 1.06 } : {}}
        transition={{ duration: 2.6, delay: 1.2 }}
        className="relative w-full max-w-4xl text-center"
        style={{ zIndex: 7 }}
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="label-xs"
        >
          02 / MIDNIGHT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, filter: "blur(14px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.3 }}
          className="mx-auto mt-7 max-w-2xl text-balance text-2xl font-light leading-tight tracking-[0.06em] sm:text-4xl"
        >
          {archive.countdown.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.9 }}
          className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground"
        >
          {archive.countdown.subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 grid grid-cols-4 gap-2 sm:gap-4"
        >
          <Panel value={t.days} label="DAYS" frozen={unlocking} />
          <Panel value={t.hours} label="HOURS" frozen={unlocking} />
          <Panel value={t.minutes} label="MINUTES" frozen={unlocking} />
          <Panel value={t.seconds} label="SECONDS" frozen={unlocking} />
        </motion.div>

        <p className="mt-10 text-[10px] tracking-[0.3em] text-muted-foreground/60">
          28.08.2026 — 00:00 PKT
        </p>
      </motion.div>
    </section>
  );
}
