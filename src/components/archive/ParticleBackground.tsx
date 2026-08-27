import { useEffect, useRef } from "react";

interface Props {
  /** 0 = calm, 1 = normal, 2 = accelerated (unlock moment) */
  intensity?: number;
  confetti?: boolean;
}

type P = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  hue: number;
  star: boolean;
};

const HUES = [255, 265, 285, 45, 340];

export function ParticleBackground({ intensity = 1, confetti = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intensityRef = useRef(intensity);
  intensityRef.current = intensity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    const count = reduced ? 24 : mobile ? 46 : 110;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let particles: P[] = [];
    let raf = 0;

    const seed = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.16 + 0.02),
        a: Math.random() * 0.5 + 0.12,
        hue: HUES[Math.floor(Math.random() * HUES.length)] ?? 265,
        star: Math.random() > 0.72,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      t += 0.006;
      const boost = intensityRef.current;
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx * boost;
        p.y += p.vy * boost * (confetti ? 2.2 : 1);
        if (p.y < -10) p.y = h + 10;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const twinkle = p.star ? 0.55 + Math.sin(t * 6 + p.x) * 0.45 : 1;
        ctx.beginPath();
        ctx.fillStyle = `oklch(0.9 0.12 ${p.hue} / ${p.a * twinkle * (0.6 + boost * 0.3)})`;
        ctx.arc(p.x, p.y, p.r * (confetti ? 1.6 : 1), 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    if (!reduced) raf = requestAnimationFrame(draw);
    else draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [confetti]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 1 }}
    />
  );
}
