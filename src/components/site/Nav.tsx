import { useEffect, useState } from "react";

const links = [
  ["Home", "#home"],
  ["Problem", "#problem"],
  ["Solution", "#solution"],
  ["Architecture", "#architecture"],
  ["Features", "#features"],
  ["Safety", "#safety"],
  ["Future Vision", "#future"],
  ["Contact", "#contact"],
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className={`glass flex items-center justify-between px-4 py-3 transition-all ${scrolled ? "shadow-[0_8px_40px_rgba(0,255,136,0.15)]" : ""}`}>
          <a href="#home" className="flex items-center gap-2">
            <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[var(--neon-blue)] to-[var(--neon-cyan)] text-[10px] font-black text-[var(--deep-navy)]">
              RQ
              <span className="absolute inset-0 rounded-md animate-pulse-glow" />
            </span>
            <span className="font-black tracking-[0.18em] text-sm">RESQ <span className="text-gradient">SENTINEL</span></span>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="px-3 py-1.5 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-px scale-x-0 origin-left bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] transition-transform group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden lg:inline-flex items-center rounded-md px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] text-[var(--deep-navy)] hover:opacity-90 transition"
          >
            Launch Demo
          </a>
          <button
            aria-label="Toggle menu"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-6 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-6 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
        {open && (
          <div className="lg:hidden mt-2 glass p-3 grid gap-1">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition"
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}