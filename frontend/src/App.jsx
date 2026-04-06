import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import History from "./pages/History";
import Profile from "./pages/Profile";
import About from "./pages/About";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen w-screen overflow-hidden crt bg-[var(--bg-dark)] font-mono text-[var(--text-primary)]">
        {/* Neon Decor Line */}
        <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--neon-cyan)] to-transparent opacity-50 shadow-[0_0_10px_var(--neon-cyan)]"></div>
        
        <Sidebar />
        <div className="flex-1 flex flex-col relative z-10 w-full h-full overflow-hidden">
          <Navbar />
          <div className="flex-1 overflow-y-auto p-6 relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}