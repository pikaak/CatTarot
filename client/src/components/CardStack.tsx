import { CARD_BACK_IMAGE } from "@shared/cards";
import cardBackImg from "@assets/generated_images/Mystical_tarot_card_back_8388aaca.png";

interface CardStackProps {
  onClick: () => void;
  className?: string;
  isAnimating?: boolean;
}

export default function CardStack({ onClick, className = "", isAnimating = false }: CardStackProps) {
  return (
    <div
      className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}
      onClick={onClick}
      data-testid="card-stack"
      style={{
        width: "96px",
        height: "144px",
      }}
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="absolute rounded-md shadow-2xl transition-all duration-300"
          style={{
            width: "96px",
            height: "144px",
            top: `${index * 2}px`,
            left: `${index * 2}px`,
            zIndex: 5 - index,
            transform: isAnimating ? `rotate(${(Math.random() - 0.5) * 20}deg)` : "rotate(0deg)",
          }}
        >
          <img
            src={cardBackImg}
            alt="Card back"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      ))}
    </div>
  );
}
