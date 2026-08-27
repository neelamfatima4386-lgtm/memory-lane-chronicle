import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { archive, memories, timelineYears, type Memory } from "@/config/archive";
import { MemoryCard } from "./MemoryCard";

interface Props {
  onOpen: (memory: Memory) => void;
  onContinue: () => void;
}

export function MemoryArchive({ onOpen, onContinue }: Props) {
  const [year, setYear] = useState<string>("ALL");

  const visible = useMemo(
    () => (year === "ALL" ? memories : memories.filter((m) => m.year === year)),
    [year],
  );

  return (
    <section className="relative px-5 py-28 sm:px-8 lg:px-14">
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="label-xs"
        >
          {archive.archiveSection.label}
        </motion.p>

        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="max-w-xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              {archive.archiveSection.heading}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              {archive.archiveSection.subheading}
            </p>
          </div>
          <p className="font-serif text-lg text-foreground/70">{archive.archiveSection.aside}</p>
        </div>

        {/* timeline */}
        <div className="mt-14 flex items-center gap-6 overflow-x-auto pb-2 hide-scrollbar">
          {["ALL", ...timelineYears].map((y) => {
            const on = y === year;
            return (
              <button
                key={y}
                onClick={() => setYear(y)}
                data-cursor="FILTER"
                className="group relative shrink-0 py-2"
              >
                <span
                  className={`font-serif text-2xl transition-colors duration-500 sm:text-3xl ${
                    on ? "text-foreground" : "text-muted-foreground/50 hover:text-foreground/70"
                  }`}
                >
                  {y}
                </span>
                <span
                  className={`mt-2 block h-px transition-all duration-500 ${
                    on ? "w-full bg-glow-violet" : "w-0 bg-border group-hover:w-1/2"
                  }`}
                />
              </button>
            );
          })}
          <div className="h-px flex-1 bg-border/60" />
          <span className="shrink-0 label-xs">{visible.length} ENTRIES</span>
        </div>

        {/* editorial grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-12 sm:gap-7">
          {visible.map((m, i) => (
            <MemoryCard key={m.id} memory={m} index={i} onOpen={onOpen} />
          ))}
        </div>

        <div className="mt-24 flex justify-center">
          <button
            onClick={onContinue}
            data-cursor="NEXT"
            className="group inline-flex flex-col items-center gap-4"
          >
            <span className="text-[11px] tracking-[0.3em] text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
              KEEP GOING
            </span>
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              className="block h-10 w-px"
              style={{ background: "linear-gradient(180deg,var(--c-violet),transparent)" }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
