// src/pages/Profile.jsx
import PremiumButton from "../components/PremiumButton";

export default function Profile() {
  // Replace with actual user data from backend or localStorage
  const user = {
    name: "Nameera Tanveer",
    email: "mayeratehreem@gmail.com",
    role: "Student",
    avatar: "/coding.jpg", // Replace with your image
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login"; // redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-start h-full text-white p-6 gap-6">
      
      {/* Avatar */}
      <div className="relative w-32 h-32">
        <img
          src={user.avatar}
          alt="Profile Avatar"
          className="w-32 h-32 rounded-full border-4 border-white-600 shadow-glow object-cover"
        />
      </div>

      {/* User Info Card */}
      <div className="bg-[#1a1a1a] p-6 rounded-xl shadow-glow w-full max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-purple-400">{user.name}</h2>
        <p className="text-gray-300"><span className="font-semibold">Email:</span> {user.email}</p>
        <p className="text-gray-300"><span className="font-semibold">Role:</span> {user.role}</p>
      </div>

      {/* Logout Button */}
      <PremiumButton color="red" onClick={handleLogout}>
        Logout
      </PremiumButton>

      {/* Additional Info */}
      <div className="bg-[#111] p-4 rounded-xl w-full max-w-md text-gray-400 text-center shadow-inner">
        Welcome to your profile! Here you can see your details, manage your account, and log out safely.
      </div>
    </div>
  );
}