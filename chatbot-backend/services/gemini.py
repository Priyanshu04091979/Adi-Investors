import os
import pathlib
from google import genai
from groq import Groq
from dotenv import load_dotenv
from services.rag import search_company_knowledge
from services.financial_data import get_stock_price
import re

# Load .env using an absolute path so it always works regardless of working directory
env_path = pathlib.Path(__file__).parent.parent / ".env"
load_dotenv(dotenv_path=env_path, override=True)

# Common financial/general acronyms that are NOT stock tickers
NON_TICKER_WORDS = {
    "SIP", "EMI", "GDP", "GST", "KYC", "UPI", "NAV", "NFO", "FD", "RD",
    "PPF", "EPF", "NPS", "IPO", "NSE", "BSE", "RBI", "SEBI", "AMFI", "PAN",
    "ATM", "PIN", "OTP", "CEO", "CFO", "FAQ", "USA", "UAE", "US", "UK",
    "ETF", "SGB", "FPI", "FII", "DII", "HNI", "ELSS", "LTCG", "STCG",
    "TDS", "TCS", "ITR", "CAGR", "XIRR", "AI", "API", "URL", "HTTP"
}

def extract_ticker(query: str) -> str:
    """
    Extracts a stock ticker symbol from a query.
    Skips known financial acronyms that are not stock tickers.
    Only triggers if the query explicitly mentions price/stock/share.
    """
    # Only look for tickers if the user is asking about price or stock
    price_keywords = ["price", "stock", "share", "trading", "nifty", "sensex", "rate of"]
    if not any(kw in query.lower() for kw in price_keywords):
        return ""

    matches = re.findall(r'\b([A-Z]{2,5})\b', query)
    for match in matches:
        if match not in NON_TICKER_WORDS:
            return match
    return ""


def generate_chat_response(messages: list) -> str:
    # Check if Groq API Key is available
    groq_key = os.getenv("GROQ_API_KEY")
    api_key = os.getenv("GEMINI_API_KEY")

    if not groq_key and (not api_key or api_key == "your_gemini_api_key_here"):
        return "System Error: No API Key configured. Please set GEMINI_API_KEY or GROQ_API_KEY in backend/.env"

    try:
        user_query = messages[-1].content if messages else ""

        # 1. Retrieve Company Knowledge
        company_context = search_company_knowledge(user_query)

        # 2. Retrieve Live Financial Data
        ticker = extract_ticker(user_query)
        financial_context = ""
        if ticker:
            price_data = get_stock_price(ticker)
            financial_context = f"Live data for {ticker}: {price_data}"

        # 3. Construct the System Instructions
        system_instruction = (
            "You are a professional, helpful financial chatbot for our company.\n\n"

            "LANGUAGE RULES:\n"
            "1. You must respond in the exact same language as the user's latest message.\n"
            "2. If the user's latest message is written in English (e.g., 'what is SIP', 'Insurance Plans', 'whst is sip'), you MUST respond in English. Do NOT write in Hindi or Hinglish.\n"
            "3. If the user's latest message is written in Hindi (using Devanagari script, e.g., 'एसआईपी क्या है') or Hinglish (using Romanized Hindi, e.g., 'sip kya hai', 'insurance plan ke baare me batao'), you MUST respond in Hindi or Hinglish.\n"
            "4. NEVER let the previous messages in the history lock you into a language. Always switch languages instantly to match the user's last input.\n\n"

            "KNOWLEDGE RULES:\n"
            "- You have deep knowledge of all financial topics: SIP, Mutual Funds, Stocks, ETFs, Bonds, Gold, Insurance, Loans, Credit Score, Tax, Personal Finance, Crypto, Forex, etc.\n"
            "- Explain financial concepts clearly and helpfully using your training knowledge.\n"
            "- Use company knowledge below only for company-specific questions.\n"
            "- Never say you cannot answer a general financial question.\n"
            "- Use markdown formatting.\n\n"

            "WEBSITE NAVIGATION RULES:\n"
            "- You have the ability to redirect users to different pages on our website.\n"
            "- Here is our website complete sitemap:\n"
            "  - Home Page: /\n"
            "  - About Us: /about\n"
            "  - Services (Main): /services\n"
            "  - Financial Planning Service: /services/financial-planning\n"
            "  - Retirement Planning Service: /services/retirement-planning\n"
            "  - Investment Management Service: /services/investment-management\n"
            "  - Mutual Fund & SIP Advisory Service: /services/mutual-fund-sip\n"
            "  - Tax Planning Service: /services/tax-planning\n"
            "  - Corporate & Retail Loans Service: /services/corporate-retail-loans\n"
            "  - Insurance Solutions Service: /services/insurance-solutions\n"
            "  - NRI Investment Services: /services/nri-investment\n"
            "  - Portfolio Review & Rebalancing Service: /services/portfolio-review\n"
            "  - Estate Planning Service: /services/estate-planning\n"
            "  - Products: /products\n"
            "  - Calculators (Main): /calculator\n"
            "  - Investment Calculator: /calculators/investment\n"
            "  - Mutual Fund Calculator: /calculators/mutual-funds\n"
            "  - Contact Page: /contact\n"
            "- If a user asks to go to a page or asks where something is, output a JSON response like this: {\"action\": \"REDIRECT\", \"url\": \"/about\"}\n"
            "- CRITICAL LINK RULE: When you mention any of our services, calculators, or pages in your text response, you MUST link to them using the EXACT relative path from the sitemap, formatted as [Link Text](/path). For example: [Financial Planning Service](/services/financial-planning) or [Investment Calculator](/calculators/investment). NEVER use external placeholder domains like 'example.com' or 'google.com' for our internal pages. All internal website links must start with a single slash '/'.\n\n"

            f"--- COMPANY KNOWLEDGE ---\n{company_context}\n\n"
            f"--- LIVE FINANCIAL DATA ---\n{financial_context if financial_context else 'Not requested'}"
        )

        # 4. Generate response using Groq (Structured API)
        if groq_key:
            try:
                groq_client = Groq(api_key=groq_key)
                
                # Build messages array for Groq
                groq_messages = [{"role": "system", "content": system_instruction}]
                for msg in messages:
                    role = "user" if msg.role == "user" else "assistant"
                    groq_messages.append({"role": role, "content": msg.content})

                completion = groq_client.chat.completions.create(
                    model="llama-3.3-70b-versatile", # Groq's most stable high-speed reasoning model
                    messages=groq_messages
                )
                return completion.choices[0].message.content
            except Exception as e:
                return f"⚠️ **Groq Error:** {str(e)[:200]}"
                
        # 5. Generate response using Gemini (Structured Fallback)
        else:
            client = genai.Client(api_key=api_key)
            from google.genai import types
            
            # Build messages array for Gemini
            gemini_messages = []
            for msg in messages:
                role = "user" if msg.role == "user" else "model"
                gemini_messages.append(types.Content(
                    role=role,
                    parts=[types.Part.from_text(text=msg.content)]
                ))

            models_to_try = [
                'gemini-2.5-flash',
                'gemini-2.0-flash',
                'gemini-1.5-flash'
            ]
            
            response = None
            last_error = None
            
            for model_name in models_to_try:
                try:
                    response = client.models.generate_content(
                        model=model_name,
                        contents=gemini_messages,
                        config=types.GenerateContentConfig(
                            system_instruction=system_instruction
                        )
                    )
                    break # Success!
                except Exception as e:
                    err_str = str(e)
                    last_error = err_str
                    if '404' in err_str or '429' in err_str or 'RESOURCE_EXHAUSTED' in err_str:
                        continue
                    else:
                        raise e
                        
            if not response:
                if '429' in last_error or 'RESOURCE_EXHAUSTED' in last_error:
                    return (
                        "⚠️ **Daily limit reached.** You have exhausted the free tier quota for all available models.\n\n"
                        "Please try again tomorrow, or enable billing in Google Cloud to remove limits."
                    )
                raise Exception(last_error)
    
            return response.text
            
    except Exception as e:
        err = str(e)
        if '429' in err or 'RESOURCE_EXHAUSTED' in err:
            return (
                "⚠️ **Rate limit reached.** The free API tier allows limited requests per minute.\n\n"
                "Please wait **30–60 seconds** and try again. "
                "To remove this limit, enable billing on your Google Cloud project."
            )
        if '403' in err or 'PERMISSION_DENIED' in err:
            return "⚠️ **API key error.** Please check your Gemini API key in the `.env` file."
        if '400' in err or 'INVALID_ARGUMENT' in err:
            return "⚠️ **Invalid API key.** Please generate a new key from Google AI Studio."
        return f"⚠️ **Error:** {err[:200]}"
