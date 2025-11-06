import { useState, useEffect } from "react";
import { ALL_CARDS, type TarotCard as TarotCardType } from "@shared/cards";
import Header from "@/components/Header";
import TalkingCat from "@/components/TalkingCat";
import CatPhotoUpload from "@/components/CatPhotoUpload";
import TarotCard from "@/components/TarotCard";
import QuestionInput from "@/components/QuestionInput";
import ResultModal from "@/components/ResultModal";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

type GameState = "initial" | "shuffling" | "spread" | "selecting" | "reading";

interface TarotReadingRequest {
  question: string;
  cards: { name: string; keywords: string[] }[];
}

interface TarotReadingResponse {
  reading: string;
}

const CAT_PHOTO_KEY = 'cat-tarot-custom-photo';
const CAT_NAME_KEY = 'cat-tarot-cat-name';
const READING_COMPLETED_KEY = 'cat-tarot-reading-completed';

export default function CatTarotPage() {
  const [gameState, setGameState] = useState<GameState>("initial");
  const [question, setQuestion] = useState("");
  const [shuffledCards, setShuffledCards] = useState<TarotCardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<TarotCardType[]>([]);
  const [flippedCardIds, setFlippedCardIds] = useState<number[]>([]);
  const [reading, setReading] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [catPhoto, setCatPhoto] = useState<string>("");
  const [catName, setCatName] = useState<string>("");
  const [greetingKey, setGreetingKey] = useState(0);
  const [viewport, setViewport] = useState({ width: 1920, height: 1080 });
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateViewport = () => {
        setViewport({ width: window.innerWidth, height: window.innerHeight });
      };
      updateViewport();
      window.addEventListener('resize', updateViewport);
      return () => window.removeEventListener('resize', updateViewport);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPhoto = localStorage.getItem(CAT_PHOTO_KEY);
      const savedName = localStorage.getItem(CAT_NAME_KEY);
      
      if (savedPhoto) {
        setCatPhoto(savedPhoto);
      }
      if (savedName) {
        setCatName(savedName);
      }
      
      // Show upload modal if either is missing
      if (!savedPhoto || !savedName) {
        setShowPhotoUpload(true);
      }
    }
  }, []);

  const readingMutation = useMutation<TarotReadingResponse, Error, TarotReadingRequest>({
    mutationFn: async (data) => {
      const res = await apiRequest("POST", "/api/tarot/reading", data);
      return await res.json();
    },
    onSuccess: (data) => {
      setReading(data.reading);
      setTimeout(() => {
        setShowModal(true);
        // Mark that a reading has been completed
        if (typeof window !== 'undefined') {
          localStorage.setItem(READING_COMPLETED_KEY, 'true');
        }
      }, 800);
    },
    onError: (error) => {
      toast({
        title: "오류",
        description: "리딩 생성에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
      setGameState("selecting");
    },
  });

  const shuffleCards = () => {
    const cards = [...ALL_CARDS];
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const handleCardStackClick = () => {
    if (!question) {
      toast({
        title: "질문을 입력해주세요",
        variant: "destructive",
      });
      return;
    }

    setGameState("shuffling");
    setTimeout(() => {
      const shuffled = shuffleCards();
      setShuffledCards(shuffled);
      setGameState("spread");
      setTimeout(() => {
        setGameState("selecting");
      }, 500);
    }, 1500);
  };

  const handleCardClick = (card: TarotCardType) => {
    if (gameState !== "selecting") return;
    if (selectedCards.find(c => c.id === card.id)) return;
    if (selectedCards.length >= 3) return;

    setFlippedCardIds(prev => [...prev, card.id]);
    
    setTimeout(() => {
      const newSelected = [...selectedCards, card];
      setSelectedCards(newSelected);

      if (newSelected.length === 3) {
        setGameState("reading");
        generateReading(newSelected);
      }
    }, 300);
  };

  const generateReading = (cards: TarotCardType[]) => {
    readingMutation.mutate({
      question,
      cards: cards.map(c => ({ name: c.name, keywords: c.keywords })),
    });
  };

  const handleReset = () => {
    setGameState("initial");
    setQuestion("");
    setShuffledCards([]);
    setSelectedCards([]);
    setFlippedCardIds([]);
    setReading("");
    setShowModal(false);
    readingMutation.reset();
    
    // Refresh greeting if a reading has been completed before
    if (typeof window !== 'undefined') {
      const hasCompleted = localStorage.getItem(READING_COMPLETED_KEY);
      if (hasCompleted === 'true') {
        // Invalidate the greeting query to force a new fetch
        queryClient.invalidateQueries({ queryKey: ['greeting'] });
      }
    }
  };

  const handlePhotoUpload = (imageDataUrl: string, name: string) => {
    setCatPhoto(imageDataUrl);
    setCatName(name);
    if (typeof window !== 'undefined') {
      localStorage.setItem(CAT_PHOTO_KEY, imageDataUrl);
      localStorage.setItem(CAT_NAME_KEY, name);
    }
    toast({
      title: "저장됨!",
      description: `${name}의 사진이 업데이트되었습니다.`,
    });
  };

  const handlePhotoClick = () => {
    setShowPhotoUpload(true);
  };

  const getCardPosition = (index: number, total: number) => {
    if (gameState === "initial" || gameState === "shuffling") {
      return { x: 0, y: 0, rotation: 0 };
    }

    // Overlapping spread layout - fits all cards without scrolling
    const isMobile = viewport.width < 768;
    const viewportWidth = viewport.width;
    const viewportHeight = viewport.height;
    
    // Card dimensions
    const cardWidth = isMobile ? 60 : 70;
    const cardHeight = isMobile ? 90 : 105;
    
    // Available area (accounting for header and input)
    const headerHeight = 64;
    const inputHeight = 100;
    const padding = isMobile ? 10 : 40; // Minimal padding on mobile
    const availableWidth = viewportWidth - (padding * 2);
    const availableHeight = viewportHeight - headerHeight - inputHeight - 40;
    
    // Calculate rows and columns with heavy overlap
    const cols = Math.ceil(Math.sqrt(total * (availableWidth / availableHeight)));
    const rows = Math.ceil(total / cols);
    
    // Spacing with significant overlap
    const horizontalSpacing = Math.max(cardWidth * 0.4, availableWidth / (cols + 1));
    const verticalSpacing = Math.max(cardHeight * 0.4, availableHeight / (rows + 1));
    
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    // Center the spread - ensure it starts from the padding offset
    const totalWidth = (cols - 1) * horizontalSpacing + cardWidth;
    const totalHeight = (rows - 1) * verticalSpacing + cardHeight;
    
    // Calculate horizontal offset to center the spread
    const centerOffsetX = Math.max(0, (availableWidth - totalWidth) / 2);
    const offsetX = padding + centerOffsetX;
    const offsetY = Math.max(0, (availableHeight - totalHeight) / 2);
    
    const x = offsetX + col * horizontalSpacing;
    const y = offsetY + row * verticalSpacing;
    const rotation = (Math.random() - 0.5) * 10;

    return { x, y, rotation };
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Header onHomeClick={handleReset} />

      <div className="pt-16 h-screen flex flex-col">
        <div className="flex-1 relative">
          {gameState === "initial" && (
            <div
              className="absolute transition-all duration-1000 ease-out px-4"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <TalkingCat 
                customImage={catPhoto}
                catName={catName}
                onPhotoClick={handlePhotoClick}
                onNameEdit={handlePhotoClick}
                greetingKey={greetingKey}
              />
            </div>
          )}

          {(gameState === "shuffling" || gameState === "spread" || gameState === "selecting" || gameState === "reading") && (
            <div
              className="absolute inset-0 pt-4"
              data-testid="card-spread-container"
            >
              <div className="relative w-full h-full">
                {shuffledCards.map((card, index) => {
                  const pos = getCardPosition(index, shuffledCards.length);
                  const isSelected = selectedCards.find(c => c.id === card.id);
                  const isFlipped = flippedCardIds.includes(card.id);

                  const selectedIndex = selectedCards.findIndex(c => c.id === card.id);
                  
                  // Determine scale based on selection
                  const isMobile = viewport.width < 768;
                  const isTablet = viewport.width >= 768 && viewport.width < 1024;
                  
                  let scale = 1;
                  if (isSelected) {
                    // Scale up selected cards based on device
                    if (isMobile) {
                      scale = 1.3;
                    } else if (isTablet) {
                      scale = 1.6;
                    } else {
                      scale = 2.0;
                    }
                  }

                  return (
                    <div
                      key={card.id}
                      className="transition-all duration-700 ease-out absolute"
                      style={{
                        left: `${pos.x}px`,
                        top: `${pos.y}px`,
                        transform: `rotate(${isSelected ? 0 : pos.rotation}deg) scale(${scale})`,
                        zIndex: isSelected ? 100 : 1,
                      }}
                      data-testid={`spread-card-${index}`}
                    >
                      <TarotCard
                        card={card}
                        isFlipped={isFlipped}
                        onClick={() => handleCardClick(card)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {gameState === "selecting" && (
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50">
              <div className="text-2xl font-serif text-foreground bg-primary/90 text-primary-foreground backdrop-blur-sm px-8 py-4 rounded-xl shadow-2xl border-2 border-primary animate-pulse">
                {selectedCards.length === 0 && "카드 3장을 선택하세요"}
                {selectedCards.length === 1 && "카드 2장을 더 선택하세요"}
                {selectedCards.length === 2 && "카드 1장을 더 선택하세요"}
              </div>
            </div>
          )}

          {readingMutation.isPending && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-[150]">
              <div className="bg-card border-2 border-primary/50 rounded-2xl p-8 shadow-2xl max-w-md">
                <div className="text-2xl font-serif text-foreground text-center mb-4 animate-pulse">
                  고양이어 번역 중
                </div>
                <div className="flex justify-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 pb-6">
          <QuestionInput
            value={question}
            onChange={setQuestion}
            onSubmit={handleCardStackClick}
            disabled={gameState !== "initial"}
          />
        </div>
      </div>

      <ResultModal
        isOpen={showModal}
        onClose={handleReset}
        selectedCards={selectedCards}
        reading={reading}
      />

      <CatPhotoUpload
        isOpen={showPhotoUpload}
        onClose={() => setShowPhotoUpload(false)}
        onUpload={handlePhotoUpload}
        currentImage={catPhoto}
        currentName={catName}
      />
    </div>
  );
}
