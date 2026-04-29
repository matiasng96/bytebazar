import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "ByteBazar",
  description: "Tu asistente virtual de ByteBazar",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* El body envuelve a todos los {children}, ya sea el Home o el Chat */}
      <body
        className={`${inter.className} text-foreground min-h-screen bg-linear-to-br from-slate-50 to-slate-200 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
