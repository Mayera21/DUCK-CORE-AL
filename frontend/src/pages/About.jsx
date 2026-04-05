// src/pages/About.jsx
export default function About() {
  return (
    <div className="text-white flex flex-col items-center text-center gap-4">
      <img src="/logo.jpg" alt="DuckCore Logo" className="w-40 animate-bounce" />
      <h2 className="text-3xl font-bold">About DuckCore AI</h2>
      <p className="text-gray-300 max-w-lg">
        DuckCore AI is a premium AI code explainer and debugger platform. 
        It provides intelligent explanations, debugging, and optimization suggestions for your code with a smooth and beautiful interface.
      </p>
    </div>
  );
}