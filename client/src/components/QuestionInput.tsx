import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import GoogleAdBanner from "@/components/GoogleAdBanner";

interface QuestionInputProps {
  value: string;
  onChange: (question: string) => void;
  onSubmit?: () => void;
  disabled?: boolean;
}

export default function QuestionInput({
  value,
  onChange,
  onSubmit,
  disabled = false,
}: QuestionInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleSubmit = () => {
    if (value && value.trim() && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-4">
      {/* 광고 배너 영역 */}
      <div className="h-24 border-t flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <GoogleAdBanner />
        </div>
      </div>

      {/* 질문 입력 영역 */}
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          placeholder="질문을 입력하세요..."
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="flex-1 h-12 rounded-full px-6"
          data-testid="input-question"
        />
        <Button
          size="icon"
          onClick={handleSubmit}
          disabled={disabled || !value || !value.trim()}
          className="h-12 w-12 rounded-full"
          data-testid="button-submit"
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
