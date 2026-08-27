import { motion } from "motion/react";

export interface Chapter {
  id: string;
  label: string;
}

interface Props {
  chapters: Chapter[];
  active: string;
  onSelect?: (id: string) => void;
}

export function ChapterIndicator({ chapters, active, onSelect }: Props) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.6 }}
      aria-label="Chapters"
      className="fixed right-3 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex"
      style={{ zIndex: 40 }}
    >
      {chapters.map((c) => {
        const on = c.id === active;
        return (
          <button
            key={c.id}
            onClick={() => onSelect?.(c.id)}
            data-cursor="VIEW"
            className="group flex items-center gap-2 pr-2"
          >
            <span
              className={`text-[9px] tracking-[0.28em] transition-all duration-500 ${
                on ? "text-foreground opacity-100" : "text-muted-foreground opacity-0 group-hover:opacity-70"
              }`}
            >
              {c.label}
            </span>
            <span
              className={`h-px transition-all duration-500 ${
                on ? "w-8 bg-glow-violet" : "w-3 bg-border group-hover:w-5"
              }`}
            />
          </button>
        );
      })}
    </motion.nav>
  );
}
