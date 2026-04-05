// src/components/PremiumButton.jsx
export default function PremiumButton({ children, onClick, color = "blue" }) {
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-500",
    green: "bg-green-600 hover:bg-green-500",
    yellow: "bg-yellow-600 hover:bg-yellow-500",
    red: "bg-red-600 hover:bg-red-500",
  };

  return (
    <button
      onClick={onClick}
      className={`${colors[color]} px-4 py-2 rounded shadow-glow hover:animate-pulseGlow transition-all duration-300 text-white`}
    >
      {children}
    </button>
  );
}