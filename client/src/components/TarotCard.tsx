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
  "@assets/generated_images/Magic_Cat_tarot_card_60c4812d.png": new URL(
    "@assets/generated_images/Magic_Cat_tarot_card_60c4812d.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Priestess_tarot_card_e61e48df.png": new URL(
    "@assets/generated_images/The_Priestess_tarot_card_e61e48df.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Empress_tarot_card_ee0ea80d.png": new URL(
    "@assets/generated_images/The_Empress_tarot_card_ee0ea80d.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Emperor_tarot_card_bdbc0457.png": new URL(
    "@assets/generated_images/The_Emperor_tarot_card_bdbc0457.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Priest_tarot_card_ef6dc44c.png": new URL(
    "@assets/generated_images/The_Priest_tarot_card_ef6dc44c.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Lovers_tarot_card_c3392b58.png": new URL(
    "@assets/generated_images/The_Lovers_tarot_card_c3392b58.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Chariot_tarot_card_0f645f51.png": new URL(
    "@assets/generated_images/The_Chariot_tarot_card_0f645f51.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Strength_tarot_card_87e145f8.png": new URL(
    "@assets/generated_images/Strength_tarot_card_87e145f8.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Hermit_tarot_card_608f439f.png": new URL(
    "@assets/generated_images/The_Hermit_tarot_card_608f439f.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Wheel_tarot_card_87c2c04d.png": new URL(
    "@assets/generated_images/The_Wheel_tarot_card_87c2c04d.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Consequences_tarot_card_ad5b6fd0.png": new URL(
    "@assets/generated_images/Consequences_tarot_card_ad5b6fd0.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Floating_Cat_tarot_card_d01b3c1c.png": new URL(
    "@assets/generated_images/The_Floating_Cat_tarot_card_d01b3c1c.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Death_tarot_card_6e9e947c.png": new URL(
    "@assets/generated_images/Death_tarot_card_6e9e947c.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Grace_tarot_card_eb5c0185.png": new URL(
    "@assets/generated_images/Grace_tarot_card_eb5c0185.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Demon_Cat_tarot_card_7fe700fb.png": new URL(
    "@assets/generated_images/Demon_Cat_tarot_card_7fe700fb.png",
    import.meta.url
  ).href,
  "@assets/generated_images/The_Tower_tarot_card_26cca850.png": new URL(
    "@assets/generated_images/The_Tower_tarot_card_26cca850.png",
    import.meta.url
  ).href,
  "@assets/generated_images/Stars_tarot_card_085a27c1.png": new URL(
    "@assets/generated_images/Stars_tarot_card_085a27c1.png",
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
  "@assets/generated_images/The_World_tarot_card_9a1f7cf7.png": new URL(
    "@assets/generated_images/The_World_tarot_card_9a1f7cf7.png",
    import.meta.url
  ).href,

  // ==== Minor Arcana - Fire ====
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
  "@assets/generated_images/fire/Fire_Kitten.png": new URL(
    "@assets/generated_images/fire/Fire_Kitten.png",
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

  // ==== Minor Arcana - Sea ====
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

  // ==== Minor Arcana - Sky ====
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

  // ==== Minor Arcana - Earth ====
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
      className={`relative w-[50px] h-[75px] md:w-[60px] md:h-[90px] cursor-pointer transition-transform duration-200 ${className}`}
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
      </div>
    </div>
  );
}
