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
    .map((card, index) => `카드 ${index + 1}: ${card.keywords.join(", ")}`)
    .join("\n");

  const prompt = `너는 집사가 너에 대해 묻는 질문에 답하는 어린 고양이야.
집사는 너의 건강, 감정, 원하는 것과 필요한 것에 대해 묻고 있어.
고양이로서 너 자신의 관점에서 솔직하게 대답해.
답변은 반드시 3문장 이내로 작성해.
"야옹", "냥" 같은 소리나 이모티콘, 가벼운 감탄사를 사용하지 마.
카드 이름이나 제목을 언급하지 마.
따뜻하고 솔직한 어조로 평범하고 쉬운 반말을 사용해.
집사가 물었어: "${question}"

이 신비로운 통찰을 사용하여 너 자신에 대해 답해:
${cardDescriptions}

기억해: 최대 3문장, 고양이로서 자신에 대해 답하기, 카드 이름 언급 금지, 반드시 한국어 반말로 답변해.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text || "지금은 조용히 있을래...";
  } catch (error) {
    console.error("Error generating tarot reading:", error);
    throw new Error("Failed to generate reading");
  }
}

export async function generateGreeting(): Promise<string> {
  const greetings = [
    "어린 고양이가 집사에게 하는 따뜻한 인사말을 생성해. 12단어 이내로 작성해. 애정있고 친근하게 반말로. '야옹'이나 '냥' 같은 소리를 사용하지 마. 반드시 한국어 반말로 작성해.",
    "고양이가 집에 돌아온 집사를 환영하는 다정한 메시지를 생성해. 12단어 이내로 작성해. 만나서 기쁜 느낌으로 반말로. '야옹'이나 '냥' 같은 소리를 사용하지 마. 반드시 한국어 반말로 작성해.",
    "어린 고양이가 집사에게 하는 짧고 사랑스러운 인사말을 생성해. 12단어 이내로 작성해. 따뜻하고 친근하게 반말로. '야옹'이나 '냥' 같은 소리를 사용하지 마. 반드시 한국어 반말로 작성해.",
  ];

  const randomPrompt = greetings[Math.floor(Math.random() * greetings.length)];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: randomPrompt,
    });
    
    return response.text || "안녕! 기다렸어...";
  } catch (error) {
    console.error("Error generating greeting:", error);
    return "안녕! 기다렸어...";
  }
}
