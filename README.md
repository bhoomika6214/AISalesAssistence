# Home Credit AI Voice Agent — Loan Against Property (LAP) Qualification
## SalesAgents AI — AI Intern (Prompt Engineer) Assignment Submission

An enterprise-grade, conversational AI Voice Agent designed for **Home Credit India** that contacts existing prime customers regarding a pre-approved Loan Against Property (LAP) offer up to ₹75,00,000, evaluates **7 sequential eligibility criteria**, extracts multi-variable and out-of-order spoken details, detects balance-transfer intent, handles diversions without hallucinating rates, and gracefully hands off qualified applicants to Senior Loan Experts.

---

## 🌟 Executive Highlights

- **The EVUA Architecture**: Implements the *"Extract First, Validate Second, Update State Third, Ask First Missing Question Fourth"* algorithm to handle non-linear human speech without robotic IVR rigidity.
- **7-Parameter Strict Compliance**: Zero-latency disqualification for agricultural land, cash income, missing original physical documents, and tenures outside 3–15 years.
- **Counter-Offer Negotiation Engine**: Intelligently counters customer requests exceeding ₹75 Lakhs with the ₹75L pre-approved cap, proceeding upon acceptance or closing politely upon rejection.
- **Specialized Routing Gates**: Seamlessly identifies existing property mortgages and EMI-reduction intents, bypassing Q1–Q7 to connect callers directly with Balance Transfer Specialists.
- **14 Exhaustive Test Scenarios**: Complete spoken call audio files (`.wav` & `.m4a`) and turn-by-turn transcripts covering happy paths, edge cases, speech corrections, and customer diversions.
- **Turnkey Live Web App**: Interactive browser portal with realistic phone dialer, microphone speech recognition, Web Speech voice output, and live 7-parameter qualification HUD.

---

## 📁 Repository Structure

```text
AISalesAssistence/
├── prompt/
│   ├── SYSTEM_PROMPT.txt        # Production plain-text prompt (ready for Retell AI / Bolna / Vapi)
│   └── SYSTEM_PROMPT.md         # Formatted prompt specification with dynamic variable references
│
├── docs/
│   ├── APPROACH_DOCUMENT.md     # 8-section technical architecture & state machine documentation
│   └── SUBMISSION_GUIDE.md      # Email submission template & platform setup guide
│
├── transcripts/
│   └── ALL_TRANSCRIPTS.md       # Turn-by-turn transcripts for all 14 test scenarios with state deltas
│
├── public/audio/                # Synthesized conversational audio recordings (14 Scenarios)
│   ├── scenario_1.wav & .m4a    # Scenario 1: Happy Path (Fully Eligible Lead)
│   ├── scenario_2.wav & .m4a    # Scenario 2: Disqualification (Agricultural Land)
│   ├── scenario_3.wav & .m4a    # Scenario 3: Disqualification (Cash Income)
│   ├── scenario_4.wav & .m4a    # Scenario 4: Disqualification (Photocopies Only)
│   ├── scenario_5.wav & .m4a    # Scenario 5: Tenure Boundary (< 3 Years)
│   ├── scenario_6.wav & .m4a    # Scenario 6: Tenure Boundary (> 15 Years)
│   ├── scenario_7.wav & .m4a    # Scenario 7: Loan > 75L (Counter-Offer Accepted)
│   ├── scenario_8.wav & .m4a    # Scenario 8: Loan > 75L (Counter-Offer Declined)
│   ├── scenario_9.wav & .m4a    # Scenario 9: Existing Mortgage Loan Transfer
│   ├── scenario_10.wav & .m4a   # Scenario 10: EMI Reduction Intent Flow
│   ├── scenario_11.wav & .m4a   # Scenario 11: Out-of-Order Multi-Variable Utterance
│   ├── scenario_12.wav & .m4a   # Scenario 12: Busy Customer (Callback Scheduled)
│   ├── scenario_13.wav & .m4a   # Scenario 13: Interest Rate Diversion Deferral
│   └── scenario_14.wav & .m4a   # Scenario 14: Speech Correction & Acoustic Fillers
│
├── src/                         # Interactive React + Vite Web Application
│   ├── components/
│   │   ├── Header.jsx           # Tab navigation with live status badges
│   │   ├── CallSimulator.jsx    # Glassmorphic phone dialer with voice recognition & live HUD
│   │   ├── TestBench.jsx        # 14-scenario player with audio playback & dialogue stepper
│   │   ├── PromptStudio.jsx     # System prompt viewer with live variable interpolator
│   │   ├── DocsViewer.jsx       # 5-layer architecture & 7-rule matrix viewer
│   │   └── SubmissionCenter.jsx # 1-click email copy & multi-cloud deployment guide
│   ├── data/
│   │   └── scenariosData.js     # Structured dataset of all 14 test scenarios
│   ├── index.css                # Custom Vanilla CSS dark glassmorphic design system
│   └── App.jsx                  # Main application orchestrator
│
└── package.json                 # Project dependencies & build scripts
```

---

## 🚀 Running the Web App Locally

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# The interactive portal opens at http://localhost:5173/

# 3. Build static production bundle
npm run build
```

---

## 🌐 Hosting in 2 Minutes

### Option A: Vercel (Recommended)
1. Push this folder to your GitHub:
   ```bash
   git init && git add . && git commit -m "Home Credit AI Voice Agent"
   gh repo create AISalesAssistence --public --source=. --push
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Select your repository `AISalesAssistence` and click **Deploy**.

### Option B: Netlify Drop
1. Run `npm run build`.
2. Drag and drop the `dist` folder into [app.netlify.com/drop](https://app.netlify.com/drop).

---

## 📋 Evaluation Checklist & Deliverables

| Deliverable | Location | Status |
|---|---|---|
| **1. Complete System Prompt Text** | [prompt/SYSTEM_PROMPT.txt](file:///Users/apple/Desktop/AISalesAssistence/prompt/SYSTEM_PROMPT.txt) | ✅ Production Ready |
| **2. Test Audios (14 Scenarios)** | [public/audio/](file:///Users/apple/Desktop/AISalesAssistence/public/audio/) & Web Player | ✅ Generated (`.wav` & `.m4a`) |
| **3. Audio Transcripts** | [transcripts/ALL_TRANSCRIPTS.md](file:///Users/apple/Desktop/AISalesAssistence/transcripts/ALL_TRANSCRIPTS.md) | ✅ 14 Full Transcripts |
| **4. Technical Approach Document** | [docs/APPROACH_DOCUMENT.md](file:///Users/apple/Desktop/AISalesAssistence/docs/APPROACH_DOCUMENT.md) | ✅ Complete 8 Sections |
| **5. Live Voice Agent Simulator** | Live on `http://localhost:5173` | ✅ Full Interactive Portal |
