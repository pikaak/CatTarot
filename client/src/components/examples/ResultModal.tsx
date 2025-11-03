import ResultModal from "../ResultModal";
import { useState } from "react";
import { MAJOR_ARCANA } from "@shared/cards";
import { Button } from "@/components/ui/button";

export default function ResultModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCards = [MAJOR_ARCANA[0], MAJOR_ARCANA[1], MAJOR_ARCANA[6]];
  const reading = "Butler, your scattered treats reveal much. The paths ahead shimmer with possibility, though some may lead to empty food bowls. Trust your instincts as I trust mine when hunting the red dot. The cosmic yarn ball spins in your favor, but remember—sometimes the box chooses the cat, not the other way around. Patience brings rewards, just as sitting by the door eventually opens it.";

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Button onClick={() => setIsOpen(true)}>Open Reading</Button>
      <ResultModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedCards={selectedCards}
        reading={reading}
      />
    </div>
  );
}
