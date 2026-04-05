// src/pages/History.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function History() {
  const [history, setHistory] = useState([]);

  const API = "http://localhost:5000";

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API}/history`);
      setHistory(res.data.reverse()); // latest first
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="text-white w-full">
      <h2 className="text-xl font-bold mb-4">Chat History</h2>

      {history.length === 0 ? (
        <p className="text-gray-400">No history yet...</p>
      ) : (
        <div className="flex flex-col gap-3">
          {history.map((item, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] p-4 rounded shadow-glow hover:bg-[#222] transition-all"
            >
              <p className="text-blue-400 text-sm mb-1">
                {item.type.toUpperCase()} • {new Date(item.time).toLocaleString()}
              </p>

              <pre className="text-green-400 whitespace-pre-wrap">
                {item.code}
              </pre>

              <pre className="text-gray-300 mt-2 whitespace-pre-wrap">
                {item.result}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}