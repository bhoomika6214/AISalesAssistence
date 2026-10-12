import React from 'react';
import { PhoneCall, PlayCircle, FileText, BookOpen, Send, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'simulator', label: 'Call Simulator', icon: PhoneCall },
    { id: 'testbench', label: '14 Test Scenarios', icon: PlayCircle },
    { id: 'prompt', label: 'Prompt Studio', icon: FileText },
    { id: 'approach', label: 'Architecture & Rules', icon: BookOpen },
    { id: 'submission', label: 'Hosting & Submission', icon: Send },
  ];

  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(8, 12, 20, 0.85)',
      backdropFilter: 'blur(16px)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16
      }}>
        {/* Logo & Project Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #06b6d4, #0284c7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(6, 182, 212, 0.4)'
          }}>
            <PhoneCall size={24} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{ fontSize: 18, margin: 0, fontWeight: 700, letterSpacing: '-0.01em' }}>
                Home Credit AI Voice Agent
              </h1>
              <span className="badge badge-cyan" style={{ fontSize: 10, padding: '2px 8px' }}>
                <Sparkles size={11} /> Pre-Approved LAP
              </span>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>
              SalesAgents AI Evaluation • 7-Rule Sequential Qualification Engine
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                  color: isActive ? '#22d3ee' : 'var(--text-muted)',
                  border: isActive ? '1px solid rgba(6, 182, 212, 0.4)' : '1px solid transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Live Status Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '6px 12px',
          borderRadius: 9999,
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.25)'
        }}>
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 8px #10b981'
          }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: '#34d399' }}>
            Production Prompt Ready
          </span>
        </div>
      </div>
    </header>
  );
}
