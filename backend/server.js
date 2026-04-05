// server.js

import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory history (temporary storage)
let history = [];

// Helper function to simulate AI response
const generateResponse = (type, code) => {
  if (type === "explain") {
    return `📘 Explanation:\n\nThis code does the following:\n${code}\n\n✔ It is explained in simple terms.`;
  }

  if (type === "debug") {
    return `🐛 Debugging Result:\n\nChecked your code:\n${code}\n\n✔ No major errors found (demo).`;
  }

  if (type === "optimize") {
    return `⚡ Optimization:\n\nYour code:\n${code}\n\n✔ Suggested improvements for better performance.`;
  }

  return "Invalid request";
};

// EXPLAIN ROUTE
app.post("/explain", (req, res) => {
  const { code } = req.body;

  const result = generateResponse("explain", code);

  // Save history
  history.push({
    code,
    result,
    type: "explain",
    time: new Date(),
  });

  res.json({ result });
});

// DEBUG ROUTE
app.post("/debug", (req, res) => {
  const { code } = req.body;

  const result = generateResponse("debug", code);

  history.push({
    code,
    result,
    type: "debug",
    time: new Date(),
  });

  res.json({ result });
});

// OPTIMIZE ROUTE
app.post("/optimize", (req, res) => {
  const { code } = req.body;

  const result = generateResponse("optimize", code);

  history.push({
    code,
    result,
    type: "optimize",
    time: new Date(),
  });

  res.json({ result });
});

// GET HISTORY
app.get("/history", (req, res) => {
  res.json(history);
});

// CLEAR HISTORY (optional)
app.delete("/history", (req, res) => {
  history = [];
  res.json({ message: "History cleared" });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});