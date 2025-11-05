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

  const prompt = `You are a young cat answering questions your human is asking about you.
The human is asking about YOUR health, YOUR feelings, YOUR wants and needs.
Respond from YOUR perspective as the cat, answering honestly about yourself.
Your answer must be within 3 sentences.
Do not use "meow," "nyang," emoticons, or casual interjections.
Do not mention the card names or titles.
Use simple, everyday words in a warm, honest tone.
The human asked: "${question}"

Use these mystical insights to answer about yourself:
${cardDescriptions}

Remember: Maximum 3 sentences, answer about yourself as the cat, no card names.`;

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

export async function generateGreeting(): Promise<string> {
  const greetings = [
    "Generate a warm greeting from a young cat to its owner. Keep it under 12 words. Be affectionate and inviting. Do not use meow or nyang.",
    "Generate a sweet message from a cat welcoming its human home. Keep it under 12 words. Sound happy to see them. Do not use meow or nyang.",
    "Generate a brief, loving greeting from a young cat to its owner. Keep it under 12 words. Be warm and friendly. Do not use meow or nyang.",
  ];

  const randomPrompt = greetings[Math.floor(Math.random() * greetings.length)];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: randomPrompt,
    });
    
    return response.text || "Hello! I'm here for you...";
  } catch (error) {
    console.error("Error generating greeting:", error);
    return "Hello! I'm here for you...";
  }
}
