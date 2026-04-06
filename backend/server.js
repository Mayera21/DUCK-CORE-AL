// server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

import axios from "axios";
import History from "./models/History.js";

// Helper function to call OpenRouter API
const generateResponse = async (type, code, language) => {
  let prompt = "";
  if (type === "explain") {
    prompt = `Explain the following ${language || 'programming'} code concisely and clearly. Focus on what it does, step-by-step:\n\n${code}`;
  } else if (type === "debug") {
    prompt = `Debug the following ${language || 'programming'} code. Identify any errors or potential bugs, and provide the corrected code snippet. Be brief:\n\n${code}`;
  } else if (type === "optimize") {
    prompt = `Optimize the following ${language || 'programming'} code for better performance and readability. Provide the improved version with a brief explanation of changes:\n\n${code}`;
  } else {
    return "Invalid request type.";
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "anthropic/claude-3-haiku", // Defaulting to Haiku as it's fast and excellent at code
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter API Error:", error.response?.data || error.message);
    return `Error: Failed to fetch response from AI provider. ${error.message}`;
  }
};

// EXPLAIN ROUTE
app.post("/explain", async (req, res) => {
  const { code, language } = req.body;
  const result = await generateResponse("explain", code, language);
  
  await History.create({ code, result, type: "explain" });
  res.json({ result });
});

// DEBUG ROUTE
app.post("/debug", async (req, res) => {
  const { code, language } = req.body;
  const result = await generateResponse("debug", code, language);

  await History.create({ code, result, type: "debug" });
  res.json({ result });
});

// OPTIMIZE ROUTE
app.post("/optimize", async (req, res) => {
  const { code, language } = req.body;
  const result = await generateResponse("optimize", code, language);

  await History.create({ code, result, type: "optimize" });
  res.json({ result });
});

// GET HISTORY
app.get("/history", async (req, res) => {
  try {
    const history = await History.find().sort({ date: -1 }).limit(50);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// CLEAR HISTORY
app.delete("/history", async (req, res) => {
  try {
    await History.deleteMany({});
    res.json({ message: "History cleared" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear history" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});