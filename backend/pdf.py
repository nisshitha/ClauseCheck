import fitz  # PyMuPDF
import base64

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    """Reads the raw text out of the PDF."""
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def highlight_and_encode_pdf(pdf_bytes: bytes, ai_results: dict) -> str:
    """Highlights dangerous clauses and returns a Base64 string."""
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    
    colors = {
        "Red": (1.0, 0.5, 0.5),
        "Yellow": (1.0, 1.0, 0.5),
        "Green": (0.5, 1.0, 0.5)
    }
    
    clauses = ai_results.get("clauses", [])
    
    for page in doc:
        for item in clauses:
            target_text = item.get("original_legalese", "")
            risk_level = item.get("risk_level", "Yellow")
            
            if target_text and len(target_text) > 10: # Avoid highlighting tiny fragments
                text_instances = page.search_for(target_text)
                for inst in text_instances:
                    highlight = page.add_highlight_annot(inst)
                    highlight.set_colors(stroke=colors.get(risk_level, colors["Yellow"]))
                    highlight.update()
                    
    pdf_base64 = base64.b64encode(doc.write()).decode('utf-8')
    return f"data:application/pdf;base64,{pdf_base64}"