import { motion } from "motion/react";
import { archive } from "@/config/archive";

export function FinalReveal({ onReplay }: { onReplay: () => void }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-28 text-center">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4 }}
        className="label-xs"
      >
        {archive.final.label}
      </motion.p>

      <div className="mt-12 space-y-4">
        {archive.final.lines.map((line, i) => (
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, delay: 0.3 + i * 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-xl leading-relaxed text-foreground/85 sm:text-2xl"
          >
            {line}
          </motion.p>
        ))}
      </div>

      <h2 className="mt-20 text-[12vw] font-light leading-[0.94] tracking-[-0.03em] sm:text-[8vw] lg:text-[6.4vw]">
        {archive.final.title.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1.9 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {i === 1 ? <em className="font-serif not-italic text-gradient-gold">{line}</em> : line}
            </motion.span>
          </span>
        ))}
      </h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 2.6 }}
        className="mt-10 max-w-md font-serif text-lg text-foreground/75"
      >
        {archive.final.closing}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 2.9 }}
        className="mt-6 text-sm tracking-[0.2em] text-muted-foreground"
      >
        {archive.final.signature}
      </motion.p>

      <motion.button
        onClick={onReplay}
        data-cursor="REPLAY"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 3.2 }}
        className="mt-16 inline-flex items-center gap-3 rounded-full border border-border bg-foreground/5 px-7 py-3 text-[11px] tracking-[0.26em] text-muted-foreground transition-all duration-500 hover:border-glow-violet/50 hover:text-foreground hover:shadow-[0_0_40px_-14px_var(--glow-violet)]"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-glow-violet" />
        {archive.final.replay}
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.5 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 3.8 }}
        className="mt-24 text-[10px] tracking-[0.34em] text-muted-foreground"
      >
        {archive.final.whisper.toUpperCase()}
      </motion.p>
    </section>
  );
}
