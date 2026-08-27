import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** Desktop-only glowing dot cursor with an expanding ring + contextual label. */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor],a,button,input,[role='button']",
      );
      setActive(!!el);
      setLabel(el?.dataset["cursor"] ?? null);
    };
    window.addEventListener("pointermove", move);
    document.documentElement.classList.add("cursor-none");
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0" style={{ zIndex: 90 }}>
      <motion.div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ x: sx, y: sy }}>
        <motion.div
          className="rounded-full"
          animate={{
            width: active ? 44 : 8,
            height: active ? 44 : 8,
            opacity: active ? 0.7 : 1,
            borderWidth: active ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          style={{
            background: active ? "transparent" : "var(--color-glow-blue)",
            borderStyle: "solid",
            borderColor: "var(--color-glow-blue)",
            boxShadow: "0 0 18px var(--glow-blue)",
            translate: "-50% -50%",
          }}
        />
        {label ? (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-7 top-4 whitespace-nowrap text-[10px] tracking-[0.28em] text-glow-blue"
          >
            {label}
          </motion.span>
        ) : null}
      </motion.div>
    </div>
  );
}
