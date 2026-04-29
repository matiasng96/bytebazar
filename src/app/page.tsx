import StartButton from "@/components/StartButton";
import { auth, signIn } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="bg-background text-foreground flex min-h-screen flex-col text-center font-sans">
      <header className="border-b/t border-white/20 bg-white/70 py-4 text-2xl font-bold shadow-md backdrop-blur-md">
        <h1>ByteBazar</h1>
      </header>

      <section className="bg-surface border-surface-border flex flex-col items-center gap-6 border-b py-16 shadow-inner">
        <p className="text-muted-text text-xl font-medium">
          ¡Bienvenido al asistente virtual de ByteBazar!
        </p>
        <p>Puedo ayudarte a encontrar productos, resolver dudas y mucho más.</p>
        {session ? (
          <div className="flex flex-col items-center gap-4">
            <p>¡Hola, {session.user?.name}!</p>
            <StartButton text="Hablar con un asesor" />
          </div>
        ) : (
          /* SI NO HAY SESIÓN (Mostramos el form con la Server Action) */
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              type="submit"
              className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Iniciar sesión con Google
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
