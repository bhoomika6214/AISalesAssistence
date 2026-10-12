import React, { useState, useRef, useEffect } from 'react';
import { scenariosData } from '../data/scenariosData';
import { 
  Play, Pause, Download, Copy, Check, Filter, 
  Sparkles, CheckCircle2, XCircle, ArrowRight, Volume2, ShieldCheck, FileText
} from 'lucide-react';

export default function TestBench() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [copiedId, setCopiedId] = useState(false);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [autoPlayTurns, setAutoPlayTurns] = useState(false);

  const audioRef = useRef(null);
  const currentScenario = scenariosData.find(s => s.id === selectedScenarioId) || scenariosData[0];

  const categories = [
    'All',
    'Happy Path',
    'Disqualification',
    'Boundary Test',
    'Negotiation / Counter-Offer',
    'Branching / Transfer',
    'Conversational Edge Case'
  ];

  const filteredScenarios = activeCategory === 'All' 
    ? scenariosData 
    : scenariosData.filter(s => s.category === activeCategory);

  // Audio handling
  useEffect(() => {
    setIsPlayingAudio(false);
    setCurrentTurnIndex(0);
    setAutoPlayTurns(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.load();
    }
  }, [selectedScenarioId]);

  // Handle turn stepping
  useEffect(() => {
    let timer = null;
    if (autoPlayTurns && currentTurnIndex < currentScenario.dialogue.length - 1) {
      timer = setTimeout(() => {
        setCurrentTurnIndex(prev => prev + 1);
      }, 3000);
    } else if (currentTurnIndex >= currentScenario.dialogue.length - 1) {
      setAutoPlayTurns(false);
    }
    return () => clearTimeout(timer);
  }, [autoPlayTurns, currentTurnIndex, currentScenario]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(err => console.log("Audio play error:", err));
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setAudioProgress(audioRef.current.currentTime);
      setAudioDuration(audioRef.current.duration || 0);

      // Approximate mapping of audio progress to dialogue turns
      if (audioRef.current.duration) {
        const percent = audioRef.current.currentTime / audioRef.current.duration;
        const targetTurn = Math.min(
          Math.floor(percent * currentScenario.dialogue.length),
          currentScenario.dialogue.length - 1
        );
        setCurrentTurnIndex(targetTurn);
      }
    }
  };

  const handleAudioEnded = () => {
    setIsPlayingAudio(false);
    setAudioProgress(0);
    setCurrentTurnIndex(currentScenario.dialogue.length - 1);
  };

  const copyTranscript = () => {
    const text = currentScenario.dialogue.map(d => 
      `[${d.time}] ${d.speaker.toUpperCase()}: "${d.text}"`
    ).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const formatSec = (sec) => {
    if (isNaN(sec)) return "00:00";
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 420px) 1fr', gap: 24, alignItems: 'start' }}>
      
      {/* LEFT COLUMN: SCENARIO SELECTOR & FILTERS */}
      <div className="glass-panel" style={{ padding: 20 }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, margin: 0, fontWeight: 700 }}>
            Test Scenario Suite
          </h2>
          <span className="badge badge-cyan" style={{ fontSize: 11 }}>
            14 Scenarios Verified
          </span>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                fontSize: 11,
                padding: '4px 10px',
                borderRadius: 9999,
                background: activeCategory === cat ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: activeCategory === cat ? '1px solid #06b6d4' : '1px solid var(--border-subtle)',
                color: activeCategory === cat ? '#22d3ee' : 'var(--text-muted)',
                cursor: 'pointer',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Scenario List Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 680, overflowY: 'auto' }}>
          {filteredScenarios.map((sc) => {
            const isSelected = sc.id === selectedScenarioId;
            return (
              <div
                key={sc.id}
                onClick={() => setSelectedScenarioId(sc.id)}
                style={{
                  padding: 14,
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                  border: isSelected ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#38bdf8' }}>
                    Scenario #{sc.id}
                  </span>
                  <span className={`badge ${
                    sc.statusBadge === 'QUALIFIED_HANDOFF' ? 'badge-emerald' :
                    sc.statusBadge === 'DISQUALIFIED' ? 'badge-rose' :
                    sc.statusBadge === 'TRANSFER_SPECIALIST' ? 'badge-blue' : 'badge-amber'
                  }`} style={{ fontSize: 9 }}>
                    {sc.statusBadge}
                  </span>
                </div>

                <h3 style={{ fontSize: 13, margin: '0 0 4px', fontWeight: 600, color: '#f8fafc' }}>
                  {sc.title}
                </h3>

                <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0, lineClamp: 2 }}>
                  👤 Lead: {sc.customerName} • {sc.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>

      {/* RIGHT COLUMN: SCENARIO PLAYER, AUDIO & TRANSCRIPT INSPECTION */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Active Scenario Overview Header */}
        <div className="glass-panel" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginBottom: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span className="badge badge-cyan" style={{ fontSize: 11 }}>
                  {currentScenario.category}
                </span>
                <span className={`badge ${
                  currentScenario.statusBadge === 'QUALIFIED_HANDOFF' ? 'badge-emerald' :
                  currentScenario.statusBadge === 'DISQUALIFIED' ? 'badge-rose' :
                  currentScenario.statusBadge === 'TRANSFER_SPECIALIST' ? 'badge-blue' : 'badge-amber'
                }`} style={{ fontSize: 11 }}>
                  {currentScenario.statusBadge}
                </span>
              </div>
              <h2 style={{ fontSize: 20, margin: '0 0 6px', fontWeight: 700 }}>
                {currentScenario.title}
              </h2>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: 0 }}>
                👤 Customer: <strong>{currentScenario.customerName}</strong> • {currentScenario.description}
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={copyTranscript}
                className="btn-secondary"
                style={{ fontSize: 12, padding: '8px 12px' }}
              >
                {copiedId ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copiedId ? 'Copied!' : 'Copy Transcript'}</span>
              </button>
              <a
                href={`/audio/scenario_${currentScenario.id}.wav`}
                download={`scenario_${currentScenario.id}_homecredit.wav`}
                className="btn-secondary"
                style={{ fontSize: 12, padding: '8px 12px', textDecoration: 'none' }}
              >
                <Download size={14} />
                <span>Download Audio</span>
              </a>
            </div>
          </div>

          {/* Key Evaluation Insight Box */}
          <div style={{
            background: 'rgba(6, 182, 212, 0.08)',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            borderRadius: 'var(--radius-md)',
            padding: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <Sparkles size={18} color="#22d3ee" style={{ flexShrink: 0 }} />
            <p style={{ fontSize: 12, color: '#e0f2fe', margin: 0 }}>
              <strong>Evaluator Insight:</strong> {currentScenario.keyInsight}
            </p>
          </div>
        </div>

        {/* Real Audio Player Card */}
        <div className="glass-panel" style={{ padding: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Volume2 size={18} color="#22d3ee" />
              <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Synthesized Spoken Call Recording
              </span>
            </div>
            <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: '#38bdf8' }}>
              {formatSec(audioProgress)} / {formatSec(audioDuration)}
            </span>
          </div>

          {/* Hidden audio element with dual format fallback */}
          <audio
            ref={audioRef}
            onTimeUpdate={handleAudioTimeUpdate}
            onEnded={handleAudioEnded}
            preload="metadata"
          >
            <source src={`/audio/scenario_${currentScenario.id}.m4a`} type="audio/mp4" />
            <source src={`/audio/scenario_${currentScenario.id}.wav`} type="audio/wav" />
          </audio>

          {/* Custom audio controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={toggleAudio}
              className="btn-primary"
              style={{ width: 44, height: 44, borderRadius: '50%', padding: 0 }}
            >
              {isPlayingAudio ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
            </button>

            {/* Scrub bar */}
            <input
              type="range"
              min="0"
              max={audioDuration || 100}
              value={audioProgress}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setAudioProgress(val);
                if (audioRef.current) audioRef.current.currentTime = val;
              }}
              style={{
                flex: 1,
                accentColor: '#06b6d4',
                height: 6,
                cursor: 'pointer'
              }}
            />

            <button
              onClick={() => setAutoPlayTurns(!autoPlayTurns)}
              style={{
                fontSize: 12,
                padding: '6px 12px',
                borderRadius: 8,
                background: autoPlayTurns ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: autoPlayTurns ? '#34d399' : 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              {autoPlayTurns ? 'Auto Stepping ON' : 'Auto Step Dialogue'}
            </button>
          </div>
        </div>

        {/* Turn-by-Turn Dialogue & State Diff Inspector */}
        <div className="glass-panel" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, margin: 0, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Turn-by-Turn Dialogue & Internal State Delta
            </h3>
            <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              Step {currentTurnIndex + 1} of {currentScenario.dialogue.length}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {currentScenario.dialogue.map((turn, idx) => {
              const isActive = idx === currentTurnIndex;
              return (
                <div
                  key={idx}
                  onClick={() => setCurrentTurnIndex(idx)}
                  style={{
                    padding: 14,
                    borderRadius: 12,
                    background: isActive ? 'rgba(6, 182, 212, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                    border: isActive ? '1px solid rgba(6, 182, 212, 0.45)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: turn.speaker === 'agent' ? '#22d3ee' : '#34d399',
                        textTransform: 'uppercase'
                      }}>
                        {turn.speaker === 'agent' ? '🤖 Agent (Priya)' : `👤 Customer (${currentScenario.customerName})`}
                      </span>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                        {turn.time}
                      </span>
                    </div>

                    {/* Turn State Diff Tags */}
                    {turn.state && Object.keys(turn.state).length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {Object.entries(turn.state).map(([k, v], sIdx) => (
                          <span
                            key={sIdx}
                            style={{
                              fontSize: 10,
                              fontFamily: 'var(--font-mono)',
                              background: typeof v === 'string' && (v.includes('DISQUALIFY') || v.includes('Photocopy Only') || v.includes('Cash')) ? 'rgba(244, 63, 94, 0.2)' : 'rgba(16, 185, 129, 0.15)',
                              color: typeof v === 'string' && (v.includes('DISQUALIFY') || v.includes('Photocopy Only') || v.includes('Cash')) ? '#fb7185' : '#34d399',
                              padding: '2px 6px',
                              borderRadius: 4,
                              border: '1px solid rgba(255, 255, 255, 0.1)'
                            }}
                          >
                            {k}: {String(v)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <p style={{ fontSize: 13, color: '#f8fafc', margin: 0, lineHeight: 1.5 }}>
                    "{turn.text}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
