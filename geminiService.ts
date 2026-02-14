
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeCrowdAuthenticity = async (imageBase64: string) => {
  const ai = getAI();
  const model = 'gemini-3-flash-preview';
  
  const prompt = `Analyze this image of a metro station crowd. Determine if it is likely a real, authentic photograph or if it shows signs of AI generation, heavy manipulation, or being a recycled stock photo. Return a JSON object with: 
  - isAuthentic (boolean)
  - confidence (number 0-100)
  - reasoning (short string)`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } },
          { text: prompt }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isAuthentic: { type: Type.BOOLEAN },
            confidence: { type: Type.NUMBER },
            reasoning: { type: Type.STRING }
          },
          required: ["isAuthentic", "confidence", "reasoning"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI Analysis failed:", error);
    return { isAuthentic: true, confidence: 50, reasoning: "Error in analysis" };
  }
};

export const getCrowdPrediction = async (station: string, date: string, time: string) => {
  const ai = getAI();
  const model = 'gemini-3-flash-preview';
  
  const prompt = `Act as a metro operations expert. Predict the crowd level for ${station} station on ${date} at ${time}. Consider peak hours, office timings, and typical city transit patterns. Return a JSON object with:
  - crowdPercentage (0-100)
  - category (LOW, MODERATE, HIGH, CRITICAL)
  - confidence (number 0-100)
  - trend (INCREASING, STABLE, DECREASING)
  - advice (string)`;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            crowdPercentage: { type: Type.NUMBER },
            category: { type: Type.STRING },
            confidence: { type: Type.NUMBER },
            trend: { type: Type.STRING },
            advice: { type: Type.STRING }
          },
          required: ["crowdPercentage", "category", "confidence", "trend", "advice"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Prediction failed:", error);
    return null;
  }
};
