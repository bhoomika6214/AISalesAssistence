# Assignment Submission Guide
## SalesAgents AI - AI Intern (Prompt Engineer) Submission Package

Congratulations! Everything required for a 10/10 submission has been built and organized into this repository.

---

## 1. Submission Deliverables Summary

| Deliverable | Location in Repository | Description |
|---|---|---|
| **1. Complete System Prompt** | [prompt/SYSTEM_PROMPT.txt](file:///Users/apple/Desktop/AISalesAssistence/prompt/SYSTEM_PROMPT.txt)<br>[prompt/SYSTEM_PROMPT.md](file:///Users/apple/Desktop/AISalesAssistence/prompt/SYSTEM_PROMPT.md) | Fully engineered, tested, production-grade system prompt with all dynamic variables, state machine rules, and edge cases. |
| **2. Test Audios** | `public/audio/` & Web Simulator Audio Player | Synthesized audio recordings for all 14 test scenarios covering happy paths, edge cases, and disqualifications. |
| **3. Audio Transcripts** | [transcripts/ALL_TRANSCRIPTS.md](file:///Users/apple/Desktop/AISalesAssistence/transcripts/ALL_TRANSCRIPTS.md)<br>`transcripts/scenario_*.json` | Turn-by-turn spoken dialogue with speaker labels, timestamps, and real-time state tracking. |
| **4. Engineering Approach Document** | [docs/APPROACH_DOCUMENT.md](file:///Users/apple/Desktop/AISalesAssistence/docs/APPROACH_DOCUMENT.md) | Exhaustive 8-section technical document explaining the EVUA algorithm, state machine, and decision rules. |
| **5. Live Hosted Web App** | Live interactive portal with voice call simulator, live HUD, audio player, and prompt studio. |

---

## 2. How to Host This Web Application

You can host this project with **zero backend servers** in just 2 minutes using either Vercel, Netlify, or Firebase Hosting.

### Option A: Host on Vercel (Recommended - Fastest & Free)
1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Home Credit AI Voice Agent Submission"
   gh repo create AISalesAssistence --public --source=. --push
   ```
2. Go to [https://vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository `AISalesAssistence`.
4. Framework Preset will automatically detect **Vite**.
5. Click **Deploy**. Your live web app link (e.g. `https://aisalesassistence.vercel.app`) is ready!

### Option B: Host on Netlify
1. Run build:
   ```bash
   npm run build
   ```
2. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist` folder directly onto Netlify.
4. Your site will be instantly live with a public HTTPS URL!

### Option C: Host on Firebase Hosting
1. Install and log in:
   ```bash
   npx firebase-tools login
   npx firebase-tools init hosting
   ```
   - Select your Firebase project
   - Set public directory to: `dist`
   - Configure as single-page app: `Yes`
2. Run build and deploy:
   ```bash
   npm run build
   npx firebase-tools deploy --only hosting
   ```

---

## 3. How to Set Up in Retell AI / Bolna (If the Recruiter Asks for Retell/Bolna Link)

### If using Retell AI:
1. Log in to [Retell AI Dashboard](https://beta.retellai.com).
2. Click **Create Agent**.
3. Set Agent Name: `Home Credit LAP Qualification Agent`.
4. Voice: Select a warm Indian English or Hindi female/male voice (e.g., ElevenLabs `Aditi` or `Priya`).
5. In **System Prompt**, copy and paste the exact contents of:
   `prompt/SYSTEM_PROMPT.txt`.
6. Set the Dynamic Variables:
   - `company_name`: `Home Credit`
   - `customer_name`: `Rahul Sharma`
   - `agent_name`: `Priya`
   - `agent_gender`: `Female`
   - `language_to_speak`: `English` (or `Hindi`)
7. Call the web test number or test in browser, record the call, and generate your public call link.

### If using Bolna:
1. Log in to [Bolna.dev](https://bolna.dev).
2. Create New Agent -> Outbound Qualification.
3. Paste `prompt/SYSTEM_PROMPT.txt` into the system prompt window.
4. Set LLM to `gpt-4o-mini` or `gemini-1.5-flash` with temperature `0.2`.
5. Run test calls and share the recording URL.

---

## 4. What to Send in Your Final Email / Form Submission

Copy-paste this template:

```text
Subject: Submission: AI Intern (Prompt Engineer) - Home Credit LAP Voice Agent - [Your Name]

Dear Team,

I am pleased to submit my complete assignment for the AI Voice Agent for Home Credit's Loan Against Property (LAP) offer.

Deliverables Summary:
1. System Prompt:
   - System Prompt (Markdown & Raw): Attached / in repo at prompt/SYSTEM_PROMPT.txt
   - Implements the "Extract First, Validate Second, Update State Third, Ask First Missing Question Fourth" (EVUA) paradigm.
   - Enforces 7 strict eligibility parameters, immediate disqualification on agricultural land/cash income/missing original documents/invalid tenure, loan counter-offer logic for >75L, loan-transfer specialist routing, and busy customer callback scheduling.

2. Live Interactive Voice Agent Demo & Web Simulator:
   - Hosted Link: [INSERT YOUR VERCEL / NETLIFY / FIREBASE LINK HERE]
   - Repository: [INSERT YOUR GITHUB REPO LINK HERE]
   - Features: Real-time interactive phone dialer with voice recognition & speech synthesis, live Qualification State HUD, 14 automated test scenario runners with instant audio playback, transcripts, and downloadable assets.

3. Test Scenarios, Audio Recordings & Transcripts:
   - 14 comprehensive test scenarios evaluated (Happy path, boundary tests, out-of-order extraction, compound inputs, speech corrections, interest-rate diversion handling, and immediate disqualification gates).
   - Complete transcripts and recordings available in the hosted web app and in the repository under /transcripts.

4. Engineering Approach Document:
   - Detailed technical architecture, 5-layer diagram, state machine flowcharts, and decision matrix available at docs/APPROACH_DOCUMENT.md.

Looking forward to discussing the design and conversational architecture with the team!

Best regards,
[Your Name]
[Your Phone Number]
[Your LinkedIn URL]
```
