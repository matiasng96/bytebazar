import "./globals.css"; // Importamos las variables de Tailwind v4 que armamos

export const metadata = {
  title: "AI Tutor App",
  description: "Tu tutor personal de programación",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* El body envuelve a todos los {children}, ya sea el Home o el Chat */}
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
