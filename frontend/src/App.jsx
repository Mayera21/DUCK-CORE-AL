import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PremiumButton from "./components/PremiumButton";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import History from "./pages/History";
import Profile from "./pages/Profile";
import About from "./pages/About";

export default function App() {
  return (
    <Router>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 overflow-auto p-4">
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