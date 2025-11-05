import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import catImage from "@assets/stock_images/friendly_orange_tabb_b7c12b4c.jpg";

interface TalkingCatProps {
  onClick: () => void;
}

export default function TalkingCat({ onClick }: TalkingCatProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: greeting } = useQuery<string>({
    queryKey: ['/api/greeting'],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const greetingText = typeof greeting === 'string' ? greeting : "Click to begin your mystical journey...";

  return (
    <div 
      className="flex items-center gap-4 cursor-pointer group"
      onClick={onClick}
      data-testid="talking-cat"
    >
      <div 
        className={`relative transition-all duration-500 ${isAnimating ? 'scale-105' : 'scale-100'}`}
        style={{ width: "120px", height: "120px" }}
      >
        <img
          src={catImage}
          alt="Mystical cat"
          className="w-full h-full object-cover rounded-full shadow-xl border-4 border-primary/30"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent animate-pulse" />
      </div>

      <div 
        className="relative bg-card border-2 border-primary/30 rounded-2xl px-6 py-4 shadow-xl max-w-md transition-all duration-300 group-hover:scale-105"
        data-testid="speech-bubble"
      >
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[12px] border-r-primary/30"
        />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-[2px] w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-card"
        />
        
        <p className="text-foreground font-serif text-lg italic">
          {greetingText}
        </p>
      </div>
    </div>
  );
}
