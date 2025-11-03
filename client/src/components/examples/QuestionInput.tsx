import QuestionInput from "../QuestionInput";
import { useState } from "react";

export default function QuestionInputExample() {
  const [question, setQuestion] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-2xl px-4">
        <QuestionInput value={question} onChange={setQuestion} />
        <div className="mt-4 text-center text-muted-foreground">
          Current question: {question || "(empty)"}
        </div>
      </div>
    </div>
  );
}
