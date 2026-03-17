import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, Scheme } from "../types";

export const findSchemes = async (profile: UserProfile): Promise<{ schemes: Scheme[], sources: any[] }> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Find the top 6-8 most relevant Indian Government schemes (both Central and State-specific for ${profile.location}) for the following user profile:
    - Age: ${profile.age}
    - State/UT: ${profile.location}
    - Annual Family Income: ${profile.income}
    - Caste/Category: ${profile.caste}
    - Occupation: ${profile.occupation}

    Instructions:
    1. Search for official schemes from the Government of India (Central).
    2. Search specifically for schemes provided by the Government of ${profile.location} (State/UT).
    3. Ensure the results are current for 2024-2025.
    4. Provide direct official portal URLs for application.
    5. Be specific about eligibility—why does this user fit based on their exact income, caste, and occupation?

    Return a JSON array of schemes. Each scheme must include:
    - title: official name
    - description: clear, simple summary (no legalese)
    - benefits: array of bullet points
    - eligibilitySummary: specific reasoning for this user
    - category: "Central" or "State"
    - sourceUrl: official application link
    - relevanceScore: 0-100 score.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            benefits: { type: Type.ARRAY, items: { type: Type.STRING } },
            eligibilitySummary: { type: Type.STRING },
            category: { type: Type.STRING },
            sourceUrl: { type: Type.STRING },
            relevanceScore: { type: Type.NUMBER },
          },
          required: ["title", "description", "benefits", "eligibilitySummary", "category", "sourceUrl", "relevanceScore"]
        }
      }
    }
  });

  const schemes = JSON.parse(response.text || '[]');
  const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

  return { schemes, sources };
};

export const chatWithAssistant = async (history: { role: string, content: string }[], userMessage: string, profile: UserProfile) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: `You are 'SchemeSnap Assistant', an expert on Indian government welfare programs. 
      The user is from ${profile.location}. 
      Profile context: Age ${profile.age}, Income ${profile.income}, Caste ${profile.caste}, Occupation ${profile.occupation}.
      Use this context to give highly personalized advice about both Central and ${profile.location} State schemes. 
      Be helpful, concise, and provide official links when possible. Use Google Search for real-time facts.`,
      tools: [{ googleSearch: {} }]
    }
  });

  const result = await chat.sendMessage({ message: userMessage });
  return result.text;
};