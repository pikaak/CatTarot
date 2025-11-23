import { useState, useEffect } from "react";
import type React from "react";
import type { TarotCard } from "@shared/cards";
import cardBackImg from "@assets/generated_images/Mystical_tarot_card_back_8388aaca.png";

// ✅ 앞면 이미지를 동적으로 import 하기 위한 glob
//   - 키: "@assets/generated_images/..." 형태의 경로
//   - 값: 해당 이미지를 import하는 함수 (lazy)
const cardImageImports = import.meta.glob<{ default: string }>(
  "@assets/generated_images/**/*.{png,jpg,jpeg,webp}",
  { eager: false }
);

interface TarotCardProps {
  card: TarotCard;
  isFlipped: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

// ✅ 더 이상 cardImages 거대한 맵은 필요 없음

export default function TarotCard({
  card,
  isFlipped,
  onClick,
  className = "",
  style,
}: TarotCardProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [frontSrc, setFrontSrc] = useState<string | null>(null);

  const handleClick = () => {
    if (onClick && !isAnimating) {
      setIsAnimating(true);
      onClick();
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  // ✅ 카드가 뒤집힐 때만 앞면 이미지를 동적으로 로딩
  useEffect(() => {
    if (!isFlipped) {
      // 다시 뒷면으로 돌아가면 굳이 앞면 URL을 유지할 필요는 없음
      // (캐시는 브라우저가 알아서 관리함)
      return;
    }

    let cancelled = false;

    // 카드 데이터에 들어있는 image 경로가 그대로 glob 의 key 로 쓰이도록 가정
    const fallbackKey =
      "@assets/generated_images/The_Cat_tarot_card_5842b39d.png";
    const key = (card.image as string) || fallbackKey;

    const importer = cardImageImports[key];

    if (!importer) {
      console.warn("[TarotCard] 이미지 import 를 찾지 못했습니다:", key);
      return;
    }

    importer()
      .then((mod) => {
        if (!cancelled) {
          setFrontSrc(mod.default);
        }
      })
      .catch((err) => {
        console.error("[TarotCard] 이미지 로딩 실패:", key, err);
      });

    return () => {
      cancelled = true;
    };
  }, [isFlipped, card.image]);

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

        {/* front – 뒤집혔고, 앞면 이미지가 로딩된 경우에만 렌더링 */}
        {isFlipped && frontSrc && (
          <div
            className="absolute inset-0 rounded-md shadow-lg pointer-events-none"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <img
              src={frontSrc}
              alt={card.name}
              className="w-full h-full object-cover rounded-md pointer-events-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
