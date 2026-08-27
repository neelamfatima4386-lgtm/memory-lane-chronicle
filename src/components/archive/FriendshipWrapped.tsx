import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { archive, wrappedStats, type WrappedStat } from "@/config/archive";

function CountUp({ to, suffix }: { to: number; suffix?: string | undefined }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix ?? ""}
    </span>
  );
}

function StatCard({ stat, index }: { stat: WrappedStat; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="glass group relative overflow-hidden rounded-2xl px-6 py-10 text-center transition-shadow duration-700 hover:shadow-[0_0_60px_-20px_var(--glow-gold)]"
    >
      <div
        className="pointer-events-none absolute inset-x-8 -top-px h-px opacity-60"
        style={{ background: "linear-gradient(90deg,transparent,var(--c-gold),transparent)" }}
      />
      <p className="font-serif text-4xl leading-none text-gradient-gold sm:text-5xl">
        {typeof stat.countTo === "number" ? (
          <CountUp to={stat.countTo} suffix={stat.suffix} />
        ) : (
          stat.value
        )}
      </p>
      <p className="mt-5 label-xs">{stat.label}</p>
    </motion.div>
  );
}

export function FriendshipWrapped({ onContinue }: { onContinue: () => void }) {
  return (
    <section className="relative px-5 py-28 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="label-xs"
        >
          {archive.wrapped.label}
        </motion.p>
        <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          {archive.wrapped.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          {archive.wrapped.subheading}
        </p>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wrappedStats.map((s, i) => (
            <StatCard key={s.label} stat={s} index={i} />
          ))}
        </div>

        <button
          onClick={onContinue}
          data-cursor="NEXT"
          className="group mt-20 inline-flex flex-col items-center gap-4"
        >
          <span className="text-[11px] tracking-[0.3em] text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
            ONE MORE THING
          </span>
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="block h-10 w-px"
            style={{ background: "linear-gradient(180deg,var(--c-gold),transparent)" }}
          />
        </button>
      </div>
    </section>
  );
}
