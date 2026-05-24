import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import LanguageToggle from "@/components/LanguageToggle";

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
      <body
        className={`${inter.className} text-foreground min-h-screen bg-linear-to-br from-slate-50 to-slate-200 antialiased`}
      >
        <Providers>
          <LanguageToggle />
          {children}
        </Providers>
      </body>
    </html>
  );
}
