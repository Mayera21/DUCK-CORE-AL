export default function Navbar() {
  return (
    <nav className="bg-[var(--bg-panel)] border-b border-[var(--glass-border)] p-4 flex justify-between items-center text-[var(--text-primary)] shadow-[0_4px_20px_rgba(0,255,255,0.05)] relative z-20">
      <div className="flex flex-col">
        <h1 className="text-3xl font-[Orbitron] font-black text-transparent bg-clip-text bg-gradient-to-r from-[var(--neon-yellow)] to-[var(--neon-orange)] tracking-widest drop-shadow-[0_0_10px_var(--neon-yellow)] uppercase glitch-hover cursor-crosshair">
          DuckCore_AI
        </h1>
        <span className="text-[10px] text-[var(--neon-cyan)] font-mono tracking-widest uppercase opacity-75 mt-[-4px]">
          [ System_Online: V2.0.4 ]
        </span>
      </div>
      <div className="flex gap-6 font-mono text-sm">
        <a href="/" className="text-[var(--text-dim)] hover:text-[var(--neon-pink)] transition-colors hover:text-shadow-neon border-b border-transparent hover:border-[var(--neon-pink)] pb-1">
          &lt; SYS_HOME &gt;
        </a>
        <a href="/chat" className="text-[var(--text-dim)] hover:text-[var(--neon-yellow)] transition-colors hover:text-shadow-neon border-b border-transparent hover:border-[var(--neon-yellow)] pb-1">
          &lt; TERMINAL &gt;
        </a>
        <a href="/history" className="text-[var(--text-dim)] hover:text-[var(--neon-cyan)] transition-colors hover:text-shadow-neon border-b border-transparent hover:border-[var(--neon-cyan)] pb-1">
          &lt; DATABANKS &gt;
        </a>
        <a href="/profile" className="text-[var(--text-dim)] hover:text-[var(--neon-orange)] transition-colors hover:text-shadow-orange border-b border-transparent hover:border-[var(--neon-orange)] pb-1">
          &lt; UID_CONFIG &gt;
        </a>
      </div>
    </nav>
  );
}