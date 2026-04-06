export default function Footer() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-US", { hour12: false });
  const date = now.toLocaleDateString("en-CA"); // YYYY-MM-DD

  return (
    <footer className="bg-[var(--bg-panel)] border-t border-[var(--glass-border)] px-6 py-2 flex items-center justify-between font-mono text-[10px] text-[var(--text-dim)] relative z-20">
      <div className="flex items-center gap-4">
        <span className="text-[var(--neon-cyan)] opacity-60">DUCK-AI ©2026</span>
        <span className="opacity-30">|</span>
        <span>Model: <span className="text-[var(--neon-yellow)]">claude-3-haiku@openrouter</span></span>
      </div>
      <div className="flex items-center gap-4">
        <span className="opacity-40">SYS_STATUS: <span className="text-[var(--neon-cyan)] opacity-100">ONLINE</span></span>
        <span className="opacity-30">|</span>
        <span>{date} {time}</span>
      </div>
    </footer>
  );
}