import { FiHome, FiMessageCircle, FiClock, FiUser, FiInfo } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-20 bg-[#111] flex flex-col items-center py-6 shadow-lg">
      <Link to="/" className="p-3 hover:bg-[#222] rounded mb-4 text-white"><FiHome size={24}/></Link>
      <Link to="/chat" className="p-3 hover:bg-[#222] rounded mb-4 text-white"><FiMessageCircle size={24}/></Link>
      <Link to="/history" className="p-3 hover:bg-[#222] rounded mb-4 text-white"><FiClock size={24}/></Link>
      <Link to="/profile" className="p-3 hover:bg-[#222] rounded mb-4 text-white"><FiUser size={24}/></Link>
      <Link to="/about" className="p-3 hover:bg-[#222] rounded mb-4 text-white"><FiInfo size={24}/></Link>
    </div>
  );
}