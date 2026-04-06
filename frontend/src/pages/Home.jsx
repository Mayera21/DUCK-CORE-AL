import { FiActivity } from "react-icons/fi";
import { Link } from "react-router-dom";

const features = [
  { label: "EXPLAIN", desc: "Understand any code in plain language. Step-by-step breakdown.", accent: "var(--neon-cyan)", path: "/chat", symbol: "⟹" },
  { label: "DEBUG", desc: "Surface bugs, anti-patterns, and broken logic instantly.", accent: "var(--neon-orange)", path: "/chat", symbol: "⟹" },
  { label: "OPTIMIZE", desc: "Rewrite for performance. Reduce complexity. Ship fast.", accent: "var(--neon-yellow)", path: "/chat", symbol: "⟹" },
];

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full text-[var(--text-primary)] gap-8">

      {/* HERO */}
      <div className="relative flex flex-col items-start gap-4 pt-8 pb-6 px-2 overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, var(--neon-cyan) 1px, transparent 1px)", backgroundSize: "28px 28px" }}>
        </div>

        <div className="flex items-center gap-2 relative z-10">
          <span className="text-[10px] text-[var(--neon-cyan)] uppercase tracking-widest border border-[var(--neon-cyan)] px-2 py-0.5">
            System Online
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--neon-yellow)] animate-pulse shadow-[0_0_6px_var(--neon-yellow)]"></span>
        </div>

        <h1 className="text-5xl font-[Orbitron] font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-yellow)] via-[var(--neon-orange)] to-[var(--neon-cyan)] uppercase tracking-tight leading-none relative z-10">
          DuckCore_AI
        </h1>
        <p className="font-mono text-[var(--text-dim)] text-sm max-w-lg relative z-10 leading-relaxed">
          A cyber-grade AI terminal for code analysis. Explain, debug, and optimize any codebase using advanced language model inference.
        </p>
        <Link
          to="/chat"
          className="relative z-10 border-2 border-[var(--neon-cyan)] text-[var(--neon-cyan)] text-xs font-bold px-8 py-3 uppercase tracking-widest hover:bg-[var(--neon-cyan)] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_var(--neon-cyan)]"
        >
          Launch Terminal →
        </Link>
      </div>

      {/* FEATURE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-2">
        {features.map((f) => (
          <Link to={f.path} key={f.label} className="group cyber-panel p-5 flex flex-col gap-3 hover:shadow-[0_0_20px_rgba(0,255,255,0.1)] transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="font-[Orbitron] text-xs uppercase tracking-widest" style={{ color: f.accent }}>
                {f.symbol} {f.label}
              </span>
              <FiActivity size={14} style={{ color: f.accent }} className="opacity-40 group-hover:opacity-100 transition-opacity"/>
            </div>
            <p className="font-mono text-xs text-[var(--text-dim)] leading-relaxed group-hover:text-[var(--text-primary)] transition-colors">
              {f.desc}
            </p>
            <div className="mt-auto h-px w-0 group-hover:w-full transition-all duration-500" style={{ backgroundColor: f.accent }}></div>
          </Link>
        ))}
      </div>

      {/* STATUS ROW */}
      <div className="mt-auto flex items-center gap-6 px-2 pb-2 font-mono text-xs text-[var(--text-dim)]">
        <span>Model: <span className="text-[var(--neon-cyan)]">claude-3-haiku</span></span>
        <span>Provider: <span className="text-[var(--neon-yellow)]">OpenRouter_API</span></span>
        <span>DB: <span className="text-[var(--neon-yellow)]">MongoDB</span></span>
        <span className="ml-auto text-[10px] opacity-40">v2.0.4 // cyber-duck-terminal</span>
      </div>
    </div>
  );
}