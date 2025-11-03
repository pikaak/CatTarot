import QuestionInput from "../QuestionInput";

export default function QuestionInputExample() {
  const handleSubmit = (question: string) => {
    console.log("Question submitted:", question);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-2xl px-4">
        <QuestionInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
