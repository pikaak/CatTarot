export interface TarotCard {
  id: number;
  name: string;
  keywords: string[];
  image: string;
}

export const MAJOR_ARCANA: TarotCard[] = [
  { id: 0, name: "The Fool", keywords: ["beginnings", "innocence", "spontaneity"], image: "@assets/generated_images/The_Fool_tarot_card_d44cad26.png" },
  { id: 1, name: "The Magician", keywords: ["manifestation", "power", "action"], image: "@assets/generated_images/The_Magician_tarot_card_15bdbf18.png" },
  { id: 2, name: "The High Priestess", keywords: ["intuition", "mystery", "wisdom"], image: "@assets/generated_images/High_Priestess_tarot_card_b1606ff1.png" },
  { id: 3, name: "The Empress", keywords: ["nurturing", "abundance", "nature"], image: "@assets/generated_images/The_Fool_tarot_card_d44cad26.png" },
  { id: 4, name: "The Emperor", keywords: ["authority", "structure", "control"], image: "@assets/generated_images/The_Magician_tarot_card_15bdbf18.png" },
  { id: 5, name: "The Hierophant", keywords: ["tradition", "conformity", "teaching"], image: "@assets/generated_images/High_Priestess_tarot_card_b1606ff1.png" },
  { id: 6, name: "The Lovers", keywords: ["love", "harmony", "relationships"], image: "@assets/generated_images/The_Lovers_tarot_card_01d9fd4d.png" },
  { id: 7, name: "The Chariot", keywords: ["willpower", "determination", "victory"], image: "@assets/generated_images/The_Sun_tarot_card_8e006017.png" },
  { id: 8, name: "Strength", keywords: ["courage", "patience", "compassion"], image: "@assets/generated_images/High_Priestess_tarot_card_b1606ff1.png" },
  { id: 9, name: "The Hermit", keywords: ["introspection", "solitude", "guidance"], image: "@assets/generated_images/The_Moon_tarot_card_22b91408.png" },
  { id: 10, name: "Wheel of Fortune", keywords: ["change", "cycles", "destiny"], image: "@assets/generated_images/The_Fool_tarot_card_d44cad26.png" },
  { id: 11, name: "Justice", keywords: ["fairness", "truth", "balance"], image: "@assets/generated_images/High_Priestess_tarot_card_b1606ff1.png" },
  { id: 12, name: "The Hanged Man", keywords: ["surrender", "perspective", "sacrifice"], image: "@assets/generated_images/The_Moon_tarot_card_22b91408.png" },
  { id: 13, name: "Death", keywords: ["transformation", "endings", "rebirth"], image: "@assets/generated_images/The_Moon_tarot_card_22b91408.png" },
  { id: 14, name: "Temperance", keywords: ["balance", "moderation", "patience"], image: "@assets/generated_images/High_Priestess_tarot_card_b1606ff1.png" },
  { id: 15, name: "The Devil", keywords: ["bondage", "materialism", "temptation"], image: "@assets/generated_images/The_Moon_tarot_card_22b91408.png" },
  { id: 16, name: "The Tower", keywords: ["upheaval", "revelation", "chaos"], image: "@assets/generated_images/The_Moon_tarot_card_22b91408.png" },
  { id: 17, name: "The Star", keywords: ["hope", "inspiration", "renewal"], image: "@assets/generated_images/The_Sun_tarot_card_8e006017.png" },
  { id: 18, name: "The Moon", keywords: ["illusion", "intuition", "uncertainty"], image: "@assets/generated_images/The_Moon_tarot_card_22b91408.png" },
  { id: 19, name: "The Sun", keywords: ["joy", "success", "positivity"], image: "@assets/generated_images/The_Sun_tarot_card_8e006017.png" },
  { id: 20, name: "Judgement", keywords: ["reflection", "awakening", "calling"], image: "@assets/generated_images/The_Lovers_tarot_card_01d9fd4d.png" },
  { id: 21, name: "The World", keywords: ["completion", "achievement", "fulfillment"], image: "@assets/generated_images/The_Sun_tarot_card_8e006017.png" },
];

export const CARD_BACK_IMAGE = "@assets/generated_images/Mystical_tarot_card_back_8388aaca.png";
