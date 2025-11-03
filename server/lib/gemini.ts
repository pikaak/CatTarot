import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.AI_INTEGRATIONS_GEMINI_API_KEY || "");

export async function generateTarotReading(
  question: string,
  cards: { name: string; keywords: string[] }[]
): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

  const cardDescriptions = cards
    .map((card, index) => `Card ${index + 1}: ${card.keywords.join(", ")}`)
    .join("\n");

  const prompt = `You are a cat speaking to your butler.
Respond in a friendly and reflective tone.
Your answer must be within 3 sentences.
Do not use "meow," "nyang," or emoticons.
Do not mention the card names or titles.
Interpret the following three tarot cards from the cat's perspective in response to this question: "${question}"

${cardDescriptions}

Remember: Maximum 3 sentences, no card names, speak as a wise cat to your butler.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text.trim();
  } catch (error) {
    console.error("Error generating tarot reading:", error);
    throw new Error("Failed to generate reading");
  }
}
