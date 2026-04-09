import StartButton from "@/components/StartButton";

export default function Home() {
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col text-center font-sans">
      <header className="bg-primary text-primary-foreground py-4 text-2xl font-bold shadow-md">
        <h1>AI Tutor App</h1>
      </header>

      <section className="bg-surface border-surface-border flex flex-col items-center gap-6 border-b py-16 shadow-inner">
        <p className="text-muted-text text-xl font-medium">
          Welcome to the AI Tutor APP!
        </p>

        <StartButton text="Start Learning" />
      </section>
    </main>
  );
}
