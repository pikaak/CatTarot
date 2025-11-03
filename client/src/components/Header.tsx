import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

interface HeaderProps {
  onHomeClick: () => void;
}

export default function Header({ onHomeClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 backdrop-blur-md bg-background/80 border-b border-border z-50">
      <div className="flex items-center justify-between h-full px-4 max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={onHomeClick}
          className="gap-2"
          data-testid="button-home"
        >
          <Home className="h-4 w-4" />
          <span className="hidden sm:inline">Home</span>
        </Button>
        
        <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-wide text-center flex-1">
          Cat Tarot
        </h1>
        
        <div className="w-20"></div>
      </div>
    </header>
  );
}
