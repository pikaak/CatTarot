import TarotCard from "../TarotCard";
import { MAJOR_ARCANA } from "@shared/cards";
import { useState } from "react";

export default function TarotCardExample() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <TarotCard
        card={MAJOR_ARCANA[0]}
        isFlipped={isFlipped}
        onClick={() => setIsFlipped(!isFlipped)}
      />
    </div>
  );
}
