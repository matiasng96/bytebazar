import { auth } from "@/auth";
import HomeContent from "@/components/HomeContent";

export default async function Home() {
  const session = await auth();
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col text-center font-sans">
      <header className="border-b/t border-white/20 bg-white/70 py-4 text-2xl font-bold shadow-md backdrop-blur-md">
        <h1>ByteBazar</h1>
      </header>

      <HomeContent session={session} />
    </main>
  );
}
