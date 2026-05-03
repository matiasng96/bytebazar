import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }
  return (
    <div className="flex h-dvh flex-col bg-linear-to-br from-slate-50 via-slate-100 to-indigo-50/50">
      {/* Header Superior Glassmorphism */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/40 bg-white/60 px-6 py-4 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3">
          {session.user.image && (
            <img
              src={session.user.image}
              alt="Avatar"
              className="h-8 w-8 rounded-full"
            />
          )}
          <span className="text-foreground font-medium">
            {session.user.name}
          </span>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="text-sm font-medium text-red-500 transition-colors hover:text-red-600"
          >
            Cerrar sesión
          </button>
        </form>
      </header>

      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
