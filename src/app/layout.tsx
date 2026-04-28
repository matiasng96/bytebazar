
import "./globals.css";
import { Inter } from "next/font/google";
import AppWrapper from "@/components/AppWrapper";


export const metadata = {
  title: "AI Tutor App",
  description: "Tu tutor personal de programación",
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

        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>

  );
}
