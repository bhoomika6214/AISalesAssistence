#!/usr/bin/env python3
import os
import subprocess
import wave
import tempfile
import json

# Ensure destination directory exists
OUTPUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "public", "audio"))
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Define the dialogues for the scenarios to synthesize
# We select representative voices: Samantha/Tara for Agent (Female), Rishi/Aman/Alex for Customer (Male/Female)
AGENT_VOICE = "Samantha"
CUSTOMER_VOICE = "Rishi"

# Check if voices exist, fallback to default if needed
def get_safe_voices():
    try:
        res = subprocess.run(["say", "-v", "?"], stdout=subprocess.PIPE, text=True)
        installed = res.stdout
        agent = "Tara" if "Tara" in installed else ("Samantha" if "Samantha" in installed else "Victoria")
        cust = "Rishi" if "Rishi" in installed else ("Aman" if "Aman" in installed else "Alex")
        return agent, cust
    except Exception:
        return "Samantha", "Alex"

AGENT_VOICE, CUSTOMER_VOICE = get_safe_voices()
print(f"Using Agent voice: {AGENT_VOICE}, Customer voice: {CUSTOMER_VOICE}")

# Scenario scripts for audio synthesis
SCENARIOS = [
    {
        "id": 1,
        "name": "Scenario 1: Happy Path - Eligible Lead",
        "turns": [
            ("agent", "Hello, good morning! May I please speak with Mr. Rahul Sharma?"),
            ("customer", "Yes, this is Rahul speaking."),
            ("agent", "Great! Rahul, do you have a couple of minutes to speak right now, or did I catch you at a busy time?"),
            ("customer", "No, I'm free, go ahead."),
            ("agent", "Thank you! Because of your valued relationship with Home Credit, you have been pre-selected for an exclusive Loan Against Property offer of up to 75 lakhs with preferential terms. Shall we proceed with a quick eligibility check?"),
            ("customer", "Sure, sounds interesting. Let's do it."),
            ("agent", "Wonderful. Could you tell me what type of property you own—is it residential, commercial, or industrial?"),
            ("customer", "It's a residential apartment."),
            ("agent", "Got it. Is the property solely owned in your name, or is it jointly owned with a co-owner?"),
            ("customer", "It's in my name only, sole ownership."),
            ("agent", "Understood. Do you have the original title deed and property documents available for physical verification?"),
            ("customer", "Yes, all original papers are at home."),
            ("agent", "That's great. What is the approximate loan amount you are looking to secure?"),
            ("customer", "I need around 50 lakhs for business expansion."),
            ("agent", "Noted. Could you share your current occupation, and whether your primary income is received through bank transfer or in cash?"),
            ("customer", "I am salaried at an IT firm, and my salary comes directly into my bank account."),
            ("agent", "Perfect. What would be the approximate current market value of your residential apartment?"),
            ("customer", "Around 1.2 crore as per current market rates."),
            ("agent", "Understood. And over what tenure would you like to repay the loan—how many years are you looking at?"),
            ("customer", "I'd prefer a 10-year repayment period."),
            ("agent", "Congratulations, Mr. Sharma! Based on the preliminary details provided, you meet all the criteria for our pre-approved Loan Against Property offer. I am now transferring your application to our Senior Loan Expert, who will call you shortly to discuss your tailored interest rates, documentation pickup, and quick sanctioning. Thank you for choosing Home Credit, and have a wonderful day ahead!")
        ]
    },
    {
        "id": 2,
        "name": "Scenario 2: Disqualification - Agricultural Land",
        "turns": [
            ("agent", "Hello, good afternoon! May I please speak with Mr. Suresh Patel?"),
            ("customer", "Yes, Suresh speaking."),
            ("agent", "Great! Suresh, do you have a couple of minutes to speak right now?"),
            ("customer", "Yes, I have two minutes."),
            ("agent", "As a valued Home Credit customer, you've been pre-selected for our exclusive Loan Against Property offer of up to 75 lakhs. Shall we quickly check your eligibility?"),
            ("customer", "Yes, tell me."),
            ("agent", "Could you tell me what type of property you own—is it residential, commercial, or industrial?"),
            ("customer", "Actually, it's agricultural farm land near my village."),
            ("agent", "Thank you for sharing that, Mr. Patel. Currently, our Loan Against Property offer is only available for residential, commercial, or industrial properties, so we are unable to process agricultural land under this scheme. We truly appreciate your time, and we will update you as soon as new programs open up. Have a great day!")
        ]
    },
    {
        "id": 3,
        "name": "Scenario 3: Disqualification - Cash Income Mode",
        "turns": [
            ("agent", "Hello, good morning! May I speak with Mr. Rajesh Verma?"),
            ("customer", "Yes, Rajesh here. Go ahead."),
            ("agent", "You have been pre-selected for our exclusive Loan Against Property offer of up to 75 lakhs with Home Credit. Could you tell me what type of property you own?"),
            ("customer", "It is a commercial shop."),
            ("agent", "Is the commercial shop solely owned by you, or jointly owned?"),
            ("customer", "Sole ownership in my name."),
            ("agent", "Do you have the original property documents available for physical verification?"),
            ("customer", "Yes, original registry papers are available at my home."),
            ("agent", "What is the approximate loan amount you are looking to secure?"),
            ("customer", "I need around 25 lakhs."),
            ("agent", "Could you share your current occupation, and whether your primary income is received through bank transfer or in cash?"),
            ("customer", "I run this retail shop, self-employed. My customers pay in cash, so all my income is in cash."),
            ("agent", "Thank you for letting me know, Mr. Verma. As per our current credit guidelines, loan eligibility requires verifiable bank credit for income. Since your income is received in cash, we cannot process this particular facility at this time. We appreciate your time and wish you the best!")
        ]
    },
    {
        "id": 4,
        "name": "Scenario 4: Disqualification - Photocopies Only",
        "turns": [
            ("agent", "Hello, good afternoon! May I please speak with Mr. Anil Gupta?"),
            ("customer", "Yes, Anil speaking. What is this call about?"),
            ("agent", "You have been pre-selected for an exclusive Loan Against Property offer of up to 75 lakhs with Home Credit. What type of property do you own?"),
            ("customer", "It's an industrial plot and warehouse, solely owned."),
            ("agent", "Do you have the original title deeds and property documents available for physical verification?"),
            ("customer", "Actually no, the originals got misplaced during shifting. I only have notarized photocopies."),
            ("agent", "Understood, Mr. Gupta. For this pre-approved facility, physical verification of original property documents is a mandatory regulatory requirement. Since only photocopies are available, we won't be able to proceed right now. Thank you so much for your time, and have a good day!")
        ]
    },
    {
        "id": 5,
        "name": "Scenario 5: Tenure Boundary Failure - Less Than 3 Years",
        "turns": [
            ("agent", "Hello Mr. Vikram Mehra! We have recorded your residential apartment, sole ownership, original deeds, 40 lakhs loan, and salaried bank income."),
            ("customer", "Great, let's wrap this up quickly."),
            ("agent", "Over what tenure would you like to repay the loan—how many years are you looking at?"),
            ("customer", "I just need a short bridge loan for 1 or 2 years maximum."),
            ("agent", "Thank you for specifying that, Mr. Mehra. Our policy guidelines mandate a repayment tenure between 3 and 15 years. Since your preferred tenure is under the 3-year minimum threshold, we cannot proceed with this scheme today. Thank you for your time, and have a great day!")
        ]
    },
    {
        "id": 6,
        "name": "Scenario 6: Tenure Boundary Failure - Exceeds 15 Years",
        "turns": [
            ("agent", "Hello Mr. Joshi! We have verified your residential villa, joint ownership, original papers, 60 lakhs loan, and self-employed bank income."),
            ("customer", "Yes, everything is in order."),
            ("agent", "Over what repayment tenure between 3 to 15 years would you like to repay the loan?"),
            ("customer", "I want a long tenure like 20 or 25 years to keep my EMI low."),
            ("agent", "Thank you for sharing that, Mr. Joshi. Under this pre-approved program, the maximum allowable repayment tenure is 15 years. Since you require 20 years or more, we are unable to accommodate this tenure under the current scheme. We appreciate your time, and have a wonderful day!")
        ]
    },
    {
        "id": 7,
        "name": "Scenario 7: Loan Amount > 75L - Counter-Offer Accepted",
        "turns": [
            ("agent", "Hello Mr. Singhania! What is the approximate loan amount you are looking to secure on your residential property?"),
            ("customer", "I need around 90 lakhs for working capital."),
            ("agent", "The current pre-approved offer is available for up to 75 lakhs. Would you like to proceed with the maximum eligible amount of 75 lakhs for now?"),
            ("customer", "Yes, 75 lakhs will also work for me."),
            ("agent", "Perfect, I've noted 75 lakhs. Could you share your occupation, and whether your income is received through bank transfer or cash?"),
            ("customer", "I'm self-employed and all business turnover passes through our bank current account."),
            ("agent", "What is the approximate market value of your property, and preferred tenure between 3 to 15 years?"),
            ("customer", "Property is worth 2 crores, and I prefer a 10-year tenure."),
            ("agent", "Congratulations, Mr. Singhania! You meet all preliminary criteria for our pre-approved 75 lakh Loan Against Property offer. I am transferring your file to our Senior Loan Expert, who will call you shortly to finalize your exact interest rate and expedited sanctioning. Thank you for choosing Home Credit!")
        ]
    },
    {
        "id": 8,
        "name": "Scenario 8: Loan Amount > 75L - Counter-Offer Declined",
        "turns": [
            ("agent", "Hello Mr. Oberoi! What is the approximate loan amount you are looking to secure?"),
            ("customer", "I need at least 1.5 crore. Nothing less will do."),
            ("agent", "Under this special pre-approved offer, the maximum eligible loan amount is 75 lakhs. Would you like to proceed with the maximum amount of 75 lakhs for now?"),
            ("customer", "No, 75 lakhs is too low for my project, so I cannot proceed."),
            ("agent", "I completely understand your requirement, Mr. Oberoi. Since this specific offer is capped at 75 lakhs, we cannot accommodate a higher amount today. Thank you so much for speaking with us, and have a great day!")
        ]
    },
    {
        "id": 9,
        "name": "Scenario 9: Existing Mortgage Loan Transfer Flow",
        "turns": [
            ("agent", "Hello, good morning! May I speak with Mr. Amit Saxena?"),
            ("customer", "Yes, speaking. Go ahead."),
            ("agent", "As a valued Home Credit customer, you have been pre-selected for an exclusive Loan Against Property offer of up to 75 lakhs with preferential terms. Shall we check your eligibility?"),
            ("customer", "Actually, I already have an ongoing home loan on this property with another bank."),
            ("agent", "Thank you for letting me know, Mr. Saxena. Since you already have an existing loan on the property, this qualifies for our Balance Transfer facility. I am routing your request to our dedicated Loan Transfer Specialist, who will contact you shortly with our lowest balance transfer rates. Thank you, and have a wonderful day!")
        ]
    },
    {
        "id": 10,
        "name": "Scenario 10: EMI Reduction Intent Flow",
        "turns": [
            ("agent", "Hello, good afternoon! May I speak with Ms. Neha Kulkarni?"),
            ("customer", "Yes, this is Neha. What is this regarding?"),
            ("agent", "You have been pre-selected for our exclusive Loan Against Property offer of up to 75 lakhs with Home Credit. Shall we check your preliminary qualification?"),
            ("customer", "Can you help me reduce the high EMI on my current property loan? That is what I need right now."),
            ("agent", "Thank you for clarifying that, Ms. Kulkarni. Since you are looking to reduce your existing EMI, this is handled under our specialized Loan Transfer and EMI Reduction program. I am assigning your details to our Loan Transfer Specialist, who will reach out shortly to restructure your loan for lower payments. Thank you for your time, and have a great day!")
        ]
    },
    {
        "id": 11,
        "name": "Scenario 11: Out-of-Order Multi-Variable Utterance",
        "turns": [
            ("agent", "Hello Mr. Kapoor! Could you tell me what type of property you own—is it residential, commercial, or industrial?"),
            ("customer", "Look, it's my own residential independent house, valued at around 1.5 crore, and I am looking for a loan of 60 lakhs."),
            ("agent", "Thank you, Mr. Kapoor, I've noted those details! Do you have the original title deeds and property documents available for physical verification?"),
            ("customer", "Yes, all original papers are safely with me at home."),
            ("agent", "Great! Could you share your occupation, and whether your primary income is received through bank transfer or in cash?"),
            ("customer", "I run a consulting firm, self-employed, and all fees are received via bank NEFT."),
            ("agent", "And what repayment tenure between 3 and 15 years are you looking at?"),
            ("customer", "7 years."),
            ("agent", "Congratulations, Mr. Kapoor! You meet all criteria for our pre-approved Loan Against Property offer. I am transferring your application to our Senior Loan Expert, who will call you shortly with your finalized interest rate and swift documentation. Thank you for choosing Home Credit!")
        ]
    },
    {
        "id": 12,
        "name": "Scenario 12: Busy Customer Gate (Callback Scheduling)",
        "turns": [
            ("agent", "Hello, good morning! May I please speak with Ms. Ritu Sen?"),
            ("customer", "Yes, this is Ritu."),
            ("agent", "Great! Ritu, do you have a couple of minutes to speak right now, or did I catch you at a busy time?"),
            ("customer", "I'm actually in a client meeting right now, I cannot talk."),
            ("agent", "I completely understand, Ms. Sen. What would be a convenient time or day for us to give you a quick callback?"),
            ("customer", "Please call me tomorrow afternoon around 3 PM."),
            ("agent", "Noted, I have scheduled our call for tomorrow at 3 PM. Thank you for your time, Ms. Sen, and have a productive day ahead!")
        ]
    },
    {
        "id": 13,
        "name": "Scenario 13: Customer Diversion - Interest Rate Inquiry",
        "turns": [
            ("agent", "Hello Mr. Nair! We have verified your residential property, sole ownership, and original documents. What approximate loan amount are you looking for?"),
            ("customer", "Wait before that, what interest rate are you offering? First tell me your interest rate."),
            ("agent", "Our interest rates are tailored individually to your profile and property evaluation. Our Senior Loan Expert will share the exact interest rate and EMI options right after this quick preliminary check. To get you connected, what approximate loan amount are you looking for?"),
            ("customer", "Okay, I understand. I am looking for around 35 lakhs."),
            ("agent", "And could you share your occupation and income mode?"),
            ("customer", "Salaried at an MNC with salary credited to ICICI bank."),
            ("agent", "Property value and preferred tenure between 3 to 15 years?"),
            ("customer", "Value is 75 lakhs, tenure 5 years."),
            ("agent", "Congratulations, Mr. Nair! You meet all preliminary criteria for our pre-approved Loan Against Property offer. I am transferring your application to our Senior Loan Expert, who will share your customized interest rate and sanction details shortly. Thank you for choosing Home Credit!")
        ]
    },
    {
        "id": 14,
        "name": "Scenario 14: Speech Correction & Fillers Handling",
        "turns": [
            ("agent", "Hello Mr. Khanna! We have noted your commercial property, 45 lakhs loan, and salaried bank income. Over what tenure would you like to repay the loan?"),
            ("customer", "Umm... well, let's say 10 years... wait, actually make that 12 years so the monthly burden is lower."),
            ("agent", "Understood, Mr. Khanna, I have updated your tenure to 12 years. Congratulations! Based on all your details, you meet the criteria for our pre-approved Loan Against Property offer. I am transferring your profile to our Senior Loan Expert, who will call you shortly to discuss your custom rate and swift processing. Thank you for choosing Home Credit!")
        ]
    }
]

def synthesize_turn(speaker, text, voice, output_path):
    cmd = [
        "say",
        "-v", voice,
        "--data-format=LEI16@22050",
        "-o", output_path,
        text
    ]
    subprocess.run(cmd, check=True)

def concatenate_wavs(wav_files, output_file, silence_duration=0.5):
    silence_frames = int(22050 * silence_duration)
    silence_data = b'\x00' * (silence_frames * 2) # 16-bit mono

    with wave.open(output_file, 'wb') as outfile:
        outfile.setnchannels(1)
        outfile.setsampwidth(2)
        outfile.setframerate(22050)

        for i, wav_file in enumerate(wav_files):
            with wave.open(wav_file, 'rb') as infile:
                data = infile.readframes(infile.getnframes())
                outfile.writeframes(data)
            if i < len(wav_files) - 1:
                outfile.writeframes(silence_data)

def process_scenario(scenario):
    s_id = scenario["id"]
    print(f"Synthesizing Scenario {s_id}: {scenario['name']}...")
    
    with tempfile.TemporaryDirectory() as tmpdir:
        temp_wavs = []
        for idx, (speaker, text) in enumerate(scenario["turns"]):
            voice = AGENT_VOICE if speaker == "agent" else CUSTOMER_VOICE
            turn_path = os.path.join(tmpdir, f"turn_{idx}.wav")
            synthesize_turn(speaker, text, voice, turn_path)
            temp_wavs.append(turn_path)

        final_wav = os.path.join(OUTPUT_DIR, f"scenario_{s_id}.wav")
        concatenate_wavs(temp_wavs, final_wav)

        # Also convert to AAC m4a for web streaming efficiency
        final_m4a = os.path.join(OUTPUT_DIR, f"scenario_{s_id}.m4a")
        try:
            subprocess.run(["afconvert", "-f", "m4af", "-d", "aac", final_wav, final_m4a], check=True)
        except Exception as e:
            print(f"Warning: m4a conversion failed for {s_id}: {e}")

    print(f"✓ Generated: scenario_{s_id}.wav & scenario_{s_id}.m4a ({os.path.getsize(final_wav)} bytes)")

def main():
    print("==================================================")
    print("Generating Spoken Audio Test Scenarios (1 to 14)...")
    print("==================================================")
    for sc in SCENARIOS:
        process_scenario(sc)
    print("\nAll 14 test scenario audio files generated successfully!")

if __name__ == "__main__":
    main()
