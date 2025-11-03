
export interface TarotCard {
  id: number;
  name: string;
  keywords: string[];
  image: string;
}

export const MAJOR_ARCANA: TarotCard[] = [
  { id: 0, name: "The Cat", keywords: ["beginnings", "innocence", "spontaneity"], image: "@assets/generated_images/The_Cat_tarot_card_5842b39d.png" },
  { id: 1, name: "Cat Magic", keywords: ["manifestation", "power", "action"], image: "@assets/generated_images/Magic_Cat_tarot_card_60c4812d.png" },
  { id: 2, name: "The Priestess", keywords: ["intuition", "mystery", "wisdom"], image: "@assets/generated_images/The_Priestess_tarot_card_e61e48df.png" },
  { id: 3, name: "The Empress", keywords: ["nurturing", "abundance", "nature"], image: "@assets/generated_images/The_Empress_tarot_card_ee0ea80d.png" },
  { id: 4, name: "The Emperor", keywords: ["authority", "structure", "control"], image: "@assets/generated_images/The_Emperor_tarot_card_bdbc0457.png" },
  { id: 5, name: "The Priest", keywords: ["tradition", "conformity", "teaching"], image: "@assets/generated_images/The_Priest_tarot_card_ef6dc44c.png" },
  { id: 6, name: "The Lovers", keywords: ["love", "harmony", "relationships"], image: "@assets/generated_images/The_Lovers_tarot_card_c3392b58.png" },
  { id: 7, name: "The Chariot", keywords: ["willpower", "determination", "victory"], image: "@assets/generated_images/The_Chariot_tarot_card_0f645f51.png" },
  { id: 8, name: "Strength", keywords: ["courage", "patience", "compassion"], image: "@assets/generated_images/Strength_tarot_card_87e145f8.png" },
  { id: 9, name: "The Hermit", keywords: ["introspection", "solitude", "guidance"], image: "@assets/generated_images/The_Hermit_tarot_card_608f439f.png" },
  { id: 10, name: "The Wheel", keywords: ["change", "cycles", "destiny"], image: "@assets/generated_images/The_Wheel_tarot_card_87c2c04d.png" },
  { id: 11, name: "Consequences", keywords: ["fairness", "truth", "balance"], image: "@assets/generated_images/Consequences_tarot_card_ad5b6fd0.png" },
  { id: 12, name: "The Floating Cat", keywords: ["surrender", "perspective", "sacrifice"], image: "@assets/generated_images/The_Floating_Cat_tarot_card_d01b3c1c.png" },
  { id: 13, name: "Death", keywords: ["transformation", "endings", "rebirth"], image: "@assets/generated_images/Death_tarot_card_6e9e947c.png" },
  { id: 14, name: "Grace", keywords: ["balance", "moderation", "patience"], image: "@assets/generated_images/Grace_tarot_card_eb5c0185.png" },
  { id: 15, name: "Demon Cat", keywords: ["bondage", "materialism", "temptation"], image: "@assets/generated_images/Demon_Cat_tarot_card_7fe700fb.png" },
  { id: 16, name: "The Tower", keywords: ["upheaval", "revelation", "chaos"], image: "@assets/generated_images/The_Tower_tarot_card_26cca850.png" },
  { id: 17, name: "Stars", keywords: ["hope", "inspiration", "renewal"], image: "@assets/generated_images/Stars_tarot_card_085a27c1.png" },
  { id: 18, name: "Moon", keywords: ["illusion", "intuition", "uncertainty"], image: "@assets/generated_images/Moon_tarot_card_4ae90128.png" },
  { id: 19, name: "Sun", keywords: ["joy", "success", "positivity"], image: "@assets/generated_images/Sun_tarot_card_d9767513.png" },
  { id: 20, name: "Good Kitty", keywords: ["reflection", "awakening", "calling"], image: "@assets/generated_images/Good_Kitty_tarot_card_c61e7c0e.png" },
  { id: 21, name: "The World", keywords: ["completion", "achievement", "fulfillment"], image: "@assets/generated_images/The_World_tarot_card_9a1f7cf7.png" },
];

export const CARD_BACK_IMAGE = "@assets/generated_images/Mystical_tarot_card_back_8388aaca.png";
