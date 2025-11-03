import CardStack from "../CardStack";
import { useState } from "react";

export default function CardStackExample() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      <CardStack onClick={handleClick} isAnimating={isAnimating} />
    </div>
  );
}
