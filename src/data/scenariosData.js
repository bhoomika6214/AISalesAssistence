export const scenariosData = [
  {
    id: 1,
    title: "Scenario 1: Happy Path - Fully Eligible Customer",
    category: "Happy Path",
    statusBadge: "QUALIFIED_HANDOFF",
    badgeColor: "#10b981",
    customerName: "Rahul Sharma",
    description: "End-to-end clean path. All 7 eligibility points provided sequentially and verified successfully.",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello, good morning! May I please speak with Mr. Rahul Sharma?",
        state: { customer_verified: "PENDING" }
      },
      {
        time: "00:04",
        speaker: "customer",
        text: "Yes, this is Rahul speaking.",
        state: { customer_verified: true }
      },
      {
        time: "00:07",
        speaker: "agent",
        text: "Great! Rahul, do you have a couple of minutes to speak right now, or did I catch you at a busy time?",
        state: { customer_busy: "CHECKING" }
      },
      {
        time: "00:11",
        speaker: "customer",
        text: "No, I'm free, go ahead.",
        state: { customer_busy: false }
      },
      {
        time: "00:14",
        speaker: "agent",
        text: "Thank you! Because of your valued relationship with Home Credit, you have been pre-selected for an exclusive Loan Against Property offer of up to ₹75 lakhs with preferential terms. Shall we proceed with a quick eligibility check?",
        state: { offer_presented: true }
      },
      {
        time: "00:20",
        speaker: "customer",
        text: "Sure, sounds interesting. Let's do it.",
        state: { offer_accepted: true }
      },
      {
        time: "00:23",
        speaker: "agent",
        text: "Wonderful. Could you tell me what type of property you own—is it residential, commercial, or industrial?",
        state: { current_question: "property_type" }
      },
      {
        time: "00:28",
        speaker: "customer",
        text: "It's a residential apartment.",
        state: { property_type: "Residential (PASS)" }
      },
      {
        time: "00:31",
        speaker: "agent",
        text: "Got it. Is the property solely owned in your name, or is it jointly owned with a co-owner?",
        state: { current_question: "ownership_status" }
      },
      {
        time: "00:35",
        speaker: "customer",
        text: "It's in my name only, sole ownership.",
        state: { ownership_status: "Sole (PASS)" }
      },
      {
        time: "00:38",
        speaker: "agent",
        text: "Understood. Do you have the original title deed and property documents available for physical verification?",
        state: { current_question: "documents_available" }
      },
      {
        time: "00:43",
        speaker: "customer",
        text: "Yes, all original papers are at home.",
        state: { documents_available: "Available (PASS)" }
      },
      {
        time: "00:46",
        speaker: "agent",
        text: "That's great. What is the approximate loan amount you are looking to secure?",
        state: { current_question: "loan_amount" }
      },
      {
        time: "00:50",
        speaker: "customer",
        text: "I need around ₹50 lakhs for business expansion.",
        state: { loan_amount: "₹50,00,000 (PASS <= 75L)" }
      },
      {
        time: "00:54",
        speaker: "agent",
        text: "Noted. Could you share your current occupation, and whether your primary income is received through bank transfer or in cash?",
        state: { current_question: "occupation_income" }
      },
      {
        time: "01:00",
        speaker: "customer",
        text: "I am salaried at an IT firm, and my salary comes directly into my bank account.",
        state: { occupation: "Salaried (PASS)", income_mode: "Bank (PASS)" }
      },
      {
        time: "01:04",
        speaker: "agent",
        text: "Perfect. What would be the approximate current market value of your residential apartment?",
        state: { current_question: "market_value" }
      },
      {
        time: "01:09",
        speaker: "customer",
        text: "Around ₹1.2 crore as per current market rates.",
        state: { market_value: "₹1.20 Crore (Captured)" }
      },
      {
        time: "01:13",
        speaker: "agent",
        text: "Understood. And over what tenure would you like to repay the loan—how many years are you looking at?",
        state: { current_question: "tenure" }
      },
      {
        time: "01:17",
        speaker: "customer",
        text: "I'd prefer a 10-year repayment period.",
        state: { tenure: "10 Years (PASS - 3 to 15 yrs)" }
      },
      {
        time: "01:21",
        speaker: "agent",
        text: "Congratulations, Mr. Sharma! Based on the preliminary details provided, you meet all the criteria for our pre-approved Loan Against Property offer. I am now transferring your application to our Senior Loan Expert, who will call you shortly to discuss your tailored interest rates, documentation pickup, and quick sanctioning. Thank you for choosing Home Credit, and have a wonderful day ahead!",
        state: { decision: "QUALIFIED_HANDOFF" }
      }
    ],
    finalDecision: "QUALIFIED_HANDOFF",
    keyInsight: "Demonstrates full EVUA checklist adherence, strict sequential capture, and flawless handoff gate."
  },
  {
    id: 2,
    title: "Scenario 2: Immediate Disqualification - Agricultural Land",
    category: "Disqualification",
    statusBadge: "DISQUALIFIED",
    badgeColor: "#ef4444",
    customerName: "Suresh Patel",
    description: "Customer indicates agricultural property on Question 1. Agent halts instantly without asking Q2-Q7.",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello, good afternoon! May I please speak with Mr. Suresh Patel?",
        state: { customer_verified: "PENDING" }
      },
      {
        time: "00:04",
        speaker: "customer",
        text: "Yes, Suresh speaking.",
        state: { customer_verified: true }
      },
      {
        time: "00:07",
        speaker: "agent",
        text: "Great! Suresh, do you have a couple of minutes to speak right now, or did I catch you at a busy time?",
        state: { customer_busy: "CHECKING" }
      },
      {
        time: "00:10",
        speaker: "customer",
        text: "Yes, I have two minutes.",
        state: { customer_busy: false }
      },
      {
        time: "00:13",
        speaker: "agent",
        text: "As a valued Home Credit customer, you've been pre-selected for our exclusive Loan Against Property offer of up to ₹75 lakhs. Shall we quickly check your eligibility?",
        state: { offer_presented: true }
      },
      {
        time: "00:18",
        speaker: "customer",
        text: "Yes, tell me.",
        state: { offer_accepted: true }
      },
      {
        time: "00:20",
        speaker: "agent",
        text: "Could you tell me what type of property you own—is it residential, commercial, or industrial?",
        state: { current_question: "property_type" }
      },
      {
        time: "00:25",
        speaker: "customer",
        text: "Actually, it's agricultural farm land near my village.",
        state: { property_type: "Agricultural (DISQUALIFY)" }
      },
      {
        time: "00:29",
        speaker: "agent",
        text: "Thank you for sharing that, Mr. Patel. Currently, our Loan Against Property offer is only available for residential, commercial, or industrial properties, so we are unable to process agricultural land under this scheme. We truly appreciate your time, and we will update you as soon as new programs open up. Have a great day!",
        state: { decision: "DISQUALIFIED" }
      }
    ],
    finalDecision: "DISQUALIFIED",
    keyInsight: "Zero-latency compliance gate. Does not waste caller's time or probe further once hard disqualifier is met."
  },
  {
    id: 3,
    title: "Scenario 3: Immediate Disqualification - Cash Income Mode",
    category: "Disqualification",
    statusBadge: "DISQUALIFIED",
    badgeColor: "#ef4444",
    customerName: "Rajesh Verma",
    description: "Customer passes Q1-Q4 on commercial shop, but reports receiving income in cash. Halted immediately at Q5.",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello, good morning! May I please speak with Mr. Rajesh Verma?",
        state: { customer_verified: true }
      },
      {
        time: "00:06",
        speaker: "customer",
        text: "Yes, Rajesh here. Go ahead.",
        state: { customer_busy: false }
      },
      {
        time: "00:09",
        speaker: "agent",
        text: "You have been pre-selected for our exclusive Loan Against Property offer of up to ₹75 lakhs with Home Credit. Shall we review a few quick details?",
        state: { offer_presented: true }
      },
      {
        time: "00:15",
        speaker: "customer",
        text: "Sure.",
        state: { offer_accepted: true }
      },
      {
        time: "00:17",
        speaker: "agent",
        text: "Could you tell me what type of property you own—is it residential, commercial, or industrial?",
        state: { current_question: "property_type" }
      },
      {
        time: "00:22",
        speaker: "customer",
        text: "It is a commercial shop.",
        state: { property_type: "Commercial (PASS)" }
      },
      {
        time: "00:25",
        speaker: "agent",
        text: "Is the commercial shop solely owned by you, or jointly owned?",
        state: { current_question: "ownership_status" }
      },
      {
        time: "00:28",
        speaker: "customer",
        text: "Sole ownership in my name.",
        state: { ownership_status: "Sole (PASS)" }
      },
      {
        time: "00:30",
        speaker: "agent",
        text: "Do you have the original property documents available for physical verification?",
        state: { current_question: "documents_available" }
      },
      {
        time: "00:34",
        speaker: "customer",
        text: "Yes, original registry papers are available at my home.",
        state: { documents_available: "Available (PASS)" }
      },
      {
        time: "00:37",
        speaker: "agent",
        text: "What is the approximate loan amount you are looking to secure?",
        state: { current_question: "loan_amount" }
      },
      {
        time: "00:40",
        speaker: "customer",
        text: "I need around ₹25 lakhs.",
        state: { loan_amount: "₹25,00,000 (PASS)" }
      },
      {
        time: "00:43",
        speaker: "agent",
        text: "Noted. Could you share your current occupation, and whether your primary income is received through bank transfer or in cash?",
        state: { current_question: "occupation_income" }
      },
      {
        time: "00:50",
        speaker: "customer",
        text: "I run this retail shop, self-employed. My customers pay in cash, so all my income is in cash.",
        state: { occupation: "Self-Employed (PASS)", income_mode: "Cash (DISQUALIFY)" }
      },
      {
        time: "00:55",
        speaker: "agent",
        text: "Thank you for letting me know, Mr. Verma. As per our current credit guidelines, loan eligibility requires verifiable bank credit for income. Since your income is received in cash, we cannot process this particular facility at this time. We appreciate your time and wish you the best!",
        state: { decision: "DISQUALIFIED" }
      }
    ],
    finalDecision: "DISQUALIFIED",
    keyInsight: "Demonstrates compound variable evaluation in Q5. Self-employed is valid, but Cash income mode triggers immediate policy rejection."
  },
  {
    id: 4,
    title: "Scenario 4: Immediate Disqualification - Photocopies Only",
    category: "Disqualification",
    statusBadge: "DISQUALIFIED",
    badgeColor: "#ef4444",
    customerName: "Anil Gupta",
    description: "Customer owns industrial property but only possesses photocopies of title deeds. Disqualified at Q3.",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello, good afternoon! May I please speak with Mr. Anil Gupta?",
        state: { customer_verified: true }
      },
      {
        time: "00:04",
        speaker: "customer",
        text: "Yes, Anil speaking. What is this call about?",
        state: { customer_busy: false }
      },
      {
        time: "00:07",
        speaker: "agent",
        text: "You have been pre-selected for an exclusive Loan Against Property offer of up to ₹75 lakhs with Home Credit. Shall we proceed with a quick eligibility check?",
        state: { offer_presented: true }
      },
      {
        time: "00:14",
        speaker: "customer",
        text: "Sure, let's see.",
        state: { offer_accepted: true }
      },
      {
        time: "00:16",
        speaker: "agent",
        text: "Could you tell me what type of property you own—is it residential, commercial, or industrial?",
        state: { current_question: "property_type" }
      },
      {
        time: "00:21",
        speaker: "customer",
        text: "It's an industrial plot and warehouse.",
        state: { property_type: "Industrial (PASS)" }
      },
      {
        time: "00:24",
        speaker: "agent",
        text: "Is the property solely owned in your name, or jointly owned?",
        state: { current_question: "ownership_status" }
      },
      {
        time: "00:27",
        speaker: "customer",
        text: "Solely owned by me.",
        state: { ownership_status: "Sole (PASS)" }
      },
      {
        time: "00:29",
        speaker: "agent",
        text: "Do you have the original title deeds and property documents available for physical verification?",
        state: { current_question: "documents_available" }
      },
      {
        time: "00:35",
        speaker: "customer",
        text: "Actually no, the originals got misplaced during shifting. I only have notarized photocopies.",
        state: { documents_available: "Photocopy Only (DISQUALIFY)" }
      },
      {
        time: "00:40",
        speaker: "agent",
        text: "Understood, Mr. Gupta. For this pre-approved facility, physical verification of original property documents is a mandatory regulatory requirement. Since only photocopies are available, we won't be able to proceed right now. Thank you so much for your time, and have a good day!",
        state: { decision: "DISQUALIFIED" }
      }
    ],
    finalDecision: "DISQUALIFIED",
    keyInsight: "Distinguishes between original physical possession vs. photocopies. Adheres to strict regulatory verification rule."
  },
  {
    id: 5,
    title: "Scenario 5: Tenure Boundary Failure - Less Than 3 Years",
    category: "Boundary Test",
    statusBadge: "DISQUALIFIED",
    badgeColor: "#ef4444",
    customerName: "Vikram Mehra",
    description: "Customer qualifies on Q1 through Q6, but requests a 2-year bridge tenure (< 3 yrs). Disqualified at Q7.",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello Mr. Mehra! Reaching out regarding your pre-approved ₹75 lakh Loan Against Property offer.",
        state: { customer_verified: true, customer_busy: false, offer_presented: true }
      },
      {
        time: "00:08",
        speaker: "customer",
        text: "Yes, I have a residential apartment, sole ownership, originals are at home, I need ₹40 lakhs, I am salaried with bank transfer, property worth ₹80 lakhs.",
        state: {
          property_type: "Residential (PASS)",
          ownership_status: "Sole (PASS)",
          documents_available: "Available (PASS)",
          loan_amount: "₹40,00,000 (PASS)",
          occupation: "Salaried (PASS)",
          income_mode: "Bank (PASS)",
          market_value: "₹80,00,000 (Captured)"
        }
      },
      {
        time: "00:19",
        speaker: "agent",
        text: "Thank you for sharing those details, Mr. Mehra! And over what tenure would you like to repay the loan—how many years are you looking at?",
        state: { current_question: "tenure" }
      },
      {
        time: "00:25",
        speaker: "customer",
        text: "I just need a short bridge loan for 1 or 2 years maximum.",
        state: { tenure: "2 Years (DISQUALIFY - Minimum is 3 years)" }
      },
      {
        time: "00:29",
        speaker: "agent",
        text: "Thank you for specifying that, Mr. Mehra. Our policy guidelines mandate a repayment tenure between 3 and 15 years. Since your preferred tenure is under the 3-year minimum threshold, we cannot proceed with this scheme today. Thank you for your time, and have a great day!",
        state: { decision: "DISQUALIFIED" }
      }
    ],
    finalDecision: "DISQUALIFIED",
    keyInsight: "Validates lower tenure threshold (3 years). Enforces policy boundaries even after all other 6 fields pass."
  },
  {
    id: 6,
    title: "Scenario 6: Tenure Boundary Failure - Exceeds 15 Years",
    category: "Boundary Test",
    statusBadge: "DISQUALIFIED",
    badgeColor: "#ef4444",
    customerName: "Deepak Joshi",
    description: "Customer passes Q1-Q6, but demands a 20-year tenure (> 15 yrs). Disqualified at Q7.",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello Mr. Joshi! Calling regarding Home Credit's pre-approved Loan Against Property offer.",
        state: { customer_verified: true, customer_busy: false }
      },
      {
        time: "00:07",
        speaker: "customer",
        text: "I own a residential villa jointly with my wife, papers are available, need ₹60 lakhs, self-employed with bank income, worth ₹1.5 crore.",
        state: {
          property_type: "Residential (PASS)",
          ownership_status: "Joint (PASS)",
          documents_available: "Available (PASS)",
          loan_amount: "₹60,00,000 (PASS)",
          occupation: "Self-Employed (PASS)",
          income_mode: "Bank (PASS)",
          market_value: "₹1.50 Crore (Captured)"
        }
      },
      {
        time: "00:18",
        speaker: "agent",
        text: "Understood! And over what repayment tenure between 3 to 15 years would you like to repay the loan?",
        state: { current_question: "tenure" }
      },
      {
        time: "00:24",
        speaker: "customer",
        text: "I want a long tenure like 20 or 25 years to keep my EMI low.",
        state: { tenure: "20 Years (DISQUALIFY - Maximum is 15 years)" }
      },
      {
        time: "00:29",
        speaker: "agent",
        text: "Thank you for sharing that, Mr. Joshi. Under this pre-approved program, the maximum allowable repayment tenure is 15 years. Since you require 20 years or more, we are unable to accommodate this tenure under the current scheme. We appreciate your time, and have a wonderful day!",
        state: { decision: "DISQUALIFIED" }
      }
    ],
    finalDecision: "DISQUALIFIED",
    keyInsight: "Validates upper tenure boundary (15 years max). LAP differs from 30-year home loans."
  },
  {
    id: 7,
    title: "Scenario 7: Loan Amount > ₹75 Lakh - Counter-Offer Accepted",
    category: "Negotiation / Counter-Offer",
    statusBadge: "QUALIFIED_HANDOFF",
    badgeColor: "#10b981",
    customerName: "Sanjay Singhania",
    description: "Customer requests ₹90 Lakhs. Agent counters with ₹75L pre-approved cap. Customer accepts and finishes flow.",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello Mr. Singhania! Reaching out regarding your pre-approved LAP offer.",
        state: { customer_verified: true, customer_busy: false }
      },
      {
        time: "00:06",
        speaker: "customer",
        text: "Yes, I have a residential bungalow, sole ownership, original registry available.",
        state: {
          property_type: "Residential (PASS)",
          ownership_status: "Sole (PASS)",
          documents_available: "Available (PASS)"
        }
      },
      {
        time: "00:14",
        speaker: "agent",
        text: "That's great. What is the approximate loan amount you are looking to secure?",
        state: { current_question: "loan_amount" }
      },
      {
        time: "00:19",
        speaker: "customer",
        text: "I need around ₹90 lakhs for working capital.",
        state: { loan_amount: "₹90,00,000 (EXCEEDS 75L CAP)" }
      },
      {
        time: "00:23",
        speaker: "agent",
        text: "The current pre-approved offer is available for up to ₹75 lakhs. Would you like to proceed with the maximum eligible amount of ₹75 lakhs for now?",
        state: { counter_offer_active: true }
      },
      {
        time: "00:30",
        speaker: "customer",
        text: "Yes, ₹75 lakhs will also work for me.",
        state: { loan_amount: "₹75,00,000 (Counter Accepted)", counter_offer_accepted: true }
      },
      {
        time: "00:34",
        speaker: "agent",
        text: "Perfect, I've noted ₹75 lakhs as your desired amount. Could you share your current occupation, and whether your income is received through bank transfer or cash?",
        state: { current_question: "occupation_income" }
      },
      {
        time: "00:41",
        speaker: "customer",
        text: "I'm self-employed and all business turnover passes through our bank current account.",
        state: { occupation: "Self-Employed (PASS)", income_mode: "Bank (PASS)" }
      },
      {
        time: "00:46",
        speaker: "agent",
        text: "What is the approximate market value of your property?",
        state: { current_question: "market_value" }
      },
      {
        time: "00:49",
        speaker: "customer",
        text: "It is worth about ₹2 crores.",
        state: { market_value: "₹2.00 Crore (Captured)" }
      },
      {
        time: "00:52",
        speaker: "agent",
        text: "And what repayment tenure between 3 to 15 years would you prefer?",
        state: { current_question: "tenure" }
      },
      {
        time: "00:56",
        speaker: "customer",
        text: "10 years.",
        state: { tenure: "10 Years (PASS)" }
      },
      {
        time: "01:00",
        speaker: "agent",
        text: "Congratulations, Mr. Singhania! You meet all preliminary criteria for our pre-approved ₹75 lakh Loan Against Property offer. I am transferring your file to our Senior Loan Expert, who will call you shortly to finalize your exact interest rate and expedited sanctioning. Thank you for choosing Home Credit!",
        state: { decision: "QUALIFIED_HANDOFF" }
      }
    ],
    finalDecision: "QUALIFIED_HANDOFF",
    keyInsight: "Demonstrates Rule 6.2 counter-offer protocol: does not drop the lead, offers ₹75L cap, successfully closes."
  },
  {
    id: 8,
    title: "Scenario 8: Loan Amount > ₹75 Lakh - Counter-Offer Declined",
    category: "Negotiation / Counter-Offer",
    statusBadge: "DISQUALIFIED",
    badgeColor: "#ef4444",
    customerName: "Karan Oberoi",
    description: "Customer requires ₹1.5 Crore. Rejects the ₹75L counter-offer. Agent terminates respectfully.",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello Mr. Oberoi! Calling regarding Home Credit's pre-approved LAP offer.",
        state: { customer_verified: true, customer_busy: false }
      },
      {
        time: "00:06",
        speaker: "customer",
        text: "I have a commercial office, sole ownership, original deeds with me.",
        state: {
          property_type: "Commercial (PASS)",
          ownership_status: "Sole (PASS)",
          documents_available: "Available (PASS)"
        }
      },
      {
        time: "00:14",
        speaker: "agent",
        text: "What is the approximate loan amount you are looking to secure?",
        state: { current_question: "loan_amount" }
      },
      {
        time: "00:18",
        speaker: "customer",
        text: "I need at least ₹1.5 crore. Nothing less will do.",
        state: { loan_amount: "₹1.50 Crore (EXCEEDS 75L)" }
      },
      {
        time: "00:22",
        speaker: "agent",
        text: "Under this special pre-approved offer, the maximum eligible loan amount is ₹75 lakhs. Would you like to proceed with the maximum amount of ₹75 lakhs for now?",
        state: { counter_offer_active: true }
      },
      {
        time: "00:29",
        speaker: "customer",
        text: "No, ₹75 lakhs is too low for my project, so I cannot proceed.",
        state: { counter_offer_accepted: false }
      },
      {
        time: "00:33",
        speaker: "agent",
        text: "I completely understand your requirement, Mr. Oberoi. Since this specific offer is capped at ₹75 lakhs, we cannot accommodate a higher amount today. Thank you so much for speaking with us, and have a great day!",
        state: { decision: "DISQUALIFIED" }
      }
    ],
    finalDecision: "DISQUALIFIED",
    keyInsight: "Handles hard rejection of counter-offer gracefully without aggressive sales pressure."
  },
  {
    id: 9,
    title: "Scenario 9: Existing Mortgage / Property Loan Transfer Flow",
    category: "Branching / Transfer",
    statusBadge: "TRANSFER_SPECIALIST",
    badgeColor: "#3b82f6",
    customerName: "Amit Saxena",
    description: "Customer mentions an existing active loan on the property. Bypasses Q1-Q7 and routes to transfer specialist.",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello, good morning! May I speak with Mr. Amit Saxena?",
        state: { customer_verified: true }
      },
      {
        time: "00:04",
        speaker: "customer",
        text: "Yes, speaking. Go ahead.",
        state: { customer_busy: false }
      },
      {
        time: "00:07",
        speaker: "agent",
        text: "As a valued Home Credit customer, you have been pre-selected for an exclusive Loan Against Property offer of up to ₹75 lakhs with preferential terms. Shall we check your eligibility?",
        state: { offer_presented: true }
      },
      {
        time: "00:15",
        speaker: "customer",
        text: "Actually, I already have an ongoing home loan on this property with another bank.",
        state: { existing_property_loan: true, trigger: "BALANCE_TRANSFER_GATE" }
      },
      {
        time: "00:21",
        speaker: "agent",
        text: "Thank you for letting me know, Mr. Saxena. Since you already have an existing loan on the property, this qualifies for our Balance Transfer facility. I am routing your request to our dedicated Loan Transfer Specialist, who will contact you shortly with our lowest balance transfer rates. Thank you, and have a wonderful day!",
        state: { decision: "TRANSFER_SPECIALIST" }
      }
    ],
    finalDecision: "TRANSFER_SPECIALIST",
    keyInsight: "Critical assignment rule: does NOT ask Questions 1–7 for existing loan balance transfer cases."
  },
  {
    id: 10,
    title: "Scenario 10: EMI Reduction Intent Flow",
    category: "Branching / Transfer",
    statusBadge: "TRANSFER_SPECIALIST",
    badgeColor: "#3b82f6",
    customerName: "Neha Kulkarni",
    description: "Customer wants lower monthly EMI on current property debt. Detected as balance transfer.",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello, good afternoon! May I speak with Ms. Neha Kulkarni?",
        state: { customer_verified: true }
      },
      {
        time: "00:04",
        speaker: "customer",
        text: "Yes, this is Neha. What is this regarding?",
        state: { customer_busy: false }
      },
      {
        time: "00:07",
        speaker: "agent",
        text: "You have been pre-selected for our exclusive Loan Against Property offer of up to ₹75 lakhs with Home Credit. Shall we check your preliminary qualification?",
        state: { offer_presented: true }
      },
      {
        time: "00:14",
        speaker: "customer",
        text: "Can you help me reduce the high EMI on my current property loan? That is what I need right now.",
        state: { emi_reduction_intent: true, trigger: "BALANCE_TRANSFER_GATE" }
      },
      {
        time: "00:20",
        speaker: "agent",
        text: "Thank you for clarifying that, Ms. Kulkarni. Since you are looking to reduce your existing EMI, this is handled under our specialized Loan Transfer and EMI Reduction program. I am assigning your details to our Loan Transfer Specialist, who will reach out shortly to restructure your loan for lower payments. Thank you for your time, and have a great day!",
        state: { decision: "TRANSFER_SPECIALIST" }
      }
    ],
    finalDecision: "TRANSFER_SPECIALIST",
    keyInsight: "Maps customer intent ('reduce my EMI') directly to specialized balance-transfer workflow."
  },
  {
    id: 11,
    title: "Scenario 11: Out-of-Order Multi-Variable Utterance",
    category: "Conversational Edge Case",
    statusBadge: "QUALIFIED_HANDOFF",
    badgeColor: "#10b981",
    customerName: "Manish Kapoor",
    description: "Customer delivers 4 pieces of data in a single turn. Agent parses all 4 and prompts only for Q3 (Documents).",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello Mr. Kapoor! May we proceed with a quick 2-minute eligibility check for our pre-approved ₹75 lakh LAP offer?",
        state: { customer_verified: true, customer_busy: false, offer_presented: true }
      },
      {
        time: "00:08",
        speaker: "customer",
        text: "Look, it's my own residential independent house, valued at around ₹1.5 crore, and I am looking for a loan of ₹60 lakhs.",
        state: {
          property_type: "Residential (PASS)",
          ownership_status: "Sole (PASS - 'my own')",
          market_value: "₹1.50 Crore (Captured)",
          loan_amount: "₹60,00,000 (PASS)",
          next_missing_question: "documents_available (Q3)"
        }
      },
      {
        time: "00:17",
        speaker: "agent",
        text: "Thank you, Mr. Kapoor, I've noted those details! Do you have the original title deeds and property documents available for physical verification?",
        state: { current_question: "documents_available" }
      },
      {
        time: "00:24",
        speaker: "customer",
        text: "Yes, all original papers are safely with me at home.",
        state: { documents_available: "Available (PASS)", next_missing_question: "occupation_income (Q5)" }
      },
      {
        time: "00:28",
        speaker: "agent",
        text: "Great! Could you share your occupation, and whether your primary income is received through bank transfer or in cash?",
        state: { current_question: "occupation_income" }
      },
      {
        time: "00:34",
        speaker: "customer",
        text: "I run a consulting firm, self-employed, and all fees are received via bank NEFT.",
        state: { occupation: "Self-Employed (PASS)", income_mode: "Bank (PASS)", next_missing_question: "tenure (Q7)" }
      },
      {
        time: "00:39",
        speaker: "agent",
        text: "And what repayment tenure between 3 and 15 years are you looking at?",
        state: { current_question: "tenure" }
      },
      {
        time: "00:43",
        speaker: "customer",
        text: "7 years.",
        state: { tenure: "7 Years (PASS)" }
      },
      {
        time: "00:46",
        speaker: "agent",
        text: "Congratulations, Mr. Kapoor! You meet all criteria for our pre-approved Loan Against Property offer. I am transferring your application to our Senior Loan Expert, who will call you shortly with your finalized interest rate and swift documentation. Thank you for choosing Home Credit!",
        state: { decision: "QUALIFIED_HANDOFF" }
      }
    ],
    finalDecision: "QUALIFIED_HANDOFF",
    keyInsight: "Demonstrates EVUA algorithm: skips already answered questions (Q1, Q2, Q4, Q6) without re-asking."
  },
  {
    id: 12,
    title: "Scenario 12: Busy Customer Gate (Callback Scheduling)",
    category: "Conversational Edge Case",
    statusBadge: "CALLBACK_SCHEDULED",
    badgeColor: "#f59e0b",
    customerName: "Ritu Sen",
    description: "Customer is busy in a meeting. Agent captures preferred callback time and terminates gracefully.",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello, good morning! May I please speak with Ms. Ritu Sen?",
        state: { customer_verified: true }
      },
      {
        time: "00:04",
        speaker: "customer",
        text: "Yes, this is Ritu.",
        state: { customer_verified: true }
      },
      {
        time: "00:06",
        speaker: "agent",
        text: "Great! Ritu, do you have a couple of minutes to speak right now, or did I catch you at a busy time?",
        state: { customer_busy: "CHECKING" }
      },
      {
        time: "00:11",
        speaker: "customer",
        text: "I'm actually in a client meeting right now, I cannot talk.",
        state: { customer_busy: true, trigger: "BUSY_GATE" }
      },
      {
        time: "00:15",
        speaker: "agent",
        text: "I completely understand, Ms. Sen. What would be a convenient time or day for us to give you a quick callback?",
        state: { callback_scheduling: true }
      },
      {
        time: "00:21",
        speaker: "customer",
        text: "Please call me tomorrow afternoon around 3 PM.",
        state: { callback_time_scheduled: "Tomorrow at 3:00 PM" }
      },
      {
        time: "00:25",
        speaker: "agent",
        text: "Noted, I have scheduled our call for tomorrow at 3 PM. Thank you for your time, Ms. Sen, and have a productive day ahead!",
        state: { decision: "CALLBACK_SCHEDULED" }
      }
    ],
    finalDecision: "CALLBACK_SCHEDULED",
    keyInsight: "Respects caller availability. Immediate polite exit with structured callback scheduling."
  },
  {
    id: 13,
    title: "Scenario 13: Customer Diversion - Interest Rate Inquiry",
    category: "Conversational Edge Case",
    statusBadge: "QUALIFIED_HANDOFF",
    badgeColor: "#10b981",
    customerName: "Pradeep Nair",
    description: "Customer demands exact interest rates. Agent defers to Senior Loan Expert, prevents hallucination, resumes flow.",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello Mr. Nair! We have verified your residential property, sole ownership, and original documents.",
        state: { property_type: "Residential (PASS)", ownership_status: "Sole (PASS)", documents_available: "Available (PASS)" }
      },
      {
        time: "00:08",
        speaker: "agent",
        text: "What is the approximate loan amount you are looking to secure?",
        state: { current_question: "loan_amount" }
      },
      {
        time: "00:13",
        speaker: "customer",
        text: "Wait before that, what interest rate are you offering? First tell me your interest rate.",
        state: { diversion_detected: "INTEREST_RATE_INQUIRY" }
      },
      {
        time: "00:19",
        speaker: "agent",
        text: "Our interest rates are tailored individually to your profile and property evaluation. Our Senior Loan Expert will share the exact interest rate and EMI options right after this quick preliminary check. To get you connected, what approximate loan amount are you looking for?",
        state: { diversion_handled: true, resumed_question: "loan_amount" }
      },
      {
        time: "00:30",
        speaker: "customer",
        text: "Okay, I understand. I am looking for around ₹35 lakhs.",
        state: { loan_amount: "₹35,00,000 (PASS)" }
      },
      {
        time: "00:34",
        speaker: "agent",
        text: "Could you share your occupation, and whether your income is received through bank or cash?",
        state: { current_question: "occupation_income" }
      },
      {
        time: "00:39",
        speaker: "customer",
        text: "I am salaried at a multinational firm with salary credited directly into my ICICI account.",
        state: { occupation: "Salaried (PASS)", income_mode: "Bank (PASS)" }
      },
      {
        time: "00:44",
        speaker: "agent",
        text: "And what is the approximate market value of your property, and preferred tenure between 3 to 15 years?",
        state: { current_question: "market_value_and_tenure" }
      },
      {
        time: "00:50",
        speaker: "customer",
        text: "Property is worth ₹75 lakhs, and I need a 5-year tenure.",
        state: { market_value: "₹75,00,000 (Captured)", tenure: "5 Years (PASS)" }
      },
      {
        time: "00:55",
        speaker: "agent",
        text: "Congratulations, Mr. Nair! You meet all preliminary criteria for our pre-approved Loan Against Property offer. I am transferring your application to our Senior Loan Expert, who will share your customized interest rate and sanction details shortly. Thank you for choosing Home Credit!",
        state: { decision: "QUALIFIED_HANDOFF" }
      }
    ],
    finalDecision: "QUALIFIED_HANDOFF",
    keyInsight: "Zero-hallucination defense: avoids quoting imaginary interest rates, defers to expert, and resumes checklist."
  },
  {
    id: 14,
    title: "Scenario 14: Speech Correction & Fillers Handling",
    category: "Conversational Edge Case",
    statusBadge: "QUALIFIED_HANDOFF",
    badgeColor: "#10b981",
    customerName: "Gaurav Khanna",
    description: "Customer uses conversational fillers ('umm... well') and mid-sentence correction ('10 years... actually 12').",
    dialogue: [
      {
        time: "00:01",
        speaker: "agent",
        text: "Hello Mr. Khanna! Reaching out regarding your pre-approved LAP offer.",
        state: { customer_verified: true, customer_busy: false }
      },
      {
        time: "00:06",
        speaker: "customer",
        text: "Yes, I have a commercial showroom, sole ownership, originals available, need ₹45 lakhs, salaried with bank credit, value is ₹1.1 crore.",
        state: {
          property_type: "Commercial (PASS)",
          ownership_status: "Sole (PASS)",
          documents_available: "Available (PASS)",
          loan_amount: "₹45,00,000 (PASS)",
          occupation: "Salaried (PASS)",
          income_mode: "Bank (PASS)",
          market_value: "₹1.10 Crore (Captured)"
        }
      },
      {
        time: "00:17",
        speaker: "agent",
        text: "Understood! And over what tenure would you like to repay the loan—how many years are you looking at?",
        state: { current_question: "tenure" }
      },
      {
        time: "00:23",
        speaker: "customer",
        text: "Umm... well, let's say 10 years... wait, actually make that 12 years so the monthly burden is lower.",
        state: { tenure: "12 Years (PASS - Latest statement overrides 10 yrs)" }
      },
      {
        time: "00:30",
        speaker: "agent",
        text: "Understood, Mr. Khanna, I have updated your tenure to 12 years. Congratulations! Based on all your details, you meet the criteria for our pre-approved Loan Against Property offer. I am transferring your profile to our Senior Loan Expert, who will call you shortly to discuss your custom rate and swift processing. Thank you for choosing Home Credit!",
        state: { decision: "QUALIFIED_HANDOFF" }
      }
    ],
    finalDecision: "QUALIFIED_HANDOFF",
    keyInsight: "Demonstrates natural speech parsing: filters acoustic fillers and applies the Latest Valid Assertion rule."
  }
];
