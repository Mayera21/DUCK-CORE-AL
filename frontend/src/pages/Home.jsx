export default function Home() {
  return (
    <div className="text-white text-center flex flex-col items-center justify-center h-full">
      <img src="/banner1.png" alt="DuckCore Logo" className="w-40 mb-6 animate-bounce" />
      <h1 className="text-4xl font-bold mb-4">Welcome to DuckCore AI</h1>
      <p className="text-gray-300 max-w-lg">Your premium AI code explainer platform with chat, debug, optimization, and history tracking.</p>
    </div>
  );
}