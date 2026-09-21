import { useEffect, useState } from "react";
import { Instagram } from "lucide-react";

const links = [
  ["Mission", "#problem"],
  ["System", "#architecture"],
  ["Technology", "#features"],
  ["Future", "#future"],
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 md:px-8">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between border-b px-1 transition-all duration-500 ${
          scrolled
            ? "border-border bg-background/85 py-3 backdrop-blur-xl"
            : "border-transparent bg-transparent py-6"
        }`}
      >
        <a href="#home" className="flex items-center gap-3" aria-label="ResQ Sentinel home">
          <span className="relative grid h-7 w-7 place-items-center border border-primary text-[8px] font-bold text-primary">
            RQ
            <span className="absolute inset-1 border border-primary/30" />
          </span>
          <span className="font-display text-sm font-bold uppercase tracking-[0.16em] md:text-base">
            ResQ <span className="font-light text-muted-foreground">Sentinel</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://www.instagram.com/resqsentinel/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ResQ Sentinel on Instagram"
            className="group relative grid h-9 w-9 place-items-center border border-primary/30 bg-primary/5 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-[0_0_24px_-6px_var(--neon-blue)]"
          >
            <span className="absolute inset-1 border border-primary/15 transition-transform duration-500 group-hover:rotate-45" />
            <Instagram className="relative h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="border border-primary/40 bg-primary/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground md:px-5"
          >
            Launch Demo
          </a>
        </div>
      </div>
    </header>
  );
}