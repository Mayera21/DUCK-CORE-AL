import { useState } from "react";
import axios from "axios";

export default function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a0a0a] to-[#111]">

      <div className="bg-[#111] p-8 rounded-2xl shadow-xl w-96 border border-gray-800">

        <h2 className="text-2xl text-white mb-6 text-center font-semibold">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-[#1a1a1a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-[#1a1a1a] border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
        />

        {/* Button */}
        <button
          onClick={login}
          className="w-full py-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition text-white font-medium"
        >
          Login
        </button>

      </div>
    </div>
  );
}