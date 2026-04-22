import os
import json
from groq import Groq
from dotenv import load_dotenv

# Load the API key from your .env file
load_dotenv()

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def audit_contract_with_ai(contract_text: str) -> dict:
    """Sends text to Groq and returns a highly structured JSON audit."""
    
    system_prompt = """
    You are an expert tech-industry contract lawyer. Analyze the provided contract text.
    First, determine if it is primarily an "NDA" or a "Service Agreement".
    
    You MUST output valid JSON strictly matching this schema:
    {
      "document_type": "NDA" or "Service Agreement",
      "risk_score": <int 0-100, where 100 is perfectly safe and 0 is extremely dangerous>,
      "overall_summary": "A 2-sentence plain English summary of the contract.",
      "negotiation_checklist": [
        "Actionable item 1 (e.g., Change payment to Net-30)",
        "Actionable item 2"
      ],
      "clauses": [
        {
          "title": "Short Title",
          "risk_level": "Red", "Yellow", or "Green",
          "original_legalese": "Exact text from document",
          "ai_translation": "Plain English translation",
          "industry_standard": "How this clause SHOULD look ideally (Leave empty for Green flags)"
        }
      ]
    }
    
    Rules:
    - NDAs should NOT transfer IP. If they do, it's a Red flag.
    - Service Agreements should cap liability and have Net-30 payment terms.
    - Extract at least 3 distinct clauses (mix of Red, Yellow, Green if present).
    """
    
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant", 
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Analyze this contract:\n\n{contract_text}"}
            ],
            temperature=0.1,
            response_format={"type": "json_object"} # FORCES perfect JSON output
        )
        
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"AI Engine Error: {e}")
        return {"error": "Failed to analyze document"}