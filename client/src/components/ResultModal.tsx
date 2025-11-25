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

// ✅ 모든 카드 이미지를 자동으로 수집하는 glob
//   - 여기서는 "파일 이름" 기준으로 매칭할 거라 경로 alias 차이는 신경 안 써도 됨.
const cardImageModules = import.meta.glob<{ default: string }>(
  "@assets/generated_images/**/*.{png,jpg,jpeg,webp}",
  { eager: true }
);

// ✅ 파일 이름 → 이미지 URL 로 매핑
//   예: "The_Empress_tarot_card_ee0ea80d.png" → "빌드된 실제 URL"
const cardImagesByFilename: Record<string, string> = {};
for (const [path, mod] of Object.entries(cardImageModules)) {
  const filename = path.split("/").pop();
  if (filename) {
    cardImagesByFilename[filename] = (mod as { default: string }).default;
  }
}

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

  const isThreeCards = selectedCards.length === 3;

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
        <div
          className={`mb-4 md:mb-6 flex gap-2 md:gap-4 justify-center ${
            isThreeCards ? "flex-nowrap" : "flex-wrap"
          }`}
        >
          {selectedCards.map((card, index) => {
            const fallbackFilename =
              "The_Cat_tarot_card_5842b39d.png";

            const imagePath = card.image as string | undefined;
            const filename =
              imagePath?.split("/").pop() ?? fallbackFilename;

            const imgSrc =
              cardImagesByFilename[filename] ||
              cardImagesByFilename[fallbackFilename];

            return (
              <div
                key={index}
                className={
                  isThreeCards
                    ? // ✅ 3장일 때: 항상 가로 한 줄, 화면에 맞게 줄어드는 카드
                      "aspect-[2/3] w-[22vw] max-w-[90px] md:max-w-[130px] rounded-md shadow-lg overflow-hidden flex-shrink-0 bg-white"
                    : // ✅ 그 외(1장/2장/기타)는 기존 크기 유지
                      "w-32 h-48 md:w-40 md:h-60 rounded-md shadow-lg overflow-hidden flex-shrink-0 bg-white"
                }
              >
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={card.name}
                    className="w-full h-full object-contain bg-white"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
                    이미지 없음
                  </div>
                )}
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
