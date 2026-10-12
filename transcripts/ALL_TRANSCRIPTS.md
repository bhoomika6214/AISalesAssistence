# Complete Test Transcripts Suite (14 Scenarios)
## Home Credit Loan Against Property (LAP) AI Voice Agent

This document contains full turn-by-turn spoken dialogue transcripts, internal state transitions, and evaluation outcomes for all 14 comprehensive test scenarios.

---

### Scenario 1: Happy Path - Fully Eligible Customer
- **Customer Name**: Rahul Sharma
- **Agent Name**: Priya (Female)
- **Goal**: Full 7-variable completion, all criteria pass, successful handoff.
- **Decision Gate**: `QUALIFIED_HANDOFF`

```text
[00:01] AGENT: "Hello, good morning! May I please speak with Mr. Rahul Sharma?"
[00:04] CUSTOMER: "Yes, this is Rahul speaking."
         -> State Update: customer_verified = true

[00:07] AGENT: "Great! Rahul, do you have a couple of minutes to speak right now, or did I catch you at a busy time?"
[00:11] CUSTOMER: "No, I'm free, go ahead."
         -> State Update: customer_busy = false

[00:13] AGENT: "Thank you! Because of your valued relationship with Home Credit, you have been pre-selected for an exclusive Loan Against Property offer of up to ₹75 lakhs with preferential terms. I just need to verify a few quick details to see if this offer fits your current requirements. Shall we proceed?"
[00:20] CUSTOMER: "Sure, sounds interesting. Let's do it."

[00:22] AGENT: "Wonderful. Could you tell me what type of property you own—is it residential, commercial, or industrial?"
[00:27] CUSTOMER: "It's a residential apartment."
         -> State Update: property_type = "Residential" [PASS]
         -> Next missing question: ownership_status (Q2)

[00:30] AGENT: "Got it. Is the property solely owned in your name, or is it jointly owned with a co-owner?"
[00:34] CUSTOMER: "It's in my name only, sole ownership."
         -> State Update: ownership_status = "Sole" [PASS]
         -> Next missing question: documents_available (Q3)

[00:37] AGENT: "Understood. Do you have the original title deed and property documents available for physical verification?"
[00:42] CUSTOMER: "Yes, all original papers are at home."
         -> State Update: documents_available = true [PASS]
         -> Next missing question: loan_amount (Q4)

[00:45] AGENT: "That's great. What is the approximate loan amount you are looking to secure?"
[00:48] CUSTOMER: "I need around ₹50 lakhs for business expansion."
         -> State Update: loan_amount = 5000000 [PASS - <= 75L]
         -> Next missing question: occupation + income_mode (Q5)

[00:52] AGENT: "Noted. Could you share your current occupation, and whether your primary income is received through bank transfer or in cash?"
[00:58] CUSTOMER: "I am salaried, working at an IT company, and my salary comes directly into my bank account."
         -> State Update: occupation = "Salaried", income_mode = "Bank" [PASS]
         -> Next missing question: market_value (Q6)

[01:03] AGENT: "Perfect. What would be the approximate current market value of your residential apartment?"
[01:07] CUSTOMER: "Around ₹1.2 crore as per current market rates."
         -> State Update: market_value = 12000000 [PASS - Captured]
         -> Next missing question: tenure (Q7)

[01:11] AGENT: "Understood. And over what tenure would you like to repay the loan—how many years are you looking at?"
[01:15] CUSTOMER: "I'd prefer a 10-year repayment period."
         -> State Update: tenure = 10 [PASS - 3 to 15 years]
         -> All 7 criteria answered & validated!

[01:19] AGENT: "Congratulations, Mr. Sharma! Based on the preliminary details provided, you meet all the criteria for our pre-approved Loan Against Property offer. I am now transferring your application to our Senior Loan Expert, who will call you shortly to discuss your tailored interest rates, documentation pickup, and quick sanctioning. Thank you for choosing Home Credit, and have a wonderful day ahead!"
[01:31] [CALL CONCLUDED - QUALIFIED LEAD HANDOFF]
```

---

### Scenario 2: Immediate Disqualification - Agricultural Property
- **Customer Name**: Suresh Patel
- **Agent Name**: Priya (Female)
- **Goal**: Detect agricultural property on Q1, stop immediately, polite exit.
- **Decision Gate**: `DISQUALIFIED`

```text
[00:01] AGENT: "Hello, good afternoon! May I please speak with Mr. Suresh Patel?"
[00:04] CUSTOMER: "Yes, Suresh speaking."
[00:06] AGENT: "Great! Suresh, do you have a couple of minutes to speak right now, or did I catch you at a busy time?"
[00:10] CUSTOMER: "Yes, I have two minutes."
[00:12] AGENT: "Thank you! As a valued Home Credit customer, you've been pre-selected for our exclusive Loan Against Property offer of up to ₹75 lakhs. Shall we quickly check your eligibility?"
[00:18] CUSTOMER: "Yes, tell me."
[00:20] AGENT: "Could you tell me what type of property you own—is it residential, commercial, or industrial?"
[00:25] CUSTOMER: "Actually, it's agricultural farm land near my village."
         -> State Update: property_type = "Agricultural" [FAIL]
         -> Trigger: Immediate Disqualification Protocol (Rule 6.1)

[00:28] AGENT: "Thank you for sharing that, Mr. Patel. Currently, our Loan Against Property offer is only available for residential, commercial, or industrial properties, so we are unable to process agricultural land under this scheme. We truly appreciate your time, and we will update you as soon as new programs open up. Have a great day!"
[00:40] [CALL CONCLUDED - IMMEDIATE DISQUALIFICATION]
```

---

### Scenario 3: Immediate Disqualification - Cash Income Mode
- **Customer Name**: Rajesh Verma
- **Agent Name**: Priya (Female)
- **Goal**: Self-employed customer with cash income -> disqualify on Q5.
- **Decision Gate**: `DISQUALIFIED`

```text
[00:01] AGENT: "Hello, good morning! May I please speak with Mr. Rajesh Verma?"
[00:04] CUSTOMER: "Speaking."
[00:06] AGENT: "Great! Rajesh, do you have a couple of minutes to speak right now?"
[00:09] CUSTOMER: "Yes, go ahead."
[00:11] AGENT: "You have been pre-selected for our exclusive Loan Against Property offer of up to ₹75 lakhs with Home Credit. Shall we review a few quick details?"
[00:17] CUSTOMER: "Sure."
[00:19] AGENT: "Could you tell me what type of property you own—is it residential, commercial, or industrial?"
[00:24] CUSTOMER: "It is a commercial shop."
         -> property_type = "Commercial" [PASS]
[00:27] AGENT: "Is the commercial shop solely owned by you, or jointly owned?"
[00:30] CUSTOMER: "Sole ownership in my name."
         -> ownership_status = "Sole" [PASS]
[00:32] AGENT: "Do you have the original property documents available for physical verification?"
[00:35] CUSTOMER: "Yes, original registry papers are available."
         -> documents_available = true [PASS]
[00:37] AGENT: "What is the approximate loan amount you are looking to secure?"
[00:40] CUSTOMER: "I need around ₹25 lakhs."
         -> loan_amount = 2500000 [PASS]
[00:43] AGENT: "Noted. Could you share your current occupation, and whether your primary income is received through bank transfer or in cash?"
[00:50] CUSTOMER: "I run this retail shop, self-employed. My customers pay in cash, so all my income is in cash."
         -> occupation = "Self-Employed", income_mode = "Cash" [FAIL]
         -> Trigger: Immediate Disqualification Protocol (Rule 6.1)

[00:54] AGENT: "Thank you for letting me know, Mr. Verma. As per our current credit guidelines, loan eligibility requires verifiable bank credit for income. Since your income is received in cash, we cannot process this particular facility at this time. We appreciate your time and wish you the best!"
[01:05] [CALL CONCLUDED - IMMEDIATE DISQUALIFICATION]
```

---

### Scenario 4: Immediate Disqualification - Photocopies Only
- **Customer Name**: Anil Gupta
- **Agent Name**: Priya (Female)
- **Goal**: Customer only has photocopies of property papers -> disqualify on Q3.
- **Decision Gate**: `DISQUALIFIED`

```text
[00:01] AGENT: "Hello, good afternoon! May I please speak with Mr. Anil Gupta?"
[00:04] CUSTOMER: "Yes, Anil speaking."
[00:06] AGENT: "Anil, do you have two minutes to speak right now?"
[00:09] CUSTOMER: "Yes, I can talk."
[00:11] AGENT: "You have been pre-selected for an exclusive Loan Against Property offer of up to ₹75 lakhs with Home Credit. Shall we proceed with a quick eligibility check?"
[00:18] CUSTOMER: "Yes, let's do it."
[00:20] AGENT: "Could you tell me what type of property you own—is it residential, commercial, or industrial?"
[00:25] CUSTOMER: "It's an industrial plot and warehouse."
         -> property_type = "Industrial" [PASS]
[00:28] AGENT: "Is the property solely owned in your name, or jointly owned?"
[00:31] CUSTOMER: "Solely owned by me."
         -> ownership_status = "Sole" [PASS]
[00:33] AGENT: "Do you have the original title deeds and property documents available for physical verification?"
[00:38] CUSTOMER: "Actually no, the originals got lost during shifting. I only have photocopies."
         -> documents_available = false [FAIL - Photocopy only]
         -> Trigger: Immediate Disqualification Protocol (Rule 6.1)

[00:42] AGENT: "Understood, Mr. Gupta. For this pre-approved facility, physical verification of original property documents is a mandatory regulatory requirement. Since only photocopies are available, we won't be able to proceed right now. Thank you so much for your time, and have a good day!"
[00:55] [CALL CONCLUDED - IMMEDIATE DISQUALIFICATION]
```

---

### Scenario 5: Tenure Boundary Failure - Less Than 3 Years
- **Customer Name**: Vikram Mehra
- **Agent Name**: Priya (Female)
- **Goal**: Customer demands 1-2 year tenure -> outside 3-15 years boundary -> disqualify on Q7.
- **Decision Gate**: `DISQUALIFIED`

```text
[00:01] AGENT: "Hello, good morning! May I speak with Mr. Vikram Mehra?"
[00:03] CUSTOMER: "Yes, Vikram here."
[00:05] AGENT: [Verifies time, presents LAP offer, verifies Q1-Q6 successfully: Residential, Sole, Originals, 40L, Salaried/Bank, 80L Value]
[00:45] AGENT: "And over what tenure would you like to repay the loan—how many years are you looking at?"
[00:50] CUSTOMER: "I just need a short bridge loan for 1 or 2 years maximum."
         -> tenure = 2 years [FAIL - Permissible range is 3 to 15 years]
         -> Trigger: Immediate Disqualification Protocol (Rule 6.1)

[00:54] AGENT: "Thank you for specifying that, Mr. Mehra. Our policy guidelines mandate a repayment tenure between 3 and 15 years. Since your preferred tenure is under the 3-year minimum threshold, we cannot proceed with this scheme today. Thank you for your time, and have a great day!"
[01:06] [CALL CONCLUDED - IMMEDIATE DISQUALIFICATION]
```

---

### Scenario 6: Tenure Boundary Failure - Exceeds 15 Years
- **Customer Name**: Deepak Joshi
- **Agent Name**: Priya (Female)
- **Goal**: Customer insists on 20-25 years -> outside 3-15 years boundary -> disqualify on Q7.
- **Decision Gate**: `DISQUALIFIED`

```text
[00:01] AGENT: [Verifies customer, presents LAP offer, passes Q1-Q6: Residential, Joint, Originals, 60L, Self-employed/Bank, 1.5Cr Value]
[00:45] AGENT: "And over what tenure would you like to repay the loan—how many years are you looking at?"
[00:49] CUSTOMER: "I want a long tenure like 20 or 25 years to keep my EMI very low."
         -> tenure = 20 years [FAIL - Permissible range is 3 to 15 years]
         -> Trigger: Immediate Disqualification Protocol (Rule 6.1)

[00:53] AGENT: "Thank you for sharing that, Mr. Joshi. Under this pre-approved program, the maximum allowable repayment tenure is 15 years. Since you require 20 years or more, we are unable to accommodate this tenure under the current scheme. We appreciate your time, and have a wonderful day!"
[01:06] [CALL CONCLUDED - IMMEDIATE DISQUALIFICATION]
```

---

### Scenario 7: Loan Amount > ₹75 Lakh - Counter-Offer Accepted
- **Customer Name**: Sanjay Singhania
- **Agent Name**: Priya (Female)
- **Goal**: Customer asks for ₹90L, agent counters with ₹75L cap, customer accepts, continues flow.
- **Decision Gate**: `QUALIFIED_HANDOFF`

```text
[00:01] AGENT: [Verifies identity, confirms Q1 Residential, Q2 Joint, Q3 Originals Available]
[00:30] AGENT: "What is the approximate loan amount you are looking to secure?"
[00:34] CUSTOMER: "I need around ₹90 lakhs for my factory setup."
         -> loan_amount = 9000000 [EXCEEDS 75L CAP]
         -> Trigger: Counter-Offer Protocol (Rule 6.2)

[00:37] AGENT: "The current pre-approved offer is available for up to ₹75 lakhs. Would you like to proceed with the maximum eligible amount of ₹75 lakhs for now?"
[00:44] CUSTOMER: "Yes, ₹75 lakhs will also work for me."
         -> State Update: loan_amount = 7500000 [PASS - Counter accepted]
         -> Next missing question: Q5 (Occupation + Income Mode)

[00:47] AGENT: "Perfect, I've noted ₹75 lakhs as your desired amount. Could you share your current occupation, and whether your income is received through bank transfer or cash?"
[00:54] CUSTOMER: "I'm self-employed and all business income comes via bank current account."
         -> occupation = "Self-Employed", income_mode = "Bank" [PASS]

[00:58] AGENT: "What is the approximate market value of your property?"
[01:01] CUSTOMER: "It's worth about ₹2 crores."
         -> market_value = 20000000 [PASS]

[01:04] AGENT: "And what repayment tenure between 3 to 15 years would you prefer?"
[01:08] CUSTOMER: "10 years."
         -> tenure = 10 [PASS]

[01:10] AGENT: "Congratulations, Mr. Singhania! You meet all preliminary criteria for our pre-approved ₹75 lakh Loan Against Property offer. I am transferring your file to our Senior Loan Expert, who will call you shortly to finalize your exact interest rate and expedited sanctioning. Thank you for choosing Home Credit!"
[01:25] [CALL CONCLUDED - QUALIFIED LEAD HANDOFF]
```

---

### Scenario 8: Loan Amount > ₹75 Lakh - Counter-Offer Rejected
- **Customer Name**: Karan Oberoi
- **Agent Name**: Priya (Female)
- **Goal**: Customer asks for ₹1.5 Cr, agent counters with ₹75L, customer declines -> polite exit.
- **Decision Gate**: `DISQUALIFIED`

```text
[00:01] AGENT: [Verifies identity, confirms Q1 Commercial, Q2 Sole, Q3 Originals Available]
[00:30] AGENT: "What is the approximate loan amount you are looking to secure?"
[00:33] CUSTOMER: "I need at least ₹1.5 crore. Nothing less will do."
         -> loan_amount = 15000000 [EXCEEDS 75L]
         -> Trigger: Counter-Offer Protocol (Rule 6.2)

[00:37] AGENT: "Under this special pre-approved offer, the maximum eligible loan amount is ₹75 lakhs. Would you like to proceed with the maximum amount of ₹75 lakhs for now?"
[00:44] CUSTOMER: "No, ₹75 lakhs is too low for my project, so I cannot proceed."
         -> State Update: Counter rejected [FAIL]

[00:48] AGENT: "I completely understand your requirement, Mr. Oberoi. Since this specific offer is capped at ₹75 lakhs, we cannot accommodate a higher amount today. Thank you so much for speaking with us, and have a great day!"
[01:00] [CALL CONCLUDED - POLITE TERMINATION]
```

---

### Scenario 9: Existing Mortgage Transfer Flow
- **Customer Name**: Amit Saxena
- **Agent Name**: Priya (Female)
- **Goal**: Customer states they already have a loan on this property -> route to transfer specialist, skip Q1-7.
- **Decision Gate**: `TRANSFER_SPECIALIST`

```text
[00:01] AGENT: "Hello, good morning! May I speak with Mr. Amit Saxena?"
[00:04] CUSTOMER: "Yes, speaking."
[00:06] AGENT: "Amit, do you have two minutes to speak right now?"
[00:09] CUSTOMER: "Sure, tell me."
[00:11] AGENT: "As a valued Home Credit customer, you have been pre-selected for an exclusive Loan Against Property offer of up to ₹75 lakhs with preferential terms. Shall we check your eligibility?"
[00:20] CUSTOMER: "Actually, I already have an ongoing home loan on this property with another bank."
         -> State Update: existing_property_loan = true
         -> Trigger: Balance Transfer Detection (Stage 4)
         -> Action: DO NOT ask Questions 1 through 7!

[00:26] AGENT: "Thank you for letting me know, Mr. Saxena. Since you already have an existing loan on the property, this qualifies for our Balance Transfer facility. I am routing your request to our dedicated Loan Transfer Specialist, who will contact you shortly with our lowest balance transfer rates. Thank you, and have a wonderful day!"
[00:42] [CALL CONCLUDED - ROUTED TO TRANSFER SPECIALIST]
```

---

### Scenario 10: EMI Reduction Intent Flow
- **Customer Name**: Neha Kulkarni
- **Agent Name**: Priya (Female)
- **Goal**: Customer wants to lower existing EMI -> route to transfer specialist, skip Q1-7.
- **Decision Gate**: `TRANSFER_SPECIALIST`

```text
[00:01] AGENT: "Hello, good afternoon! May I speak with Ms. Neha Kulkarni?"
[00:04] CUSTOMER: "Yes, this is Neha."
[00:06] AGENT: "Neha, do you have a couple of minutes to speak right now?"
[00:09] CUSTOMER: "Yes, what is this regarding?"
[00:11] AGENT: "You have been pre-selected for our exclusive Loan Against Property offer of up to ₹75 lakhs with Home Credit. Shall we check your preliminary qualification?"
[00:18] CUSTOMER: "Can you help me reduce the high EMI on my current property loan? That is what I need."
         -> State Update: emi_reduction_intent = true
         -> Trigger: Balance Transfer Detection (Stage 4)
         -> Action: Bypass Questions 1 through 7!

[00:24] AGENT: "Thank you for clarifying that, Ms. Kulkarni. Since you are looking to reduce your existing EMI, this is handled under our specialized Loan Transfer and EMI Reduction program. I am assigning your details to our Loan Transfer Specialist, who will reach out shortly to restructure your loan for lower payments. Thank you for your time, and have a great day!"
[00:40] [CALL CONCLUDED - ROUTED TO TRANSFER SPECIALIST]
```

---

### Scenario 11: Out-of-Order Multi-Variable Utterance
- **Customer Name**: Manish Kapoor
- **Agent Name**: Priya (Female)
- **Goal**: Customer provides property type, ownership, value, and loan amount in one turn. Agent extracts all 4, does NOT re-ask, asks Q3 (Documents).
- **Decision Gate**: `QUALIFIED_HANDOFF`

```text
[00:01] AGENT: "Hello, good morning! May I speak with Mr. Manish Kapoor?"
[00:04] CUSTOMER: "Yes, Manish speaking."
[00:06] AGENT: [Verifies busy status, presents LAP offer]
[00:18] AGENT: "Could you tell me what type of property you own—is it residential, commercial, or industrial?"
[00:23] CUSTOMER: "Look, it's my own residential independent house, valued at around ₹1.5 crore, and I am looking for a loan of ₹60 lakhs."
         -> EVUA Parser Action:
            - property_type = "Residential" [PASS]
            - ownership_status = "Sole" ("my own") [PASS]
            - market_value = 15000000 [PASS]
            - loan_amount = 6000000 [PASS]
         -> Missing items: Q3 (Documents), Q5 (Occupation/Income), Q7 (Tenure)
         -> Earliest missing index: Q3 (documents_available)
         -> RULE: DO NOT re-ask property type, ownership, market value, or loan amount!

[00:30] AGENT: "Thank you, Mr. Kapoor, I've noted those details! Do you have the original title deeds and property documents available for physical verification?"
[00:37] CUSTOMER: "Yes, all original papers are safely with me at home."
         -> documents_available = true [PASS]
         -> Earliest missing index: Q5 (Occupation + Income Mode)

[00:40] AGENT: "Great! Could you share your occupation, and whether your primary income is received through bank transfer or in cash?"
[00:46] CUSTOMER: "I run a consulting firm, self-employed, and all fees are received via bank NEFT."
         -> occupation = "Self-Employed", income_mode = "Bank" [PASS]
         -> Earliest missing index: Q7 (Tenure)

[00:50] AGENT: "And what repayment tenure between 3 and 15 years are you looking at?"
[00:54] CUSTOMER: "7 years."
         -> tenure = 7 [PASS]
         -> All 7 criteria validated!

[00:56] AGENT: "Congratulations, Mr. Kapoor! You meet all criteria for our pre-approved Loan Against Property offer. I am transferring your application to our Senior Loan Expert, who will call you shortly with your finalized interest rate and swift documentation. Thank you for choosing Home Credit!"
[01:10] [CALL CONCLUDED - QUALIFIED LEAD HANDOFF]
```

---

### Scenario 12: Busy Customer Gate (Callback Scheduling)
- **Customer Name**: Ritu Sen
- **Agent Name**: Priya (Female)
- **Goal**: Customer is in a meeting; agent politely captures preferred callback time and terminates cleanly.
- **Decision Gate**: `CALLBACK_SCHEDULED`

```text
[00:01] AGENT: "Hello, good morning! May I please speak with Ms. Ritu Sen?"
[00:04] CUSTOMER: "Yes, this is Ritu."
[00:06] AGENT: "Great! Ritu, do you have a couple of minutes to speak right now, or did I catch you at a busy time?"
[00:11] CUSTOMER: "I'm actually in a client meeting right now, I cannot talk."
         -> State Update: customer_busy = true
         -> Trigger: Busy Customer Gate (Stage 2)
         -> Action: Do not pitch LAP offer. Request preferred callback time.

[00:14] AGENT: "I completely understand, Ms. Sen. What would be a convenient time or day for us to give you a quick callback?"
[00:20] CUSTOMER: "Please call me tomorrow afternoon around 3 PM."
         -> State Update: callback_time_scheduled = "Tomorrow 3:00 PM"

[00:23] AGENT: "Noted, I have scheduled our call for tomorrow at 3 PM. Thank you for your time, Ms. Sen, and have a productive day ahead!"
[00:32] [CALL CONCLUDED - CALLBACK SCHEDULED]
```

---

### Scenario 13: Customer Diversion - Interest Rate Inquiry
- **Customer Name**: Pradeep Nair
- **Agent Name**: Priya (Female)
- **Goal**: Customer asks for interest rates during qualification; agent defers to Senior Loan Expert without hallucinating, then resumes checklist.
- **Decision Gate**: `QUALIFIED_HANDOFF`

```text
[00:01] AGENT: [Verifies customer, presents LAP offer, verifies Q1 Residential, Q2 Sole, Q3 Originals Available]
[00:28] AGENT: "What is the approximate loan amount you are looking to secure?"
[00:32] CUSTOMER: "Wait before that, what interest rate are you offering? First tell me your interest rate."
         -> Diversion Trigger: Interest rate inquiry
         -> Rule: DO NOT invent/hallucinate interest rates!
         -> Action: Explain personalized rates set by Senior Loan Expert, return to Q4.

[00:37] AGENT: "Our interest rates are tailored individually to your profile and property evaluation. Our Senior Loan Expert will share the exact interest rate and EMI options right after this quick preliminary check. To get you connected, what approximate loan amount are you looking for?"
[00:49] CUSTOMER: "Okay, I understand. I am looking for around ₹35 lakhs."
         -> loan_amount = 3500000 [PASS]
         -> Resumes checklist smoothly through Q5, Q6, Q7!

[01:15] AGENT: [Completes remaining questions successfully and executes Senior Loan Expert handoff]
[01:25] [CALL CONCLUDED - QUALIFIED LEAD HANDOFF]
```

---

### Scenario 14: Speech Correction & Fillers Handling
- **Customer Name**: Gaurav Khanna
- **Agent Name**: Priya (Female)
- **Goal**: Natural speech with fillers ("umm... uh") and mid-sentence corrections ("10 years... actually 12"). Agent updates state with the latest valid assertion.
- **Decision Gate**: `QUALIFIED_HANDOFF`

```text
[00:01] AGENT: [Verifies customer, passes Q1-Q6: Commercial, Sole, Originals, 45L, Salaried/Bank, 1.1Cr]
[00:40] AGENT: "And over what tenure would you like to repay the loan—how many years are you looking at?"
[00:44] CUSTOMER: "Umm... well, let's say 10 years... wait, actually make that 12 years so the monthly burden is lower."
         -> EVUA Parser Action:
            - Strips fillers ("Umm", "well")
            - Detects temporal correction: "10 years" overridden by "12 years"
            - Validates: 12 is within [3, 15] [PASS]
            - State Update: tenure = 12

[00:51] AGENT: "Understood, Mr. Khanna, I have updated your tenure to 12 years. Congratulations! Based on all your details, you meet the criteria for our pre-approved Loan Against Property offer. I am transferring your profile to our Senior Loan Expert, who will call you shortly to discuss your custom rate and swift processing. Thank you for choosing Home Credit!"
[01:12] [CALL CONCLUDED - QUALIFIED LEAD HANDOFF]
```
