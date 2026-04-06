// src/components/PremiumButton.jsx
export default function PremiumButton({ children, onClick, color = "blue" }) {
  const themes = {
    blue: "text-[var(--neon-cyan)] border-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)] hover:text-black hover:shadow-[0_0_15px_var(--neon-cyan)]",
    green: "text-[var(--neon-yellow)] border-[var(--neon-yellow)] hover:bg-[var(--neon-yellow)] hover:text-black hover:shadow-[0_0_15px_var(--neon-yellow)]",
    yellow: "text-[var(--neon-orange)] border-[var(--neon-orange)] hover:bg-[var(--neon-orange)] hover:text-black hover:shadow-[0_0_15px_var(--neon-orange)]",
    red: "text-[var(--neon-pink)] border-[var(--neon-pink)] hover:bg-[var(--neon-pink)] hover:text-black hover:shadow-[0_0_15px_var(--neon-pink)]",
  };

  return (
    <button
      onClick={onClick}
      className={`border-2 px-6 py-2 uppercase tracking-widest font-bold text-xs transition-all duration-300 relative overflow-hidden group ${themes[color]}`}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
      {/* Glitch sub element */}
      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 group-hover:animate-[glitch-skew_0.5s_infinite]"></div>
    </button>
  );
}