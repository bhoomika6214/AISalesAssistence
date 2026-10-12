import React, { useState } from 'react';
import { 
  Send, Copy, Check, CheckCircle2, Globe, Cloud, 
  Terminal, Sparkles, Download, ExternalLink, ShieldAlert
} from 'lucide-react';

export default function SubmissionCenter() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailText = `Subject: Submission: AI Intern (Prompt Engineer) - Home Credit LAP AI Voice Agent

Dear Hiring Team & Evaluators at SalesAgents AI,

I am pleased to submit my complete assignment for the AI Voice Agent for Home Credit's Pre-Approved Loan Against Property (LAP) outbound qualification campaign.

1. DELIVERABLES SUMMARY:
- System Prompt: Production prompt written with the EVUA ("Extract First, Validate Second, Update State Third, Ask First Missing Question Fourth") paradigm, incorporating all 7 strict eligibility rules, agent_gender adherence, and zero-hallucination guardrails. Available at prompt/SYSTEM_PROMPT.txt.
- Test Scenarios & Audios: 14 distinct test scenarios synthesized with native conversational voice recordings (covering happy path, agricultural land rejection, cash income rejection, photocopy-only rejection, tenure boundary limits, loan >75L counter-offer negotiation, loan transfer routing, and out-of-order compound inputs). Available in public/audio/ and the live test bench.
- Full Transcripts: Turn-by-turn spoken dialogue with speaker labels, timestamps, and real-time state deltas. Available at transcripts/ALL_TRANSCRIPTS.md.
- Engineering Approach Document: Comprehensive 8-section technical document covering the 5-layer architecture, conversational state machine, decision tree, and evaluation rubric at docs/APPROACH_DOCUMENT.md.
- Live Web App & Voice Simulator: Interactive portal with realistic phone dialer, live Web Speech voice recognition and speech synthesis, 7-parameter state HUD, and scenario runner.

2. HOSTING & DEMO LINKS:
- Live Interactive Web Demo: [INSERT YOUR HOSTED VERCEL / NETLIFY LINK HERE]
- GitHub Repository: [INSERT YOUR GITHUB REPO LINK HERE]

3. KEY ARCHITECTURAL HIGHLIGHTS:
- Zero IVR Rigidity: Extracts multiple data points mentioned in a single turn without re-asking.
- Zero Interest-Rate Hallucinations: Deferral to Senior Loan Expert while preventing rate fabrication.
- Immediate Disqualification Gate: Zero wasted turns once agricultural, cash, photocopy, or tenure violations are detected.
- Balance Transfer Branching: Automatically routes existing mortgage holders and EMI-reduction seekers to specialized loan-transfer experts without running fresh-loan questions.

Thank you for reviewing my submission. I look forward to discussing the conversational architecture and prompt engineering details with your team!

Best regards,
[Your Name]
[Your Phone Number]
[Your LinkedIn Profile]`;

  const copyEmail = () => {
    navigator.clipboard.writeText(emailText);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Overview Banner */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Send size={22} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: 20, margin: '0 0 4px', fontWeight: 700 }}>
                Hosting & Assignment Submission Center
              </h2>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
                All 4 required deliverables plus live web hosting instructions prepared for an exceptional submission.
              </p>
            </div>
          </div>

          <button
            onClick={copyEmail}
            className="btn-primary"
            style={{ fontSize: 13 }}
          >
            {copiedEmail ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedEmail ? 'Copied Email Draft!' : 'Copy Submission Email'}</span>
          </button>
        </div>
      </div>

      {/* 4 Deliverables Status Checklist */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 17, margin: '0 0 16px' }}>
          Assignment Deliverables Status Checklist
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <CheckCircle2 size={18} color="#10b981" />
              <h4 style={{ fontSize: 14, margin: 0 }}>1. Complete System Prompt</h4>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 8px' }}>
              Full production prompt incorporating all 7 criteria, gender markers, counter-offer logic, and RAG context.
            </p>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
              📁 prompt/SYSTEM_PROMPT.txt
            </span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <CheckCircle2 size={18} color="#10b981" />
              <h4 style={{ fontSize: 14, margin: 0 }}>2. Test Audios (14 Scenarios)</h4>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 8px' }}>
              Synthesized conversational voice recordings covering happy path, failure boundaries, and edge cases.
            </p>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
              📁 public/audio/scenario_*.wav
            </span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <CheckCircle2 size={18} color="#10b981" />
              <h4 style={{ fontSize: 14, margin: 0 }}>3. Audio Transcripts</h4>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 8px' }}>
              Turn-by-turn spoken dialogue logs with timestamps, speaker badges, and state updates.
            </p>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
              📁 transcripts/ALL_TRANSCRIPTS.md
            </span>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <CheckCircle2 size={18} color="#10b981" />
              <h4 style={{ fontSize: 14, margin: 0 }}>4. Engineering Approach Document</h4>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: '0 0 8px' }}>
              Comprehensive 8-section technical architecture, state machine diagrams, and EVUA algorithm breakdown.
            </p>
            <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
              📁 docs/APPROACH_DOCUMENT.md
            </span>
          </div>

        </div>
      </div>

      {/* Hosting Instructions Options */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 17, margin: '0 0 16px' }}>
          How to Host this Live Web Application in 2 Minutes
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
          
          {/* Vercel */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Globe size={18} color="#22d3ee" />
              <h4 style={{ fontSize: 15, margin: 0 }}>Option 1: Vercel (Fastest & Free)</h4>
            </div>
            <ol style={{ fontSize: 12, color: 'var(--text-muted)', paddingLeft: 18, lineHeight: 1.8, margin: 0 }}>
              <li>Initialize git and push this repo to GitHub:
                <pre style={{ background: '#090d16', padding: '6px 10px', borderRadius: 6, margin: '4px 0', color: '#cbd5e1' }}>
                  git init && git add . && git commit -m "Home Credit AI Voice Agent"
                </pre>
              </li>
              <li>Go to <strong>vercel.com</strong> → Click <strong>"Add New Project"</strong>.</li>
              <li>Select your repository. Vite will be detected automatically.</li>
              <li>Click <strong>Deploy</strong>. Your public HTTPS URL is live!</li>
            </ol>
          </div>

          {/* Netlify Drop */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Cloud size={18} color="#34d399" />
              <h4 style={{ fontSize: 15, margin: 0 }}>Option 2: Netlify Drop (Zero Setup)</h4>
            </div>
            <ol style={{ fontSize: 12, color: 'var(--text-muted)', paddingLeft: 18, lineHeight: 1.8, margin: 0 }}>
              <li>Build the static distribution bundle:
                <pre style={{ background: '#090d16', padding: '6px 10px', borderRadius: 6, margin: '4px 0', color: '#cbd5e1' }}>
                  npm run build
                </pre>
              </li>
              <li>Go to <strong>app.netlify.com/drop</strong>.</li>
              <li>Drag and drop the newly created <strong>dist</strong> folder.</li>
              <li>Instantly receive a permanent live URL.</li>
            </ol>
          </div>

          {/* Firebase */}
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Terminal size={18} color="#fbbf24" />
              <h4 style={{ fontSize: 15, margin: 0 }}>Option 3: Firebase Hosting</h4>
            </div>
            <ol style={{ fontSize: 12, color: 'var(--text-muted)', paddingLeft: 18, lineHeight: 1.8, margin: 0 }}>
              <li>Run build:
                <pre style={{ background: '#090d16', padding: '6px 10px', borderRadius: 6, margin: '4px 0', color: '#cbd5e1' }}>
                  npm run build
                </pre>
              </li>
              <li>Deploy using Firebase CLI:
                <pre style={{ background: '#090d16', padding: '6px 10px', borderRadius: 6, margin: '4px 0', color: '#cbd5e1' }}>
                  npx firebase-tools deploy --only hosting
                </pre>
              </li>
            </ol>
          </div>

        </div>
      </div>

      {/* Email Submission Template Preview */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <h3 style={{ fontSize: 17, margin: 0 }}>
            Pre-Formatted Submission Email Draft
          </h3>
          <button
            onClick={copyEmail}
            className="btn-secondary"
            style={{ fontSize: 12, padding: '6px 12px' }}
          >
            {copiedEmail ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
          </button>
        </div>

        <div style={{
          background: '#090d16',
          border: '1px solid var(--border-subtle)',
          borderRadius: 10,
          padding: 16,
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          lineHeight: 1.6,
          color: '#cbd5e1',
          whiteSpace: 'pre-wrap'
        }}>
          {emailText}
        </div>
      </div>

    </div>
  );
}
