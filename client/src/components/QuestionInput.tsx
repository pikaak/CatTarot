import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface QuestionInputProps {
  value: string;
  onChange: (question: string) => void;
  disabled?: boolean;
  onSubmit?: () => void;
}

export default function QuestionInput({ value, onChange, disabled = false, onSubmit }: QuestionInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = () => {
    if (onSubmit && value.trim()) {
      onSubmit();
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
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="flex-1 h-12 rounded-full px-6"
          data-testid="input-question"
        />
        <Button
          size="icon"
          disabled={disabled || !value || !value.trim()}
          onClick={handleSubmit}
          className="h-12 w-12 rounded-full"
          data-testid="button-submit"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
