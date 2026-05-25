# Final Project Submission: Startup AI App

**Course:** AI in Practice  
**Student Name:** *[Your Name]*  
**Student ID:** *[Your Student ID]*  
**Date:** May 2026  

---

## 🔗 Project Links

* **GitHub Repository (Code & Version Control):**  
  [https://github.com/jamunachundali-hub/Final_Project_Startup_AI](https://github.com/jamunachundali-hub/Final_Project_Startup_AI)

* **Live Web Application (Vercel Production Deployment):**  
  [https://startup-ai-app.vercel.app](https://startup-ai-app.vercel.app)

* **Localhost Testing Link (requires server running):**  
  [http://localhost:3001](http://localhost:3001)

---

## 📝 Project Overview

**Startup AI** is an AI-powered startup consultant platform designed to evaluate startup ideas, analyze market size, identify competitors, suggest branding names, and draft execution strategies. 

### Key Features:
* **Startup Evaluator:** Analyzes inputs (idea, market, business model, founder background) and documents, generating a complete Venture Capitalist-style evaluation.
* **AI Chat Advisor:** A conversational consultant with multiple specialized personas (Advisor, Architect, Growth Hacker) to discuss evaluation results and next steps.
* **Interactive Dashboard:** Visualizes feasibility, innovation, and overall scores with dynamic charts.
* **History Log:** Saves past evaluations locally and via Firebase Firestore.

### Technologies Used:
* **Frontend:** Next.js 16 (React 19), Tailwind CSS / Vanilla CSS, Lucide React
* **Backend:** Next.js Route Handlers
* **AI API:** OpenAI GPT-4o-mini API (with integrated offline Demo Mode fallback)
* **Database & Hosting:** Firebase Firestore (optional storage) & Vercel (production hosting)

---

## ⚙️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jamunachundali-hub/Final_Project_Startup_AI.git
   cd Final_Project_Startup_AI
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=your_actual_openai_api_key_here
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open **[http://localhost:3001](http://localhost:3001)** in your browser.
