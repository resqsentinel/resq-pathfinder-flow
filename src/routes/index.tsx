import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Radio, MapPin, Plane, Siren, Activity, Radar, Zap, ShieldCheck,
  Crosshair, Power, Cpu, Satellite, AlertTriangle, Timer,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ResQ Sentinel — Live Mission Console" },
      { name: "description", content: "Step inside a live autonomous emergency response. Watch ResQ Sentinel clear the path before every second counts." },
      { property: "og:title", content: "ResQ Sentinel — Live Mission Console" },
      { property: "og:description", content: "An immersive autonomous emergency response simulation." },
    ],
  }),
  component: MissionConsole,
});

/* ============================================================
   ResQ Sentinel — Immersive Mission Console
   No cards. No sections. Just a live operation.
   ============================================================ */

function MissionConsole() {
  const [booted, setBooted] = useState(false);
  const [phase, setPhase] = useState(0); // 0..6
  const mouse = useRef({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Mouse parallax for tactical map
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5);
      const ny = (e.clientY / window.innerHeight - 0.5);
      mouse.current = { x: nx, y: ny };
      setTilt({ x: nx * 8, y: ny * -8 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Scroll-driven phase progression
  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      const idx = Math.min(6, Math.max(0, Math.floor(window.scrollY / vh)));
      setPhase(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative bg-[#050505] text-white selection:bg-[#FF1744]/40">
      {!booted && <BootSequence onDone={() => setBooted(true)} />}
      <HUDOverlay phase={phase} />
      <ScanLines />
      <Mission01 tilt={tilt} active={phase >= 0} />
      <Mission02 active={phase >= 1} />
      <Mission03 tilt={tilt} active={phase >= 2} />
      <Mission04 active={phase >= 3} />
      <Mission05 active={phase >= 4} />
      <Mission06 active={phase >= 5} />
      <Outro />
    </div>
  );
}

/* ---------- Boot / Dispatch sequence ---------- */
function BootSequence({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const script = [
    "> SECURE UPLINK ESTABLISHED",
    "> AUTHENTICATING DISPATCH NODE … OK",
    "> INCOMING 911 SIGNAL ████████",
    "> EMERGENCY RESPONSE REQUEST RECEIVED",
    "> CALCULATING GPS COORDINATES …",
    "> LAT  28.6139°N   LON  77.2090°E",
    "> GENERATING TACTICAL ROUTE …",
    "> RESQ SENTINEL // MISSION CONSOLE ONLINE",
  ];
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setLines((l) => [...l, script[i]]);
      i++;
      if (i >= script.length) {
        clearInterval(t);
        setTimeout(() => setDone(true), 700);
        setTimeout(onDone, 1600);
      }
    }, 320);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-700 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 opacity-30"
        style={{ background: "radial-gradient(circle at 50% 50%, #FF1744 0%, transparent 60%)" }} />
      <div className="relative w-[min(680px,92vw)] font-mono text-[13px] leading-relaxed">
        <div className="flex items-center gap-2 mb-4 text-[#FF1744]">
          <span className="w-2 h-2 rounded-full bg-[#FF1744] animate-pulse" />
          <span className="tracking-[0.3em] text-xs">RESQ // DISPATCH</span>
        </div>
        {lines.map((l, i) => (
          <div key={i} className="text-white/85 whitespace-pre">
            {l}
            {i === lines.length - 1 && <span className="inline-block w-2 h-4 bg-[#FF9100] ml-1 animate-pulse" />}
          </div>
        ))}
      </div>
      <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[10px] tracking-[0.3em] text-white/40 font-mono">
        <span>SECURE CHANNEL // AES-256</span>
        <span className="text-[#FF1744]">● LIVE</span>
      </div>
    </div>
  );
}

/* ---------- Persistent HUD ---------- */
function HUDOverlay({ phase }: { phase: number }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const missions = ["DISPATCH", "DEPLOY", "ANALYZE", "CLEAR", "ADVANCE", "COMPLETE"];
  return (
    <div className="pointer-events-none fixed inset-0 z-50 font-mono text-[10px] tracking-[0.25em] text-white/60">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 py-3 border-b border-[#FF1744]/20 bg-black/40 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Siren className="w-4 h-4 text-[#FF1744]" />
          <span className="text-white">RESQ SENTINEL</span>
          <span className="text-[#FF1744]">● LIVE OPERATION</span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {missions.map((m, i) => (
            <span key={m} className={`transition-colors ${i <= phase ? "text-[#FF9100]" : "text-white/25"}`}>
              {String(i + 1).padStart(2, "0")} {m}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span>{time.toUTCString().slice(17, 25)} UTC</span>
        </div>
      </div>
      {/* Corners */}
      {[
        "top-12 left-3", "top-12 right-3", "bottom-3 left-3", "bottom-3 right-3",
      ].map((p, i) => (
        <div key={i} className={`absolute ${p} w-6 h-6 border-[#FF1744]`}
          style={{
            borderTopWidth: p.includes("top") ? 1 : 0,
            borderBottomWidth: p.includes("bottom") ? 1 : 0,
            borderLeftWidth: p.includes("left") ? 1 : 0,
            borderRightWidth: p.includes("right") ? 1 : 0,
          }} />
      ))}
      {/* Bottom telemetry */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-2 border-t border-[#FF1744]/20 bg-black/40 backdrop-blur-sm">
        <span>ALT 120m</span>
        <span>SPD 84 km/h</span>
        <span>BAT 92%</span>
        <span className="text-[#FF9100]">SIGNAL ████████░</span>
      </div>
    </div>
  );
}

function ScanLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.08] mix-blend-overlay"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
      }} />
  );
}

/* ===================== MISSION 01 — Emergency Call ===================== */
function Mission01({ tilt, active }: { tilt: { x: number; y: number }; active: boolean }) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <RadarSweep />
      <TacticalMap tilt={tilt} />
      <div className="relative z-10 text-center px-6">
        <MissionTag id="01" label="EMERGENCY CALL RECEIVED" />
        <h1 className="mt-6 font-mono text-4xl md:text-6xl font-bold tracking-tight">
          <span className="text-white">INCOMING </span>
          <span className="text-[#FF1744]" style={{ textShadow: "0 0 30px #FF1744" }}>SIGNAL</span>
        </h1>
        <p className="mt-4 text-white/60 font-mono text-xs tracking-[0.3em]">
          28.6139° N // 77.2090° E — CARDIAC EMERGENCY — PRIORITY ALPHA
        </p>
        <div className="mt-10 inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-[#FF9100]">
          <span className="w-2 h-2 rounded-full bg-[#FF9100] animate-pulse" />
          AWAITING DEPLOYMENT AUTHORIZATION
        </div>
      </div>
      <ScrollHint />
    </section>
  );
}

function RadarSweep() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-[min(90vh,90vw)] aspect-square">
        {[0.25, 0.5, 0.75, 1].map((s) => (
          <div key={s} className="absolute inset-0 rounded-full border border-[#FF1744]/20"
            style={{ transform: `scale(${s})` }} />
        ))}
        <div className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, #FF174455 30deg, transparent 60deg)",
            animation: "radar-sweep 4s linear infinite",
          }} />
        <div className="absolute left-1/2 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF1744] shadow-[0_0_20px_#FF1744]" />
        {/* pings */}
        {[[20,30],[70,55],[45,80]].map(([x,y],i)=>(
          <span key={i} className="absolute w-3 h-3 rounded-full bg-[#FF9100]"
            style={{ left: `${x}%`, top: `${y}%`, boxShadow: "0 0 12px #FF9100", animation: `ping-dot 2s ${i*0.4}s ease-out infinite` }} />
        ))}
      </div>
    </div>
  );
}

/* ===================== MISSION 02 — Drone Deployment ===================== */
function Mission02({ active }: { active: boolean }) {
  const [count, setCount] = useState(5);
  useEffect(() => {
    if (!active) return;
    setCount(5);
    const t = setInterval(() => setCount((c) => (c > 0 ? c - 1 : 0)), 800);
    return () => clearInterval(t);
  }, [active]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 50% 80%, #FF174433, transparent 50%), #050505",
        }} />
      <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center px-8 max-w-6xl">
        <div>
          <MissionTag id="02" label="DRONE DEPLOYMENT" />
          <h2 className="mt-6 font-mono text-4xl md:text-5xl font-bold leading-tight">
            LAUNCHING<br/>
            <span className="text-[#FF1744]">RESQ SENTINEL</span>
          </h2>
          <div className="mt-8 font-mono text-7xl md:text-9xl font-black text-[#FF9100]"
            style={{ textShadow: "0 0 40px #FF9100" }}>
            T-{count}
          </div>
          <div className="mt-6 space-y-1 font-mono text-[11px] tracking-[0.25em] text-white/60">
            <Diag label="ROTOR DIAGNOSTICS" ok />
            <Diag label="GPS LOCK" ok />
            <Diag label="THERMAL CAMERA" ok />
            <Diag label="ROUTE UPLINK" ok={count <= 3} />
            <Diag label="FLIGHT AUTHORIZATION" ok={count === 0} />
          </div>
        </div>
        <div className="relative h-[420px] flex items-center justify-center">
          <DroneGraphic launching={count === 0} />
        </div>
      </div>
    </section>
  );
}

function Diag({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-1.5">
      <span className="text-white/70">{label}</span>
      <span className={ok ? "text-[#FF9100]" : "text-white/30"}>
        {ok ? "● OK" : "○ ..."}
      </span>
    </div>
  );
}

function DroneGraphic({ launching }: { launching: boolean }) {
  return (
    <div className="relative w-72 h-72">
      {/* spinning targeting reticle */}
      <div className="absolute inset-0 rounded-full border border-[#FF1744]/30"
        style={{ animation: "spin-slow 18s linear infinite" }}>
        {[0,90,180,270].map(a=>(
          <div key={a} className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1 w-px h-3 bg-[#FF1744]"
            style={{ transformOrigin: "50% 144px", transform: `rotate(${a}deg)` }} />
        ))}
      </div>
      <div className="absolute inset-4 rounded-full border border-[#FF9100]/20"
        style={{ animation: "spin-slow 12s linear infinite reverse" }} />
      {/* drone body */}
      <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-1000 ${launching ? "-translate-y-8" : ""}`}>
        <svg viewBox="0 0 200 200" className="w-48 h-48">
          {/* arms */}
          <g stroke="#FF1744" strokeWidth="3" fill="none" opacity="0.9">
            <line x1="100" y1="100" x2="40" y2="40" />
            <line x1="100" y1="100" x2="160" y2="40" />
            <line x1="100" y1="100" x2="40" y2="160" />
            <line x1="100" y1="100" x2="160" y2="160" />
          </g>
          {/* core */}
          <circle cx="100" cy="100" r="18" fill="#050505" stroke="#FF9100" strokeWidth="2" />
          <circle cx="100" cy="100" r="6" fill="#FF1744" />
          {/* rotors */}
          {[[40,40],[160,40],[40,160],[160,160]].map(([x,y],i)=>(
            <g key={i}>
              <circle cx={x} cy={y} r="14" fill="none" stroke="#FF9100" strokeWidth="1.5" opacity="0.7" />
              <ellipse cx={x} cy={y} rx="20" ry="2" fill="#FF1744" opacity="0.45"
                style={{ transformOrigin: `${x}px ${y}px`, animation: "spin-slow 0.15s linear infinite" }} />
            </g>
          ))}
        </svg>
      </div>
      {launching && (
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-32 h-32 rounded-full"
          style={{ background: "radial-gradient(circle, #FF174455, transparent 70%)" }} />
      )}
    </div>
  );
}

/* ===================== MISSION 03 — Traffic Analysis ===================== */
function Mission03({ tilt, active }: { tilt: { x: number; y: number }; active: boolean }) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <TacticalMap tilt={tilt} dense />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40" />
      <div className="relative z-10 max-w-md px-8">
        <MissionTag id="03" label="TRAFFIC ANALYSIS" />
        <h2 className="mt-6 font-mono text-4xl md:text-5xl font-bold leading-tight">
          AI SCANNING<br/>
          <span className="text-[#FF1744]">CITY GRID</span>
        </h2>
        <div className="mt-6 space-y-3 font-mono text-[11px] tracking-[0.2em] text-white/70">
          <Reading icon={<Cpu className="w-3 h-3" />} label="NEURAL TRAFFIC MODEL" value="ACTIVE" />
          <Reading icon={<Satellite className="w-3 h-3" />} label="SATELLITE FEED" value="14 NODES" />
          <Reading icon={<AlertTriangle className="w-3 h-3" />} label="BOTTLENECKS FOUND" value="3 ZONES" />
          <Reading icon={<Crosshair className="w-3 h-3" />} label="OPTIMAL CORRIDOR" value="ROUTE δ-7" />
        </div>
        <div className="mt-8 flex items-center gap-2 text-[10px] tracking-[0.3em] text-[#FF9100] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF9100] animate-pulse" />
          IDENTIFYING CONGESTION VECTORS
        </div>
      </div>
    </section>
  );
}

function Reading({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#FF1744]/15 py-2">
      <span className="flex items-center gap-2"><span className="text-[#FF1744]">{icon}</span>{label}</span>
      <span className="text-[#FF9100]">{value}</span>
    </div>
  );
}

/* ===================== MISSION 04 — Path Clearance ===================== */
function Mission04({ active }: { active: boolean }) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[#050505]" />
      <CityClearance active={active} />
      <div className="absolute top-1/2 left-8 -translate-y-1/2 max-w-xs">
        <MissionTag id="04" label="PATH CLEARANCE" />
        <h2 className="mt-6 font-mono text-4xl md:text-5xl font-bold leading-tight">
          CLEARING THE<br/><span className="text-[#FF1744]">CORRIDOR</span>
        </h2>
        <p className="mt-4 font-mono text-xs tracking-[0.2em] text-white/60 leading-relaxed">
          Drone broadcasts emergency override.<br/>Vehicles yield. Lights synchronize.
        </p>
      </div>
    </section>
  );
}

function CityClearance({ active }: { active: boolean }) {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-[65%] flex items-center justify-center">
      <svg viewBox="0 0 600 500" className="w-full h-full max-h-[80vh]">
        {/* perspective road */}
        <defs>
          <linearGradient id="roadGlow" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#FF1744" stopOpacity="0" />
            <stop offset="100%" stopColor="#FF1744" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {/* horizon grid */}
        {Array.from({length:10}).map((_,i)=>(
          <line key={i} x1={300 - i*40} y1={500 - i*40} x2={300 + i*40} y2={500 - i*40}
            stroke="#FF1744" strokeOpacity={0.08 + i*0.02} strokeWidth="1" />
        ))}
        {/* road */}
        <polygon points="240,500 360,500 340,150 260,150" fill="url(#roadGlow)" opacity="0.5" />
        <polygon points="240,500 360,500 340,150 260,150" fill="none" stroke="#FF9100" strokeWidth="1.5" opacity="0.8" />
        {/* center dashes */}
        {[0,1,2,3,4,5,6].map(i=>{
          const t = i/7;
          const y = 500 - t*350;
          const w = 4 * (1-t*0.7);
          return <rect key={i} x={300 - w/2} y={y - 8*(1-t*0.7)} width={w} height={8*(1-t*0.7)} fill="#FF9100">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" begin={`${i*0.1}s`} repeatCount="indefinite" />
          </rect>;
        })}
        {/* yielding cars (left/right) */}
        {[180,260,340,420].map((y,i)=>(
          <g key={i}>
            <rect x={210} y={y} width={14} height={20} fill="#FF1744" opacity="0.7">
              <animateTransform attributeName="transform" type="translate" values="0,0;-25,0;-25,0" dur="2.4s" begin={`${i*0.3}s`} repeatCount="indefinite" />
            </rect>
            <rect x={376} y={y} width={14} height={20} fill="#FF1744" opacity="0.7">
              <animateTransform attributeName="transform" type="translate" values="0,0;25,0;25,0" dur="2.4s" begin={`${i*0.3}s`} repeatCount="indefinite" />
            </rect>
          </g>
        ))}
        {/* drone flying down */}
        <g>
          <circle cx="300" cy="180" r="6" fill="#FF9100">
            <animate attributeName="cy" values="160;460;160" dur="4s" repeatCount="indefinite" />
            <animate attributeName="r" values="4;10;4" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="300" cy="180" r="20" fill="none" stroke="#FF9100" strokeWidth="1" opacity="0.5">
            <animate attributeName="cy" values="160;460;160" dur="4s" repeatCount="indefinite" />
            <animate attributeName="r" values="12;30;12" dur="4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.6;0;0.6" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
        {/* ambulance trailing */}
        <g>
          <rect x="290" y="470" width="20" height="26" rx="2" fill="#fff" stroke="#FF1744" strokeWidth="2">
            <animate attributeName="y" values="490;200;490" dur="4s" begin="0.8s" repeatCount="indefinite" />
          </rect>
        </g>
      </svg>
    </div>
  );
}

/* ===================== MISSION 05 — Ambulance Advance ===================== */
function Mission05({ active }: { active: boolean }) {
  const [withResq, setWith] = useState(720);
  const [without] = useState(1080);
  useEffect(() => {
    if (!active) return;
    setWith(1080);
    let v = 1080;
    const t = setInterval(() => {
      v -= 12;
      if (v <= 432) { clearInterval(t); return; }
      setWith(v);
    }, 30);
    return () => clearInterval(t);
  }, [active]);

  const fmt = (s: number) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 50%, #FF174422, transparent 60%), #050505" }} />
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <MissionTag id="05" label="AMBULANCE ADVANCE" />
        <h2 className="mt-6 font-mono text-3xl md:text-5xl font-bold">
          ETA <span className="text-[#FF1744]">REDUCED</span>
        </h2>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="relative p-8 border border-white/15">
            <div className="text-[10px] tracking-[0.3em] text-white/40 font-mono">WITHOUT RESQ SENTINEL</div>
            <div className="mt-4 font-mono text-7xl font-black text-white/70">{fmt(without)}</div>
            <div className="mt-2 text-xs text-white/40 font-mono tracking-[0.2em]">CONVENTIONAL RESPONSE</div>
            <div className="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(135deg, transparent 0 12px, rgba(255,255,255,0.04) 12px 13px)" }} />
          </div>
          <div className="relative p-8 border border-[#FF1744]"
            style={{ boxShadow: "0 0 60px #FF174455, inset 0 0 40px #FF174422" }}>
            <div className="text-[10px] tracking-[0.3em] text-[#FF9100] font-mono">WITH RESQ SENTINEL</div>
            <div className="mt-4 font-mono text-7xl font-black text-[#FF1744]"
              style={{ textShadow: "0 0 30px #FF1744" }}>{fmt(withResq)}</div>
            <div className="mt-2 text-xs text-[#FF9100] font-mono tracking-[0.2em]">AUTONOMOUS CLEARANCE</div>
          </div>
        </div>
        <div className="mt-10 font-mono text-sm tracking-[0.3em] text-[#FF9100]">
          <Timer className="inline w-4 h-4 mr-2" />
          {fmt(without - withResq)} SAVED — LIVES PROTECTED
        </div>
      </div>
    </section>
  );
}

/* ===================== MISSION 06 — Complete ===================== */
function Mission06({ active }: { active: boolean }) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-black" />
      <div className={`absolute inset-0 transition-opacity duration-1000 ${active ? "opacity-100" : "opacity-0"}`}
        style={{ background: "radial-gradient(circle at 50% 50%, #FF174433, transparent 70%)" }} />
      <div className="relative z-10 text-center px-6">
        <div className="inline-flex items-center gap-3 mb-8 font-mono text-[11px] tracking-[0.4em] text-[#FF9100]">
          <ShieldCheck className="w-4 h-4" /> MISSION 06 // COMPLETE
        </div>
        <h2 className="font-mono text-4xl md:text-7xl font-black leading-[1.05] tracking-tight max-w-4xl">
          EVERY SECOND <span className="text-[#FF1744]" style={{ textShadow: "0 0 40px #FF1744" }}>SAVED</span><br/>
          IS A LIFE <span className="text-[#FF1744]" style={{ textShadow: "0 0 40px #FF1744" }}>PROTECTED</span>.
        </h2>
        <p className="mt-8 font-mono text-xs tracking-[0.3em] text-white/50">
          RESQ SENTINEL — AUTONOMOUS EMERGENCY TRAFFIC CLEARANCE
        </p>
      </div>
    </section>
  );
}

/* ===================== Outro / Sign-off ===================== */
function Outro() {
  return (
    <footer className="relative h-[40vh] w-full flex items-center justify-center border-t border-[#FF1744]/20 bg-black">
      <div className="text-center px-6 font-mono">
        <div className="text-[10px] tracking-[0.4em] text-[#FF1744]">RESQ SENTINEL</div>
        <div className="mt-3 text-2xl md:text-3xl tracking-tight text-white">
          Clearing the Path Before Every Second Counts.
        </div>
        <div className="mt-3 text-[10px] tracking-[0.3em] text-white/40">
          AUTONOMOUS EMERGENCY TRAFFIC CLEARANCE DRONE SYSTEM
        </div>
      </div>
    </footer>
  );
}

/* ===================== Shared visual primitives ===================== */
function MissionTag({ id, label }: { id: string; label: string }) {
  return (
    <div className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.4em]">
      <span className="text-[#FF1744]">MISSION {id}</span>
      <span className="w-8 h-px bg-[#FF1744]/50" />
      <span className="text-white/60">{label}</span>
    </div>
  );
}

function ScrollHint() {
  return (
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.4em] text-white/40 animate-pulse">
      ↓ SCROLL TO ENGAGE
    </div>
  );
}

function TacticalMap({ tilt, dense }: { tilt: { x: number; y: number }; dense?: boolean }) {
  // CSS-only animated city grid w/ parallax & traffic streams
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-[-10%] transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1200px) rotateX(55deg) rotateZ(${tilt.x * 0.5}deg) translateY(${tilt.y}px)`,
          transformOrigin: "50% 50%",
        }}
      >
        {/* base grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#FF174422 1px, transparent 1px), linear-gradient(90deg, #FF174422 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            animation: "grid-move 40s linear infinite",
          }} />
        {/* fine grid */}
        <div className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#FF174411 1px, transparent 1px), linear-gradient(90deg, #FF174411 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }} />
        {/* traffic streams (dense mode) */}
        {dense && (
          <>
            <div className="absolute top-1/3 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1744] to-transparent"
              style={{ animation: "traffic-flow 3s linear infinite" }} />
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF9100] to-transparent"
              style={{ animation: "traffic-flow 4s linear infinite reverse" }} />
            <div className="absolute top-2/3 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF1744] to-transparent"
              style={{ animation: "traffic-flow 5s linear infinite" }} />
          </>
        )}
      </div>
      {/* vignette */}
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 30%, #050505 80%)" }} />
    </div>
  );
}
