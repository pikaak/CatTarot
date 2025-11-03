
import { useState } from "react";
import type { TarotCard } from "@shared/cards";
import { CARD_BACK_IMAGE } from "@shared/cards";
import cardBackImg from "@assets/generated_images/Mystical_tarot_card_back_8388aaca.png";

interface TarotCardProps {
  card: TarotCard;
  isFlipped: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const cardImages: Record<string, string> = {
  "@assets/generated_images/The_Cat_tarot_card_5842b39d.png": new URL("@assets/generated_images/The_Cat_tarot_card_5842b39d.png", import.meta.url).href,
  "@assets/generated_images/Magic_Cat_tarot_card_60c4812d.png": new URL("@assets/generated_images/Magic_Cat_tarot_card_60c4812d.png", import.meta.url).href,
  "@assets/generated_images/The_Priestess_tarot_card_e61e48df.png": new URL("@assets/generated_images/The_Priestess_tarot_card_e61e48df.png", import.meta.url).href,
  "@assets/generated_images/The_Empress_tarot_card_ee0ea80d.png": new URL("@assets/generated_images/The_Empress_tarot_card_ee0ea80d.png", import.meta.url).href,
  "@assets/generated_images/The_Emperor_tarot_card_bdbc0457.png": new URL("@assets/generated_images/The_Emperor_tarot_card_bdbc0457.png", import.meta.url).href,
  "@assets/generated_images/The_Priest_tarot_card_ef6dc44c.png": new URL("@assets/generated_images/The_Priest_tarot_card_ef6dc44c.png", import.meta.url).href,
  "@assets/generated_images/The_Lovers_tarot_card_c3392b58.png": new URL("@assets/generated_images/The_Lovers_tarot_card_c3392b58.png", import.meta.url).href,
  "@assets/generated_images/The_Chariot_tarot_card_0f645f51.png": new URL("@assets/generated_images/The_Chariot_tarot_card_0f645f51.png", import.meta.url).href,
  "@assets/generated_images/Strength_tarot_card_87e145f8.png": new URL("@assets/generated_images/Strength_tarot_card_87e145f8.png", import.meta.url).href,
  "@assets/generated_images/The_Hermit_tarot_card_608f439f.png": new URL("@assets/generated_images/The_Hermit_tarot_card_608f439f.png", import.meta.url).href,
  "@assets/generated_images/The_Wheel_tarot_card_87c2c04d.png": new URL("@assets/generated_images/The_Wheel_tarot_card_87c2c04d.png", import.meta.url).href,
  "@assets/generated_images/Consequences_tarot_card_ad5b6fd0.png": new URL("@assets/generated_images/Consequences_tarot_card_ad5b6fd0.png", import.meta.url).href,
  "@assets/generated_images/The_Floating_Cat_tarot_card_d01b3c1c.png": new URL("@assets/generated_images/The_Floating_Cat_tarot_card_d01b3c1c.png", import.meta.url).href,
  "@assets/generated_images/Death_tarot_card_6e9e947c.png": new URL("@assets/generated_images/Death_tarot_card_6e9e947c.png", import.meta.url).href,
  "@assets/generated_images/Grace_tarot_card_eb5c0185.png": new URL("@assets/generated_images/Grace_tarot_card_eb5c0185.png", import.meta.url).href,
  "@assets/generated_images/Demon_Cat_tarot_card_7fe700fb.png": new URL("@assets/generated_images/Demon_Cat_tarot_card_7fe700fb.png", import.meta.url).href,
  "@assets/generated_images/The_Tower_tarot_card_26cca850.png": new URL("@assets/generated_images/The_Tower_tarot_card_26cca850.png", import.meta.url).href,
  "@assets/generated_images/Stars_tarot_card_085a27c1.png": new URL("@assets/generated_images/Stars_tarot_card_085a27c1.png", import.meta.url).href,
  "@assets/generated_images/Moon_tarot_card_4ae90128.png": new URL("@assets/generated_images/Moon_tarot_card_4ae90128.png", import.meta.url).href,
  "@assets/generated_images/Sun_tarot_card_d9767513.png": new URL("@assets/generated_images/Sun_tarot_card_d9767513.png", import.meta.url).href,
  "@assets/generated_images/Good_Kitty_tarot_card_c61e7c0e.png": new URL("@assets/generated_images/Good_Kitty_tarot_card_c61e7c0e.png", import.meta.url).href,
  "@assets/generated_images/The_World_tarot_card_9a1f7cf7.png": new URL("@assets/generated_images/The_World_tarot_card_9a1f7cf7.png", import.meta.url).href,
};

export default function TarotCard({ card, isFlipped, onClick, className = "", style }: TarotCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (onClick && !isAnimating) {
      setIsAnimating(true);
      onClick();
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  const cardFrontImage = cardImages[card.image] || cardImages["@assets/generated_images/The_Cat_tarot_card_5842b39d.png"];

  return (
    <div
      className={`relative cursor-pointer transition-transform duration-200 ${className}`}
      style={{
        perspective: "1000px",
        width: "96px",
        height: "144px",
        ...style,
      }}
      onClick={handleClick}
      data-testid={`card-${card.id}`}
    >
      <div
        className={`relative w-full h-full transition-transform duration-600 ease-in-out`}
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <div
          className="absolute inset-0 rounded-md shadow-lg"
          style={{
            backfaceVisibility: "hidden",
          }}
        >
          <img
            src={cardBackImg}
            alt="Card back"
            className="w-full h-full object-contain rounded-md"
          />
        </div>
        <div
          className="absolute inset-0 rounded-md shadow-lg"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <img
            src={cardFrontImage}
            alt={card.name}
            className="w-full h-full object-contain rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
