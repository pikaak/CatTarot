import Header from "../Header";

export default function HeaderExample() {
  const handleHomeClick = () => {
    console.log("Home clicked");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onHomeClick={handleHomeClick} />
      <div className="pt-20 px-4 text-center">
        <p className="text-muted-foreground">Page content goes here</p>
      </div>
    </div>
  );
}
