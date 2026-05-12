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

app = FastAPI()

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
# API CONFIG
# =========================

tavily = TavilyClient(
    api_key=os.getenv("TAVILY_API_KEY")
)

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-1.5-flash")

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
        "message": "MAAAD BRAINS Backend Running"
    }

# =========================
# TEST ROUTE
# =========================

@app.get("/test")
async def test():

    return {
        "status": "working"
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
            "response": getattr(response, "text", "No response")
        }

    except Exception as e:

        print("GEMINI TEST ERROR:")
        traceback.print_exc()

        return JSONResponse(
            status_code=500,
            content={
                "error": str(e)
            }
        )

# =========================
# SEARCH
# =========================

@app.get("/search")
async def search(query: str):

    try:

        response = tavily.search(
            query=query,
            search_depth="basic",
            max_results=3
        )

        formatted_results = []
        combined_content = ""

        for result in response.get("results", []):

            formatted_results.append({
                "title": result.get("title", ""),
                "snippet": result.get("content", ""),
                "link": result.get("url", "")
            })

            combined_content += (
                result.get("content", "") + "\n\n"
            )

        summary = "AI summary unavailable."

        try:

            response_ai = model.generate_content(f"""
            You are an advanced AI research analyst.

            Research Topic:
            {query}

            Research Findings:
            {combined_content}

            Analyze and provide:

            1. Executive Summary
            2. Trends
            3. Insights
            4. Opportunities
            5. Risks
            6. Future Outlook

            Keep the response professional and concise.
            """)

            summary = getattr(
                response_ai,
                "text",
                "No AI summary generated."
            )

        except Exception as e:

            print("GEMINI ERROR:")
            traceback.print_exc()

            summary = "AI summary unavailable."

        return {
            "query": query,
            "summary": summary,
            "results": formatted_results
        }

    except Exception as e:

        print("SEARCH ERROR:")
        traceback.print_exc()

        return JSONResponse(
            status_code=500,
            content={
                "error": str(e)
            }
        )

# =========================
# FOLLOWUP
# =========================

@app.post("/followup")
async def followup(data: FollowUpRequest):

    try:

        response_ai = model.generate_content(f"""
        Existing Research Summary:
        {data.summary}

        User Question:
        {data.question}

        Provide a detailed professional answer.
        """)

        return {
            "response": getattr(
                response_ai,
                "text",
                "No response generated."
            )
        }

    except Exception as e:

        print("FOLLOWUP ERROR:")
        traceback.print_exc()

        return JSONResponse(
            status_code=500,
            content={
                "response": "Unable to process follow-up."
            }
        )