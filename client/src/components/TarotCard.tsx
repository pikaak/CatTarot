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
  "@assets/generated_images/The_Fool_tarot_card_d44cad26.png": new URL("@assets/generated_images/The_Fool_tarot_card_d44cad26.png", import.meta.url).href,
  "@assets/generated_images/The_Magician_tarot_card_15bdbf18.png": new URL("@assets/generated_images/The_Magician_tarot_card_15bdbf18.png", import.meta.url).href,
  "@assets/generated_images/High_Priestess_tarot_card_b1606ff1.png": new URL("@assets/generated_images/High_Priestess_tarot_card_b1606ff1.png", import.meta.url).href,
  "@assets/generated_images/The_Lovers_tarot_card_01d9fd4d.png": new URL("@assets/generated_images/The_Lovers_tarot_card_01d9fd4d.png", import.meta.url).href,
  "@assets/generated_images/The_Sun_tarot_card_8e006017.png": new URL("@assets/generated_images/The_Sun_tarot_card_8e006017.png", import.meta.url).href,
  "@assets/generated_images/The_Moon_tarot_card_22b91408.png": new URL("@assets/generated_images/The_Moon_tarot_card_22b91408.png", import.meta.url).href,
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

  const cardFrontImage = cardImages[card.image] || cardImages["@assets/generated_images/The_Fool_tarot_card_d44cad26.png"];

  return (
    <div
      className={`relative w-24 h-36 md:w-32 md:h-48 cursor-pointer transition-transform duration-200 ${className}`}
      style={{
        perspective: "1000px",
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
            className="w-full h-full object-cover rounded-md"
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
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
