import { FiUser, FiCpu, FiGlobe, FiCode } from "react-icons/fi";

const stats = [
  { label: "Sessions", value: "—", icon: <FiCpu size={16}/>, color: "var(--neon-cyan)" },
  { label: "Queries Run", value: "—", icon: <FiCode size={16}/>, color: "var(--neon-yellow)" },
  { label: "Languages", value: "8", icon: <FiGlobe size={16}/>, color: "var(--neon-orange)" },
];

export default function Profile() {
  return (
    <div className="flex flex-col h-full w-full text-[var(--text-primary)] gap-6">
      <div className="flex items-center gap-3">
        <FiUser className="text-[var(--neon-orange)]" size={18}/>
        <h2 className="text-sm font-[Orbitron] uppercase tracking-widest text-[var(--neon-orange)]">UID_Config</h2>
      </div>

      {/* Avatar + ID card */}
      <div className="cyber-panel p-6 flex items-center gap-6">
        <div className="w-16 h-16 border-2 border-[var(--neon-cyan)] flex items-center justify-center shadow-[0_0_15px_var(--neon-cyan)]">
          <FiUser size={32} className="text-[var(--neon-cyan)]"/>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-[Orbitron] text-lg text-[var(--text-primary)] tracking-widest">USER_ANONYMOUS</div>
          <div className="font-mono text-xs text-[var(--text-dim)]">uid: 0x00000000 <span className="text-[var(--neon-cyan)]">// guest session</span></div>
          <div className="font-mono text-xs text-[var(--neon-yellow)]">access_level: READ + WRITE</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="cyber-panel p-4 flex flex-col gap-2">
            <div style={{ color: s.color }}>{s.icon}</div>
            <div className="font-[Orbitron] text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
            <div className="font-mono text-[10px] text-[var(--text-dim)] uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>

      {/* System info */}
      <div className="cyber-panel p-4 font-mono text-xs text-[var(--text-dim)] flex flex-col gap-2">
        <div className="text-[var(--neon-cyan)] mb-1 uppercase tracking-widest">// System Configuration</div>
        {[
          ["AI_PROVIDER", "OpenRouter API"],
          ["DEFAULT_MODEL", "anthropic/claude-3-haiku"],
          ["STORAGE", "MongoDB // duckcore"],
          ["VERSION", "2.0.4"],
        ].map(([k, v]) => (
          <div key={k} className="flex gap-4">
            <span className="opacity-50 w-36">{k}</span>
            <span className="text-[var(--text-primary)]">= "{v}"</span>
          </div>
        ))}
      </div>
    </div>
  );
}