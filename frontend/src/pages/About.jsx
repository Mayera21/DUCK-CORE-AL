import { FiInfo, FiGithub, FiCpu, FiZap } from "react-icons/fi";

const stack = [
  { label: "Frontend", items: ["React 18", "Vite", "Monaco Editor", "Tailwind CSS"] },
  { label: "Backend", items: ["Node.js", "Express 5", "Mongoose", "Axios"] },
  { label: "AI Layer", items: ["OpenRouter API", "Claude 3 Haiku", "Model-agnostic"] },
  { label: "Database", items: ["MongoDB", "Mongoose ODM", "History Persistence"] },
];

export default function About() {
  return (
    <div className="flex flex-col h-full w-full text-[var(--text-primary)] gap-6">
      <div className="flex items-center gap-3">
        <FiInfo className="text-[var(--neon-yellow)]" size={18}/>
        <h2 className="text-sm font-[Orbitron] uppercase tracking-widest text-[var(--neon-yellow)]">System_Info</h2>
      </div>

      {/* Description */}
      <div className="cyber-panel p-5 font-mono text-xs text-[var(--text-dim)] leading-relaxed">
        <span className="text-[var(--neon-cyan)]">/**</span>
        <div className="pl-4 flex flex-col gap-1 mt-1">
          <span><span className="text-[var(--neon-yellow)]">@project</span>      DuckCore AI — Cyber-Duck Terminal v2.0</span>
          <span><span className="text-[var(--neon-yellow)]">@description</span>  An AI-powered code assistant backed by OpenRouter LLM inference.</span>
          <span>               Paste code, select an action, get real answers.</span>
          <span><span className="text-[var(--neon-yellow)]">@capabilities</span> Explain · Debug · Optimize</span>
          <span><span className="text-[var(--neon-yellow)]">@stack</span>         MERN + OpenRouter API</span>
        </div>
        <span className="text-[var(--neon-cyan)]">*/</span>
      </div>

      {/* Tech Stack Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stack.map((s) => (
          <div key={s.label} className="cyber-panel p-4 flex flex-col gap-2">
            <div className="font-[Orbitron] text-[10px] uppercase tracking-widest text-[var(--neon-cyan)]">
              &lt;{s.label}/&gt;
            </div>
            {s.items.map((item) => (
              <div key={item} className="flex items-center gap-2 font-mono text-xs text-[var(--text-dim)]">
                <span className="text-[var(--neon-yellow)] opacity-60">→</span>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-auto font-mono text-[10px] text-[var(--text-dim)] flex items-center gap-4">
        <span className="flex items-center gap-1"><FiCpu size={10}/> AI-Powered</span>
        <span className="flex items-center gap-1"><FiZap size={10}/> Real-Time Analysis</span>
        <span className="flex items-center gap-1"><FiGithub size={10}/> Open Source</span>
      </div>
    </div>
  );
}