export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-700 to-blue-600 p-4 flex justify-between items-center text-white shadow-lg">
      <h1 className="text-2xl font-bold">DuckCore AI</h1>
      <div className="flex gap-4">
        <a href="/" className="hover:text-yellow-400 transition">Home</a>
        <a href="/chat" className="hover:text-yellow-400 transition">Chat</a>
        <a href="/history" className="hover:text-yellow-400 transition">History</a>
        <a href="/profile" className="hover:text-yellow-400 transition">Profile</a>
        <a href="/about" className="hover:text-yellow-400 transition">About</a>
      </div>
    </nav>
  );
}