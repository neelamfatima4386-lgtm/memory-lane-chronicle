import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { archive } from "@/config/archive";

export function MusicPlayer({ visible }: { visible: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (!visible && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, [visible]);

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    try {
      if (playing) {
        el.pause();
        setPlaying(false);
      } else {
        await el.play();
        setPlaying(true);
      }
    } catch {
      setAvailable(false);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={archive.music.url}
        loop
        preload="none"
        onError={() => setAvailable(false)}
      />
      <AnimatePresence>
        {visible && available ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="glass fixed bottom-4 left-4 flex items-center gap-3 rounded-full py-2 pl-2 pr-5"
            style={{ zIndex: 60 }}
          >
            <button
              onClick={toggle}
              data-cursor={playing ? "PAUSE" : "PLAY"}
              aria-label={playing ? "Pause music" : archive.music.playLabel}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors duration-500 hover:border-glow-violet/60"
            >
              <span className="flex items-end gap-[3px]">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="block w-[2px] rounded-full bg-glow-violet"
                    animate={playing ? { height: [5, 13, 7, 15, 5] } : { height: 4 }}
                    transition={
                      playing
                        ? { duration: 1.1 + i * 0.2, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.3 }
                    }
                  />
                ))}
              </span>
            </button>
            <div className="leading-tight">
              <p className="text-[10px] tracking-[0.24em] text-foreground/85">
                {archive.music.trackName.toUpperCase()}
              </p>
              <p className="text-[9px] tracking-[0.22em] text-muted-foreground/70">
                {archive.music.artist.toUpperCase()}
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
