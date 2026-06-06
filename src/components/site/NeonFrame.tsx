import { useEffect } from "react";

/** Continuous neon LED strip running around the viewport edges. */
export function NeonFrame() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[60]">
      {/* top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] border-flow" />
      {/* bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] border-flow" style={{ animationDirection: "reverse" }} />
      {/* left */}
      <div className="absolute top-0 bottom-0 left-0 w-[2px]" style={{
        background: "linear-gradient(180deg, transparent, var(--neon-blue), var(--neon-cyan), var(--neon-blue), transparent)",
        backgroundSize: "100% 200%",
        animation: "border-flow 6s linear infinite",
      }} />
      {/* right */}
      <div className="absolute top-0 bottom-0 right-0 w-[2px]" style={{
        background: "linear-gradient(180deg, transparent, var(--neon-cyan), var(--neon-blue), var(--neon-cyan), transparent)",
        backgroundSize: "100% 200%",
        animation: "border-flow 7s linear infinite reverse",
      }} />
    </div>
  );
}

/** Lightweight animated particle background using canvas. */
export function ParticleField() {
  useEffect(() => {
    const canvas = document.getElementById("particle-canvas") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const N = Math.min(90, Math.floor((w * h) / 22000));
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.6 + 0.4,
    }));
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124, 255, 178, 0.7)";
        ctx.shadowColor = "rgba(0, 255, 136, 0.9)";
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.15 * (1 - d2 / 14000)})`;
            ctx.lineWidth = 0.6;
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return (
    <canvas
      id="particle-canvas"
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-60"
    />
  );
}

/** Intersection-observer driven reveal on scroll. */
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}