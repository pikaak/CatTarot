import { useState } from "react";
import type React from "react";
import type { TarotCard } from "@shared/cards";
import cardBackImg from "@assets/generated_images/Mystical_tarot_card_back_8388aaca.png";

interface TarotCardProps {
  card: TarotCard;
  isFlipped: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const cardImages: Record<string, string> = {
  // ==== Major Arcana ====
  "@assets/generated_images/The_Cat_tarot_card_5842b39d.png": new URL(
    "@assets/generated_images/The_Cat_tarot_card_5842b39d.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Cat_Magic_tarot_card_5d2d88cb.png": new URL(
    "@assets/generated_images/Cat_Magic_tarot_card_5d2d88cb.png",
    import.meta.url
  ).href,
  "@assets/generated_images/High_Priestess_tarot_card_7279b8c0.png": new URL(
    "@assets/generated_images/High_Priestess_tarot_card_7279b8c0.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Earth_Kitten_tarot_card_9b82f238.png": new URL(
    "@assets/generated_images/Earth_Kitten_tarot_card_9b82f238.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Empress_tarot_card_657e88e6.png": new URL(
    "@assets/generated_images/The_Empress_tarot_card_657e88e6.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Emperor_tarot_card_1679fd88.png": new URL(
    "@assets/generated_images/The_Emperor_tarot_card_1679fd88.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Priest_tarot_card_efde4b89.png": new URL(
    "@assets/generated_images/The_Priest_tarot_card_efde4b89.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Lovers_tarot_card_d3313c51.png": new URL(
    "@assets/generated_images/The_Lovers_tarot_card_d3313c51.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Eight_of_Sky_tarot_card_05c47960.png": new URL(
    "@assets/generated_images/Eight_of_Sky_tarot_card_05c47960.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Sky_King_tarot_card_c1b83b8c.png": new URL(
    "@assets/generated_images/Sky_King_tarot_card_c1b83b8c.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Sea_King_tarot_card_715d8c9f.png": new URL(
    "@assets/generated_images/Sea_King_tarot_card_715d8c9f.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Earth_King_tarot_card_0c0c4c01.png": new URL(
    "@assets/generated_images/Earth_King_tarot_card_0c0c4c01.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Fire_King_tarot_card_02e9a16c.png": new URL(
    "@assets/generated_images/Fire_King_tarot_card_02e9a16c.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Sea_Queen_tarot_card_07bd2b4a.png": new URL(
    "@assets/generated_images/Sea_Queen_tarot_card_07bd2b4a.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Sky_Queen_tarot_card_493d25f9.png": new URL(
    "@assets/generated_images/Sky_Queen_tarot_card_493d25f9.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Fire_Queen_tarot_card_6d57cae1.png": new URL(
    "@assets/generated_images/Fire_Queen_tarot_card_6d57cae1.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Earth_Queen_tarot_card_66f0abf0.png": new URL(
    "@assets/generated_images/Earth_Queen_tarot_card_66f0abf0.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Justice_tarot_card_0956f343.png": new URL(
    "@assets/generated_images/Justice_tarot_card_0956f343.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Moon_tarot_card_4ae90128.png": new URL(
    "@assets/generated_images/Moon_tarot_card_4ae90128.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Sun_tarot_card_d9767513.png": new URL(
    "@assets/generated_images/Sun_tarot_card_d9767513.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Good_Kitty_tarot_card_c61e7c0e.png": new URL(
    "@assets/generated_images/Good_Kitty_tarot_card_c61e7c0e.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Star_tarot_card_4132f6a3.png": new URL(
    "@assets/generated_images/The_Star_tarot_card_4132f6a3.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Wheel_tarot_card_e8b0b4ad.png": new URL(
    "@assets/generated_images/The_Wheel_tarot_card_e8b0b4ad.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Devil_tarot_card_e1e3eb38.png": new URL(
    "@assets/generated_images/The_Devil_tarot_card_e1e3eb38.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Hermit_tarot_card_1e55f0e4.png": new URL(
    "@assets/generated_images/The_Hermit_tarot_card_1e55f0e4.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Hanged_Man_tarot_card_6fd7a0db.png": new URL(
    "@assets/generated_images/The_Hanged_Man_tarot_card_6fd7a0db.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Hierophant_tarot_card_582fa418.png": new URL(
    "@assets/generated_images/The_Hierophant_tarot_card_582fa418.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Fool_tarot_card_53b9f6fc.png": new URL(
    "@assets/generated_images/The_Fool_tarot_card_53b9f6fc.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Death_tarot_card_6ed0bbfd.png": new URL(
    "@assets/generated_images/The_Death_tarot_card_6ed0bbfd.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Tower_tarot_card_8a61fb6a.png": new URL(
    "@assets/generated_images/The_Tower_tarot_card_8a61fb6a.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_World_tarot_card_8ddaaa3b.png": new URL(
    "@assets/generated_images/The_World_tarot_card_8ddaaa3b.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Judgement_tarot_card_e14a0f6d.png": new URL(
    "@assets/generated_images/Judgement_tarot_card_e14a0f6d.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Strength_tarot_card_87e185b7.png": new URL(
    "@assets/generated_images/Strength_tarot_card_87e185b7.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Chariot_tarot_card_f6146fb9.png": new URL(
    "@assets/generated_images/The_Chariot_tarot_card_f6146fb9.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_High_Priestess_tarot_card_48acbd3f.png":
    new URL(
      "@assets/generated_images/The_High_Priestess_tarot_card_48acbd3f.png",
      import.meta.url
    ).href,
  "@assets/generated_images/The_Empress_2_tarot_card_8a8e3c26.png": new URL(
    "@assets/generated_images/The_Empress_2_tarot_card_8a8e3c26.png",
    import.meta.url
  ).href,

  // ==== Fire suit ====
  "@assets/generated_images/fire/Fire_kitten.png": new URL(
    "@assets/generated_images/fire/Fire_kitten.png",
    import.meta.url
  ).href,
  "@assets/generated_images/fire/Fire_Tom.png": new URL(
    "@assets/generated_images/fire/Fire_Tom.png",
    import.meta.url
  ).href,
  "@assets/generated_images/fire/Fire_Queen.png": new URL(
    "@assets/generated_images/fire/Fire_Queen.png",
    import.meta.url
  ).href,
  "@assets/generated_images/fire/Fire_King.png": new URL(
    "@assets/generated_images/fire/Fire_King.png",
    import.meta.url
  ).href,
  "@assets/generated_images/fire/Ace_of_Fire.png": new URL(
    "@assets/generated_images/fire/Ace_of_Fire.png",
    import.meta.url
  ).href,
  "@assets/generated_images/fire/Two_of_Fire.png": new URL(
    "@assets/generated_images/fire/Two_of_Fire.png",
    import.meta.url
  ).href,
  "@assets/generated_images/fire/Three_of_Fire.png": new URL(
    "@assets/generated_images/fire/Three_of_Fire.png",
    import.meta.url
  ).href,
  "@assets/generated_images/fire/Four_of_Fire.png": new URL(
    "@assets/generated_images/fire/Four_of_Fire.png",
    import.meta.url
  ).href,
  "@assets/generated_images/fire/Five_of_Fire.png": new URL(
    "@assets/generated_images/fire/Five_of_Fire.png",
    import.meta.url
  ).href,
  "@assets/generated_images/fire/Six_of_Fire.png": new URL(
    "@assets/generated_images/fire/Six_of_Fire.png",
    import.meta.url
  ).href,
  "@assets/generated_images/fire/Seven_of_Fire.png": new URL(
    "@assets/generated_images/fire/Seven_of_Fire.png",
    import.meta.url
  ).href,
  "@assets/generated_images/fire/Eight_of_Fire.png": new URL(
    "@assets/generated_images/fire/Eight_of_Fire.png",
    import.meta.url
  ).href,
  "@assets/generated_images/fire/Nine_of_Fire.png": new URL(
    "@assets/generated_images/fire/Nine_of_Fire.png",
    import.meta.url
  ).href,
  "@assets/generated_images/fire/Ten_of_Fire.png": new URL(
    "@assets/generated_images/fire/Ten_of_Fire.png",
    import.meta.url
  ).href,

  // ==== Sea suit ====
  "@assets/generated_images/sea/Sea_Kitten.png": new URL(
    "@assets/generated_images/sea/Sea_Kitten.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sea/Sea_Tom.png": new URL(
    "@assets/generated_images/sea/Sea_Tom.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sea/Sea_Queen.png": new URL(
    "@assets/generated_images/sea/Sea_Queen.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sea/Sea_King.png": new URL(
    "@assets/generated_images/sea/Sea_King.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sea/Ace_of_Sea.png": new URL(
    "@assets/generated_images/sea/Ace_of_Sea.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sea/Two_of_Sea.png": new URL(
    "@assets/generated_images/sea/Two_of_Sea.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sea/Three_of_Sea.png": new URL(
    "@assets/generated_images/sea/Three_of_Sea.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sea/Four_of_Sea.png": new URL(
    "@assets/generated_images/sea/Four_of_Sea.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sea/Five_of_Sea.png": new URL(
    "@assets/generated_images/sea/Five_of_Sea.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sea/Six_of_Sea.png": new URL(
    "@assets/generated_images/sea/Six_of_Sea.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sea/Seven_of_Sea.png": new URL(
    "@assets/generated_images/sea/Seven_of_Sea.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sea/Eight_of_Sea.png": new URL(
    "@assets/generated_images/sea/Eight_of_Sea.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sea/Nine_of_Sea.png": new URL(
    "@assets/generated_images/sea/Nine_of_Sea.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sea/Ten_of_Sea.png": new URL(
    "@assets/generated_images/sea/Ten_of_Sea.png",
    import.meta.url
  ).href,

  // ==== Sky suit ====
  "@assets/generated_images/sky/Sky_Kitten.png": new URL(
    "@assets/generated_images/sky/Sky_Kitten.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sky/Sky_Tom.png": new URL(
    "@assets/generated_images/sky/Sky_Tom.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sky/Sky_Queen.png": new URL(
    "@assets/generated_images/sky/Sky_Queen.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sky/Sky_King.png": new URL(
    "@assets/generated_images/sky/Sky_King.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sky/Ace_of_Sky.png": new URL(
    "@assets/generated_images/sky/Ace_of_Sky.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sky/Two_of_Sky.png": new URL(
    "@assets/generated_images/sky/Two_of_Sky.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sky/Three_of_Sky.png": new URL(
    "@assets/generated_images/sky/Three_of_Sky.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sky/Four_of_Sky.png": new URL(
    "@assets/generated_images/sky/Four_of_Sky.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sky/Five_of_Sky.png": new URL(
    "@assets/generated_images/sky/Five_of_Sky.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sky/Six_of_Sky.png": new URL(
    "@assets/generated_images/sky/Six_of_Sky.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sky/Seven_of_Sky.png": new URL(
    "@assets/generated_images/sky/Seven_of_Sky.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sky/Eight_of_Sky.png": new URL(
    "@assets/generated_images/sky/Eight_of_Sky.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sky/Nine_of_Sky.png": new URL(
    "@assets/generated_images/sky/Nine_of_Sky.png",
    import.meta.url
  ).href,
  "@assets/generated_images/sky/Ten_of_Sky.png": new URL(
    "@assets/generated_images/sky/Ten_of_Sky.png",
    import.meta.url
  ).href,

  // ==== Earth suit ====
  "@assets/generated_images/earth/Earth_Kitten.png": new URL(
    "@assets/generated_images/earth/Earth_Kitten.png",
    import.meta.url
  ).href,
  "@assets/generated_images/earth/Earth_Tom.png": new URL(
    "@assets/generated_images/earth/Earth_Tom.png",
    import.meta.url
  ).href,
  "@assets/generated_images/earth/Earth_Queen.png": new URL(
    "@assets/generated_images/earth/Earth_Queen.png",
    import.meta.url
  ).href,
  "@assets/generated_images/earth/Earth_King.png": new URL(
    "@assets/generated_images/earth/Earth_King.png",
    import.meta.url
  ).href,
  "@assets/generated_images/earth/Ace_of_Earth.png": new URL(
    "@assets/generated_images/earth/Ace_of_Earth.png",
    import.meta.url
  ).href,
  "@assets/generated_images/earth/Two_of_Earth.png": new URL(
    "@assets/generated_images/earth/Two_of_Earth.png",
    import.meta.url
  ).href,
  "@assets/generated_images/earth/Three_of_Earth.png": new URL(
    "@assets/generated_images/earth/Three_of_Earth.png",
    import.meta.url
  ).href,
  "@assets/generated_images/earth/Four_of_Earth.png": new URL(
    "@assets/generated_images/earth/Four_of_Earth.png",
    import.meta.url
  ).href,
  "@assets/generated_images/earth/Five_of_Earth.png": new URL(
    "@assets/generated_images/earth/Five_of_Earth.png",
    import.meta.url
  ).href,
  "@assets/generated_images/earth/Six_of_Earth.png": new URL(
    "@assets/generated_images/earth/Six_of_Earth.png",
    import.meta.url
  ).href,
  "@assets/generated_images/earth/Seven_of_Earth.png": new URL(
    "@assets/generated_images/earth/Seven_of_Earth.png",
    import.meta.url
  ).href,
  "@assets/generated_images/earth/Eight_of_Earth.png": new URL(
    "@assets/generated_images/earth/Eight_of_Earth.png",
    import.meta.url
  ).href,
  "@assets/generated_images/earth/Nine_of_Earth.png": new URL(
    "@assets/generated_images/earth/Nine_of_Earth.png",
    import.meta.url
  ).href,
  "@assets/generated_images/earth/Ten_of_Earth.png": new URL(
    "@assets/generated_images/earth/Ten_of_Earth.png",
    import.meta.url
  ).href,
};

export default function TarotCard({
  card,
  isFlipped,
  onClick,
  className = "",
  style,
}: TarotCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (onClick && !isAnimating) {
      setIsAnimating(true);
      onClick();
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const cardFrontImage =
    cardImages[card.image] ||
    cardImages["@assets/generated_images/The_Cat_tarot_card_5842b39d.png"];

  return (
    <div
      className={`relative w-[50px] h-[75px] md:w-[60px] md:h-[90px] lg:w-[70px] lg:h-[105px] cursor-pointer transition-transform duration-200 ${className}`}
      style={{
        perspective: "1000px",
        ...style,
      }}
      onClick={handleClick}
      data-testid={`card-${card.id}`}
    >
      <div
        className="relative w-full h-full transition-transform duration-600 ease-in-out pointer-events-none"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* back */}
        <div
          className="absolute inset-0 rounded-md shadow-lg pointer-events-none"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img
            src={cardBackImg}
            alt="Card back"
            className="w-full h-full object-cover rounded-md pointer-events-none"
          />
        </div>

        {/* front */}
        {isFlipped && (
          <div
            className="absolute inset-0 rounded-md shadow-lg pointer-events-none"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <img
              src={cardFrontImage}
              alt={card.name}
              className="w-full h-full object-cover rounded-md pointer-events-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
