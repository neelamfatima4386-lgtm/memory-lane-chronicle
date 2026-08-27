import { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { archive } from "@/config/archive";

const LEN = 4;

export function SecretGate({ onUnlock }: { onUnlock: () => void }) {
  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(""));
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const code = digits.join("");

  const setDigit = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "").slice(-1);
    setError(false);
    setDigits((prev) => {
      const next = [...prev];
      next[i] = clean;
      return next;
    });
    if (clean && i < LEN - 1) inputs.current[i + 1]?.focus();
  };

  const submit = () => {
    if (code.length < LEN) {
      inputs.current[code.length]?.focus();
      return;
    }
    if (code === archive.accessCode) {
      setSuccess(true);
      window.setTimeout(onUnlock, 1750);
    } else {
      setError(true);
      setDigits(Array(LEN).fill(""));
      inputs.current[0]?.focus();
    }
  };

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, filter: "blur(18px)", y: 24 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl text-center"
      >
        {/* success bloom */}
        <AnimatePresence>
          {success ? (
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "var(--glow-violet)", filter: "blur(40px)" }}
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 12, opacity: [0, 1, 0.8] }}
              transition={{ duration: 1.7, ease: "easeInOut" }}
            />
          ) : null}
        </AnimatePresence>

        <motion.p
          className="label-xs"
          initial={{ opacity: 0, letterSpacing: "0.8em" }}
          animate={{ opacity: 1, letterSpacing: "0.34em" }}
          transition={{ duration: 1.6, delay: 0.2 }}
        >
          {archive.gate.label}
        </motion.p>

        <h1 className="mt-8 text-balance font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          {archive.gate.heading}
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {archive.gate.subheading}
        </p>

        <motion.div
          animate={
            error
              ? { x: [0, -10, 9, -6, 4, 0] }
              : success
                ? { scale: [1, 1.03, 1.16], opacity: [1, 1, 0] }
                : {}
          }
          transition={error ? { duration: 0.45 } : { duration: 1.5, ease: "easeInOut" }}
          className="glass relative mx-auto mt-14 rounded-2xl px-6 py-9 sm:px-10"
          style={{
            boxShadow: error
              ? "0 0 40px -12px oklch(0.62 0.2 22 / 0.5)"
              : success
                ? "0 0 70px -10px var(--glow-blue)"
                : "var(--shadow-lift)",
          }}
        >
          <p className="label-xs">{archive.gate.prompt}</p>

          <div className="mt-7 flex justify-center gap-3 sm:gap-4">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                value={d}
                onChange={(e) => setDigit(i, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !digits[i] && i > 0) inputs.current[i - 1]?.focus();
                  if (e.key === "Enter") submit();
                }}
                onPaste={(e) => {
                  const v = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, LEN);
                  if (!v) return;
                  e.preventDefault();
                  setDigits(Array.from({ length: LEN }, (_, k) => v[k] ?? ""));
                  inputs.current[Math.min(v.length, LEN - 1)]?.focus();
                }}
                inputMode="numeric"
                autoComplete="off"
                aria-label={`Access code digit ${i + 1}`}
                className="h-16 w-13 rounded-xl border border-border bg-secondary/40 text-center font-serif text-3xl text-foreground caret-transparent outline-none transition-all duration-300 focus:border-glow-violet/60 focus:bg-secondary/70 focus:shadow-[0_0_30px_-8px_var(--glow-violet)] sm:h-20 sm:w-16 sm:text-4xl"
              />
            ))}
          </div>

          <button
            onClick={submit}
            data-cursor="ENTER"
            className="group mt-9 inline-flex items-center gap-3 rounded-full border border-border bg-foreground/5 px-7 py-3 text-[11px] tracking-[0.26em] transition-all duration-500 hover:border-glow-violet/50 hover:bg-foreground/10 hover:shadow-[0_0_40px_-14px_var(--glow-violet)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-glow-violet transition-transform duration-500 group-hover:scale-150" />
            {archive.gate.button}
          </button>

          <div className="h-6">
            <AnimatePresence>
              {error ? (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-3 text-xs tracking-[0.2em] text-destructive"
                >
                  {archive.gate.error}
                </motion.p>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.div>

        <p className="mt-10 text-[10px] tracking-[0.3em] text-muted-foreground/60">
          MADE BY {archive.madeBy.toUpperCase()}
        </p>
      </motion.div>
    </section>
  );
}
