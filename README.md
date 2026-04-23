## ClauseCheck
Stop signing contracts you don't understand. ClauseCheck is a high-speed, AI-driven auditor that turns 50-page legal documents into an actionable insights instantly flagging predatory IP clauses, uncapped liabilities, and hidden risks so you can sign and approve with total confidence.

**Live Demo:** [clause-check-six.vercel.app](https://clause-check-six.vercel.app)

## Tech Stack
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### The Problem: 
Tech freelancers who are engineering students and small startups often face "Legal Paralysis"—signing NDAs and Service Agreements from their huge vendors without knowing if they are giving away their IP or accepting unfair liability.
### The Solution: 
ClauseCheck uses LLM-based Legal Engineering to audit documents instantly. It identifies "Red Flag" clauses, suggests industry-standard alternatives, a negotiation checklist recommendation to clarify with their clients and provides a "Legal Health Score" for the overall document.

## Key Features
* Instant Risk Scoring: A 0-100 "Health Score" based on document safety.

* Red-Flag Detection: Automatically flags dangerous clauses like IP theft or unlimited liability.

* Plain English Translation: Converts complex "Legalese" into simple, actionable English.

* Industry Benchmarking: Compares your contract against standard Y-Combinator and tech-industry norms.

* High-Speed Processing: Powered by Groq LPUs for sub-second inference.

## System Architecture
The project utilizes a decoupled, modern full-stack architecture:

* Frontend (Vercel): A React SPA using Vite for optimized builds and Framer Motion for a premium user experience.

* Backend (Render): A FastAPI server handling binary PDF streams and asynchronous API orchestration.

* AI Engine (Groq): Leverages the Llama-3.1-8B-Instant model. We chose Groq to achieve near-zero latency, ensuring the UI never feels "stuck" during analysis.

* Extraction Layer: Uses PyMuPDF (fitz) for robust text parsing from native and scanned PDF formats.

## Overview
| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite | UI/UX & State Management |
| **Backend** | FastAPI | API Logic & PDF Processing |
| **Inference** | Llama 3.1 (Groq) | LLM Hosting & Speed Optimization |
| **PDF Engine** | PyMuPDF | Text Extraction |
| **Deployement** | Vercel & Render | CI/CD & Production Hosting |

## Local setup
1. Clone the Repository ->
git clone https://github.com/nisshitha/ClauseCheck.git

cd ClauseCheck
3. Backend Setup (FastAPI) ->
* Navigate to the backend folder: cd backend
* Create a virtual environment: python -m venv .venv
* Activate the environment:
Windows: .venv\Scripts\activate
Mac/Linux: source .venv/bin/activate
* Install dependencies: pip install -r requirements.txt
* Configure Environment Variables:
Create a .env file in the backend/ directory and add your API key: GROQ_API_KEY=your_actual_groq_key_here
* Start the server: 
uvicorn main:app --reload
3. Frontend Setup (React + Vite) ->
* Open a new terminal and navigate to the frontend folder: cd contract-companion
* Install packages: npm install
* Configure the API Endpoint:
Ensure src/components/Uploader/UploadButton.tsx (or your config file) is pointing to the local backend:
const API_URL = "http://127.0.0.1:8000/api/audit";
* Start the development server: npm run dev
