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

    // Grid layout for all 78 cards
    const cardsPerRow = 13;
    const row = Math.floor(index / cardsPerRow);
    const col = index % cardsPerRow;
    
    const cardWidth = 80;
    const cardHeight = 120;
    const horizontalSpacing = cardWidth + 10;
    const verticalSpacing = cardHeight + 10;

    const x = col * horizontalSpacing;
    const y = row * verticalSpacing;
    const rotation = (Math.random() - 0.5) * 8; // Slight random rotation

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
              className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-4 pb-32"
              data-testid="card-spread-container"
            >
              <div className="relative min-h-full" style={{ width: '1200px', margin: '0 auto', minHeight: '800px' }}>
                {shuffledCards.map((card, index) => {
                  const pos = getCardPosition(index, shuffledCards.length);
                  const isSelected = selectedCards.find(c => c.id === card.id);
                  const isFlipped = flippedCardIds.includes(card.id);

                  const selectedIndex = selectedCards.findIndex(c => c.id === card.id);
                  const getSelectedPosition = () => {
                    if (selectedIndex === -1) return null;
                    const isMobile = window.innerWidth < 768;
                    const positions = isMobile ? [
                      { top: '10px', left: '50%', translateX: '-120px', scale: 1.2 },
                      { top: '10px', left: '50%', translateX: '0px', scale: 1.2 },
                      { top: '10px', left: '50%', translateX: '120px', scale: 1.2 }
                    ] : [
                      { top: '20px', left: '50%', translateX: '-200px', scale: 1.8 },
                      { top: '20px', left: '50%', translateX: '0px', scale: 1.8 },
                      { top: '20px', left: '50%', translateX: '200px', scale: 1.8 }
                    ];
                    return positions[selectedIndex];
                  };
                  const selectedPos = getSelectedPosition();

                  return (
                    <div
                      key={card.id}
                      className="absolute transition-all duration-700 ease-out"
                      style={{
                        transform: isSelected 
                          ? `translate(calc(${selectedPos?.translateX}), 0) scale(${selectedPos?.scale})` 
                          : `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotation}deg)`,
                        left: isSelected ? selectedPos?.left : '0',
                        top: isSelected ? selectedPos?.top : '0',
                        opacity: 1,
                        zIndex: isSelected ? 10 : 1,
                        position: isSelected ? 'fixed' : 'absolute',
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
    </div>
  );
}
