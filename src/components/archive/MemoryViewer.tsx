import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { memories, type Memory } from "@/config/archive";

interface Props {
  memory: Memory | null;
  onClose: () => void;
  onNavigate: (memory: Memory) => void;
}

export function MemoryViewer({ memory, onClose, onNavigate }: Props) {
  const [broken, setBroken] = useState(false);

  useEffect(() => setBroken(false), [memory?.id]);

  useEffect(() => {
    if (!memory) return;
    const step = (dir: number) => {
      const i = memories.findIndex((m) => m.id === memory.id);
      const next = memories[(i + dir + memories.length) % memories.length];
      if (next) onNavigate(next);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [memory, onClose, onNavigate]);

  const go = (dir: number) => {
    if (!memory) return;
    const i = memories.findIndex((m) => m.id === memory.id);
    const next = memories[(i + dir + memories.length) % memories.length];
    if (next) onNavigate(next);
  };

  return (
    <AnimatePresence>
      {memory ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center px-4 py-10"
          style={{ zIndex: 80, background: "oklch(0.05 0.01 280 / 0.88)", backdropFilter: "blur(18px)" }}
          onClick={onClose}
        >
          <motion.figure
            key={memory.id}
            initial={{ opacity: 0, scale: 0.96, y: 20, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative w-full max-w-4xl overflow-hidden rounded-3xl p-3 sm:p-4"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl sm:aspect-[16/10]">
              {broken ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[image:var(--gradient-night)]">
                  <span className="font-serif text-5xl text-foreground/25">{memory.id}</span>
                  <span className="label-xs">PHOTO NOT ADDED YET</span>
                  <span className="text-[10px] tracking-[0.2em] text-muted-foreground/60">
                    {memory.image}
                  </span>
                </div>
              ) : (
                <img
                  src={memory.image}
                  alt={memory.title}
                  onError={() => setBroken(true)}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <figcaption className="flex flex-col gap-3 px-3 py-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="label-xs">
                  {memory.date} — {memory.year}
                </p>
                <h3 className="mt-2 font-serif text-2xl sm:text-3xl">{memory.title}</h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  {memory.secret && memory.secretMessage ? memory.secretMessage : memory.caption}
                </p>
              </div>
              <p className="text-[10px] tracking-[0.24em] text-muted-foreground/70">{memory.code}</p>
            </figcaption>

            <div className="flex items-center justify-between border-t border-border/60 px-3 py-4">
              <button
                onClick={() => go(-1)}
                data-cursor="PREV"
                className="text-[10px] tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
              >
                ← PREVIOUS
              </button>
              <button
                onClick={onClose}
                data-cursor="CLOSE"
                className="text-[10px] tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
              >
                CLOSE
              </button>
              <button
                onClick={() => go(1)}
                data-cursor="NEXT"
                className="text-[10px] tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
              >
                NEXT →
              </button>
            </div>
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
