import { FiTerminal, FiDatabase, FiSettings, FiCpu, FiActivity } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const loc = useLocation();
  const isActive = (path) => loc.pathname === path;

  return (
    <div className="w-16 bg-[var(--bg-panel)] border-r border-[var(--glass-border)] flex flex-col items-center py-6 shadow-[4px_0_20px_rgba(0,255,255,0.05)] relative z-20 h-full justify-between">
      <div className="flex flex-col gap-6 w-full px-2 mt-4">
        <Link to="/" className={`flex justify-center p-3 rounded-md transition-all duration-300 ${isActive('/') ? 'text-[var(--neon-yellow)] shadow-[inset_0_0_10px_var(--neon-yellow)] border border-[var(--neon-yellow)]' : 'text-[var(--text-dim)] hover:text-[var(--neon-cyan)] hover:bg-[rgba(0,255,255,0.1)]'}`}>
          <FiActivity size={22} className="drop-shadow-[0_0_5px_currentColor]"/>
        </Link>
        <Link to="/chat" className={`flex justify-center p-3 rounded-md transition-all duration-300 ${isActive('/chat') ? 'text-[var(--neon-cyan)] shadow-[inset_0_0_10px_var(--neon-cyan)] border border-[var(--neon-cyan)] bg-[rgba(0,255,255,0.05)]' : 'text-[var(--text-dim)] hover:text-[var(--neon-yellow)] hover:bg-[rgba(250,255,0,0.1)]'}`}>
          <FiTerminal size={22} className="drop-shadow-[0_0_5px_currentColor]"/>
        </Link>
        <Link to="/history" className={`flex justify-center p-3 rounded-md transition-all duration-300 ${isActive('/history') ? 'text-[var(--neon-pink)] shadow-[inset_0_0_10px_var(--neon-pink)] border border-[var(--neon-pink)]' : 'text-[var(--text-dim)] hover:text-[var(--neon-pink)] hover:bg-[rgba(255,0,255,0.1)]'}`}>
          <FiDatabase size={22} className="drop-shadow-[0_0_5px_currentColor]"/>
        </Link>
      </div>
      
      <div className="flex flex-col gap-6 w-full px-2 mb-4">
        <Link to="/profile" className={`flex justify-center p-3 rounded-md transition-all duration-300 ${isActive('/profile') ? 'text-[var(--neon-orange)] shadow-[inset_0_0_10px_var(--neon-orange)] border border-[var(--neon-orange)]' : 'text-[var(--text-dim)] hover:text-[var(--neon-orange)] hover:bg-[rgba(255,85,0,0.1)]'}`}>
          <FiSettings size={22} className="drop-shadow-[0_0_5px_currentColor]"/>
        </Link>
        <div className="flex justify-center p-3 text-[var(--neon-cyan)] animate-pulseGlow rounded-md border border-[var(--neon-cyan)]">
           <FiCpu size={22}/>
        </div>
      </div>
    </div>
  );
}