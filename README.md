# 🦆 DuckCore AI — Cyber-Duck Terminal

> A **cyber-grade AI code analysis tool** powered by OpenRouter, MongoDB, and React.  
> Paste any code → Explain · Debug · Optimize — in seconds.

![DuckCore Home](screenshots/home.png)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **AI-Powered** | Real LLM responses via OpenRouter (Claude 3 Haiku default) |
| 📖 **Explain** | Understand code in plain, step-by-step language |
| 🐛 **Debug** | Identify bugs and get corrected code suggestions |
| ⚡ **Optimize** | Rewrite code for better performance and readability |
| 💾 **Persistent History** | Every query is saved to MongoDB — browse the Databanks |
| 🎨 **Cyber-Duck UI** | Retro-futuristic terminal aesthetic with neon glows & Fira Code font |
| 🌐 **Multi-Language** | Python, JavaScript, Java, C++, C, TypeScript, Rust, Go |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Monaco Editor |
| Backend | Node.js, Express 5 |
| AI Provider | [OpenRouter API](https://openrouter.ai) (model-agnostic) |
| Database | MongoDB + Mongoose |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ → [Download](https://nodejs.org)
- **MongoDB** (local or Atlas cloud) → see setup below
- **OpenRouter API Key** → see setup below

---

### 1️⃣ Get an OpenRouter API Key (Free)

OpenRouter gives you access to dozens of AI models (Claude, GPT, Gemini, Llama, etc.) through one unified API.

```bash
# Steps:
1. Go to  https://openrouter.ai
2. Sign up with GitHub or Google
3. Click your avatar (top right) → "API Keys"
4. Click "Create Key" → give it a name → copy the key
   ✅ It starts with: sk-or-v1-...
```

> **Free credits:** OpenRouter gives free credits on signup. Claude 3 Haiku (the default model used here) is extremely cheap — thousands of queries per dollar.

---

### 2️⃣ Set Up MongoDB

**Option A — Local (recommended for development):**
```bash
# macOS with Homebrew:
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Your URI will be:
# mongodb://127.0.0.1:27017/duckcore
```

**Option B — Atlas Cloud (free tier, no install):**
```bash
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account → "Create a Free Cluster" (M0 – Free)
3. Click "Connect" → "Drivers" → copy the connection string
4. Replace <password> and set the database name to "duckcore"
# Example URI: mongodb+srv://admin:myPass@cluster0.abc12.mongodb.net/duckcore
```

---

### 3️⃣ Configure Environment Variables

```bash
cd backend
cp .env.example .env
```

Open `backend/.env` and fill in your values:

```env
OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
MONGO_URI=mongodb://127.0.0.1:27017/duckcore
PORT=5000
```

---

### 4️⃣ Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

### 5️⃣ Run the App

Open **two terminal tabs**:

```bash
# Tab 1 — Backend (API server on port 5000)
cd backend
npm run dev

# Tab 2 — Frontend (Dev server on port 5173)
cd frontend
npm run dev
```

Then open: **http://localhost:5173** 🎉

---

## 📂 Project Structure

```
DUCK-CORE-AL/
├── backend/
│   ├── models/
│   │   ├── History.js      # Mongoose schema for query history
│   │   └── User.js         # User schema (for future auth)
│   ├── .env                # ⚠️ Your secrets (git-ignored)
│   ├── .env.example        # Template — copy this to .env
│   ├── db.js               # MongoDB connection
│   ├── server.js           # Express app + OpenRouter API routes
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, Sidebar, Footer, PremiumButton
│   │   ├── pages/          # Home, Chat, History, Profile, About
│   │   ├── App.jsx         # Root app with routing
│   │   └── index.css       # Cyber-Duck design system
│   └── package.json
│
├── screenshots/            # UI screenshots
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Body | Description |
|---|---|---|---|
| `POST` | `/explain` | `{ code, language }` | Explain the code via AI |
| `POST` | `/debug` | `{ code, language }` | Debug and fix code |
| `POST` | `/optimize` | `{ code, language }` | Optimize for performance |
| `GET` | `/history` | — | Fetch last 50 query records |
| `DELETE` | `/history` | — | Clear all history |

---

## 🔐 Security Notes

- **Never commit your `.env` file** — it's in `.gitignore` already
- If you accidentally push your API key, immediately **rotate it** on the OpenRouter dashboard
- For production, use environment variables from your hosting platform (Vercel, Railway, Render, etc.)

---

## 🤝 Contributing

PRs welcome. Open an issue first for major changes.

---

*Built with 🦆 and neon by the Cyber-Duck Terminal team — v2.0.4*
