import React from 'react';
import { 
  BookOpen, Layers, CheckCircle2, XCircle, ArrowRight, 
  HelpCircle, ShieldCheck, Zap, GitBranch, Cpu
} from 'lucide-react';

export default function DocsViewer() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Title & Overview Banner */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #06b6d4, #0284c7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <BookOpen size={20} color="#fff" />
          </div>
          <h2 style={{ fontSize: 22, margin: 0, fontWeight: 700 }}>
            Engineering Approach & Architectural Specification
          </h2>
        </div>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
          Comprehensive documentation of the 5-Layer AI Voice Architecture, the Extract-Validate-Update-Ask (EVUA) algorithm, and the 7-Rule decision trees designed for Home Credit's Loan Against Property (LAP) outbound qualification campaign.
        </p>
      </div>

      {/* 5-Layer Architecture Diagram Cards */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Layers size={20} color="#22d3ee" />
          <h3 style={{ fontSize: 18, margin: 0 }}>
            The 5-Layer Voice Agent Architecture
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
          
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>Layer 1</span>
            <h4 style={{ fontSize: 15, margin: '6px 0 8px' }}>Conversation Layer</h4>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Handles greetings, caller verification, busy customer checks, and ensures turns stay under 40 words with natural Indian-English/Hindi cadence.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#34d399', textTransform: 'uppercase' }}>Layer 2</span>
            <h4 style={{ fontSize: 15, margin: '6px 0 8px' }}>Business Logic Layer</h4>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Enforces hard eligibility boundaries (allowed property types, original physical title deeds, bank-credited income, and 3–15 year repayment tenures).
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase' }}>Layer 3</span>
            <h4 style={{ fontSize: 15, margin: '6px 0 8px' }}>State & Memory Engine</h4>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Maintains internal checklist state across turns. Preserves answers given out of order, and applies the Latest Valid Assertion rule for speech corrections.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#a78bfa', textTransform: 'uppercase' }}>Layer 4</span>
            <h4 style={{ fontSize: 15, margin: '6px 0 8px' }}>Dialogue Flow (EVUA)</h4>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Extract First, Validate Second, Update State Third, Ask First Missing Question Fourth. Defers interest-rate diversions without hallucinating rates.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: 16 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#fb7185', textTransform: 'uppercase' }}>Layer 5</span>
            <h4 style={{ fontSize: 15, margin: '6px 0 8px' }}>Decision & Routing Gate</h4>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Dispatches callers to 4 deterministic endpoints: Senior Loan Expert Handoff, Balance Transfer Specialist, Callback Rescheduler, or Polite Disqualification.
            </p>
          </div>

        </div>
      </div>

      {/* The EVUA Algorithm Showcase */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <Cpu size={20} color="#22d3ee" />
          <h3 style={{ fontSize: 18, margin: 0 }}>
            The "Extract First, Validate Second, Update State Third, Ask First Missing Question Fourth" (EVUA) Engine
          </h3>
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
          In spoken calls, users rarely follow a linear question-answer format. When a customer says:  
          <em style={{ color: '#38bdf8' }}> "It's my own residential house, valued around 1.5 crore, and I am looking for a loan of 60 lakhs"</em>, 
          a robotic bot would foolishly ask for ownership, loan amount, and property type again. Our EVUA engine handles this elegantly:
        </p>

        <div style={{
          background: '#090d16',
          border: '1px solid var(--border-subtle)',
          borderRadius: 12,
          padding: 16,
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          color: '#e2e8f0',
          lineHeight: 1.7
        }}>
          <div><strong>1. EXTRACT:</strong> Parse all stated parameters from customer utterance:</div>
          <div style={{ color: '#34d399', marginLeft: 20 }}>→ property_type = "Residential", ownership_status = "Sole", market_value = "₹1.50 Cr", loan_amount = "₹60 Lakhs"</div>
          
          <div style={{ marginTop: 8 }}><strong>2. VALIDATE:</strong> Check each extracted parameter against compliance rules:</div>
          <div style={{ color: '#34d399', marginLeft: 20 }}>→ Residential [PASS], Sole [PASS], Value [CAPTURED], Loan ≤ 75L [PASS]. No disqualifiers triggered.</div>
          
          <div style={{ marginTop: 8 }}><strong>3. UPDATE STATE:</strong> Merge validated values into state:</div>
          <div style={{ color: '#38bdf8', marginLeft: 20 }}>→ checklist = &#123; 1: Residential, 2: Sole, 3: null, 4: 60L, 5: null, 6: 1.5Cr, 7: null &#125;</div>
          
          <div style={{ marginTop: 8 }}><strong>4. ASK FIRST MISSING ITEM:</strong> Scan checklist indices 1 through 7 for earliest unfilled item:</div>
          <div style={{ color: '#fbbf24', marginLeft: 20 }}>→ Earliest unfilled is #3: documents_available. Prompt only for original documents!</div>
        </div>
      </div>

      {/* 7 Eligibility Rules Table */}
      <div className="glass-panel" style={{ padding: 24 }}>
        <h3 style={{ fontSize: 18, margin: '0 0 16px' }}>
          7-Rule Eligibility Decision Matrix
        </h3>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '10px 14px' }}>#</th>
                <th style={{ padding: '10px 14px' }}>Parameter</th>
                <th style={{ padding: '10px 14px' }}>Eligible Values</th>
                <th style={{ padding: '10px 14px' }}>Disqualifying Criteria</th>
                <th style={{ padding: '10px 14px' }}>Policy Rationale</th>
              </tr>
            </thead>
            <tbody>
              
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#38bdf8' }}>1</td>
                <td style={{ padding: '12px 14px', fontWeight: 600 }}>Property Type</td>
                <td style={{ padding: '12px 14px', color: '#34d399' }}>Residential, Commercial, Industrial</td>
                <td style={{ padding: '12px 14px', color: '#fb7185' }}>Agricultural Land</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>Regulatory restrictions prevent mortgaging farm land under retail LAP schemes.</td>
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#38bdf8' }}>2</td>
                <td style={{ padding: '12px 14px', fontWeight: 600 }}>Ownership</td>
                <td style={{ padding: '12px 14px', color: '#34d399' }}>Sole Ownership, Joint Ownership</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-dim)' }}>None (Both eligible)</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>Joint owners become co-borrowers; both ownership models are fully permitted.</td>
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#38bdf8' }}>3</td>
                <td style={{ padding: '12px 14px', fontWeight: 600 }}>Original Documents</td>
                <td style={{ padding: '12px 14px', color: '#34d399' }}>Original physical title deeds available</td>
                <td style={{ padding: '12px 14px', color: '#fb7185' }}>Photocopies only / lost deeds</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>Equitable mortgage creation mandates physical deposit of original title deeds.</td>
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#38bdf8' }}>4</td>
                <td style={{ padding: '12px 14px', fontWeight: 600 }}>Loan Amount</td>
                <td style={{ padding: '12px 14px', color: '#34d399' }}>Up to ₹75,00,000 (₹75 Lakhs)</td>
                <td style={{ padding: '12px 14px', color: '#fbbf24' }}>&gt; ₹75L (Offers ₹75L counter)</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>Maximum pre-approved sanction ceiling is ₹75L. Counter-offer is mandatory before exit.</td>
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#38bdf8' }}>5</td>
                <td style={{ padding: '12px 14px', fontWeight: 600 }}>Income Mode</td>
                <td style={{ padding: '12px 14px', color: '#34d399' }}>Bank Transfer / NEFT / Cheque</td>
                <td style={{ padding: '12px 14px', color: '#fb7185' }}>Cash Income</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>Bank statements are legally required for automated debt-to-income servicing checks.</td>
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#38bdf8' }}>6</td>
                <td style={{ padding: '12px 14px', fontWeight: 600 }}>Market Value</td>
                <td style={{ padding: '12px 14px', color: '#34d399' }}>Customer estimate captured</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-dim)' }}>None (No minimum cutoff)</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>Captured for LTV ratio calculation by senior loan evaluator; no arbitrary rejection.</td>
              </tr>

              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px 14px', fontWeight: 700, color: '#38bdf8' }}>7</td>
                <td style={{ padding: '12px 14px', fontWeight: 600 }}>Repayment Tenure</td>
                <td style={{ padding: '12px 14px', color: '#34d399' }}>3 to 15 Years (inclusive)</td>
                <td style={{ padding: '12px 14px', color: '#fb7185' }}>&lt; 3 Years or &gt; 15 Years</td>
                <td style={{ padding: '12px 14px', color: 'var(--text-muted)' }}>LAP policy bounds amortized loan schedules strictly between 36 and 180 months.</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
