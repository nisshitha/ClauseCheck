import os
import json
from groq import Groq


def audit_contract_with_ai(contract_text: str) -> dict:
    """Sends text to Groq and returns a structured JSON audit."""

    # ✅ Get API key
    api_key = os.environ.get("GROQ_API_KEY")

    if not api_key:
        return {"error": "API key not found"}

    # ✅ Initialize client INSIDE function
    client = Groq(api_key=api_key)

    system_prompt = """
    You are an expert tech-industry contract lawyer. Analyze the provided contract text.
    First, determine if it is primarily an "NDA" or a "Service Agreement".
    
    You MUST output valid JSON strictly matching this schema:
    {
      "document_type": "NDA" or "Service Agreement",
      "risk_score": <int 0-100>,
      "overall_summary": "Summary text",
      "negotiation_checklist": ["item 1", "item 2"],
      "clauses": [
        {
          "title": "Short Title",
          "risk_level": "Red", "Yellow", or "Green",
          "original_legalese": "Exact text",
          "ai_translation": "Plain English",
          "industry_standard": "Ideal version"
        }
      ]
    }
    """

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Analyze this contract:\n\n{contract_text}"}
            ],
            temperature=0.1,
            response_format={"type": "json_object"}
        )

        return json.loads(response.choices[0].message.content)

    except Exception as e:
        print(f"AI Engine Error: {e}")
        return {"error": str(e)}