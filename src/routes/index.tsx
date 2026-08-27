import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

import { archive, type Memory } from "@/config/archive";
import { Atmosphere, FloatingBirthdayElements } from "@/components/archive/Atmosphere";
import { ParticleBackground } from "@/components/archive/ParticleBackground";
import { CustomCursor } from "@/components/archive/CustomCursor";
import { SecretGate } from "@/components/archive/SecretGate";
import { MidnightCountdown } from "@/components/archive/MidnightCountdown";
import { BirthdayHero } from "@/components/archive/BirthdayHero";
import { ChapterIndicator, type Chapter } from "@/components/archive/ChapterIndicator";
import { MemoryArchive } from "@/components/archive/MemoryArchive";
import { MemoryViewer } from "@/components/archive/MemoryViewer";
import { FriendshipWrapped } from "@/components/archive/FriendshipWrapped";
import { LetterSection } from "@/components/archive/LetterSection";
import { MusicPlayer } from "@/components/archive/MusicPlayer";
import { FinalReveal } from "@/components/archive/FinalReveal";

const TITLE = `A Private Archive for ${archive.name}`;
const DESCRIPTION = `A locked, cinematic birthday archive built for ${archive.fullName} — memories, a countdown to midnight, and a letter. Made by ${archive.madeBy}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Index,
});

type Stage = "gate" | "countdown" | "hero" | "story";

const CHAPTERS: Chapter[] = [
  { id: "archive", label: "THE ARCHIVE" },
  { id: "wrapped", label: "WRAPPED" },
  { id: "letter", label: "THE LETTER" },
  { id: "final", label: "ONE LAST THING" },
];

const UNLOCK_KEY = "rafay-archive-unlocked";

function Index() {
  const [stage, setStage] = useState<Stage>("gate");
  const [intensity, setIntensity] = useState(1);
  const [confetti, setConfetti] = useState(false);
  const [active, setActive] = useState("archive");
  const [openMemory, setOpenMemory] = useState<Memory | null>(null);

  const targetMs = useMemo(() => new Date(archive.countdownTarget).getTime(), []);

  /* restore session unlock */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.sessionStorage.getItem(UNLOCK_KEY);
    if (saved === "story" || saved === "hero") {
      setStage(Date.now() >= targetMs ? "hero" : "countdown");
    }
  }, [targetMs]);

  const persist = (value: string) => {
    if (typeof window !== "undefined") window.sessionStorage.setItem(UNLOCK_KEY, value);
  };

  const handleUnlock = useCallback(() => {
    persist("hero");
    setStage(Date.now() >= targetMs ? "hero" : "countdown");
  }, [targetMs]);

  const handleMidnight = useCallback(() => {
    setStage("hero");
    setConfetti(true);
    window.setTimeout(() => setConfetti(false), 9000);
  }, []);

  const enterStory = useCallback(() => {
    persist("story");
    setStage("story");
    window.requestAnimationFrame(() => window.scrollTo({ top: 0 }));
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* chapter observer */
  useEffect(() => {
    if (stage !== "story") return;
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      // threshold 0: sections are taller than the viewport, so ratio-based
      // thresholds (0.25+) are unreachable and the spy would never fire
      { threshold: 0, rootMargin: "-20% 0px -40% 0px" },
    );
    // AnimatePresence mode="wait" mounts the story sections only after the
    // hero finishes exiting, so the elements aren't in the DOM yet when this
    // effect first runs — retry until they appear.
    let tries = 0;
    const attach = () => {
      const els = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
        (el): el is HTMLElement => el !== null,
      );
      els.forEach((el) => observer.observe(el));
      if (els.length < CHAPTERS.length && tries++ < 50) {
        timer = window.setTimeout(attach, 100);
      }
    };
    let timer = window.setTimeout(attach, 0);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [stage]);

  const replay = useCallback(() => {
    if (typeof window !== "undefined") window.sessionStorage.removeItem(UNLOCK_KEY);
    setOpenMemory(null);
    setActive("archive");
    setStage("gate");
    window.scrollTo({ top: 0 });
  }, []);

  const mood = stage === "gate" || stage === "countdown" ? "deep" : "warm";

  return (
    <main className="relative min-h-screen overflow-x-hidden text-foreground">
      <Atmosphere mood={mood} />
      <ParticleBackground intensity={intensity} confetti={confetti} />
      {stage !== "gate" ? <FloatingBirthdayElements /> : null}
      <CustomCursor />
      <MusicPlayer visible={stage === "hero" || stage === "story"} />

      <div className="relative" style={{ zIndex: 10 }}>
        <AnimatePresence mode="wait">
          {stage === "gate" ? (
            <motion.div key="gate" exit={{ opacity: 0, filter: "blur(16px)" }} transition={{ duration: 0.8 }}>
              <SecretGate onUnlock={handleUnlock} />
            </motion.div>
          ) : null}

          {stage === "countdown" ? (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(16px)" }}
              transition={{ duration: 1 }}
            >
              <MidnightCountdown
                targetMs={targetMs}
                onComplete={handleMidnight}
                onIntensity={setIntensity}
              />
            </motion.div>
          ) : null}

          {stage === "hero" ? (
            <motion.div
              key="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: "blur(16px)" }}
              transition={{ duration: 1.2 }}
            >
              <BirthdayHero onEnter={enterStory} />
            </motion.div>
          ) : null}

          {stage === "story" ? (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <ChapterIndicator chapters={CHAPTERS} active={active} onSelect={scrollTo} />

              <div id="archive">
                <MemoryArchive onOpen={setOpenMemory} onContinue={() => scrollTo("wrapped")} />
              </div>
              <div id="wrapped">
                <FriendshipWrapped onContinue={() => scrollTo("letter")} />
              </div>
              <div id="letter">
                <LetterSection onContinue={() => scrollTo("final")} />
              </div>
              <div id="final">
                <FinalReveal onReplay={replay} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <MemoryViewer
        memory={openMemory}
        onClose={() => setOpenMemory(null)}
        onNavigate={setOpenMemory}
      />
    </main>
  );
}
