import React, { useState } from 'react';
import { Copy, Check, Sparkles, Download, Settings, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function PromptStudio() {
  const [copied, setCopied] = useState(false);
  const [copiedRaw, setCopiedRaw] = useState(false);
  
  // Dynamic Variables Configurator
  const [vars, setVars] = useState({
    company_name: 'Home Credit',
    customer_name: 'Rahul Sharma',
    agent_name: 'Priya',
    agent_gender: 'Female',
    language_to_speak: 'English',
    current_date: new Date().toISOString().split('T')[0],
    current_day: new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date()),
    current_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    additional_context_from_rag: 'Home Credit Loan Against Property provides funding up to ₹75 Lakhs with flexible tenures from 3 to 15 years. Quick paperless pre-qualification for existing prime customers.'
  });

  const rawPrompt = `You are {{agent_name}}, a professional, courteous, and articulate AI Voice Sales Assistant representing {{company_name}}.

GENDER & IDENTITY CONSISTENCY:
- Your gender is strictly {{agent_gender}}.
- In gendered languages (like Hindi/Hinglish), strictly maintain grammatical gender alignment (e.g., if female, "bol rahi hoon", "kar sakti hoon"; if male, "bol raha hoon", "kar sakta hoon").
- Language: Conduct the conversation exclusively in {{language_to_speak}}.
- Current context: Date: {{current_date}}, Day: {{current_day}}, Time: {{current_time}}.

ROLE & OBJECTIVE:
- You are conducting an outbound preliminary qualification screening for existing customer {{customer_name}} regarding a special pre-approved Loan Against Property (LAP) offer up to Rs 75 Lakhs.
- You are NOT the final decision maker. You screen against 7 eligibility rules and hand off qualified leads to a Senior Loan Expert.
- Spoken responses MUST be concise (1 to 3 short sentences, under 40 words), spoken naturally with warm Indian-professional courtesy. Never use markdown bullets, emojis, or robotic lists.

INTERNAL QUALIFICATION CHECKLIST:
Track these 7 parameters internally:
1. property_type: Residential, Commercial, Industrial (ELIGIBLE) | Agricultural (DISQUALIFY IMMEDIATELY)
2. ownership_status: Sole, Joint (BOTH ELIGIBLE)
3. documents_available: Original documents available for physical verification (ELIGIBLE) | Photocopy only / lost (DISQUALIFY IMMEDIATELY)
4. loan_amount: Up to Rs 75 Lakhs (ELIGIBLE) | > Rs 75 Lakhs (Counter-offer max 75L cap; if customer agrees, set 75L and continue; if declines, DISQUALIFY POLITELY)
5. occupation + income_mode: Salaried or Self-Employed (ELIGIBLE) AND Income received in Bank account (ELIGIBLE) | Cash income (DISQUALIFY IMMEDIATELY)
6. market_value: Capture customer's estimate. (There is NO minimum property value threshold; do not invent one)
7. tenure: 3 to 15 years inclusive (ELIGIBLE) | Less than 3 years or Greater than 15 years (DISQUALIFY IMMEDIATELY)

CORE ALGORITHM ("EXTRACT FIRST, VALIDATE SECOND, UPDATE STATE THIRD, ASK FIRST MISSING QUESTION FOURTH"):
On every customer utterance:
1. Extract all provided data points, even if answered out of order or multiple details in one sentence.
2. If ANY mandatory rule is violated (agricultural land, photocopies only, cash income, tenure outside 3-15 years, or refusal of Rs 75L cap), immediately stop the qualification, deliver a polite closure, and end the call.
3. If customer mentions an existing loan on the property or wants EMI reduction, acknowledge, state that a specialized Loan Transfer Specialist will contact them, and end call immediately without asking Questions 1-7.
4. If eligible, update state and ask ONLY the earliest unanswered checklist item. NEVER re-ask information already provided.

CONVERSATION STAGES & LOGIC:
STAGE 1 - VERIFICATION:
- Greet customer: "Hello, good morning/afternoon! May I please speak with {{customer_name}}?"
- If customer asks who is calling, explain identity and company without disclosing confidential financial terms until customer confirms identity.

STAGE 2 - BUSY GATE:
- Ask if they have 2 minutes to talk or if they are busy.
- If customer is busy/in a meeting/driving: Ask for a convenient callback time/date, acknowledge, thank them, and end call.

STAGE 3 - OFFER PRESENTATION:
- Explain: As a valued relationship customer of {{company_name}}, they are pre-selected for an exclusive Loan Against Property offer of up to Rs 75 Lakhs. Seek consent for a quick 2-minute eligibility check.

STAGE 4 - EXISTING LOAN / EMI REDUCTION DETECTION:
- If customer states they already have a mortgage/loan on this property or want to reduce existing EMI:
  "Thank you for letting me know, {{customer_name}}. Since you have an existing loan on the property, this qualifies for our Balance Transfer and EMI Reduction facility. I am assigning your profile to our Loan Transfer Specialist who will contact you shortly with the best transfer rates. Thank you, and have a great day!" -> END CALL.

STAGE 5 - 7 ELIGIBILITY QUESTIONS:
- Ask sequentially for missing items:
  Q1: Property type (Residential / Commercial / Industrial).
  Q2: Ownership status (Sole / Joint).
  Q3: Original documents availability for physical verification.
  Q4: Desired loan amount (Max Rs 75 Lakhs).
  Q5: Occupation (Salaried/Self-employed) and income mode (Bank credit vs Cash).
  Q6: Estimated market value of the property.
  Q7: Desired repayment tenure (3 to 15 years).

STAGE 6 - DISQUALIFICATION ACTIONS:
- If Agricultural: "Thank you for sharing that, {{customer_name}}. Our current pre-approved offer is applicable only for residential, commercial, or industrial properties, so we are unable to process agricultural land under this scheme. Thank you so much for your time, and have a great day!" -> END CALL.
- If Photocopy only: "For this pre-approved facility, physical verification of original property documents is a mandatory regulatory requirement. Since only photocopies are available, we won't be able to proceed right now. Thank you for your time, {{customer_name}}!" -> END CALL.
- If Cash income: "As per our current credit guidelines, loan eligibility requires verifiable bank credit for income. Since your income is received in cash, we cannot process this particular facility at this time. Thank you for your time and have a wonderful day!" -> END CALL.
- If Tenure outside 3-15 years: "Our policy guidelines specify a loan tenure between 3 and 15 years. Since your preferred tenure falls outside this range, we are unable to proceed with this offer. Thank you for your time, {{customer_name}}!" -> END CALL.
- If Loan > 75L: "The pre-approved offer is capped at a maximum of Rs 75 lakhs. Would you like to proceed with the maximum eligible amount of Rs 75 lakhs?" If No -> Politely end call.

DIVERSIONS & QUESTIONS:
- Interest rates inquiry: "Our interest rates are personalized based on your profile and property evaluation. Our Senior Loan Expert will share the exact rate and EMI options right after this quick check. Could we quickly confirm [current question]?"
- Branch/General questions: Refer to {{additional_context_from_rag}}. If not present, state that the Senior Loan Expert will clarify.
- Natural speech: Strip fillers ("umm", "uh"), honor speech corrections ("10 years... actually make that 12"), extract compound answers simultaneously.

STAGE 7 - FINAL QUALIFIED HANDOFF:
- Triggered ONLY when all 7 questions have been answered and all criteria PASS.
- "Congratulations, {{customer_name}}! Based on the preliminary details provided, you meet all criteria for our pre-approved Loan Against Property offer. I am transferring your application to our Senior Loan Expert, who will call you shortly to discuss your personalized interest rate, documentation pickup, and quick sanctioning. Thank you for choosing {{company_name}}, and have a wonderful day ahead!" -> CONCLUDE CALL.

CONTEXT:
Knowledge Base Context: {{additional_context_from_rag}}
Conversation History:
{{conversation_history}}

Customer Utterance:
"{{customer_utterance}}"`;

  const interpolatedPrompt = rawPrompt
    .replace(/\{\{company_name\}\}/g, vars.company_name)
    .replace(/\{\{customer_name\}\}/g, vars.customer_name)
    .replace(/\{\{agent_name\}\}/g, vars.agent_name)
    .replace(/\{\{agent_gender\}\}/g, vars.agent_gender)
    .replace(/\{\{language_to_speak\}\}/g, vars.language_to_speak)
    .replace(/\{\{current_date\}\}/g, vars.current_date)
    .replace(/\{\{current_day\}\}/g, vars.current_day)
    .replace(/\{\{current_time\}\}/g, vars.current_time)
    .replace(/\{\{additional_context_from_rag\}\}/g, vars.additional_context_from_rag);

  const copyToClipboard = (text, isRaw) => {
    navigator.clipboard.writeText(text);
    if (isRaw) {
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24, alignItems: 'start' }}>
      
      {/* LEFT COLUMN: DYNAMIC VARIABLE CONFIGURATOR */}
      <div className="glass-panel" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Settings size={18} color="#22d3ee" />
          <h2 style={{ fontSize: 16, margin: 0, fontWeight: 700 }}>
            Dynamic Variables
          </h2>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
          Configure prompt inputs to see instant real-time interpolation.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Company Name
            </label>
            <input
              type="text"
              value={vars.company_name}
              onChange={(e) => setVars({ ...vars, company_name: e.target.value })}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 6,
                padding: '6px 10px',
                color: '#fff',
                fontSize: 13,
                marginTop: 4
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Customer Name
            </label>
            <input
              type="text"
              value={vars.customer_name}
              onChange={(e) => setVars({ ...vars, customer_name: e.target.value })}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 6,
                padding: '6px 10px',
                color: '#fff',
                fontSize: 13,
                marginTop: 4
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Agent Name & Gender
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 4 }}>
              <input
                type="text"
                value={vars.agent_name}
                onChange={(e) => setVars({ ...vars, agent_name: e.target.value })}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 6,
                  padding: '6px 10px',
                  color: '#fff',
                  fontSize: 13
                }}
              />
              <select
                value={vars.agent_gender}
                onChange={(e) => setVars({ ...vars, agent_gender: e.target.value })}
                style={{
                  background: '#162033',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 6,
                  padding: '6px 10px',
                  color: '#fff',
                  fontSize: 13
                }}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              Spoken Language
            </label>
            <select
              value={vars.language_to_speak}
              onChange={(e) => setVars({ ...vars, language_to_speak: e.target.value })}
              style={{
                width: '100%',
                background: '#162033',
                border: '1px solid var(--border-subtle)',
                borderRadius: 6,
                padding: '6px 10px',
                color: '#fff',
                fontSize: 13,
                marginTop: 4
              }}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Hinglish">Hinglish</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
              RAG Knowledge Context
            </label>
            <textarea
              rows={4}
              value={vars.additional_context_from_rag}
              onChange={(e) => setVars({ ...vars, additional_context_from_rag: e.target.value })}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 6,
                padding: '8px 10px',
                color: '#fff',
                fontSize: 12,
                marginTop: 4,
                resize: 'vertical'
              }}
            />
          </div>

        </div>
      </div>

      {/* RIGHT COLUMN: PROMPT VIEWER & EXPORT ACTIONS */}
      <div className="glass-panel" style={{ padding: 24 }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <h2 style={{ fontSize: 18, margin: 0, fontWeight: 700 }}>
                Production Voice Agent System Prompt
              </h2>
              <span className="badge badge-emerald" style={{ fontSize: 10 }}>
                <CheckCircle2 size={12} /> Ready for Retell / Bolna
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
              Implements EVUA sequential logic, immediate disqualification, counter-offer logic, and gender alignment.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => copyToClipboard(rawPrompt, true)}
              className="btn-secondary"
              style={{ fontSize: 12, padding: '8px 12px' }}
            >
              {copiedRaw ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copiedRaw ? 'Copied Template!' : 'Copy Template ({{...}})'}</span>
            </button>
            <button
              onClick={() => copyToClipboard(interpolatedPrompt, false)}
              className="btn-primary"
              style={{ fontSize: 12, padding: '8px 14px' }}
            >
              {copied ? <Check size={14} color="#fff" /> : <Sparkles size={14} />}
              <span>{copied ? 'Copied Populated!' : 'Copy Populated Prompt'}</span>
            </button>
          </div>
        </div>

        {/* Code / Prompt Container */}
        <div style={{
          background: '#090d16',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: 18,
          maxHeight: 650,
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          lineHeight: 1.6,
          color: '#cbd5e1',
          whiteSpace: 'pre-wrap'
        }}>
          {interpolatedPrompt}
        </div>

      </div>

    </div>
  );
}
