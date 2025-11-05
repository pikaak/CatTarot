import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import catImage from "@assets/stock_images/friendly_orange_tabb_b7c12b4c.jpg";
import { Camera } from "lucide-react";

interface TalkingCatProps {
  customImage?: string;
  onPhotoClick?: () => void;
}

export default function TalkingCat({ customImage, onPhotoClick }: TalkingCatProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: greeting } = useQuery<string>({
    queryKey: ['/api/greeting'],
  });

  const hasCustomImage = !!customImage;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 500);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const greetingText = typeof greeting === 'string' ? greeting : "신비로운 여정을 시작하세요...";

  const handlePhotoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPhotoClick) {
      onPhotoClick();
    }
  };

  return (
    <div 
      className="flex items-center gap-3 md:gap-4 group"
      data-testid="talking-cat"
    >
      <div 
        className="relative transition-all duration-500 cursor-pointer flex-shrink-0"
        style={{ width: "140px", height: "140px" }}
        onClick={handlePhotoClick}
        data-testid="cat-image-area"
      >
        {customImage ? (
          <img
            src={customImage}
            alt="당신의 고양이"
            className="w-full h-full object-cover rounded-full shadow-xl border-4 border-primary/30"
          />
        ) : (
          <div className="w-full h-full rounded-full shadow-xl border-4 border-primary/30 bg-muted flex items-center justify-center">
            <Camera className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent animate-pulse" />
        {hasCustomImage && (
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </div>

      <div 
        className="relative bg-card border-2 border-primary/30 rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-xl max-w-[200px] md:max-w-md flex-1"
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
