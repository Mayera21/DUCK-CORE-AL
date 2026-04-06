import { useState, useEffect } from "react";
import axios from "axios";
import { FiTrash2, FiDatabase, FiRefreshCw } from "react-icons/fi";

const TYPE_COLORS = {
  explain: "var(--neon-cyan)",
  debug: "var(--neon-orange)",
  optimize: "var(--neon-yellow)",
};

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/history");
      setHistory(res.data);
    } catch (e) {
      setHistory([]);
    }
    setLoading(false);
  };

  const clearHistory = async () => {
    await axios.delete("http://localhost:5000/history");
    setHistory([]);
    setSelected(null);
  };

  useEffect(() => { fetchHistory(); }, []);

  return (
    <div className="flex flex-col h-full w-full text-[var(--text-primary)] gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FiDatabase className="text-[var(--neon-pink)]" size={18}/>
          <h2 className="text-sm font-[Orbitron] uppercase tracking-widest text-[var(--neon-pink)]">Databanks</h2>
          <span className="text-xs text-[var(--text-dim)] font-mono">// {history.length} records</span>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchHistory} className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[var(--text-dim)] border border-[rgba(255,255,255,0.1)] px-3 py-1.5 hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)] transition-all">
            <FiRefreshCw size={10}/> Sync
          </button>
          <button onClick={clearHistory} className="flex items-center gap-1 text-[10px] uppercase tracking-widest text-[var(--text-dim)] border border-[rgba(255,255,255,0.1)] px-3 py-1.5 hover:text-[var(--neon-pink)] hover:border-[var(--neon-pink)] transition-all">
            <FiTrash2 size={10}/> Purge All
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--neon-cyan)] p-4">
          <span className="inline-block w-2 h-4 bg-[var(--neon-cyan)] animate-pulse"></span>
          Fetching records from database...
        </div>
      ) : history.length === 0 ? (
        <div className="cyber-panel p-8 text-center font-mono text-xs text-[var(--text-dim)]">
          <div className="text-2xl mb-2 opacity-30">⟷</div>
          No records found in the databank.
        </div>
      ) : (
        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* List panel */}
          <div className="w-64 flex flex-col gap-2 overflow-y-auto pr-1">
            {history.map((item, i) => (
              <button
                key={item._id || i}
                onClick={() => setSelected(item)}
                className={`cyber-panel text-left p-3 transition-all duration-200 ${selected?._id === item._id ? 'border-[var(--neon-pink)] shadow-[0_0_10px_rgba(255,0,255,0.2)]' : 'hover:border-[rgba(255,0,255,0.4)]'}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-[Orbitron] text-[10px] uppercase tracking-widest" style={{ color: TYPE_COLORS[item.type] || "var(--neon-cyan)" }}>
                    {item.type || "query"}
                  </span>
                  <span className="text-[9px] text-[var(--text-dim)]">
                    {item.date ? new Date(item.date).toLocaleDateString() : ""}
                  </span>
                </div>
                <div className="font-mono text-[10px] text-[var(--text-dim)] truncate">
                  {item.code?.slice(0, 55) || "..."}
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="flex-1 cyber-panel flex flex-col overflow-hidden">
            {selected ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 border-b border-[var(--glass-border)]">
                  <span className="font-[Orbitron] text-[10px] uppercase tracking-widest" style={{ color: TYPE_COLORS[selected.type] }}>
                    {selected.type}
                  </span>
                  <span className="text-[9px] text-[var(--text-dim)] ml-auto font-mono">
                    {selected.date ? new Date(selected.date).toLocaleString() : ""}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                  <div className="text-[var(--neon-cyan)] mb-2 opacity-60">// Input Code</div>
                  <div className="bg-[var(--bg-dark)] p-3 mb-4 text-[var(--text-dim)] border border-[var(--glass-border)]">{selected.code}</div>
                  <div className="text-[var(--neon-yellow)] mb-2 opacity-60">// AI Response</div>
                  <div className="text-[var(--text-primary)]">{selected.result}</div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center font-mono text-xs text-[var(--text-dim)]">
                Select a record to inspect...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}