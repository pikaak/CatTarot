
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

// Placeholder image for minor arcana cards (purple background)
const MINOR_ARCANA_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='500'%3E%3Crect width='300' height='500' fill='%238b7fb8'/%3E%3C/svg%3E";

export const MINOR_ARCANA: TarotCard[] = [
  // Cups (Water - Emotions, relationships, connections)
  { id: 22, name: "Ace of Cups", keywords: ["new love", "emotional renewal", "creativity"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 23, name: "Two of Cups", keywords: ["partnership", "unity", "connection"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 24, name: "Three of Cups", keywords: ["celebration", "friendship", "community"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 25, name: "Four of Cups", keywords: ["meditation", "contemplation", "apathy"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 26, name: "Five of Cups", keywords: ["loss", "regret", "disappointment"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 27, name: "Six of Cups", keywords: ["nostalgia", "memories", "innocence"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 28, name: "Seven of Cups", keywords: ["choices", "fantasy", "illusion"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 29, name: "Eight of Cups", keywords: ["walking away", "seeking truth", "withdrawal"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 30, name: "Nine of Cups", keywords: ["satisfaction", "contentment", "wishes fulfilled"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 31, name: "Ten of Cups", keywords: ["harmony", "family", "happiness"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 32, name: "Page of Cups", keywords: ["creativity", "intuition", "new emotions"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 33, name: "Knight of Cups", keywords: ["romance", "charm", "idealism"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 34, name: "Queen of Cups", keywords: ["compassion", "calm", "emotional depth"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 35, name: "King of Cups", keywords: ["emotional control", "diplomacy", "wisdom"], image: MINOR_ARCANA_PLACEHOLDER },

  // Wands (Fire - Action, passion, energy)
  { id: 36, name: "Ace of Wands", keywords: ["inspiration", "new opportunity", "growth"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 37, name: "Two of Wands", keywords: ["planning", "decisions", "discovery"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 38, name: "Three of Wands", keywords: ["expansion", "foresight", "leadership"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 39, name: "Four of Wands", keywords: ["celebration", "harmony", "homecoming"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 40, name: "Five of Wands", keywords: ["conflict", "competition", "tension"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 41, name: "Six of Wands", keywords: ["victory", "success", "recognition"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 42, name: "Seven of Wands", keywords: ["perseverance", "defense", "challenge"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 43, name: "Eight of Wands", keywords: ["speed", "action", "movement"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 44, name: "Nine of Wands", keywords: ["resilience", "persistence", "courage"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 45, name: "Ten of Wands", keywords: ["burden", "responsibility", "overwhelm"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 46, name: "Page of Wands", keywords: ["enthusiasm", "exploration", "discovery"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 47, name: "Knight of Wands", keywords: ["adventure", "passion", "impulsiveness"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 48, name: "Queen of Wands", keywords: ["confidence", "independence", "determination"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 49, name: "King of Wands", keywords: ["leadership", "vision", "boldness"], image: MINOR_ARCANA_PLACEHOLDER },

  // Swords (Air - Thoughts, intellect, conflict)
  { id: 50, name: "Ace of Swords", keywords: ["clarity", "breakthrough", "truth"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 51, name: "Two of Swords", keywords: ["indecision", "stalemate", "avoidance"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 52, name: "Three of Swords", keywords: ["heartbreak", "sorrow", "grief"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 53, name: "Four of Swords", keywords: ["rest", "recovery", "contemplation"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 54, name: "Five of Swords", keywords: ["conflict", "defeat", "tension"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 55, name: "Six of Swords", keywords: ["transition", "moving on", "healing"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 56, name: "Seven of Swords", keywords: ["deception", "strategy", "cunning"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 57, name: "Eight of Swords", keywords: ["restriction", "confusion", "powerlessness"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 58, name: "Nine of Swords", keywords: ["anxiety", "worry", "nightmares"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 59, name: "Ten of Swords", keywords: ["endings", "loss", "betrayal"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 60, name: "Page of Swords", keywords: ["curiosity", "vigilance", "mental energy"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 61, name: "Knight of Swords", keywords: ["ambition", "action", "assertiveness"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 62, name: "Queen of Swords", keywords: ["perception", "clarity", "independence"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 63, name: "King of Swords", keywords: ["authority", "intellect", "truth"], image: MINOR_ARCANA_PLACEHOLDER },

  // Pentacles (Earth - Material, practical, physical)
  { id: 64, name: "Ace of Pentacles", keywords: ["opportunity", "prosperity", "manifestation"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 65, name: "Two of Pentacles", keywords: ["balance", "adaptability", "priorities"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 66, name: "Three of Pentacles", keywords: ["teamwork", "collaboration", "mastery"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 67, name: "Four of Pentacles", keywords: ["security", "control", "conservation"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 68, name: "Five of Pentacles", keywords: ["hardship", "loss", "isolation"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 69, name: "Six of Pentacles", keywords: ["generosity", "charity", "sharing"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 70, name: "Seven of Pentacles", keywords: ["perseverance", "investment", "patience"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 71, name: "Eight of Pentacles", keywords: ["skill", "dedication", "craftsmanship"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 72, name: "Nine of Pentacles", keywords: ["independence", "luxury", "self-sufficiency"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 73, name: "Ten of Pentacles", keywords: ["wealth", "legacy", "family"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 74, name: "Page of Pentacles", keywords: ["ambition", "study", "new venture"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 75, name: "Knight of Pentacles", keywords: ["reliability", "hard work", "routine"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 76, name: "Queen of Pentacles", keywords: ["nurturing", "abundance", "practicality"], image: MINOR_ARCANA_PLACEHOLDER },
  { id: 77, name: "King of Pentacles", keywords: ["wealth", "security", "success"], image: MINOR_ARCANA_PLACEHOLDER },
];

export const ALL_CARDS = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export const CARD_BACK_IMAGE = "@assets/generated_images/Mystical_tarot_card_back_8388aaca.png";
