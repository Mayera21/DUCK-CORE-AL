// src/pages/Chat.jsx
import { useState, useRef } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import PremiumButton from "../components/PremiumButton";
import { FiCopy } from "react-icons/fi";

export default function Chat() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("python");

  const outputRef = useRef();

  const API = "http://localhost:5000";

  // Auto detect language
  const detectLanguage = (code) => {
    if (code.includes("import java")) return "java";
    if (code.includes("#include")) return "cpp";
    if (code.includes("console.log")) return "javascript";
    if (code.includes("def ")) return "python";
    if (code.includes("printf")) return "c";
    return "python";
  };

  // Main action handler
  const handleAction = async (type) => {
    if (!code.trim()) {
      alert("Please enter code");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await axios.post(`${API}/${type}`, {
        code,
        language,
      });

      // Typing animation
      let text = "";
      let i = 0;
      const fullText = res.data.result || "";

      const interval = setInterval(() => {
        text += fullText[i];
        setResult(text);
        i++;

        if (i >= fullText.length) clearInterval(interval);

        if (outputRef.current) {
          outputRef.current.scrollTop =
            outputRef.current.scrollHeight;
        }
      }, 8);

    } catch (err) {
      console.error(err);
      alert("Backend error");
    }

    setLoading(false);
  };

  // Copy output
  const copyOutput = () => {
    navigator.clipboard.writeText(result);
    alert("Copied!");
  };

  return (
    <div className="flex flex-col h-full w-full text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">AI Code Assistant</h2>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-[#1a1a1a] border border-gray-700 px-3 py-1 rounded"
        >
          <option value="python">Python 🐍</option>
          <option value="java">Java ☕</option>
          <option value="javascript">JavaScript ⚡</option>
          <option value="cpp">C++ 💻</option>
          <option value="c">C 🔧</option>
        </select>
      </div>

      {/* CODE EDITOR */}
      <Editor
        height="300px"
        language={language}
        value={code}
        onChange={(value) => {
          setCode(value || "");
          setLanguage(detectLanguage(value || ""));
        }}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          wordWrap: "on",
        }}
      />

      {/* BUTTONS */}
      <div className="flex gap-3 mt-3">
        <PremiumButton color="blue" onClick={() => handleAction("explain")}>
          Explain
        </PremiumButton>

        <PremiumButton color="yellow" onClick={() => handleAction("debug")}>
          Debug
        </PremiumButton>

        <PremiumButton color="green" onClick={() => handleAction("optimize")}>
          Optimize
        </PremiumButton>
      </div>

      {/* OUTPUT */}
      <div className="mt-4 flex flex-col flex-1">

        <div className="flex justify-between items-center mb-2">
          <h3 className="text-gray-400">Output</h3>

          <button onClick={copyOutput} className="hover:text-blue-400">
            <FiCopy size={20} />
          </button>
        </div>

        <div
          ref={outputRef}
          className={`bg-[#111] border border-gray-700 rounded-lg p-4 flex-1 overflow-y-auto whitespace-pre-wrap ${
            loading ? "shadow-glow animate-pulseGlow" : ""
          }`}
        >
          {loading
            ? "Processing..."
            : result || "Your result will appear here..."}
        </div>
      </div>
    </div>
  );
}