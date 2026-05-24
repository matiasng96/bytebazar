"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="absolute right-4 top-4 z-50 flex items-center space-x-2 rounded-full bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm ring-1 ring-slate-200">
      <button
        onClick={() => setLanguage("es")}
        className={`flex items-center justify-center rounded-full px-2 py-1 text-sm font-medium transition-colors ${
          language === "es"
            ? "bg-brand-500 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        🇪🇸 ES
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`flex items-center justify-center rounded-full px-2 py-1 text-sm font-medium transition-colors ${
          language === "en"
            ? "bg-brand-500 text-white"
            : "text-slate-600 hover:bg-slate-100"
        }`}
      >
        🇺🇸 EN
      </button>
    </div>
  );
}
