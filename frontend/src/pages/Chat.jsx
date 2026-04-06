// src/pages/Chat.jsx
import { useState, useRef } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import PremiumButton from "../components/PremiumButton";
import { FiCopy, FiCheck, FiZap, FiTerminal } from "react-icons/fi";

const LANGUAGES = ["python", "javascript", "java", "cpp", "c", "typescript", "rust", "go"];

export default function Chat() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState(null);
  const [language, setLanguage] = useState("python");
  const [copied, setCopied] = useState(false);

  const outputRef = useRef();
  const API = "http://localhost:5000";

  const detectLanguage = (code) => {
    if (code.includes("import java")) return "java";
    if (code.includes("#include")) return "cpp";
    if (code.includes("console.log") || code.includes("const ") || code.includes("let ")) return "javascript";
    if (code.includes("def ") || code.includes("import ")) return "python";
    if (code.includes("printf")) return "c";
    if (code.includes("fn ") && code.includes("->")) return "rust";
    return language;
  };

  const handleAction = async (type) => {
    if (!code.trim()) return;
    setLoading(true);
    setActiveAction(type);
    setResult("");

    try {
      const res = await axios.post(`${API}/${type}`, { code, language });
      let text = "";
      let i = 0;
      const fullText = res.data.result || "";

      const interval = setInterval(() => {
        text += fullText[i];
        setResult(text);
        i++;
        if (i >= fullText.length) {
          clearInterval(interval);
          setLoading(false);
          setActiveAction(null);
        }
        if (outputRef.current) {
          outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
      }, 6);
    } catch (err) {
      setResult(`[ERROR] Failed to reach the backend.\n${err.message}`);
      setLoading(false);
      setActiveAction(null);
    }
  };

  const copyOutput = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full w-full text-[var(--text-primary)] gap-4">

      {/* HEADER BAR */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <FiTerminal className="text-[var(--neon-cyan)] drop-shadow-[0_0_6px_var(--neon-cyan)]" size={20}/>
          <h2 className="text-sm font-[Orbitron] uppercase tracking-widest text-[var(--neon-cyan)]">
            Code Terminal
          </h2>
          <span className="w-2 h-2 rounded-full bg-[var(--neon-yellow)] shadow-[0_0_8px_var(--neon-yellow)] animate-pulse"></span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-wider">Lang://</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[var(--bg-dark)] border border-[var(--glass-border)] text-[var(--neon-cyan)] text-xs px-3 py-1.5 uppercase tracking-wider cursor-pointer focus:outline-none focus:border-[var(--neon-cyan)]"
          >
            {LANGUAGES.map(l => (
              <option key={l} value={l} className="bg-[var(--bg-dark)]">{l.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>

      {/* EDITOR PANEL */}
      <div className="cyber-panel relative" style={{ boxShadow: "0 0 30px rgba(0,255,255,0.05)" }}>
        <div className="flex items-center gap-2 px-3 py-1.5 border-b border-[var(--glass-border)]">
          <div className="w-2 h-2 rounded-full bg-[var(--neon-pink)]"></div>
          <div className="w-2 h-2 rounded-full bg-[var(--neon-yellow)]"></div>
          <div className="w-2 h-2 rounded-full bg-[var(--neon-cyan)]"></div>
          <span className="text-[10px] text-[var(--text-dim)] ml-2 uppercase tracking-widest">input_buffer.{language}</span>
        </div>
        <Editor
          height="280px"
          language={language}
          value={code}
          onChange={(value) => {
            const v = value || "";
            setCode(v);
            setLanguage(detectLanguage(v));
          }}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "'Fira Code', monospace",
            minimap: { enabled: false },
            wordWrap: "on",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            padding: { top: 12 },
            renderWhitespace: "none",
            cursorBlinking: "phase",
          }}
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3 flex-wrap">
        <PremiumButton color="blue" onClick={() => handleAction("explain")}>
          {activeAction === "explain" && loading ? "Processing..." : "⟹ Explain"}
        </PremiumButton>
        <PremiumButton color="yellow" onClick={() => handleAction("debug")}>
          {activeAction === "debug" && loading ? "Processing..." : "⟹ Debug"}
        </PremiumButton>
        <PremiumButton color="green" onClick={() => handleAction("optimize")}>
          {activeAction === "optimize" && loading ? "Processing..." : "⟹ Optimize"}
        </PremiumButton>
        
        {code && (
          <button
            onClick={() => { setCode(""); setResult(""); }}
            className="ml-auto text-[var(--text-dim)] text-xs border border-[rgba(255,255,255,0.1)] px-4 py-2 uppercase tracking-widest hover:text-[var(--neon-pink)] hover:border-[var(--neon-pink)] transition-all"
          >
            Clear
          </button>
        )}
      </div>

      {/* OUTPUT PANEL */}
      <div className="flex-1 flex flex-col cyber-panel overflow-hidden" style={{ minHeight: "180px" }}>
        {/* Output header */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-[var(--glass-border)]">
          <div className="flex items-center gap-2">
            <FiZap size={14} className={`${loading ? "text-[var(--neon-yellow)] animate-pulse" : "text-[var(--text-dim)]"}`}/>
            <span className="text-[10px] text-[var(--text-dim)] uppercase tracking-widest">
              {loading ? `// running ${activeAction}()...` : result ? "// output_ready" : "// awaiting_input"}
            </span>
          </div>
          <button
            onClick={copyOutput}
            className={`flex items-center gap-1 text-[10px] uppercase tracking-widest transition-all px-2 py-1 border ${copied ? 'text-[var(--neon-yellow)] border-[var(--neon-yellow)]' : 'text-[var(--text-dim)] border-transparent hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)]'}`}
          >
            {copied ? <FiCheck size={12}/> : <FiCopy size={12}/>}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Output body */}
        <div
          ref={outputRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-sm whitespace-pre-wrap"
          style={{ lineHeight: "1.7" }}
        >
          {loading && !result ? (
            <div className="flex items-center gap-2 text-[var(--neon-cyan)]">
              <span className="inline-block w-2 h-4 bg-[var(--neon-cyan)] animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest">Querying AI model...</span>
            </div>
          ) : result ? (
            <span className="text-[var(--text-primary)]">{result}
              {loading && <span className="inline-block w-1.5 h-4 bg-[var(--neon-cyan)] ml-0.5 animate-pulse align-middle"></span>}
            </span>
          ) : (
            <div className="flex flex-col gap-1 text-[var(--text-dim)]">
              <span className="text-[var(--neon-cyan)] opacity-60">$ duck-ai --interactive</span>
              <span className="opacity-50">Paste your code above, select an action to begin.</span>
              <span className="opacity-30 text-xs mt-2">Supported: EXPLAIN · DEBUG · OPTIMIZE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}