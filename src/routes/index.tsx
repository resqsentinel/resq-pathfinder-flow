import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle, Activity, Volume2, Timer, Rocket, MapPin, Plane, Megaphone, Car, Heart,
  Cpu, Compass, Satellite, Radio, Bot, Siren, Lightbulb, Route as RouteIcon, Anchor, ShieldCheck,
  ShieldAlert, BatteryCharging, MapPinned, LandPlot, Home as HomeIcon, ListChecks, Lock,
  Zap, Network, Building2, Radar, Eye, PlaneTakeoff, Sparkles, ArrowRight, Mail, User,
  MessageSquare, Send, Play, CheckCircle2, Crosshair, Upload, Power,
  FileText, Target, Ambulance, Flag, Brain, Waypoints,
} from "lucide-react";
import smartCity from "@/assets/smart-city.jpg";
import droneGraphic from "@/assets/resq-drone-graphic.png";
import { Nav } from "@/components/site/Nav";
import { NeonFrame, useScrollReveal } from "@/components/site/NeonFrame";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResQ Sentinel — Autonomous Emergency Drone System" },
      { name: "description", content: "Autonomous drones that clear traffic ahead of ambulances — reducing emergency response times when every second counts." },
      { property: "og:title", content: "ResQ Sentinel — Clearing the Path Before Every Second Counts" },
      { property: "og:description", content: "Autonomous Emergency Traffic Clearance Drone System." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: smartCity },
      { name: "twitter:image", content: smartCity },
    ],
  }),
  component: Index,
});

function Index() {
  useScrollReveal();
  return (
    <div className="relative min-h-screen text-foreground">
      <NeonFrame />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Abstract />
        <Problem />
        <Objectives />
        <Solution />
        <AmbulanceIntegration />
        <LaunchSequence />
        <Architecture />
        <Features />
        <Safety />
        <Innovation />
        <FutureVision />
        <Stats />
        <Closing />
        <Conclusion />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Section primitives ---------- */

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="max-w-3xl mx-auto text-center mb-14 reveal">
      <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-5">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-cyan)] animate-pulse" /> {eyebrow}
      </div>
      <h2 className="text-4xl md:text-5xl font-black tracking-tight">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground text-base md:text-lg">{sub}</p>}
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`glass glow-border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-10px_rgba(80,180,255,0.35)] ${className}`}>
      {children}
    </div>
  );
}

function IconChip({ Icon }: { Icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--neon-blue)]/20 to-[var(--neon-cyan)]/10 border border-[var(--neon-blue)]/40 text-[var(--neon-cyan)] mb-4">
      <Icon className="h-5 w-5" />
    </div>
  );
}


function Hero() {
  return (
    <section id="home" className="hero-cinematic relative flex min-h-[94vh] items-center overflow-hidden pb-20 pt-28 md:pb-24 md:pt-32">
      <div className="hero-horizon absolute inset-0" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" aria-hidden />

      <div className="relative mx-auto w-full max-w-7xl px-5 text-center md:px-8">
        <div className="reveal mx-auto max-w-6xl">
          <div className="mb-7 inline-flex items-center gap-3 border border-primary/20 bg-primary/5 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.32em] text-primary">
            <span className="h-1.5 w-1.5 bg-emergency animate-pulse" />
            Autonomous Emergency Response
          </div>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.38em] text-muted-foreground md:text-xs">
            Introducing ResQ Sentinel
          </p>
          <h1 className="font-display text-5xl font-light uppercase leading-[0.88] md:text-8xl lg:text-9xl">
            WHEN EVERY SECOND MATTERS,&nbsp;
            <span className="mt-2 block font-bold text-gradient">WE FLY AHEAD</span>
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base font-light leading-relaxed text-muted-foreground md:text-lg">
            Autonomous aerial intelligence that moves ahead of ambulances, warns traffic early,
            and protects the minutes that decide outcomes
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <a href="#solution" className="group inline-flex min-w-52 items-center justify-center gap-2 bg-foreground px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-background transition-transform hover:-translate-y-0.5">
              <Play className="h-4 w-4" /> Watch Mission
            </a>
            <a href="#features" className="inline-flex min-w-52 items-center justify-center gap-2 border border-border px-7 py-4 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground">
              Explore Technology <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative mx-auto mt-8 h-56 max-w-3xl sm:h-64 md:mt-4 md:h-72">
          <div className="absolute left-1/2 top-1/2 h-32 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" aria-hidden />
          <img src={droneGraphic} alt="ResQ Sentinel autonomous six-rotor drone" className="relative mx-auto h-full w-full object-contain drop-shadow-[0_22px_36px_var(--drone-shadow)] animate-float" loading="eager" width={1024} height={1024} />
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-3 border-y border-border/70 py-4">
          {[["< 30s", "Launch"], ["2 KM", "Range"], ["24/7", "Standby"]].map(([value, label]) => (
            <div key={label} className="border-r border-border/70 px-2 last:border-r-0">
              <div className="font-display text-lg font-bold text-foreground md:text-xl">{value}</div>
              <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.22em] text-muted-foreground md:text-[9px]">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROBLEM ---------- */

function Problem() {
  const items = [
    { Icon: Activity, title: "Traffic Congestion", desc: "Heavy urban traffic delays emergency vehicles, costing critical minutes." },
    { Icon: AlertTriangle, title: "Delayed Driver Awareness", desc: "Drivers often notice an ambulance too late to react and clear the lane." },
    { Icon: Volume2, title: "Siren Limitations", desc: "Urban noise, sealed cabins and buildings reduce siren effectiveness." },
    { Icon: Timer, title: "Critical Response Time", desc: "Even a 60-second delay can be the difference between life and loss." },
  ];
  const stats = [
    ["4–8 min", "Survival window in cardiac arrest"],
    ["+10%", "Mortality per minute delayed"],
    ["35%", "Of ambulances delayed by traffic"],
  ];
  return (
    <section id="problem" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="The Problem"
          title={<>Why <span className="text-gradient">ResQ Sentinel</span> Is Needed</>}
          sub="Every second matters in an emergency. Today's response systems are reactive — drivers, signals and sirens can't keep up with dense cities."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ Icon, title, desc }, i) => (
            <div key={title} className="reveal" style={{ animationDelay: `${i * 80}ms` }}>
              <Card className="h-full">
                <IconChip Icon={Icon} />
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-5 reveal">
          {stats.map(([v, l]) => (
            <div key={l} className="glass p-6 text-center">
              <div className="text-4xl font-black text-gradient neon-text">{v}</div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SOLUTION TIMELINE ---------- */

function Solution() {
  const steps = [
    { Icon: Heart, title: "Ambulance starts mission", d: "Dispatch triggers the ResQ Sentinel protocol the moment a call is accepted." },
    { Icon: MapPin, title: "Route is determined", d: "AI computes the fastest path using live traffic + historical data." },
    { Icon: Rocket, title: "Drone launches automatically", d: "The nearest sentinel takes off from its docking station within seconds." },
    { Icon: Plane, title: "Drone flies ahead of ambulance", d: "It travels above the planned corridor, sensing congestion in real-time." },
    { Icon: Megaphone, title: "Traffic receives alerts", d: "Sirens, LED warnings and signal sync notify drivers and intersections." },
    { Icon: Car, title: "Road clears before arrival", d: "Lanes open, vehicles yield — the corridor is primed before the ambulance enters." },
    { Icon: Heart, title: "Faster emergency response", d: "The ambulance reaches the patient or hospital with minimum delay." },
  ];
  return (
    <section id="solution" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="The Solution"
          title={<>The Autonomous <span className="text-gradient">Traffic Clearance</span> System</>}
          sub="A seven-step choreography between dispatch, drone, signals and drivers — fully automated."
        />
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[var(--neon-blue)]/60 to-transparent" />
          <div className="space-y-8">
            {steps.map(({ Icon, title, d }, i) => {
              const left = i % 2 === 0;
              return (
                <div key={title} className="relative reveal grid md:grid-cols-2 gap-6 items-center">
                  <div className={`hidden md:block ${left ? "" : "md:order-2"}`}>
                    <div className={`max-w-md ${left ? "ml-auto pr-10 text-right" : "mr-auto pl-10"}`}>
                      <Card>
                        <div className="text-[10px] uppercase tracking-widest text-[var(--neon-cyan)] mb-1">Step {String(i + 1).padStart(2, "0")}</div>
                        <h3 className="text-lg font-bold mb-1">{title}</h3>
                        <p className="text-sm text-muted-foreground">{d}</p>
                      </Card>
                    </div>
                  </div>
                  {/* node */}
                  <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-10`}>
                    <div className="relative h-12 w-12 rounded-full glass flex items-center justify-center neon-glow">
                      <Icon className="h-5 w-5 text-[var(--neon-cyan)]" />
                      <span className="absolute inset-0 rounded-full animate-pulse-glow" />
                    </div>
                  </div>
                  {/* mobile content */}
                  <div className="md:hidden pl-20">
                    <Card>
                      <div className="text-[10px] uppercase tracking-widest text-[var(--neon-cyan)] mb-1">Step {String(i + 1).padStart(2, "0")}</div>
                      <h3 className="text-lg font-bold mb-1">{title}</h3>
                      <p className="text-sm text-muted-foreground">{d}</p>
                    </Card>
                  </div>
                  <div className={`hidden md:block ${left ? "" : "md:order-1"}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- ARCHITECTURE ---------- */

function Architecture() {
  const nodes = [
    { Icon: ShieldAlert, title: "Emergency Control System", sub: "Dispatch & coordination" },
    { Icon: RouteIcon, title: "Route Planning Module", sub: "AI-optimized corridor" },
    { Icon: Bot, title: "ResQ Sentinel Drone", sub: "Autonomous aerial unit" },
    { Icon: Radio, title: "Traffic Alert System", sub: "Signals · LED · siren" },
    { Icon: Car, title: "Road Users", sub: "Awareness & yielding" },
    { Icon: Heart, title: "Ambulance Passage", sub: "Clear corridor achieved" },
  ];
  return (
    <section id="architecture" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="System Architecture"
          title={<>End-to-End <span className="text-gradient">Signal Flow</span></>}
          sub="Six coordinated modules form a continuous chain from dispatch to delivery."
        />
        <div className="relative grid gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-6">
          {nodes.map(({ Icon, title, sub }, i) => (
            <div key={title} className="reveal" style={{ animationDelay: `${i * 90}ms` }}>
              <Card className="text-center h-full">
                <div className="text-[10px] uppercase tracking-widest text-[var(--neon-cyan)] mb-2">Node {String(i + 1).padStart(2, "0")}</div>
                <div className="mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--neon-blue)]/30 to-[var(--neon-cyan)]/10 border border-[var(--neon-blue)]/40 text-[var(--neon-cyan)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold">{title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{sub}</p>
              </Card>
              {/* connector arrow */}
              {i < nodes.length - 1 && (
                <div className="hidden lg:flex justify-center -mt-1 -mb-1 text-[var(--neon-cyan)]/60">
                  {/* horizontal indicator handled visually by glow chain below */}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* glowing flow bar */}
        <div className="mt-10 h-[2px] mx-auto max-w-5xl border-flow rounded-full" />
      </div>
    </section>
  );
}

/* ---------- FEATURES ---------- */

function Features() {
  const items = [
    { Icon: Cpu, title: "Pixhawk Flight Controller", d: "Industry-grade flight stack powering precise control." },
    { Icon: Compass, title: "ArduPilot Autonomous Navigation", d: "Open, proven autopilot for fully autonomous missions." },
    { Icon: Satellite, title: "GPS Route Tracking", d: "High-accuracy geolocation with waypoint following." },
    { Icon: Radio, title: "Real-Time Telemetry", d: "Continuous link to command for live state awareness." },
    { Icon: Bot, title: "Autonomous Flight Missions", d: "Mission scripting with conditional triggers." },
    { Icon: Siren, title: "Emergency Siren System", d: "Directional audible alerts from above traffic." },
    { Icon: Lightbulb, title: "High-Intensity LED Warning Lights", d: "Visible from hundreds of meters in daylight." },
    { Icon: RouteIcon, title: "Route Prediction System", d: "ML model anticipating ambulance trajectory." },
    { Icon: Anchor, title: "Position Hold", d: "Sub-meter loiter precision using GPS + IMU fusion." },
    { Icon: HomeIcon, title: "Return-To-Launch Safety", d: "Automated safe return on signal loss or low battery." },
  ];
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Technical Features"
          title={<>Built on a <span className="text-gradient">Premium Flight Stack</span></>}
          sub="Aerospace-grade components, intelligent autonomy and field-proven open-source autopilot."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {items.map(({ Icon, title, d }, i) => (
            <div key={title} className="reveal" style={{ animationDelay: `${i * 50}ms` }}>
              <Card className="h-full group">
                <IconChip Icon={Icon} />
                <h3 className="text-sm font-bold mb-1.5 group-hover:text-gradient transition-colors">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SAFETY ---------- */

function Safety() {
  const items = [
    { Icon: Satellite, title: "GPS Verification" },
    { Icon: LandPlot, title: "Geofencing" },
    { Icon: BatteryCharging, title: "Battery Monitoring" },
    { Icon: MapPinned, title: "Emergency Landing Protocol" },
    { Icon: HomeIcon, title: "Return-To-Home Function" },
    { Icon: ListChecks, title: "Pre-Flight Diagnostics" },
    { Icon: Lock, title: "Fail-Safe Operations" },
  ];
  return (
    <section id="safety" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Safety Systems"
          title={<>Layered <span className="text-gradient">Fail-Safe Architecture</span></>}
          sub="Seven independent safety subsystems keep every mission protected from edge to edge."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ Icon, title }, i) => (
            <div key={title} className="reveal" style={{ animationDelay: `${i * 60}ms` }}>
              <Card className="h-full flex items-center gap-4">
                <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--neon-blue)]/20 to-[var(--neon-cyan)]/10 border border-[var(--neon-blue)]/40 text-[var(--neon-cyan)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">{title}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="h-3 w-3 text-[var(--neon-cyan)]" /> Always-on
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- INNOVATION ---------- */

function Innovation() {
  const items = [
    { Icon: Zap, title: "Proactive Traffic Clearance", d: "Don't react — pre-empt. The corridor opens before the ambulance arrives." },
    { Icon: PlaneTakeoff, title: "Autonomous Aerial Support", d: "No pilot, no delay. Fully autonomous launch, mission and recovery." },
    { Icon: Network, title: "Smart City Integration", d: "Speaks directly to signals, sensors and control centers." },
    { Icon: Timer, title: "Reduced Response Time", d: "Cuts critical seconds at every intersection along the path." },
    { Icon: ShieldCheck, title: "Increased Public Safety", d: "Drivers know what's coming — fewer collisions, smoother yields." },
    { Icon: Sparkles, title: "Scalable Future Infrastructure", d: "Dock-based fleet model designed for city-wide deployment." },
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Innovation"
          title={<>What Makes <span className="text-gradient">ResQ Sentinel</span> Different</>}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ Icon, title, d }, i) => (
            <div key={title} className="reveal" style={{ animationDelay: `${i * 70}ms` }}>
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--neon-blue)]/30 to-[var(--neon-cyan)]/10 border border-[var(--neon-blue)]/40 text-[var(--neon-cyan)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FUTURE VISION ---------- */

function FutureVision() {
  const items = [
    { Icon: Radio, title: "Smart Traffic Signals" },
    { Icon: Bot, title: "AI Route Optimization" },
    { Icon: ShieldAlert, title: "Emergency Command Centers" },
    { Icon: Network, title: "Disaster Response Networks" },
    { Icon: Radar, title: "Real-Time Traffic Monitoring" },
    { Icon: PlaneTakeoff, title: "Urban Air Mobility Systems" },
  ];
  return (
    <section id="future" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={smartCity} alt="Smart city future" width={1536} height={896} loading="lazy" className="h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Future Vision"
          title={<>A <span className="text-gradient">Smart City</span> Where Every Second Is Saved</>}
          sub="ResQ Sentinel is one node in a connected urban response fabric — talking to every system that moves the city."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ Icon, title }, i) => (
            <div key={title} className="reveal" style={{ animationDelay: `${i * 70}ms` }}>
              <Card className="h-full">
                <IconChip Icon={Icon} />
                <h3 className="text-base font-bold">{title}</h3>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Eye className="h-3 w-3 text-[var(--neon-cyan)]" /> Connected node
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- STATS ---------- */

function Counter({ to, suffix = "", duration = 1800 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            setVal(Math.floor(p * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Stats() {
  const stats = [
    { v: 60, suffix: "%", label: "Faster Response Time" },
    { v: 100, suffix: "%", label: "Autonomous Navigation" },
    { v: 99, suffix: "%", label: "Route Accuracy" },
    { v: 360, suffix: "°", label: "Traffic Awareness Coverage" },
  ];
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="glass glow-border p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 reveal">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-gradient neon-text">
                <Counter to={s.v} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CONTACT ---------- */

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4">
        <SectionHeader
          eyebrow="Contact"
          title={<>Get in <span className="text-gradient">Touch</span></>}
          sub="For demos, pilots, partnerships and city integrations — let's talk."
        />
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="glass glow-border p-6 md:p-10 grid gap-5 reveal"
        >
          <Field Icon={User} label="Name" type="text" placeholder="Your full name" />
          <Field Icon={Mail} label="Email" type="email" placeholder="you@example.com" />
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-2">
              <MessageSquare className="h-3.5 w-3.5 text-[var(--neon-cyan)]" /> Message
            </label>
            <textarea
              required
              rows={5}
              placeholder="Tell us about your city or project..."
              className="w-full rounded-md bg-[var(--input)]/40 border border-[var(--neon-blue)]/30 px-4 py-3 text-sm focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_20px_-5px_rgba(80,180,255,0.6)] transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] text-[var(--deep-navy)] hover:shadow-[0_15px_50px_-10px_rgba(80,180,255,1)] transition-all"
          >
            <Send className="h-4 w-4" /> {sent ? "Message Sent" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ Icon, label, type, placeholder }: { Icon: React.ComponentType<{ className?: string }>; label: string; type: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5 text-[var(--neon-cyan)]" /> {label}
      </label>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md bg-[var(--input)]/40 border border-[var(--neon-blue)]/30 px-4 py-3 text-sm focus:outline-none focus:border-[var(--neon-cyan)] focus:shadow-[0_0_20px_-5px_rgba(80,180,255,0.6)] transition"
      />
    </div>
  );
}

/* ---------- FOOTER ---------- */

function Footer() {
  return (
    <footer className="relative z-10 mt-10 border-t border-[var(--neon-blue)]/20">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center">
        <div className="text-3xl md:text-4xl font-black tracking-tight text-gradient neon-text">RESQ SENTINEL</div>
        <p className="mt-3 text-sm text-foreground/90">Clearing the Path Before Every Second Counts.</p>
        <p className="mt-1 text-xs text-muted-foreground">Autonomous Emergency Traffic Clearance Drone System</p>
        <div className="mt-6 h-px max-w-md mx-auto border-flow" />
        <p className="mt-6 text-[11px] uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} ResQ Sentinel · All systems nominal
        </p>
      </div>
    </footer>
  );
}

/* ---------- LAUNCH SEQUENCE ---------- */

function LaunchSequence() {
  const steps = [
    { Icon: Crosshair, label: "GPS Lock Acquired", code: "GPS · 12 SAT" },
    { Icon: Upload, label: "Mission Uploaded", code: "WPT · 24/24" },
    { Icon: Power, label: "Flight Systems Armed", code: "ARM · OK" },
    { Icon: PlaneTakeoff, label: "Autonomous Launch", code: "ALT · +18m" },
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Section 03 · Launch Sequence"
          title={<>Drone <span className="text-gradient">Launch Sequence</span></>}
          sub="A four-stage autonomous handshake between dispatch, autopilot and airframe — completed in under thirty seconds."
        />
        <div className="glass glow-border p-6 md:p-10 reveal">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-6">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-cyan)] animate-pulse" /> Command Center · Live</span>
            <span>T − 00:00:28</span>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {steps.map(({ Icon, label, code }, i) => (
              <div key={label} className="relative rounded-lg border border-[var(--neon-blue)]/30 bg-[var(--input)]/30 p-5 overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-px border-flow" style={{ animationDelay: `${i * 0.4}s` }} />
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] uppercase tracking-widest text-[var(--neon-cyan)]">Stage {String(i + 1).padStart(2, "0")}</div>
                  <CheckCircle2 className="h-4 w-4 text-[var(--neon-cyan)]" />
                </div>
                <Icon className="h-7 w-7 text-[var(--neon-cyan)] mb-3" />
                <div className="text-sm font-bold">{label}</div>
                <div className="mt-2 font-mono text-[10px] text-muted-foreground">{code}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] uppercase tracking-widest">
            {[["Battery", "98%"], ["Wind", "4 m/s"], ["Signal", "−62 dBm"], ["Heading", "N 042°"]].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between rounded-md bg-[var(--input)]/40 px-3 py-2">
                <span className="text-muted-foreground">{k}</span>
                <span className="text-gradient font-bold">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CLOSING ---------- */

function Closing() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" aria-hidden />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[var(--neon-blue)]/15 blur-[140px]" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 text-center reveal">
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--neon-cyan)] animate-pulse" /> Mission Statement
        </div>
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95]">
          Every Second Saved Is{" "}
           <span className="text-gradient neon-text">A Life Protected</span>
        </h2>
        <p className="mt-8 text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
          ResQ Sentinel is redefining emergency response through autonomous aerial traffic management.
        </p>
        <div className="mt-10 h-px max-w-md mx-auto border-flow" />
      </div>
    </section>
  );
}

/* ---------- ABSTRACT ---------- */

function Abstract() {
  return (
    <section id="abstract" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Section 01 · Abstract"
          title={<>The <span className="text-gradient">Mission Brief</span></>}
          sub="An overview of why ResQ Sentinel exists and the problem it is engineered to solve."
        />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 reveal">
            <Card className="h-full">
              <IconChip Icon={FileText} />
              <h3 className="text-2xl font-bold mb-3">Autonomous Aerial Emergency Support</h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Traffic congestion is one of the primary causes of delayed emergency response in urban areas.
                Even minimal delays can significantly impact patient survival rates and disaster response outcomes.
              </p>
              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                <span className="text-foreground font-semibold">ResQ Sentinel</span> is an autonomous emergency
                traffic clearance drone that launches roughly five minutes ahead of an ambulance — using GPS-based
                navigation, autonomous flight control and real-time communication systems to clear the corridor
                with high-intensity lights, sirens and voice alerts before the ambulance arrives.
              </p>
            </Card>
          </div>
          <div className="reveal grid gap-4">
            {[
              { k: "LEAD DISTANCE", v: "≈ 100-200m", l: "Ahead of ambulance" },
              { k: "Mode", v: "Autonomous", l: "GPS waypoint flight" },
              { k: "Alerts", v: "Tri-Modal", l: "Siren · LED · Voice" },
            ].map((s) => (
              <div key={s.k} className="glass glow-border p-5">
                <div className="text-[10px] uppercase tracking-widest text-[var(--neon-cyan)]">{s.k}</div>
                <div className="text-2xl font-black text-gradient mt-1">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- OBJECTIVES ---------- */

function Objectives() {
  const items = [
    { Icon: Bot, title: "Stable Hexacopter Platform", d: "Design and develop a robust six-rotor airframe tuned for urban flight." },
    { Icon: Satellite, title: "GPS Autonomous Navigation", d: "Implement waypoint-driven autonomous routing along the ambulance corridor." },
    { Icon: Megaphone, title: "Early Traffic Warning", d: "Deliver an effective multi-modal alert system to clear traffic in advance." },
    { Icon: Timer, title: "Reduce Response Time", d: "Cut critical minutes off every emergency call in dense urban areas." },
    { Icon: Building2, title: "Smart City Demonstration", d: "Showcase a connected, scalable solution aligned with smart city goals." },
    { Icon: ShieldCheck, title: "Operate Safely at Scale", d: "Layered fail-safes ensure reliable, repeatable urban operations." },
  ];
  return (
    <section id="objectives" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Section 02 · Objectives"
          title={<>Engineering <span className="text-gradient">Objectives</span></>}
          sub="The measurable goals driving every design decision behind ResQ Sentinel."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ Icon, title, d }, i) => (
            <div key={title} className="reveal" style={{ animationDelay: `${i * 70}ms` }}>
              <Card className="h-full">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--neon-blue)]/30 to-[var(--neon-cyan)]/10 border border-[var(--neon-blue)]/40 text-[var(--neon-cyan)]">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--neon-cyan)] mb-1">Goal {String(i + 1).padStart(2, "0")}</div>
                    <h3 className="text-base font-bold mb-1 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-[var(--neon-cyan)]" />
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{d}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- AMBULANCE INTEGRATION ---------- */

function AmbulanceIntegration() {
  const channels = [
    { Icon: ListChecks, title: "Pre-Programmed Mission", d: "Hospitals and dispatch send GPS based route plans for common corridors" },
    { Icon: Radio, title: "Real-Time Transmission", d: "Live routes are streamed from a mobile or control system the moment dispatch occurs." },
    { Icon: Brain, title: "Shortest Route Prediction", d: "ML model predicts the fastest path the ambulance is likely to take and dispatches accordingly." },
  ];
  return (
    <section id="integration" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          eyebrow="Section 05 · Integration"
          title={<>Ambulance <span className="text-gradient">Integration System</span></>}
          sub="Three synchronized channels keep the drone aligned with the ambulance from dispatch to delivery."
        />
        <div className="grid lg:grid-cols-3 gap-5">
          {channels.map(({ Icon, title, d }, i) => (
            <div key={title} className="reveal" style={{ animationDelay: `${i * 90}ms` }}>
              <Card className="h-full">
                <IconChip Icon={Icon} />
                <div className="text-[10px] uppercase tracking-widest text-[var(--neon-cyan)] mb-1">Channel {String(i + 1).padStart(2, "0")}</div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-10 glass glow-border p-6 md:p-8 reveal">
          <div className="grid md:grid-cols-5 gap-4 items-center">
            {[
              { Icon: Ambulance, label: "Ambulance" },
              { Icon: Waypoints, label: "Route Sync" },
              { Icon: Bot, label: "ResQ Sentinel" },
              { Icon: Megaphone, label: "Alerts" },
              { Icon: Flag, label: "Corridor Clear" },
            ].map(({ Icon, label }, i, arr) => (
              <div key={label} className="flex items-center justify-center gap-3">
                <div className="flex flex-col items-center text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--neon-blue)]/30 to-[var(--neon-cyan)]/10 border border-[var(--neon-blue)]/40 text-[var(--neon-cyan)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
                </div>
                {i < arr.length - 1 && (
                  <ArrowRight className="hidden md:block h-4 w-4 text-[var(--neon-cyan)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CONCLUSION ---------- */

function Conclusion() {
  return (
    <section id="conclusion" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeader
          eyebrow="Conclusion"
          title={<>A <span className="text-gradient">Practical & Scalable</span> Solution</>}
        />
        <div className="grid gap-6">
          <div className="reveal">
            <Card>
              <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
                The <span className="text-gradient font-bold">ResQ Sentinel</span> system demonstrates a practical and scalable
                solution to one of the most critical urban challenges — delayed emergency response due to traffic congestion.
              </p>
              <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                By leveraging autonomous drone technology, GPS navigation and multi-modal alert systems, this project
                provides an efficient method to improve response times and potentially save lives. It also lays the
                foundation for future smart city applications, where drones can assist in traffic management, disaster
                response and public safety operations.
              </p>
            </Card>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 reveal">
            {[
              { Icon: Heart, t: "Lives Saved", d: "Faster response, higher survival." },
              { Icon: Building2, t: "Smart City Ready", d: "Connected urban infrastructure." },
              { Icon: Sparkles, t: "Scalable Future", d: "Dock-based fleet deployment." },
            ].map(({ Icon, t, d }) => (
              <div key={t} className="glass p-5 text-center">
                <div className="mx-auto mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--neon-blue)]/30 to-[var(--neon-cyan)]/10 border border-[var(--neon-blue)]/40 text-[var(--neon-cyan)]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-bold">{t}</div>
                <div className="text-xs text-muted-foreground mt-1">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

