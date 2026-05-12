from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from tavily import TavilyClient
from dotenv import load_dotenv

import google.generativeai as genai
import traceback
import os

# =========================
# LOAD ENV
# =========================

load_dotenv()

# =========================
# FASTAPI APP
# =========================

app = FastAPI(
    title="MAAAD BRAINS Backend",
    version="2.0"
)

# =========================
# CORS
# =========================

origins = [
    "https://maaad-brains.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# API KEYS
# =========================

TAVILY_API_KEY = os.getenv("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")
GEMINI_API_KEY = os.getenv("AIzaSyBtiHpbQs7E-tmrUfrwZsoVsTHbHVqpkoE")

# =========================
# TAVILY SETUP
# =========================

tavily = TavilyClient(
    api_key=TAVILY_API_KEY
)

# =========================
# GEMINI SETUP
# =========================

genai.configure(
    api_key=GEMINI_API_KEY
)

# UPDATED GEMINI MODEL
model = genai.GenerativeModel(
    "gemini-1.5-flash"
)

# =========================
# REQUEST MODELS
# =========================

class FollowUpRequest(BaseModel):
    question: str
    summary: str

# =========================
# HOME
# =========================

@app.get("/")
async def home():
    return {
        "message": "MAAAD BRAINS Backend Running",
        "status": "success"
    }

# =========================
# HEALTH CHECK
# =========================

@app.get("/health")
async def health():
    return {
        "status": "healthy"
    }

# =========================
# GEMINI TEST
# =========================

@app.get("/gemini-test")
async def gemini_test():

    try:

        response = model.generate_content(
            "Say hello from MAAAD BRAINS AI"
        )

        return {
            "response": response.text
        }

    except Exception as e:

        print("\nGEMINI TEST ERROR:")
        traceback.print_exc()

        return JSONResponse(
            status_code=500,
            content={
                "error": str(e)
            }
        )

# =========================
# SEARCH ROUTE
# =========================

@app.get("/search")
async def search(query: str):

    try:

        tavily_response = tavily.search(
            query=query,
            search_depth="advanced",
            max_results=5
        )

        formatted_results = []
        combined_content = ""

        for result in tavily_response.get("results", []):

            title = result.get("title", "")
            content = result.get("content", "")
            url = result.get("url", "")

            formatted_results.append({
                "title": title,
                "snippet": content,
                "link": url
            })

            combined_content += f"""
            TITLE:
            {title}

            CONTENT:
            {content}

            SOURCE:
            {url}

            """

        # =========================
        # AI SUMMARY
        # =========================

        summary = "AI summary unavailable."

        try:

            prompt = f"""
            You are an advanced AI research analyst.

            Research Topic:
            {query}

            Research Findings:
            {combined_content}

            Analyze and provide:

            1. Executive Summary
            2. Key Trends
            3. Important Insights
            4. Opportunities
            5. Risks
            6. Future Outlook

            Keep the response:
            - Professional
            - Structured
            - Concise
            - Easy to read
            """

            ai_response = model.generate_content(prompt)

            summary = ai_response.text

        except Exception as gemini_error:

            print("\nGEMINI SUMMARY ERROR:")
            traceback.print_exc()

            summary = "AI summary unavailable."

        return {
            "query": query,
            "summary": summary,
            "results": formatted_results
        }

    except Exception as e:

        print("\nSEARCH ERROR:")
        traceback.print_exc()

        return JSONResponse(
            status_code=500,
            content={
                "error": str(e)
            }
        )

# =========================
# FOLLOWUP CHAT
# =========================

@app.post("/followup")
async def followup(data: FollowUpRequest):

    try:

        prompt = f"""
        Existing Research Summary:
        {data.summary}

        User Follow-Up Question:
        {data.question}

        Provide a detailed professional answer.
        """

        ai_response = model.generate_content(prompt)

        return {
            "response": ai_response.text
        }

    except Exception as e:

        print("\nFOLLOWUP ERROR:")
        traceback.print_exc()

        return JSONResponse(
            status_code=500,
            content={
                "response": "Unable to process follow-up."
            }
        )