import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { archive, birthdayLetter } from "@/config/archive";

export function LetterSection({ onContinue }: { onContinue: () => void }) {
  const [open, setOpen] = useState(false);
  const paragraphs = birthdayLetter.trim().split(/\n\s*\n/);

  return (
    <section className="relative px-5 py-28 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="label-xs"
        >
          {archive.letter.label}
        </motion.p>
        <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          {archive.letter.heading}
        </h2>

        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="envelope"
              onClick={() => setOpen(true)}
              data-cursor="OPEN"
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.7 }}
              className="glass group relative mx-auto mt-14 block w-full max-w-md overflow-hidden rounded-2xl px-8 py-14 transition-shadow duration-700 hover:shadow-[0_0_70px_-20px_var(--glow-blush)]"
            >
              <motion.div
                aria-hidden
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto h-24 w-36 rounded-md border border-border"
                style={{ background: "linear-gradient(150deg,oklch(1 0 0/0.07),oklch(1 0 0/0.02))" }}
              >
                <div
                  className="mx-auto h-12 w-36 origin-top rounded-b-md transition-transform duration-700 group-hover:-rotate-x-12"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    background: "linear-gradient(180deg,oklch(1 0 0/0.1),transparent)",
                    borderBottom: "1px solid oklch(1 0 0 / 0.12)",
                  }}
                />
              </motion.div>
              <p className="mt-8 font-serif text-lg text-foreground/85">
                {archive.letter.envelopeText}
              </p>
              <span className="mt-6 inline-flex items-center gap-3 rounded-full border border-border px-6 py-2.5 text-[11px] tracking-[0.26em] text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-blush" />
                {archive.letter.cta}
              </span>
            </motion.button>
          ) : (
            <motion.article
              key="letter"
              initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="glass mx-auto mt-14 rounded-3xl px-6 py-12 text-left sm:px-14 sm:py-16"
            >
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.25 + i * 0.22 }}
                  className={
                    i === paragraphs.length - 1
                      ? "mt-10 text-right font-serif text-lg text-gradient-gold"
                      : "mt-6 font-serif text-lg leading-relaxed text-foreground/85 first:mt-0 sm:text-xl"
                  }
                >
                  {p}
                </motion.p>
              ))}
            </motion.article>
          )}
        </AnimatePresence>

        <button
          onClick={onContinue}
          data-cursor="NEXT"
          className="group mt-20 inline-flex flex-col items-center gap-4"
        >
          <span className="text-[11px] tracking-[0.3em] text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
            CONTINUE
          </span>
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            className="block h-10 w-px"
            style={{ background: "linear-gradient(180deg,var(--c-blush),transparent)" }}
          />
        </button>
      </div>
    </section>
  );
}
