import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronRight, X } from "lucide-react";
import { useState } from "react";
import type { TarotCard } from "@shared/cards";
import catAvatarImg from "@assets/generated_images/Fortune_teller_cat_avatar_49899323.png";

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCards: TarotCard[];
  reading: string;
}

export default function ResultModal({ isOpen, onClose, selectedCards, reading }: ResultModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  
  const sentences = reading.split(". ").filter(s => s.trim());
  const pageSize = 3;
  const totalPages = Math.ceil(sentences.length / pageSize);
  const currentText = sentences.slice(currentPage * pageSize, (currentPage + 1) * pageSize).join(". ") + (sentences.slice(currentPage * pageSize, (currentPage + 1) * pageSize).length > 0 ? "." : "");

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleClose = () => {
    setCurrentPage(0);
    onClose();
  };

  const cardImages: Record<string, string> = {
    "@assets/generated_images/The_Fool_tarot_card_d44cad26.png": new URL("@assets/generated_images/The_Fool_tarot_card_d44cad26.png", import.meta.url).href,
    "@assets/generated_images/The_Magician_tarot_card_15bdbf18.png": new URL("@assets/generated_images/The_Magician_tarot_card_15bdbf18.png", import.meta.url).href,
    "@assets/generated_images/High_Priestess_tarot_card_b1606ff1.png": new URL("@assets/generated_images/High_Priestess_tarot_card_b1606ff1.png", import.meta.url).href,
    "@assets/generated_images/The_Lovers_tarot_card_01d9fd4d.png": new URL("@assets/generated_images/The_Lovers_tarot_card_01d9fd4d.png", import.meta.url).href,
    "@assets/generated_images/The_Sun_tarot_card_8e006017.png": new URL("@assets/generated_images/The_Sun_tarot_card_8e006017.png", import.meta.url).href,
    "@assets/generated_images/The_Moon_tarot_card_22b91408.png": new URL("@assets/generated_images/The_Moon_tarot_card_22b91408.png", import.meta.url).href,
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md md:max-w-lg rounded-2xl p-8 md:p-12" data-testid="modal-result">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-10 w-10"
          onClick={handleClose}
          data-testid="button-close-modal"
        >
          <X className="h-5 w-5" />
        </Button>
        
        <DialogHeader>
          <DialogTitle className="sr-only">Your Cat's Reading</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 mb-8 justify-center">
          {selectedCards.map((card, index) => (
            <div key={index} className="w-16 h-24 rounded-md shadow-md overflow-hidden">
              <img
                src={cardImages[card.image] || cardImages["@assets/generated_images/The_Fool_tarot_card_d44cad26.png"]}
                alt={card.name}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={catAvatarImg}
              alt="Fortune teller cat"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-sm text-muted-foreground">Your Cat's Wisdom</div>
        </div>

        <div className="relative min-h-[120px]">
          <p className="text-base md:text-lg leading-relaxed text-foreground">
            {currentText}
          </p>
        </div>

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
          <div className="flex justify-center mt-6">
            <Button onClick={handleClose} data-testid="button-done">
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
