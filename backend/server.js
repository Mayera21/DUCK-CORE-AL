// server.js

import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./db.js";

// Validate Environment Variables
if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY.includes("YOUR_API_KEY")) {
  console.error("❌ CRITICAL: OPENROUTER_API_KEY is not set or using placeholder.");
  console.error("   → Please check your .env file and ensure it starts with 'sk-or-v1-'.");
} else {
  console.log("✅ OpenRouter API Key detected:", `${process.env.OPENROUTER_API_KEY.substring(0, 10)}...`);
}

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
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // Recommended by OpenRouter
          "X-Title": "DuckCore AI" // Recommended by OpenRouter
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    const errorData = error.response?.data;
    const statusCode = error.response?.status || (error.message.includes("401") ? 401 : null);
    console.error("OpenRouter API Error Details:", JSON.stringify(errorData, null, 2) || error.message);
    
    if (statusCode === 401) {
      return "Error: 401 Unauthorized. Your OpenRouter API key is invalid or revoked. Please verify it at openrouter.ai/keys.";
    }
    
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