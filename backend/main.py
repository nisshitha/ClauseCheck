import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

# Remove the dots (.) before pdf and ai_engine
from pdf import extract_text_from_pdf, highlight_and_encode_pdf
from ai_engine import audit_contract_with_ai

app = FastAPI(title="ClauseCheck API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "alive", "service": "ClauseCheck"}

@app.post("/api/audit")
async def audit_document(file: UploadFile = File(...)):
    # 1. Read the PDF
    pdf_bytes = await file.read()
    
    # 2. Extract Text
    contract_text = extract_text_from_pdf(pdf_bytes)
    
    # 3. Get AI Analysis
    ai_results = audit_contract_with_ai(contract_text)
    
    # 4. Highlight the original PDF
    highlighted_pdf_base64 = highlight_and_encode_pdf(pdf_bytes, ai_results)
    
    return {
        "status": "success",
        "data": ai_results,
        "download_url": highlighted_pdf_base64
    }