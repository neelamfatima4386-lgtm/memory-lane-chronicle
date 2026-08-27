import { motion } from "motion/react";
import { archive } from "@/config/archive";

export function BirthdayHero({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-28 text-center">
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.9em" }}
        animate={{ opacity: 1, letterSpacing: "0.34em" }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="label-xs"
      >
        {archive.hero.kicker}
      </motion.p>

      <h1 className="mt-8 text-[13vw] font-light leading-[0.92] tracking-[-0.03em] sm:text-[9vw] lg:text-[7.4vw]">
        {archive.hero.title.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%", opacity: 0, filter: "blur(12px)" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 0.4 + i * 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {i === 1 ? <em className="font-serif not-italic text-gradient-gold">{line}</em> : line}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.2 }}
        className="mt-9 font-serif text-lg tracking-[0.3em] text-glow-blue"
      >
        {archive.hero.date}
      </motion.p>

      <div className="mt-10 space-y-1 font-serif text-xl text-foreground/80 sm:text-2xl">
        {archive.hero.line.map((l, i) => (
          <motion.p
            key={l}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.5 + i * 0.3 }}
          >
            {l}
          </motion.p>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 2.3 }}
        className="mt-8 text-sm text-muted-foreground"
      >
        {archive.hero.welcome}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 2.6 }}
        className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground/70"
      >
        {archive.hero.aside}
      </motion.p>

      <motion.button
        onClick={onEnter}
        data-cursor="ENTER"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 3 }}
        className="group mt-16 inline-flex flex-col items-center gap-4"
      >
        <span className="text-[11px] tracking-[0.3em] text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
          {archive.hero.cta}
        </span>
        <motion.span
          animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          className="block h-10 w-px"
          style={{ background: "linear-gradient(180deg,var(--c-violet),transparent)" }}
        />
      </motion.button>
    </section>
  );
}
