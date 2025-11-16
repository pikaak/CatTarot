import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import catImage from "@assets/stock_images/friendly_orange_tabb_b7c12b4c.jpg";
import { Camera, Pencil } from "lucide-react";

interface TalkingCatProps {
  customImage?: string;
  catName?: string;
  onPhotoClick?: () => void;
  onNameEdit?: () => void;
  greetingKey?: number;
}

export default function TalkingCat({ customImage, catName, onPhotoClick, onNameEdit, greetingKey = 0 }: TalkingCatProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: greeting } = useQuery<string>({
    queryKey: ['greeting', greetingKey],
    queryFn: async () => {
      const response = await fetch('/api/greeting', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch greeting');
      }
      return await response.json();
    },
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

  const greetingText = typeof greeting === 'string' ? greeting : "냥!";

  const handlePhotoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPhotoClick) {
      onPhotoClick();
    }
  };

  return (
    <div 
      className="flex flex-col items-center gap-2"
      data-testid="talking-cat"
    >
      {catName && (
        <div className="flex items-center gap-2 group/name">
          <h2 className="text-xl md:text-2xl font-bold text-foreground" data-testid="cat-name">
            {catName}
          </h2>
          {onNameEdit && (
            <button
              onClick={onNameEdit}
              className="p-1 rounded-md hover:bg-muted transition-colors opacity-0 group-hover/name:opacity-100"
              aria-label="고양이 이름 수정"
              data-testid="button-edit-name"
            >
              <Pencil className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      )}
      <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 group">
        <div 
          className="relative transition-all duration-500 cursor-pointer flex-shrink-0"
          style={{ 
            width: "140px", 
            height: "140px",
            animation: isAnimating ? 'scale 0.5s ease-in-out' : undefined
          }}
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
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent" />
        {hasCustomImage && (
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </div>

      <div 
        className="relative bg-card border-2 border-primary/30 rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-xl max-w-[280px] md:max-w-md"
        data-testid="speech-bubble"
      >
        <div 
          className="absolute left-1/2 -translate-x-1/2 -top-2 -translate-y-full w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-primary/30 md:hidden"
        />
        <div 
          className="absolute left-1/2 -translate-x-1/2 -top-1 -translate-y-full w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-card md:hidden"
        />
        <div 
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-r-[12px] border-r-primary/30"
        />
        <div 
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 translate-x-[2px] w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-card"
        />
        
          <p className="text-foreground font-serif text-base italic">
            {greetingText}
          </p>
        </div>
      </div>
    </div>
  );
}
