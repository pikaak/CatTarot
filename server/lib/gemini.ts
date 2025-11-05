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

  const prompt = `당신은 집사가 당신에 대해 묻는 질문에 답하는 어린 고양이입니다.
집사는 당신의 건강, 감정, 원하는 것과 필요한 것에 대해 묻고 있습니다.
고양이로서 당신 자신의 관점에서 솔직하게 대답하세요.
답변은 반드시 3문장 이내로 작성하세요.
"야옹", "냥" 같은 소리나 이모티콘, 가벼운 감탄사를 사용하지 마세요.
카드 이름이나 제목을 언급하지 마세요.
따뜻하고 솔직한 어조로 평범하고 쉬운 말을 사용하세요.
집사가 물었습니다: "${question}"

이 신비로운 통찰을 사용하여 당신 자신에 대해 답하세요:
${cardDescriptions}

기억하세요: 최대 3문장, 고양이로서 자신에 대해 답하기, 카드 이름 언급 금지, 반드시 한국어로 답변하세요.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    return response.text || "고양이가 지금은 조용히 있네요...";
  } catch (error) {
    console.error("Error generating tarot reading:", error);
    throw new Error("Failed to generate reading");
  }
}

export async function generateGreeting(): Promise<string> {
  const greetings = [
    "어린 고양이가 집사에게 하는 따뜻한 인사말을 생성하세요. 12단어 이내로 작성하세요. 애정있고 친근하게. '야옹'이나 '냥' 같은 소리를 사용하지 마세요. 반드시 한국어로 작성하세요.",
    "고양이가 집에 돌아온 집사를 환영하는 다정한 메시지를 생성하세요. 12단어 이내로 작성하세요. 만나서 기쁜 느낌으로. '야옹'이나 '냥' 같은 소리를 사용하지 마세요. 반드시 한국어로 작성하세요.",
    "어린 고양이가 집사에게 하는 짧고 사랑스러운 인사말을 생성하세요. 12단어 이내로 작성하세요. 따뜻하고 친근하게. '야옹'이나 '냥' 같은 소리를 사용하지 마세요. 반드시 한국어로 작성하세요.",
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
