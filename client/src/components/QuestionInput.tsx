import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  disabled?: boolean;
}

export default function QuestionInput({ onSubmit, disabled = false }: QuestionInputProps) {
  const [question, setQuestion] = useState("");

  const handleSubmit = () => {
    if (question.trim()) {
      onSubmit(question.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && question.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <div className="h-24 border-t flex items-center justify-center text-muted-foreground text-sm">
        Ad Space Reserved
      </div>
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          className="flex-1 h-12 rounded-full px-6"
          data-testid="input-question"
        />
        <Button
          size="icon"
          onClick={handleSubmit}
          disabled={disabled || !question.trim()}
          className="h-12 w-12 rounded-full"
          data-testid="button-submit"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
