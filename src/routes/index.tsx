import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle, Activity, Volume2, Timer, Rocket, MapPin, Plane, Megaphone, Car, Heart,
  Cpu, Compass, Satellite, Radio, Bot, Siren, Lightbulb, Route as RouteIcon, Anchor, ShieldCheck,
  ShieldAlert, BatteryCharging, MapPinned, LandPlot, Home as HomeIcon, ListChecks, Lock,
  Zap, Network, Building2, Radar, Eye, PlaneTakeoff, Sparkles, ArrowRight, Mail, User,
  MessageSquare, Send,
} from "lucide-react";
import smartCity from "@/assets/smart-city.jpg";
import { Nav } from "@/components/site/Nav";
import { NeonFrame, ParticleField, useScrollReveal } from "@/components/site/NeonFrame";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResQ Sentinel — Autonomous Emergency Drone System" },
      { name: "description", content: "Autonomous drones that clear traffic ahead of ambulances — reducing emergency response times when every second counts." },
      { property: "og:title", content: "ResQ Sentinel — Clearing the Path Before Every Second Counts" },
      { property: "og:description", content: "Autonomous Emergency Traffic Clearance Drone System." },
      { property: "og:image", content: heroDrone },
      { name: "twitter:image", content: heroDrone },
    ],
  }),
  component: Index,
});

function Index() {
  useScrollReveal();
  return (
    <div className="relative min-h-screen text-foreground">
      <ParticleField />
      <NeonFrame />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Problem />
        <Solution />
        <Architecture />
        <Features />
        <Safety />
        <Innovation />
        <FutureVision />
        <Stats />
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

/* Spinning propeller overlay — 3-blade SVG centered on a motor hub */
function Propeller({ style, reverse, delay }: { style: React.CSSProperties; reverse?: boolean; delay?: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        ...style,
        width: "22%",
        height: "22%",
        transform: "translate(-50%, -50%)",
      }}
      aria-hidden
    >
      {/* motion-blur disc to sell the spin */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(180,220,255,0.18) 0%, rgba(120,180,255,0.10) 55%, transparent 72%)",
          filter: "blur(4px)",
        }}
      />
      <svg
        viewBox="-50 -50 100 100"
        className="absolute inset-0 h-full w-full"
        style={{
          animation: `spin-slow 0.35s linear infinite ${reverse ? "reverse" : "normal"}`,
          animationDelay: `${delay ?? 0}s`,
          filter: "blur(1.2px) drop-shadow(0 0 6px rgba(120,200,255,0.45))",
        }}
      >
        {[0, 120, 240].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="0"
            rx="45"
            ry="4.5"
            fill="rgba(220,235,255,0.55)"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx="0" cy="0" r="6" fill="rgba(40,60,90,0.9)" />
      </svg>
    </div>
  );
}

/* ---------- HERO ---------- */

function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
      <div className="absolute top-1/2 -left-40 h-[500px] w-[500px] rounded-full bg-[var(--neon-blue)]/20 blur-[120px]" aria-hidden />
      <div className="absolute top-1/3 -right-40 h-[500px] w-[500px] rounded-full bg-[var(--neon-cyan)]/20 blur-[120px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-muted-foreground mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            Emergency Response · Autonomous Aerial
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95]">
            <span className="text-gradient neon-text">RESQ</span><br />
            <span className="text-gradient neon-text">SENTINEL</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-foreground/90 max-w-xl">
            Clearing the Path Before Every Second Counts.
          </p>
          <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl">
            Autonomous Emergency Traffic Clearance Drone System — a fleet of intelligent
            hexacopters that fly ahead of ambulances and clear the road before they arrive.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#features"
              className="group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wider bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] text-[var(--deep-navy)] shadow-[0_10px_40px_-10px_rgba(80,180,255,0.7)] hover:shadow-[0_15px_50px_-10px_rgba(80,180,255,1)] transition-all">
              Explore Technology
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#architecture"
              className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wider glass glow-border hover:bg-white/5 transition">
              View System Architecture
            </a>
          </div>

          {/* HUD micro stats */}
          <div className="mt-10 grid grid-cols-3 gap-3 max-w-md">
            {[
              ["< 30s", "Launch"],
              ["2 KM", "Range"],
              ["24/7", "Standby"],
            ].map(([v, l]) => (
              <div key={l} className="glass p-3 text-center">
                <div className="text-xl font-black text-gradient">{v}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative reveal">
          <div className="relative aspect-square max-w-[620px] mx-auto">
            {/* rotating rings */}
            <div className="absolute inset-0 rounded-full border border-[var(--neon-blue)]/30 animate-spin-slow" />
            <div className="absolute inset-6 rounded-full border border-dashed border-[var(--neon-cyan)]/30 animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "26s" }} />
            <div className="absolute inset-12 rounded-full border border-[var(--neon-blue)]/20" />
            {/* glow */}
            <div className="absolute inset-10 rounded-full bg-[var(--neon-blue)]/15 blur-3xl animate-pulse-glow" />
            {/* rotor wash — radial ground-glow under the drone */}
            <div
              className="absolute left-1/2 bottom-[6%] -translate-x-1/2 w-[70%] h-[18%] rounded-[50%] pointer-events-none rotor-wash"
              aria-hidden
            />
            {/* drone — float (vertical bob) + subtle pitch/roll */}
            <div className="absolute inset-8 animate-float will-change-transform">
              <div className="relative h-full w-full drone-bob will-change-transform" style={{ transformStyle: "preserve-3d" }}>
                <img
                  src={heroDrone}
                  alt="ResQ Sentinel autonomous emergency hexacopter drone, top-down view"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,160,255,0.35)]"
                />
                {/* spinning propellers — positioned over each of the six motor hubs */}
                {[
                  { top: "5.8%",  left: "50%"   },
                  { top: "26.4%", left: "81.5%" },
                  { top: "69.3%", left: "81.5%" },
                  { top: "89.8%", left: "50%"   },
                  { top: "69.3%", left: "18.5%" },
                  { top: "26.4%", left: "18.5%" },
                ].map((pos, i) => (
                  <Propeller key={i} style={pos} reverse={i % 2 === 1} delay={i * 0.05} />
                ))}
              </div>
            </div>
            {/* HUD corners */}
            {["top-0 left-0", "top-0 right-0 rotate-90", "bottom-0 right-0 rotate-180", "bottom-0 left-0 -rotate-90"].map((p) => (
              <div key={p} className={`absolute ${p} h-8 w-8 border-t-2 border-l-2 border-[var(--neon-cyan)]`} />
            ))}
            {/* floating labels */}
            <div className="hidden md:block absolute -left-6 top-1/4 glass px-3 py-2 text-[10px] uppercase tracking-widest animate-float" style={{ animationDelay: "1s" }}>
              <div className="text-muted-foreground">Telemetry</div>
              <div className="text-gradient font-bold">LINKED</div>
            </div>
            <div className="hidden md:block absolute -right-4 bottom-1/4 glass px-3 py-2 text-[10px] uppercase tracking-widest animate-float" style={{ animationDelay: "2s" }}>
              <div className="text-muted-foreground">Status</div>
              <div className="text-gradient font-bold">ON MISSION</div>
            </div>
          </div>
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
