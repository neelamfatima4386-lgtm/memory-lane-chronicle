import { useState } from "react";
import { motion } from "motion/react";
import type { Memory } from "@/config/archive";

const ASPECT: Record<Memory["layout"], string> = {
  wide: "aspect-[16/9]",
  tall: "aspect-[3/4]",
  card: "aspect-[4/3]",
  small: "aspect-square",
  polaroid: "aspect-square",
  strip: "aspect-[21/9]",
};

const SPAN: Record<Memory["layout"], string> = {
  wide: "sm:col-span-8",
  tall: "sm:col-span-4",
  card: "sm:col-span-5",
  small: "sm:col-span-3",
  polaroid: "sm:col-span-4",
  strip: "sm:col-span-7",
};

function Placeholder({ memory }: { memory: Memory }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[image:var(--gradient-night)]">
      <span className="font-serif text-3xl text-foreground/25">{memory.id}</span>
      <span className="label-xs">ADD PHOTO</span>
      <span className="text-[9px] tracking-[0.2em] text-muted-foreground/50">
        {memory.image}
      </span>
    </div>
  );
}

interface Props {
  memory: Memory;
  index: number;
  onOpen: (memory: Memory) => void;
}

export function MemoryCard({ memory, index, onOpen }: Props) {
  const [broken, setBroken] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const locked = Boolean(memory.secret) && !revealed;
  const tilt = memory.layout === "polaroid" ? (index % 2 ? 2.2 : -2.4) : 0;

  return (
    <motion.figure
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotate: tilt }}
      className={`group relative col-span-1 ${SPAN[memory.layout]}`}
    >
      <button
        type="button"
        data-cursor={locked ? "REVEAL" : "VIEW"}
        onClick={() => (locked ? setRevealed(true) : onOpen(memory))}
        className="glass relative block w-full overflow-hidden rounded-2xl p-2 text-left transition-all duration-700 hover:shadow-[0_0_60px_-18px_var(--glow-violet)]"
      >
        <div className={`relative w-full overflow-hidden rounded-xl ${ASPECT[memory.layout]}`}>
          {broken ? (
            <Placeholder memory={memory} />
          ) : (
            <img
              src={memory.image}
              alt={memory.title}
              loading="lazy"
              onError={() => setBroken(true)}
              className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
            />
          )}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,oklch(0.05_0.01_280/0.85))]" />

          {locked ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 backdrop-blur-xl">
              <span className="label-xs text-gradient-gold">SECRET</span>
              <span className="text-[10px] tracking-[0.24em] text-muted-foreground">
                TAP TO REVEAL
              </span>
            </div>
          ) : null}

          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
            <div>
              <p className="label-xs">{memory.date}</p>
              <p className="mt-1 font-serif text-lg leading-tight text-foreground">
                {locked ? "———" : memory.title}
              </p>
            </div>
            <p className="shrink-0 text-[9px] tracking-[0.22em] text-muted-foreground/70">
              {memory.code}
            </p>
          </figcaption>
        </div>
      </button>

      {memory.secret && revealed ? (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 px-2 font-serif text-sm text-gold/80"
        >
          {memory.secretMessage}
        </motion.p>
      ) : null}
    </motion.figure>
  );
}
