from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tavily import TavilyClient
from dotenv import load_dotenv
import google.generativeai as genai
import os

# Load environment variables
load_dotenv()

# FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://maaad-brains.vercel.app",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Tavily setup
tavily = TavilyClient(
    api_key=os.getenv("TAVILY_API_KEY")
)

# Gemini setup
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel("gemini-2.5-flash")

# =========================
# REQUEST MODELS
# =========================

class FollowUpRequest(BaseModel):
    question: str
    summary: str

# =========================
# HOME ROUTE
# =========================

@app.get("/")
def home():
    return {
        "message": "MAAAD BRAINS Backend Running"
    }

# =========================
# SEARCH ROUTE
# =========================

@app.get("/search")
def search(query: str):

    # Search web using Tavily
    response = tavily.search(
        query=query,
        search_depth="advanced",
        max_results=5
    )

    formatted_results = []
    combined_content = ""

    # Format results
    for result in response["results"]:

        formatted_results.append({
            "title": result["title"],
            "snippet": result["content"],
            "link": result["url"]
        })

        combined_content += result["content"] + "\n\n"

    # Generate AI summary
    try:

        response_ai = model.generate_content(f"""
        You are an advanced AI research analyst.

        Research Topic:
        {query}

        Research Findings:
        {combined_content}

        Analyze the research findings and provide:

        1. Executive Summary
        2. Key Technologies or Trends
        3. Important Insights
        4. Opportunities
        5. Risks or Challenges
        6. Future Outlook

        Keep the response structured and professional.
        """)

        summary = response_ai.text

    except Exception as e:

        print("GEMINI ERROR:", e)

        summary = "AI summary temporarily unavailable."

    # Return response
    return {
        "query": query,
        "summary": summary,
        "results": formatted_results
    }

# =========================
# FOLLOW-UP CHAT ROUTE
# =========================

@app.post("/followup")
def followup(data: FollowUpRequest):

    try:

        response_ai = model.generate_content(f"""
        You are an advanced AI research analyst.

        Existing Research Summary:
        {data.summary}

        User Follow-Up Question:
        {data.question}

        Provide a detailed professional response.
        """)

        return {
            "response": response_ai.text
        }

    except Exception as e:

        print("FOLLOWUP ERROR:", e)

        return {
            "response": "Unable to process follow-up question."
        }