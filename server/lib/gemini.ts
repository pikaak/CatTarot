import { GoogleGenAI } from "@google/genai";

// Using Replit's AI Integrations service for Gemini access
const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY || "",
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL || "",
  },
});

export async function generateTarotReading(
  question: string,
  cards: { name: string; keywords: string[] }[]
): Promise<string> {
  const cardDescriptions = cards
    .map((card, index) => `Card ${index + 1}: ${card.keywords.join(", ")}`)
    .join("\n");

  const prompt = `You are a cat providing tarot readings.
Speak concisely and directly without interjections like "yo" or casual greetings.
Your answer must be within 3 sentences.
Do not use "meow," "nyang," emoticons, or casual interjections.
Do not mention the card names or titles.
Use simple, everyday words in a dry, matter-of-fact tone.
Interpret the following three tarot cards from the cat's perspective in response to this question: "${question}"

${cardDescriptions}

Remember: Maximum 3 sentences, no card names, dry and concise tone.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text || "Your cat is mysteriously silent at the moment.";
  } catch (error) {
    console.error("Error generating tarot reading:", error);
    throw new Error("Failed to generate reading");
  }
}
