import StartButton from "@/components/StartButton";
const buttonText = "Start Learning";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col text-center">
      <header className="bg-indigo-400 py-4 text-2xl font-medium text-white">
        <h1>AI Tutor App</h1>
      </header>
      <section className="flex flex-col items-center gap-4 bg-gray-100 py-6">
        <p className="text-lg">Welcome to the AI Tutor APP!</p>
        <StartButton text={buttonText} />
      </section>
    </main>
  );
}
