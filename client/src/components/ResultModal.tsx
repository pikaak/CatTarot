import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, Share2 } from "lucide-react";
import { SiX, SiInstagram } from "react-icons/si";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { TarotCard } from "@shared/cards";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCards: TarotCard[];
  reading: string;
}

// shared/cards.ts 의 image 값과 1:1로 매칭되는 이미지 매핑
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

export default function ResultModal({
  isOpen,
  onClose,
  selectedCards,
  reading,
}: ResultModalProps) {
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sentences = reading.split(". ").filter((s) => s.trim());
  const pageSize = 3;
  const totalPages = Math.ceil(sentences.length / pageSize);
  const currentText =
    sentences
      .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
      .join(". ") +
    (sentences.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
      .length > 0
      ? "."
      : "");

  useEffect(() => {
    if (!currentText) return;

    setIsTyping(true);
    setDisplayedText("");

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= currentText.length) {
        setDisplayedText(currentText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentText]);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleXShare = async () => {
    const text = `냥이 타로 번역기 🐱✨\n\n${reading.slice(0, 200)}${
      reading.length > 200 ? "..." : ""
    }`;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(window.location.href)}`;

    const popup = window.open(tweetUrl, "_blank", "width=550,height=420");

    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      try {
        await navigator.clipboard.writeText(
          `${text}\n${window.location.href}`
        );
        toast({
          title: "복사됨!",
          description: "X에 붙여넣기 하세요!",
        });
      } catch (error) {
        console.error("Copy failed:", error);
        toast({
          title: "공유 실패",
          description: "클립보드 복사에 실패했습니다.",
          variant: "destructive",
        });
      }
    }
  };

  const handleInstagramShare = async () => {
    const shareText = `냥이 타로 번역기 🐱✨\n\n${reading}\n\n나도 우리 고양이에게 물어봐!\n${window.location.href}`;
    try {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "복사됨!",
        description: "인스타그램에 붙여넣기 하세요!",
      });
    } catch (error) {
      console.error("Copy failed:", error);
      toast({
        title: "공유 실패",
        description: "클립보드 복사에 실패했습니다.",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "냥이 타로 번역기",
      text: `냥이 타로 번역기 🐱✨\n\n${reading.slice(0, 200)}${
        reading.length > 200 ? "..." : ""
      }`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Share failed:", error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        toast({
          title: "복사됨!",
          description: "클립보드에 복사되었습니다.",
        });
      } catch (error) {
        console.error("Copy failed:", error);
        toast({
          title: "공유 실패",
          description: "클립보드 복사에 실패했습니다.",
          variant: "destructive",
        });
      }
    }
  };

  const handleClose = () => {
    setCurrentPage(0);
    onClose();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    }
  };

  const catAvatarImg = new URL(
    "@assets/generated_images/Fortune_teller_cat_avatar.png",
    import.meta.url
  ).href;

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6 md:p-12"
        data-testid="modal-result"
        hideClose
      >
        <DialogHeader>
          <DialogTitle className="sr-only">고양이의 리딩</DialogTitle>
          <DialogDescription className="sr-only">
            고양이가 선택한 타로 카드를 바탕으로 답변합니다
          </DialogDescription>
        </DialogHeader>

        {/* 선택된 카드들 이미지 */}
        <div className="flex gap-3 md:gap-4 mb-4 md:mb-6 justify-center flex-wrap">
          {selectedCards.map((card, index) => {
            const imgSrc =
              cardImages[card.image] ||
              cardImages[
                "@assets/generated_images/The_Cat_tarot_card_5842b39d.png"
              ];

            return (
              <div
                key={index}
                className="w-32 h-48 md:w-40 md:h-60 rounded-md shadow-lg overflow-hidden flex-shrink-0"
              >
                <img
                  src={imgSrc}
                  alt={card.name}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* 카드 이름 텍스트 */}
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 animate-pulse">
            <img
              src={catAvatarImg}
              alt="고양이 아바타"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {selectedCards.map((card, index) => (
              <span key={index}>
                {card.name}
                {index < selectedCards.length - 1 && " · "}
              </span>
            ))}
          </div>
        </div>

        {/* 리딩 텍스트 */}
        <div className="relative min-h-[120px]">
          <p className="text-base md:text-lg leading-relaxed text-foreground font-medium opacity-100">
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </p>
        </div>

        {/* 페이지 네비게이션 / 공유 버튼 */}
        {currentPage < totalPages - 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-8 right-8"
            onClick={handleNext}
            data-testid="button-next-page"
          >
            <ChevronRight className="h-5 w-5 animate-pulse" />
          </Button>
        )}

        {currentPage === totalPages - 1 && (
          <div className="flex flex-row items-center justify-center gap-2 mt-3 mb-2">
            <Button onClick={handleClose} data-testid="button-done">
              완료
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              data-testid="button-share"
              title="공유"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleXShare}
              data-testid="button-share-x"
              title="X에 공유"
            >
              <SiX className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleInstagramShare}
              data-testid="button-share-instagram"
              title="인스타그램에 공유"
            >
              <SiInstagram className="h-4 w-4" />
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
