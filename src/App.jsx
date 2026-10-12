import React, { useState } from 'react';
import Header from './components/Header';
import CallSimulator from './components/CallSimulator';
import TestBench from './components/TestBench';
import PromptStudio from './components/PromptStudio';
import DocsViewer from './components/DocsViewer';
import SubmissionCenter from './components/SubmissionCenter';
import { ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('simulator');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="app-container" style={{ paddingBottom: 60 }}>
        {activeTab === 'simulator' && <CallSimulator />}
        {activeTab === 'testbench' && <TestBench />}
        {activeTab === 'prompt' && <PromptStudio />}
        {activeTab === 'approach' && <DocsViewer />}
        {activeTab === 'submission' && <SubmissionCenter />}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(8, 12, 20, 0.95)',
        padding: '24px 0',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16
        }}>
          <div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 4px' }}>
              <strong>Home Credit Loan Against Property (LAP) AI Voice Agent</strong>
            </p>
            <p style={{ fontSize: 11, color: 'var(--text-dim)', margin: 0 }}>
              SalesAgents AI • AI Intern (Prompt Engineer) Evaluation System • 7-Rule State Machine
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12, color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={14} color="#10b981" />
              <span>Production Ready</span>
            </span>
            <span>•</span>
            <span>Zero Hallucinations Guardrail</span>
            <span>•</span>
            <span>EVUA Sequential Engine</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
