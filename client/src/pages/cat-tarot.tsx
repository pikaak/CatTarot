import { useState } from "react";
import { ALL_CARDS, type TarotCard as TarotCardType } from "@shared/cards";
import Header from "@/components/Header";
import CardStack from "@/components/CardStack";
import TarotCard from "@/components/TarotCard";
import QuestionInput from "@/components/QuestionInput";
import ResultModal from "@/components/ResultModal";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

type GameState = "initial" | "shuffling" | "spread" | "selecting" | "reading";

interface TarotReadingRequest {
  question: string;
  cards: { name: string; keywords: string[] }[];
}

interface TarotReadingResponse {
  reading: string;
}

export default function CatTarotPage() {
  const [gameState, setGameState] = useState<GameState>("initial");
  const [question, setQuestion] = useState("");
  const [shuffledCards, setShuffledCards] = useState<TarotCardType[]>([]);
  const [selectedCards, setSelectedCards] = useState<TarotCardType[]>([]);
  const [flippedCardIds, setFlippedCardIds] = useState<number[]>([]);
  const [reading, setReading] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { toast } = useToast();

  const readingMutation = useMutation<TarotReadingResponse, Error, TarotReadingRequest>({
    mutationFn: async (data) => {
      const res = await apiRequest("POST", "/api/tarot/reading", data);
      return await res.json();
    },
    onSuccess: (data) => {
      setReading(data.reading);
      setTimeout(() => {
        setShowModal(true);
      }, 800);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate reading. Please try again.",
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
        title: "Please enter your question",
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
  };

  const getCardPosition = (index: number, total: number) => {
    if (gameState === "initial" || gameState === "shuffling") {
      return { x: 0, y: 0, rotation: 0 };
    }

    // Overlapping spread layout - fits all cards without scrolling
    const isMobile = window.innerWidth < 768;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Card dimensions
    const cardWidth = isMobile ? 60 : 70;
    const cardHeight = isMobile ? 90 : 105;
    
    // Available area (accounting for header and input)
    const headerHeight = 64;
    const inputHeight = 100;
    const availableWidth = viewportWidth - 40; // padding
    const availableHeight = viewportHeight - headerHeight - inputHeight - 40;
    
    // Calculate rows and columns with heavy overlap
    const cols = Math.ceil(Math.sqrt(total * (availableWidth / availableHeight)));
    const rows = Math.ceil(total / cols);
    
    // Spacing with significant overlap
    const horizontalSpacing = Math.max(cardWidth * 0.4, availableWidth / (cols + 1));
    const verticalSpacing = Math.max(cardHeight * 0.4, availableHeight / (rows + 1));
    
    const row = Math.floor(index / cols);
    const col = index % cols;
    
    // Center the spread
    const totalWidth = (cols - 1) * horizontalSpacing;
    const totalHeight = (rows - 1) * verticalSpacing;
    const offsetX = (availableWidth - totalWidth) / 2;
    const offsetY = (availableHeight - totalHeight) / 2;
    
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
              className="absolute transition-all duration-1000 ease-out"
              style={{
                bottom: "140px",
                left: "2rem",
              }}
            >
              <CardStack onClick={handleCardStackClick} />
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
                  const isMobile = window.innerWidth < 768;
                  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
                  
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

          {gameState === "selecting" && selectedCards.length < 3 && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-32 text-center">
              <div className="text-lg font-serif text-foreground bg-card/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg border border-border">
                Select {3 - selectedCards.length} card{3 - selectedCards.length !== 1 ? 's' : ''} to reveal your fortune
              </div>
            </div>
          )}

          {readingMutation.isPending && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-lg font-serif text-foreground animate-pulse">
                Your cat is consulting the cosmic forces...
              </div>
            </div>
          )}
        </div>

        <div className="p-4 pb-6">
          <QuestionInput
            value={question}
            onChange={setQuestion}
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
    </div>
  );
}
