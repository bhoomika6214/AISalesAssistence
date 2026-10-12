import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, PhoneOff, Mic, MicOff, Volume2, RotateCcw, 
  CheckCircle, AlertTriangle, ArrowRight, User, ShieldCheck, 
  Clock, DollarSign, Home, FileCheck, Briefcase, Calendar
} from 'lucide-react';

export default function CallSimulator() {
  const [callState, setCallState] = useState('IDLE'); // IDLE, CONNECTED, ENDED
  const [callTimer, setCallTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [inputText, setInputText] = useState('');
  
  // Real-time qualification state
  const initialQualification = {
    customer_verified: false,
    customer_busy: null,
    callback_scheduled: null,
    existing_property_loan: null,
    emi_reduction_intent: null,
    counter_offer_active: false,
    counter_offer_accepted: null,
    checklist: {
      property_type: null,
      ownership_status: null,
      documents_available: null,
      loan_amount: null,
      occupation: null,
      income_mode: null,
      market_value: null,
      tenure: null
    },
    decision: 'PENDING', // PENDING, QUALIFIED_HANDOFF, DISQUALIFIED, TRANSFER_SPECIALIST, CALLBACK_SCHEDULED
    decisionReason: ''
  };

  const [state, setState] = useState(initialQualification);
  const [messages, setMessages] = useState([]);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (callState === 'CONNECTED') {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (callState === 'IDLE') setCallTimer(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAgentSpeaking]);

  // Web Speech API for voice output
  const speakText = (text) => {
    if ('speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      
      // Try to select an Indian or smooth English voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.includes('IN') || v.name.includes('Samantha') || v.name.includes('Google UK English Female'));
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onstart = () => setIsAgentSpeaking(true);
      utterance.onend = () => setIsAgentSpeaking(false);
      utterance.onerror = () => setIsAgentSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Speech Recognition for Mic
  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Speech recognition isn't supported in this browser. Please use Chrome or type your answer.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSendCustomerMessage(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    }
  };

  // Start Call
  const handleStartCall = () => {
    setCallState('CONNECTED');
    setCallTimer(0);
    setState(initialQualification);
    const firstMsg = {
      sender: 'agent',
      time: '00:01',
      text: "Hello, good day! May I please speak with Mr. Rahul Sharma?"
    };
    setMessages([firstMsg]);
    speakText(firstMsg.text);
  };

  // End Call
  const handleEndCall = () => {
    setCallState('ENDED');
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setIsAgentSpeaking(false);
  };

  // Reset Everything
  const handleReset = () => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setCallState('IDLE');
    setCallTimer(0);
    setState(initialQualification);
    setMessages([]);
    setInputText('');
  };

  // Dialogue Engine & State Machine (EVUA Algorithm)
  const processTurn = (customerText, currentState) => {
    const textLower = customerText.toLowerCase();
    const updatedState = JSON.parse(JSON.stringify(currentState));
    const chk = updatedState.checklist;
    let agentReply = '';
    let endCallNow = false;

    // Helper: Earliest Missing Question
    const getFirstMissingQuestion = () => {
      if (!chk.property_type) return "property_type";
      if (!chk.ownership_status) return "ownership_status";
      if (!chk.documents_available) return "documents_available";
      if (!chk.loan_amount) return "loan_amount";
      if (!chk.occupation || !chk.income_mode) return "occupation_income";
      if (!chk.market_value) return "market_value";
      if (!chk.tenure) return "tenure";
      return "ALL_DONE";
    };

    const getQuestionText = (qCode) => {
      switch (qCode) {
        case "property_type":
          return "Could you tell me what type of property you own—is it residential, commercial, or industrial?";
        case "ownership_status":
          return "Is the property solely owned in your name, or is it jointly owned with a co-owner?";
        case "documents_available":
          return "Do you have the original title deed and property documents available for physical verification?";
        case "loan_amount":
          return "What is the approximate loan amount you are looking to secure?";
        case "occupation_income":
          return "Could you share your current occupation, and whether your primary income is received through bank transfer or in cash?";
        case "market_value":
          return "What would be the approximate current market value of your property?";
        case "tenure":
          return "Over what tenure between 3 to 15 years would you like to repay the loan?";
        default:
          return "";
      }
    };

    // Stage 1: Identity verification check
    if (!updatedState.customer_verified) {
      if (textLower.includes('yes') || textLower.includes('speaking') || textLower.includes('rahul') || textLower.includes('this is')) {
        updatedState.customer_verified = true;
        agentReply = "Great! Rahul, do you have a couple of minutes to speak right now, or did I catch you at a busy time?";
        return { reply: agentReply, newState: updatedState, endCall: false };
      } else if (textLower.includes('who') || textLower.includes('why') || textLower.includes('kya baat')) {
        agentReply = "I am Priya calling from Home Credit regarding an exclusive pre-approved benefit for you. Am I speaking with Mr. Rahul Sharma?";
        return { reply: agentReply, newState: updatedState, endCall: false };
      }
    }

    // Stage 2: Busy check
    if (updatedState.customer_busy === null) {
      if (textLower.includes('busy') || textLower.includes('meeting') || textLower.includes('driving') || textLower.includes('later') || textLower.includes('cannot talk')) {
        updatedState.customer_busy = true;
        agentReply = "I completely understand. What would be a convenient time or day for us to give you a quick callback?";
        return { reply: agentReply, newState: updatedState, endCall: false };
      } else if (updatedState.customer_busy === true || textLower.includes('tomorrow') || textLower.includes('pm') || textLower.includes('am') || textLower.includes('call me')) {
        updatedState.callback_scheduled = customerText;
        updatedState.decision = 'CALLBACK_SCHEDULED';
        updatedState.decisionReason = `Customer scheduled callback for: ${customerText}`;
        agentReply = `Noted, I have scheduled our callback for ${customerText}. Thank you for your time, Rahul, and have a wonderful day!`;
        return { reply: agentReply, newState: updatedState, endCall: true };
      } else {
        updatedState.customer_busy = false;
        agentReply = "Thank you! Because of your valued relationship with Home Credit, you have been pre-selected for an exclusive Loan Against Property offer of up to ₹75 lakhs with preferential terms. Shall we proceed with a quick eligibility check?";
        return { reply: agentReply, newState: updatedState, endCall: false };
      }
    }

    // Stage 4: Existing Loan / EMI Reduction Trigger
    if (textLower.includes('existing loan') || textLower.includes('already have a loan') || textLower.includes('home loan running') || textLower.includes('balance transfer') || textLower.includes('reduce my emi') || textLower.includes('reduce emi') || textLower.includes('cut emi')) {
      updatedState.existing_property_loan = true;
      updatedState.decision = 'TRANSFER_SPECIALIST';
      updatedState.decisionReason = "Customer has existing loan or requests EMI reduction -> routed to Balance Transfer Specialist.";
      agentReply = "Thank you for letting me know, Rahul. Since you already have an existing loan on the property, this qualifies for our Balance Transfer and EMI Reduction facility. I am routing your request to our dedicated Loan Transfer Specialist, who will contact you shortly with the best transfer rates. Thank you, and have a wonderful day!";
      return { reply: agentReply, newState: updatedState, endCall: true };
    }

    // Stage 6.2: Counter-Offer Negotiation Active
    if (updatedState.counter_offer_active) {
      if (textLower.includes('yes') || textLower.includes('work') || textLower.includes('proceed') || textLower.includes('fine') || textLower.includes('okay') || textLower.includes('75')) {
        updatedState.counter_offer_active = false;
        updatedState.counter_offer_accepted = true;
        chk.loan_amount = '₹75,00,000 (Counter Accepted)';
        const nextQ = getFirstMissingQuestion();
        agentReply = `Perfect, I've noted ₹75 lakhs as your desired loan amount. ${getQuestionText(nextQ)}`;
        return { reply: agentReply, newState: updatedState, endCall: false };
      } else {
        updatedState.counter_offer_active = false;
        updatedState.counter_offer_accepted = false;
        updatedState.decision = 'DISQUALIFIED';
        updatedState.decisionReason = "Customer declined ₹75 Lakh maximum pre-approved cap.";
        agentReply = "I completely understand your requirement, Rahul. Since this specific pre-approved offer is capped at ₹75 lakhs, we cannot accommodate a higher amount today. Thank you so much for speaking with us, and have a great day!";
        return { reply: agentReply, newState: updatedState, endCall: true };
      }
    }

    // Diversions & Interruptions: Rate of Interest
    if (textLower.includes('interest rate') || textLower.includes('roi') || textLower.includes('rate kya hai') || textLower.includes('percentage')) {
      const nextQ = getFirstMissingQuestion();
      agentReply = `Our interest rates are tailored individually to your profile and property evaluation. Our Senior Loan Expert will share the exact interest rate and EMI options right after this quick preliminary check. To proceed, ${getQuestionText(nextQ)}`;
      return { reply: agentReply, newState: updatedState, endCall: false };
    }

    // EVUA Parsing: Extract Any Mentioned Checklist Data

    // 1. Property Type
    if (textLower.includes('agricultural') || textLower.includes('farm') || textLower.includes('kheti')) {
      chk.property_type = 'Agricultural (DISQUALIFIED)';
      updatedState.decision = 'DISQUALIFIED';
      updatedState.decisionReason = "Agricultural land is ineligible under LAP policy.";
      agentReply = "Thank you for sharing that, Rahul. Currently, our Loan Against Property offer is only available for residential, commercial, or industrial properties, so we are unable to process agricultural land under this scheme. We appreciate your time and will update you when new offers open up. Have a great day!";
      return { reply: agentReply, newState: updatedState, endCall: true };
    } else if (textLower.includes('residential') || textLower.includes('flat') || textLower.includes('house') || textLower.includes('bungalow') || textLower.includes('apartment')) {
      chk.property_type = 'Residential (PASS)';
    } else if (textLower.includes('commercial') || textLower.includes('shop') || textLower.includes('office')) {
      chk.property_type = 'Commercial (PASS)';
    } else if (textLower.includes('industrial') || textLower.includes('factory') || textLower.includes('warehouse')) {
      chk.property_type = 'Industrial (PASS)';
    }

    // 2. Ownership
    if (textLower.includes('joint') || textLower.includes('wife') || textLower.includes('brother') || textLower.includes('father') || textLower.includes('mother')) {
      chk.ownership_status = 'Joint Ownership (PASS)';
    } else if (textLower.includes('sole') || textLower.includes('my name') || textLower.includes('my own') || textLower.includes('single')) {
      chk.ownership_status = 'Sole Ownership (PASS)';
    }

    // 3. Documents
    if (textLower.includes('photocopy') || textLower.includes('xerox') || textLower.includes('duplicate') || textLower.includes('misplaced') || textLower.includes('lost') || textLower.includes('no original')) {
      chk.documents_available = 'Photocopies Only (DISQUALIFIED)';
      updatedState.decision = 'DISQUALIFIED';
      updatedState.decisionReason = "Original physical property deeds must be available for verification.";
      agentReply = "Understood, Rahul. For this pre-approved facility, physical verification of original property documents is a mandatory regulatory requirement. Since only photocopies are available, we won't be able to proceed right now. Thank you so much for your time, and have a good day!";
      return { reply: agentReply, newState: updatedState, endCall: true };
    } else if (textLower.includes('original') || textLower.includes('registry') || textLower.includes('papers available') || textLower.includes('at home') || textLower.includes('in locker') || textLower.includes('yes i have')) {
      chk.documents_available = 'Original Available (PASS)';
    }

    // 4. Loan Amount
    if (textLower.match(/\b(90|100|120|150|200)\s*(lakh|lac|cr|crore)|1\.5\s*cr|1\.2\s*cr|2\s*cr/)) {
      chk.loan_amount = 'Exceeds ₹75 Lakhs';
      updatedState.counter_offer_active = true;
      agentReply = "Under this special pre-approved offer, the maximum eligible loan amount is ₹75 lakhs. Would you like to proceed with the maximum eligible amount of ₹75 lakhs for now?";
      return { reply: agentReply, newState: updatedState, endCall: false };
    } else {
      const matchAmt = textLower.match(/(\d+)\s*(lakh|lac|peti|l)/);
      if (matchAmt) {
        const val = parseInt(matchAmt[1], 10);
        if (val <= 75) {
          chk.loan_amount = `₹${val},00,000 (PASS)`;
        } else {
          chk.loan_amount = `₹${val} Lakhs (Exceeds Cap)`;
          updatedState.counter_offer_active = true;
          agentReply = "The current pre-approved offer is available for up to ₹75 lakhs. Would you like to proceed with the maximum eligible amount of ₹75 lakhs for now?";
          return { reply: agentReply, newState: updatedState, endCall: false };
        }
      }
    }

    // 5. Occupation & Income Mode
    if (textLower.includes('cash') || textLower.includes('in hand') || textLower.includes('rokda')) {
      chk.income_mode = 'Cash (DISQUALIFIED)';
      updatedState.decision = 'DISQUALIFIED';
      updatedState.decisionReason = "Cash income is not acceptable. Bank credit is mandatory.";
      agentReply = "Thank you for letting me know, Rahul. As per our current credit guidelines, loan eligibility requires verifiable bank credit for income. Since your income is received in cash, we cannot process this particular facility at this time. We appreciate your time and wish you the best!";
      return { reply: agentReply, newState: updatedState, endCall: true };
    }

    if (textLower.includes('salaried') || textLower.includes('job') || textLower.includes('mnc') || textLower.includes('employee')) {
      chk.occupation = 'Salaried (PASS)';
    } else if (textLower.includes('self-employed') || textLower.includes('business') || textLower.includes('shop') || textLower.includes('consultant')) {
      chk.occupation = 'Self-Employed (PASS)';
    }

    if (textLower.includes('bank') || textLower.includes('account') || textLower.includes('neft') || textLower.includes('cheque') || textLower.includes('transfer') || textLower.includes('salary slip')) {
      chk.income_mode = 'Bank Credit (PASS)';
    }

    // 6. Market Value
    const matchVal = textLower.match(/(\d+(\.\d+)?)\s*(cr|crore)/) || textLower.match(/(\d+)\s*(lakh|lac)\s*(worth|value|property)/);
    if (matchVal) {
      chk.market_value = matchVal[0].toUpperCase() + " (Captured)";
    } else if (textLower.includes('1.2 crore') || textLower.includes('1 crore') || textLower.includes('80 lakh') || textLower.includes('1.5 crore')) {
      chk.market_value = "₹" + customerText.match(/[\d\.]+\s*(crore|cr|lakh|lac)/i)?.[0] + " (Captured)";
    }

    // 7. Tenure (supports temporal corrections like "10 years... actually 12")
    const matchTenure = textLower.match(/(actually|make that)?\s*(\d+)\s*(year|yr)/i);
    if (matchTenure) {
      // Find all numbers followed by year, take latest
      const allYears = [...textLower.matchAll(/(\d+)\s*(year|yr)/gi)];
      const latestYear = allYears.length > 0 ? parseInt(allYears[allYears.length - 1][1], 10) : parseInt(matchTenure[2], 10);

      if (latestYear < 3) {
        chk.tenure = `${latestYear} Years (DISQUALIFIED < 3)`;
        updatedState.decision = 'DISQUALIFIED';
        updatedState.decisionReason = `Tenure of ${latestYear} years is below the 3-year minimum threshold.`;
        agentReply = `Thank you for specifying that, Rahul. Our policy guidelines mandate a repayment tenure between 3 and 15 years. Since your preferred tenure is under 3 years, we cannot proceed with this scheme today. Thank you for your time!`;
        return { reply: agentReply, newState: updatedState, endCall: true };
      } else if (latestYear > 15) {
        chk.tenure = `${latestYear} Years (DISQUALIFIED > 15)`;
        updatedState.decision = 'DISQUALIFIED';
        updatedState.decisionReason = `Tenure of ${latestYear} years exceeds the 15-year maximum ceiling.`;
        agentReply = `Thank you for sharing that, Rahul. Under this pre-approved program, the maximum allowable repayment tenure is 15 years. Since you require more than 15 years, we are unable to accommodate this tenure under the current scheme. Have a wonderful day!`;
        return { reply: agentReply, newState: updatedState, endCall: true };
      } else {
        chk.tenure = `${latestYear} Years (PASS)`;
      }
    }

    // Check next missing question
    const missing = getFirstMissingQuestion();

    if (missing === 'ALL_DONE') {
      updatedState.decision = 'QUALIFIED_HANDOFF';
      updatedState.decisionReason = 'All 7 eligibility parameters validated and passed successfully.';
      agentReply = "Congratulations, Mr. Sharma! Based on the preliminary details provided, you meet all the criteria for our pre-approved Loan Against Property offer. I am now transferring your application to our Senior Loan Expert, who will call you shortly to discuss your tailored interest rates, documentation pickup, and quick sanctioning. Thank you for choosing Home Credit, and have a wonderful day ahead!";
      endCallNow = true;
    } else {
      agentReply = getQuestionText(missing);
    }

    return { reply: agentReply, newState: updatedState, endCall: endCallNow };
  };

  const handleSendCustomerMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim() || callState !== 'CONNECTED') return;

    const custMsg = {
      sender: 'customer',
      time: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
      text: text
    };

    const newMessages = [...messages, custMsg];
    setMessages(newMessages);
    setInputText('');

    // Process logic
    setTimeout(() => {
      const { reply, newState, endCall } = processTurn(text, state);
      setState(newState);

      const agentMsg = {
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
        text: reply
      };

      setMessages(prev => [...prev, agentMsg]);
      speakText(reply);

      if (endCall) {
        setTimeout(() => {
          setCallState('ENDED');
        }, 3000);
      }
    }, 400);
  };

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const quickPrompts = [
    { label: "✅ Perfect Match (Turn 1)", text: "Yes, this is Rahul." },
    { label: "🌾 Agricultural Land", text: "It's an agricultural farm land." },
    { label: "💵 Cash Income", text: "I run a shop and all my income is in cash." },
    { label: "📄 Photocopies Only", text: "I only have photocopies of the documents." },
    { label: "📈 Need 90 Lakhs (>75L)", text: "I need around 90 lakhs." },
    { label: "⏳ Tenure 20 Years (>15Y)", text: "I want a long tenure like 20 years." },
    { label: "🔄 Existing Loan on Property", text: "I already have an existing loan on this property." },
    { label: "📉 Reduce My EMI", text: "Can you help me reduce my high monthly EMI?" },
    { label: "🏃 I'm In a Meeting", text: "I'm in a meeting right now, please call tomorrow at 3 PM." },
    { label: "🎯 Rate of Interest?", text: "Wait, what is your exact interest rate?" },
    { label: "⚡ Multi-Fact (Out of Order)", text: "It's my residential flat, joint with wife, worth 1.2 crore, and I need 50 lakhs." }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 460px) 1fr', gap: 24, alignItems: 'start' }}>
      
      {/* LEFT COLUMN: TELEPHONE DIALER & ACTIVE CALL SCREEN */}
      <div className="glass-panel" style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
        
        {/* Glow Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: callState === 'CONNECTED' ? '#10b981' : (callState === 'ENDED' ? '#ef4444' : '#64748b'),
              boxShadow: callState === 'CONNECTED' ? '0 0 10px #10b981' : 'none'
            }} />
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              {callState === 'CONNECTED' ? 'CALL ACTIVE (01:24)' : (callState === 'ENDED' ? 'CALL TERMINATED' : 'STANDBY')}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button 
              onClick={() => setIsMuted(!isMuted)} 
              title={isMuted ? "Unmute Voice" : "Mute Voice"}
              style={{
                background: isMuted ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-subtle)',
                color: isMuted ? '#f87171' : 'var(--text-main)',
                borderRadius: 8,
                padding: '6px 10px',
                cursor: 'pointer'
              }}
            >
              <Volume2 size={15} />
            </button>
            <button 
              onClick={handleReset} 
              title="Reset Call"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-main)',
                borderRadius: 8,
                padding: '6px 10px',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>

        {/* Caller Avatar Card */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: 20,
          textAlign: 'center',
          marginBottom: 20
        }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
            margin: '0 auto 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isAgentSpeaking ? '0 0 25px rgba(6, 182, 212, 0.6)' : '0 4px 14px rgba(0,0,0,0.4)',
            transition: 'all 0.3s ease'
          }}>
            <User size={36} color="#fff" />
          </div>

          <h2 style={{ fontSize: 18, margin: '0 0 4px', fontWeight: 700 }}>
            Priya • Senior Voice Agent
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 8px' }}>
            Home Credit India • Loan Against Property
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontFamily: 'var(--font-mono)', color: '#22d3ee' }}>
            <Clock size={14} />
            <span>{formatTimer(callTimer)}</span>
          </div>

          {/* Animated Waveform when Agent is speaking */}
          <div style={{
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            marginTop: 12
          }}>
            {isAgentSpeaking ? (
              Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="waveform-bar"
                  style={{
                    animationDelay: `${(i * 0.08).toFixed(2)}s`,
                    height: `${Math.floor(Math.random() * 24 + 10)}px`
                  }}
                />
              ))
            ) : (
              <span style={{ fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic' }}>
                {callState === 'CONNECTED' ? 'Listening to customer...' : 'Ready to start call'}
              </span>
            )}
          </div>
        </div>

        {/* Call Action Controls */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          {callState !== 'CONNECTED' ? (
            <button
              onClick={handleStartCall}
              className="btn-primary"
              style={{ flex: 1, padding: '14px 20px', fontSize: 15 }}
            >
              <Phone size={18} />
              <span>Start Outbound Call</span>
            </button>
          ) : (
            <button
              onClick={handleEndCall}
              className="btn-danger"
              style={{ flex: 1, padding: '14px 20px', fontSize: 15 }}
            >
              <PhoneOff size={18} />
              <span>End Call</span>
            </button>
          )}
        </div>

        {/* Customer Input Box */}
        {callState === 'CONNECTED' && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="Type customer reply or click mic..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendCustomerMessage()}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 14px',
                  color: '#fff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  outline: 'none'
                }}
              />
              <button
                onClick={toggleListening}
                style={{
                  background: isListening ? '#f43f5e' : 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid var(--border-subtle)',
                  color: '#fff',
                  borderRadius: 'var(--radius-md)',
                  padding: '0 14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title={isListening ? "Listening... click to stop" : "Speak via Microphone"}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button
                onClick={() => handleSendCustomerMessage()}
                className="btn-primary"
                style={{ padding: '0 16px' }}
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Quick Test Scenarios Trigger Chips */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase' }}>
            ⚡ Instant Scenario Triggers:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxHeight: 200, overflowY: 'auto' }}>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                disabled={callState !== 'CONNECTED'}
                onClick={() => handleSendCustomerMessage(p.text)}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 6,
                  color: callState === 'CONNECTED' ? '#e2e8f0' : 'var(--text-dim)',
                  fontSize: 11,
                  padding: '5px 9px',
                  cursor: callState === 'CONNECTED' ? 'pointer' : 'not-allowed',
                  textAlign: 'left'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: REAL-TIME CONVERSATION TRANSCRIPT & 7-VARIABLE HUD */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        
        {/* Real-Time Decision Gate Banner */}
        <div className="glass-panel" style={{
          padding: 16,
          borderColor: state.decision === 'QUALIFIED_HANDOFF' ? 'rgba(16, 185, 129, 0.4)' :
                       state.decision === 'DISQUALIFIED' ? 'rgba(244, 63, 94, 0.4)' :
                       state.decision === 'TRANSFER_SPECIALIST' ? 'rgba(59, 130, 246, 0.4)' :
                       state.decision === 'CALLBACK_SCHEDULED' ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-subtle)',
          background: state.decision === 'QUALIFIED_HANDOFF' ? 'rgba(16, 185, 129, 0.08)' :
                      state.decision === 'DISQUALIFIED' ? 'rgba(244, 63, 94, 0.08)' :
                      state.decision === 'TRANSFER_SPECIALIST' ? 'rgba(59, 130, 246, 0.08)' :
                      state.decision === 'CALLBACK_SCHEDULED' ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-card)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ShieldCheck size={24} color={
                state.decision === 'QUALIFIED_HANDOFF' ? '#34d399' :
                state.decision === 'DISQUALIFIED' ? '#fb7185' :
                state.decision === 'TRANSFER_SPECIALIST' ? '#60a5fa' :
                state.decision === 'CALLBACK_SCHEDULED' ? '#fbbf24' : '#94a3b8'
              } />
              <div>
                <span style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Active Qualification Gate
                </span>
                <h3 style={{ fontSize: 16, margin: 0 }}>
                  {state.decision === 'QUALIFIED_HANDOFF' && 'QUALIFIED LEAD → HANDOFF TO SENIOR LOAN EXPERT'}
                  {state.decision === 'DISQUALIFIED' && 'DISQUALIFIED → POLITE IMMEDIATE CLOSURE'}
                  {state.decision === 'TRANSFER_SPECIALIST' && 'TRANSFER TRIGGERED → BALANCE SPECIALIST ROUTING'}
                  {state.decision === 'CALLBACK_SCHEDULED' && 'BUSY CALLER → CALLBACK RESCHEDULED'}
                  {state.decision === 'PENDING' && 'EVALUATING 7 ELIGIBILITY CRITERIA (EVUA)'}
                </h3>
              </div>
            </div>

            <span className={`badge ${
              state.decision === 'QUALIFIED_HANDOFF' ? 'badge-emerald' :
              state.decision === 'DISQUALIFIED' ? 'badge-rose' :
              state.decision === 'TRANSFER_SPECIALIST' ? 'badge-blue' :
              state.decision === 'CALLBACK_SCHEDULED' ? 'badge-amber' : 'badge-cyan'
            }`}>
              {state.decision}
            </span>
          </div>

          {state.decisionReason && (
            <p style={{ marginTop: 8, fontSize: 13, color: '#e2e8f0', background: 'rgba(0,0,0,0.25)', padding: '6px 12px', borderRadius: 6 }}>
              <strong>Reason:</strong> {state.decisionReason}
            </p>
          )}
        </div>

        {/* 7-Parameter HUD Matrix */}
        <div className="glass-panel" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <h4 style={{ fontSize: 14, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
              7-Point Eligibility State Engine
            </h4>
            <span style={{ fontSize: 12, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>
              Rule Compliance: Sequential + Out-Of-Order Extraction
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
            
            {/* 1. Property Type */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>
                <Home size={13} />
                <span>1. Property Type</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: state.checklist.property_type ? (state.checklist.property_type.includes('DISQUALIFIED') ? '#fb7185' : '#34d399') : 'var(--text-dim)' }}>
                {state.checklist.property_type || 'UNKNOWN (Res/Com/Ind)'}
              </div>
            </div>

            {/* 2. Ownership */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>
                <User size={13} />
                <span>2. Ownership Status</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: state.checklist.ownership_status ? '#34d399' : 'var(--text-dim)' }}>
                {state.checklist.ownership_status || 'UNKNOWN (Sole/Joint)'}
              </div>
            </div>

            {/* 3. Original Docs */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>
                <FileCheck size={13} />
                <span>3. Original Documents</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: state.checklist.documents_available ? (state.checklist.documents_available.includes('DISQUALIFIED') ? '#fb7185' : '#34d399') : 'var(--text-dim)' }}>
                {state.checklist.documents_available || 'UNKNOWN (Mandatory Original)'}
              </div>
            </div>

            {/* 4. Loan Amount */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>
                <DollarSign size={13} />
                <span>4. Desired Loan Amount</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: state.checklist.loan_amount ? (state.checklist.loan_amount.includes('Exceeds') ? '#fbbf24' : '#34d399') : 'var(--text-dim)' }}>
                {state.checklist.loan_amount || 'UNKNOWN (Max ₹75L)'}
              </div>
            </div>

            {/* 5. Occupation & Income Mode */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>
                <Briefcase size={13} />
                <span>5. Income Mode</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: state.checklist.income_mode ? (state.checklist.income_mode.includes('Cash') ? '#fb7185' : '#34d399') : 'var(--text-dim)' }}>
                {state.checklist.income_mode || 'UNKNOWN (Bank Only)'}
              </div>
            </div>

            {/* 6. Market Value */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>
                <Home size={13} />
                <span>6. Market Value</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: state.checklist.market_value ? '#34d399' : 'var(--text-dim)' }}>
                {state.checklist.market_value || 'UNKNOWN (No Min Cap)'}
              </div>
            </div>

            {/* 7. Tenure */}
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: 12, borderRadius: 8, border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-dim)', marginBottom: 4 }}>
                <Calendar size={13} />
                <span>7. Repayment Tenure</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: state.checklist.tenure ? (state.checklist.tenure.includes('DISQUALIFIED') ? '#fb7185' : '#34d399') : 'var(--text-dim)' }}>
                {state.checklist.tenure || 'UNKNOWN (3-15 Years)'}
              </div>
            </div>

          </div>
        </div>

        {/* Live Conversation Thread */}
        <div className="glass-panel" style={{ padding: 20, flex: 1, minHeight: 380, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h4 style={{ fontSize: 14, margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
              Spoken Dialogue Thread
            </h4>
            <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>
              {messages.length} utterances recorded
            </span>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 420 }}>
            {messages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-dim)' }}>
                <Phone size={36} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                <p>Click "Start Outbound Call" to simulate the AI Voice Agent call.</p>
              </div>
            ) : (
              messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: m.sender === 'agent' ? 'flex-start' : 'flex-end',
                    maxWidth: '85%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4, alignSelf: m.sender === 'agent' ? 'flex-start' : 'flex-end' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: m.sender === 'agent' ? '#22d3ee' : '#34d399' }}>
                      {m.sender === 'agent' ? '🤖 Priya (AI Voice Agent)' : '👤 Rahul Sharma (Customer)'}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>{m.time}</span>
                  </div>

                  <div style={{
                    padding: '12px 16px',
                    borderRadius: 14,
                    background: m.sender === 'agent' ? 'rgba(6, 182, 212, 0.12)' : 'rgba(16, 185, 129, 0.14)',
                    border: m.sender === 'agent' ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid rgba(16, 185, 129, 0.3)',
                    color: '#f8fafc',
                    fontSize: 14,
                    lineHeight: 1.5
                  }}>
                    {m.text}
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

      </div>

    </div>
  );
}
